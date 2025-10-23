import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../src/models/User.js';
import { Roles } from '../src/utils/constants.js';

dotenv.config();

async function main() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnsphere';
  await mongoose.connect(uri);
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Missing ADMIN_EMAIL/ADMIN_PASSWORD in environment');
    process.exit(1);
  }
  let user = await User.findOne({ email: ADMIN_EMAIL });
  if (!user) {
    user = await User.create({
      name: ADMIN_NAME || 'Admin',
      email: ADMIN_EMAIL,
      passwordHash: User.hashPassword(ADMIN_PASSWORD),
      role: Roles.ADMIN
    });
    console.log('Admin created:', user.email);
  } else {
    console.log('Admin already exists:', user.email);
  }
  await mongoose.disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
