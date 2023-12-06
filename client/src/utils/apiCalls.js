import { createApiThunk } from "../store/createApiThunk";
import api from "../instance/api";

// ---> API INITIALIZATION SEQUENCE
// ACTION NAME
// APICALL
// SUCCESS MESSAGE : STRING | FUNCTION
// SUCCESS RESPONSE
// ERROR MESSAGE

// Function to create a task using the API
export const createTask = createApiThunk(
  "create/task",
  (requestData) => api.post("/create-task", requestData),
  "Task created successfully",
  (response) => response.data,
  (error) =>
    error.response?.data?.message || error.message || "An error occurred."
);

// Function to fetch tasks using the API
export const fetchTasks = createApiThunk(
  "fetch/tasks",
  () => api.get("/tasks"),
  "", // No explicit success notification needed for task fetching
  (response) => response.data,
  (error) =>
    error.response?.data?.message || error.message || "An error occurred."
);

// Function to update a task using the API
export const updateTask = createApiThunk(
  "update/task",
  (reqData) => api.put(`/update-task/${reqData.id}`, reqData),
  "Task updated successfully",
  (response) => response.data,
  (error) =>
    error.response?.data?.message || error.message || "An error occurred."
);

// Function to delete a task using the API
export const deleteTask = createApiThunk(
  "delete/task",
  (id) => api.delete(`/delete-task/${id}`),
  "Task deleted successfully",
  (response) => response.data,
  (error) =>
    error.response?.data?.message || error.message || "An error occurred."
);
