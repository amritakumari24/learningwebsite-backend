import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, index: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner', index: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  visibility: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
