import dotenv from "dotenv";
import adminModel from "./model/adminModel.js";
import bcrypt from "bcrypt";
import connectDB from "./config/db.js";

dotenv.config();

// Seed the admin data in the database
const seedAdminData = async () => {
 
  try {
    await connectDB()

    const adminExists = await adminModel.exists({ isAdmin: true });
    if (!adminExists) {
      // hashing the password for privacy
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("admin@1234", saltRounds);
      const adminUser = new adminModel({
        name: "Admin",
        email: "admin@admin.com",
        password: hashedPassword,
        isAdmin: true,
      });
      await adminUser.save();
      console.log("Admin Created Successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.log("Error in seeding data:", error);
  } 
};

// Call the seeding function
seedAdminData();
