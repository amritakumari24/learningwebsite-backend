import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';
import serverless from 'serverless-http';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnsphere';

// Database connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Local development (only runs when not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 LearnSphere API running locally on http://localhost:${PORT}`);
  });
}

// Export for Vercel (serverless)
export default serverless(app);
