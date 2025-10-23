import dotenv from 'dotenv';
import mongoose from 'mongoose';
import serverless from 'serverless-http';
import app from './app.js'; // your Express app

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnsphere';

// Database connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Only start local server if NOT running on Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 LearnSphere API running locally on http://localhost:${PORT}`);
  });
}
app.get('/', (req, res) => {
  res.send('Backend API is running!');
});


// Export the serverless handler for Vercel
export const handler = serverless(app);
