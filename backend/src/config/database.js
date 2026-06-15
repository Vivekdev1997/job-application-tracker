const mongoose = require("mongoose");

const connectDatabase = async (uri) => {
  if (!uri) {
    throw new Error("MONGODB_URI is required");
  }

  await mongoose.connect(uri);
  console.log("MongoDB connected");
};

module.exports = connectDatabase;

