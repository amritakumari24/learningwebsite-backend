import dotenv from 'dotenv';
import mongoose from 'mongoose';
import serverless from 'serverless-http';
import app from './app.js';

dotenv.config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnsphere';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Only start a local server if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 LearnSphere API running locally on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel serverless deployment
export const handler = serverless(app);

