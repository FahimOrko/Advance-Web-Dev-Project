import colors from "colors";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB database ".bgCyan.white.bold);
  } catch (e) {
    console.log(`Mongo DB Connection error - ${e.message}`.bgRed.white);
  }
};

export default connectDB;
