import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let res = await mongoose.connect(process.env.MONGO_URI);
    if (res) {
      console.log("mongodb connected");
    }
  } catch (error) {
    console.log("Error in connecting to db", error.message);
  }
};

export default connectDB;
