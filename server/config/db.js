import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/asiamart');
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Warning: Make sure your local MongoDB service is started (e.g. running "mongod") to allow data persistence!');
    // Allow graceful fallback so dbHelper can use local JSON DB
    console.warn('⚠️ Falling back to local data storage via dbHelper.');
  }
};
