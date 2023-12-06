const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Create Task route
router.post("/create-task", taskController.createTask);

// Fetch all Tasks route
router.get("/tasks", taskController.fetchTasks);

// Update Task route
router.put("/update-task/:id", taskController.updateTask);

// Delete Task route
router.delete("/delete-task/:id", taskController.deleteTask);

module.exports = router;
