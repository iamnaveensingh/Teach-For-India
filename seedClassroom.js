import dotenv from "dotenv";
import Classroom from "./model/classroomModel.js";
import connectDB from "./config/db.js";
import data from "./data.js";

dotenv.config();
// connectDB();

const classroomData = async () => {
  await connectDB();
  try {
    // inserting data to db
    await Classroom.insertMany(data);
    console.log("Data seeded successfully");
  } catch (error) {
    console.log("Error in seeding data :", error);
  } 
};

classroomData();
