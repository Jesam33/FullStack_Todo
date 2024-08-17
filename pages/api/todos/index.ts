import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Todo from "@/model/todoModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
      });
    }

    const allTodos = await Todo.find({});

    return res.json({ status: 200, data: allTodos });
  } catch (error: unknown) {
    console.error("Error getting todos:", error);
    return res.json({
      status: 500,
      message: (error as Error).message || "Internal Server Error",
    });
  }
}
