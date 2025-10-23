import Lesson from '../models/Lesson.js';
import { asyncHandler } from '../utils/constants.js';

export const createLesson = asyncHandler(async (req, res) => {
  const doc = await Lesson.create(req.body);
  res.status(201).json(doc);
});

export const listLessons = asyncHandler(async (req, res) => {
  const { course } = req.query;
  const filter = course ? { course } : {};
  const docs = await Lesson.find(filter).sort({ order: 1 });
  res.json(docs);
});

export const updateLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doc = await Lesson.findByIdAndUpdate(id, req.body, { new: true });
  res.json(doc);
});

export const deleteLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Lesson.findByIdAndDelete(id);
  res.json({ ok: true });
});
