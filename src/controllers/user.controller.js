import User from '../models/User.js';
import { asyncHandler } from '../utils/constants.js';

export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json(users);
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already in use' });
  const passwordHash = User.hashPassword(password);
  const user = await User.create({ name, email, passwordHash, role });
  res.status(201).json({ id: user._id });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  const user = await User.findByIdAndUpdate(id, { name, email, role }, { new: true }).select('-passwordHash');
  res.json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ ok: true });
});
