import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import { asyncHandler } from '../utils/constants.js';

export const listCourses = asyncHandler(async (req, res) => {
  const { category, level, visibility } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (level) filter.level = level;
  if (visibility) filter.visibility = visibility;
  res.json(await Course.find(filter).populate('instructor', 'name email role'));
});

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, category, level, visibility, instructor } = req.body;
  const doc = await Course.create({ title, description, category, level, visibility, instructor: instructor || req.user.id });
  res.status(201).json(doc);
});

export const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('instructor', 'name email');
  const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
  res.json({ ...course.toObject(), lessons });
});

export const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const doc = await Course.findByIdAndUpdate(id, update, { new: true });
  res.json(doc);
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndDelete(id);
  await Lesson.deleteMany({ course: id });
  res.json({ ok: true });
});
