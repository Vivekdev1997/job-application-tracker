const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [120, "Company name cannot exceed 120 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      maxlength: [120, "Position cannot exceed 120 characters"],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [120, "Location cannot exceed 120 characters"],
    },
    salary: {
      type: String,
      trim: true,
      maxlength: [80, "Salary cannot exceed 80 characters"],
    },
    jobUrl: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);

