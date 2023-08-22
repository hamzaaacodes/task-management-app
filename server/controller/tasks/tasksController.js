const tasksModel = require("../../models/tasks/tasksModel");

// Create
const createTask = async (request, response) => {
  const data = await tasksModel.create(request.body);
  response.send("Task added successfully!");

};

// Get all
const getAllTasks = async (request, response) => {
  const id = request.header("userId")
const allTasks = await tasksModel.find({userId: id});
  response.json(allTasks);
};

// Get single task
const getTask = async (request, response) => {
  const task = await tasksModel.findById(request.params.id);
  if (task) {
    response.send({ message: "Task found!", foundTask: task });
  } else {
    response.send("Task not found!");
  }
};

// Delete
const deleteTask = async (request, response) => {
  const deletedTask = await tasksModel.findByIdAndDelete(request.params.id);
  if (deletedTask) {
    response.json({
      message: "Task deleted successfully!",
      taskDeleted: deletedTask,
    });
  } else {
    response.send("Task not found!");
  }
};

// Update
const updateTask = async (request, response) => {
  const updatedTask = await tasksModel.findByIdAndUpdate(
    request.params.id,
    request.body
  );
  if (updatedTask) {
    response.json({
      message: "Task updated successfully!",
      taskUpdated: updatedTask,
    });
  } else {
    response.send("Task not found!");
  }
};

module.exports = { createTask, getAllTasks, getTask, deleteTask, updateTask };
