import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Todo from "@/model/todoModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ status: 405, message: "Method Not Allowed" });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ status: 400, message: "ID is required" });
    }

    const { body } = req;
    if (!body.todo) {
      return res
        .status(400)
        .json({ status: 400, message: "Todo text is required" });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { todo: body.todo },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ status: 404, message: "Todo not found" });
    }

    return res.status(200).json({ status: 200, data: updatedTodo });
  } catch (error: unknown) {
    console.error("Error updating todo:", error);
    return res.status(500).json({
      status: 500,
      message: (error as Error).message || "Internal Server Error",
    });
  }
}
