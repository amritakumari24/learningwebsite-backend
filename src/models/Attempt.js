import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true, index: true },
  responses: [mongoose.Schema.Types.Mixed],
  score: Number,
  max: Number,
}, { timestamps: true });

export default mongoose.model('Attempt', attemptSchema);
