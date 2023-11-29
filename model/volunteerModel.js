import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  availability: [
    {
      type: [String],
    },
  ],
  allocatedClassroomId: {
    type: String,
    required: true,
    default: "Not Allocated Yet",
  },
});

export default mongoose.model("volunteers", volunteerSchema);
