import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define types for Todo and state
interface Todo {
  _id: string;
  todo: string;
  status: string;
}

interface CrudTodoState {
  todoItems: Todo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  response: string;
}

interface EditTodoPayload {
  editId: string;
  editedValue: string;
}

// Define async thunks with proper typing
export const createTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>("todoOperations/create", async (todo, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "/api/todo",
      { todo },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 20000,
      }
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getTodo = createAsyncThunk<Todo[], void, { rejectValue: string }>(
  "todoOperations/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/todos");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTodo = createAsyncThunk<
  Todo,
  EditTodoPayload,
  { rejectValue: string }
>("todoOperations/edit", async (change, { rejectWithValue }) => {
  try {
    const response = await axios.patch(
      `/api/todos/${change.editId}`,
      { todo: change.editedValue },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 20000,
      }
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteTodo = createAsyncThunk<
  { _id: string },
  string,
  { rejectValue: string }
>("todoOperations/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/todo/${id}`, {
      headers: { "Content-Type": "application/json" },
      timeout: 20000,
    });
    return { _id: id };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Define the initial state
const initialState: CrudTodoState = {
  todoItems: [],
  status: "idle",
  error: null,
  response: "none",
};

const crudOperations = createSlice({
  name: "crudTodo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.status = "succeeded";
        state.todoItems.push(action.payload);
        state.response = "Todo created successfully";
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create todo";
      })
      .addCase(getTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodo.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = "succeeded";
        state.todoItems = action.payload;
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch todos";
      })
      .addCase(editTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.status = "succeeded";
        state.response = "Todo edited successfully";
        const index = state.todoItems.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.todoItems[index] = action.payload;
        }
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to edit todo";
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteTodo.fulfilled,
        (state, action: PayloadAction<{ _id: string }>) => {
          state.status = "succeeded";
          state.response = "Todo deleted successfully";
          state.todoItems = state.todoItems.filter(
            (todo) => todo._id !== action.payload._id
          );
        }
      )
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete todo";
      });
  },
});

export const todos = (state: any) => state.crudTodo;
export default crudOperations.reducer;
