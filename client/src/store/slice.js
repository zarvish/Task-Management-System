import { createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../utils/apiCalls";

const initialState = {
  data: {
    tasks: [],
  },
  loading: {
    createTask: false,
    updateTask: false,
  },
};

export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //create a new Task
      .addCase(createTask.pending, (state, action) => {
        state.loading.createTask = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading.createTask = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading.createTask = false;
      })

      //update a new task
      .addCase(updateTask.pending, (state, action) => {
        state.loading.updateTask = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading.updateTask = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading.updateTask = false;
      })

      //delete a new task
      .addCase(deleteTask.pending, (state, action) => {
        state.loading.deleteTask = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading.deleteTask = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading.deleteTask = false;
      })

      //fetch tasks
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.data.tasks = action.payload;
      });
  },
});

export default slice.reducer;
