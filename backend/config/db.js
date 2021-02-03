import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    const connector = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(
      `[MongoDB] Connected ${connector.connection.host}`.green.underline
    );
  } catch (error) {
    console.log(`[ERROR | MongoDB] ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
