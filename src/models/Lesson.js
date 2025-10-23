import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'text', 'pdf', 'file'], required: true },
  contentUrl: String,
  text: String,
  order: { type: Number, default: 0, index: true },
}, { timestamps: true });

export default mongoose.model('Lesson', lessonSchema);
