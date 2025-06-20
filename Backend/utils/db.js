import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {

    //uses MONGO_URI from enviroment variables to connect

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {

    //Handles connection errors and exits process if failed

    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);   // Exit with failure code
  }
};

export default connectDB;