import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MongoKey);
    console.log(
      "Connected to the MongoDB database"
    );
  } catch (error) {
    console.log(`Error in connecting to the Database:`, error);
  }
};

export default connectDB;
