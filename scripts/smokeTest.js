import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from '../src/app.js';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnsphere';

async function main() {
  try {
    await mongoose.connect(uri);
    console.log('DB OK');
    const server = app.listen(0, () => {
      const { port } = server.address();
      console.log('App started on port', port);
      server.close(() => mongoose.disconnect());
    });
  } catch (e) {
    console.error('Smoke test failed', e);
    process.exit(1);
  }
}

main();
