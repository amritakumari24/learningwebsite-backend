import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  type: { type: String, enum: ['mcq', 'boolean', 'short'], required: true },
  options: [String],
  answer: mongoose.Schema.Types.Mixed // index or boolean or text
});

const quizSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  questions: [quizQuestionSchema],
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);
