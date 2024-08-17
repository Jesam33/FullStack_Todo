import mongoose from "mongoose";

export async function connectToMongoDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to Database");
  } catch (error: unknown) {
    console.error("Error connecting to Database", error);
  }
}
