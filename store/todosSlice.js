import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "./axiosinstance";

export const fetchTodos = createAsyncThunk('Todos/fetchTodos', async () => {
    const res = await axiosinstance.get('/todos')
    return res.data;
});


export const createTodos = createAsyncThunk(
  'todos/createTodos',
  async (todo, { rejectWithValue }) => {
    try {
      const res = await axiosinstance.post('/todos', todo);
      return res.data;
    } catch (error) {
      // Handle specific error responses
      if (error.response && error.response.data) {
        // If the server responded with a status code and data
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        return rejectWithValue('No response from the server');
      } else {
        // Something else happened while setting up the request
        return rejectWithValue(error.message);
      }
    }
  }
);

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        Todos: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // get todo
       .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        })
       .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Todos = action.payload;
        })
       .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        })

        // create todo
        .addCase(createTodos.pending, (state) => {
            state.status = 'loading';
            })
           .addCase(createTodos.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.Todos.push(action.payload);
            })
           .addCase(createTodos.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
}) 

    export const getTodoData = ( state ) => state.todo
    export default todoSlice.reducer;