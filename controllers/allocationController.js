import mongoose from "mongoose";
import volunteerModel from "../model/volunteerModel.js";
import Classroom from "../model/classroomModel.js";

const checkRegistrationThreshold = async () => {
  try {
    const registrationCount = await volunteerModel.countDocuments();
    if (registrationCount < 20) {
      console.log("Less than 20 registration");
    } else {
      return registrationCount >= 20;
    }
  } catch (error) {
    console.log("Error in Checking registration:", error);
  }
};

const allotingVolunteer = async () => {
  try {
    if (await checkRegistrationThreshold()) {
      const classroomData = await Classroom.find();
      for (const classroom of classroomData) {
        await volunteerModel.updateMany(
          {
            language: { $in: classroom.languageRequirement },
          },
          { allocatedClassroomId: classroom.classroomID }
        );
      }
    }
  } catch (error) {
    console.log("Error in Alloting Volunteers:", error);
  }
};
const deallocateVolunteer = async () => {
  try {
    const classroomData = await Classroom.find();
    for (const classroom of classroomData) {
      await volunteerModel.updateMany(
        {
          language: { $in: classroom.languageRequirement },
        },
        { allocatedClassroomId: "Not Allocated Yet" }
      );
    }
  } catch (error) {
    console.log("Error in Alloting Volunteers:", error);
  }
};

export const initiateAllocation = async (req, res) => {
  try {
    await allotingVolunteer();

    res.status(200).send({
      success: true,
      message: "Allocated",
    });
  } catch (error) {
    console.log("Error in intiating process:", error);
  }
};

export const unallocated = async (req, res) => {
  try {
    await deallocateVolunteer();
    res.status(200).send({
      success: true,
      message: "unallocated",
    });
  } catch (error) {
    console.log("Error in intiating process:", error);
  }
};
