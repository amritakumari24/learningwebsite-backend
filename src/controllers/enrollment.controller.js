import Enrollment from '../models/Enrollment.js';
import { asyncHandler } from '../utils/constants.js';

export const enroll = asyncHandler(async (req, res) => {
  const { course } = req.body;
  const doc = await Enrollment.create({ user: req.user.id, course });
  res.status(201).json(doc);
});

export const listMyEnrollments = asyncHandler(async (req, res) => {
  const docs = await Enrollment.find({ user: req.user.id }).populate('course');
  res.json(docs);
});
