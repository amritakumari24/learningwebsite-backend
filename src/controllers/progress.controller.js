import Progress from '../models/Progress.js';
import { asyncHandler } from '../utils/constants.js';

export const markLessonComplete = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.body;
  const doc = await Progress.findOneAndUpdate(
    { user: req.user.id, course: courseId },
    { $addToSet: { completedLessons: lessonId } },
    { upsert: true, new: true }
  );
  const completed = doc.completedLessons.length;
  res.json({ completedLessons: completed, progressId: doc._id });
});

export const getProgress = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const doc = await Progress.findOne({ user: req.user.id, course: courseId });
  res.json(doc || { completedLessons: [], quizScores: [] });
});
