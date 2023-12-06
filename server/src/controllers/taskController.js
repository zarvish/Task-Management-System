const Task = require("../models/Task");

// Create Task route handler
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    // Check if all required fields are provided
    if (!title || !description || !dueDate) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    // Ensure the due date is not in the past
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const receivedDueDate = new Date(dueDate).setHours(0, 0, 0, 0);
    if (receivedDueDate < currentDate) {
      return res
        .status(400)
        .json({ success: false, message: "Due date cannot be in the past" });
    }

    // Create a new task using the Task model and save it
    const task = new Task({
      title,
      description,
      dueDate,
      status: "Not Completed",
    });
    await task.save();

    res
      .status(201)
      .json({ success: true, message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all Tasks route handler
exports.fetchTasks = async (req, res) => {
  try {
    // Fetch all tasks in descending order of creation time
    const tasks = await Task.find().sort({ dueDate: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task route handler
exports.updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    // Find the task by ID
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // Ensure the due date is not in the past
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const receivedDueDate = new Date(dueDate).setHours(0, 0, 0, 0);
    if (receivedDueDate < currentDate) {
      return res
        .status(400)
        .json({ success: false, message: "Due date cannot be in the past" });
    }

    // Update task properties if provided in the request body
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

    await task.save();

    res
      .status(200)
      .json({ success: true, message: "Task Updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Task route handler
exports.deleteTask = async (req, res) => {
  try {
    // Find the task by ID
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Delete the task by ID
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
