import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Todo from "@/model/todoModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { body } = req;

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
      });
    }

    const alreadyExisting = await Todo.findOne({ todo: body.todo });

    if (alreadyExisting) {
      return res.json({
        status: 400,
        error: "This todo already exists",
      });
    }

    const newTodo = new Todo({
      todo: body.todo,
    });

    await newTodo.save();

    return res.json({ status: 201, data: newTodo });
  } catch (error: unknown) {
    console.error("Error getting todos:", error);
    return res.json({
      status: 500,
      message: (error as Error).message || "Internal Server Error",
    });
  }
}
