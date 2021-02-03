import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connector = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected ${connector.connection.host}`);
  } catch (error) {
    console.log(`[ERROR | MongoDB] ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
