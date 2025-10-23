import Quiz from '../models/Quiz.js';
import Attempt from '../models/Attempt.js';
import Progress from '../models/Progress.js';
import { asyncHandler } from '../utils/constants.js';

export const createQuiz = asyncHandler(async (req, res) => {
  const doc = await Quiz.create(req.body);
  res.status(201).json(doc);
});

export const listQuizzes = asyncHandler(async (req, res) => {
  const { course } = req.query;
  const filter = course ? { course } : {};
  const docs = await Quiz.find(filter);
  res.json(docs);
});

export const updateQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doc = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
  res.json(doc);
});

export const deleteQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Quiz.findByIdAndDelete(id);
  res.json({ ok: true });
});

function grade(quiz, responses) {
  let score = 0;
  let max = quiz.questions.length;
  quiz.questions.forEach((q, idx) => {
    const r = responses[idx];
    if (q.type === 'mcq') {
      if (typeof r === 'number' && q.answer === r) score++;
    } else if (q.type === 'boolean') {
      if (typeof r === 'boolean' && q.answer === r) score++;
    } else if (q.type === 'short') {
      if (typeof r === 'string' && typeof q.answer === 'string' && r.trim().toLowerCase() === q.answer.trim().toLowerCase()) score++;
    }
  });
  return { score, max };
}

export const attemptQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params; // quiz id
  const { answers } = req.body;
  const quiz = await Quiz.findById(id);
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  
  const responses = answers || [];
  const { score, max } = grade(quiz, responses);
  
  // Create feedback array for each question
  const feedback = quiz.questions.map((q, idx) => {
    const userAnswer = responses[idx];
    let correct = false;
    
    if (q.type === 'mcq') {
      correct = typeof userAnswer === 'number' && q.answer === userAnswer;
    } else if (q.type === 'boolean') {
      correct = typeof userAnswer === 'boolean' && q.answer === userAnswer;
    } else if (q.type === 'short') {
      correct = typeof userAnswer === 'string' && typeof q.answer === 'string' && 
                userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase();
    }
    
    return {
      question: q.question,
      userAnswer: q.type === 'mcq' ? q.options[userAnswer] : userAnswer,
      correctAnswer: q.type === 'mcq' ? q.options[q.answer] : q.answer,
      correct
    };
  });
  
  const attempt = await Attempt.create({ user: req.user.id, quiz: id, responses, score, max });
  
  // update progress record
  await Progress.findOneAndUpdate(
    { user: req.user.id, course: quiz.course },
    { $push: { quizScores: { quiz: quiz._id, score, max } } },
    { upsert: true, new: true }
  );
  
  const percentage = max > 0 ? (score / max) * 100 : 0;
  
  res.json({ 
    attemptId: attempt._id, 
    correctCount: score, 
    totalQuestions: max,
    percentage,
    feedback
  });
});
