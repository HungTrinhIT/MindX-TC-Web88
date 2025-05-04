import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    // Move to ENV file later on
    const URI = `mongodb://localhost:27017/lesson06-web88`;
    await mongoose.connect(URI);
    console.log('Database connected successfully!!!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
