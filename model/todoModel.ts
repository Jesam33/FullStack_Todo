import mongoose, { Schema, Document, model } from "mongoose";

interface ITodo extends Document {
  todo: string;
  status: string;
}

const TodoSchema: Schema = new Schema({
  todo: { type: String, required: true },
});

export default mongoose.models.Todo || model<ITodo>("Todo", TodoSchema);
