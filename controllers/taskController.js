const Task = require("../models/taskModel");
const asyncHandler = require("express-async-handler");

const getAllTasks = asyncHandler(async (req, res) => {
  console.log("getTask ", req.user);
  // const tasks = await Task.findById(req.user._id);
  const tasks = await Task.find({ user: req.user._id }).sort("order");
  console.log("tasks", tasks);
  res.status(200).json(tasks);
});

const createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;
  console.log("create_task ", req.body);
  console.log("create_task1 ", req.user);
  if (!title) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const task = await Task.create({
    title,
    user: req.user,
  });

  res.status(201).json(task);
});

const taskOrderUpdate = asyncHandler(async (req, res) => {
  const updatedTasks = req.body;
  updatedTasks.map(async (task, index) => {
    await Task.findByIdAndUpdate(task._id, { order: index });
  });
  res.status(200).json({ message: "Task Order updated Successfully" });
});

const updateTaskTitle = asyncHandler(async (req, res) => {
  const id = req.params.taskId;
  const updatedTask = await Task.findByIdAndUpdate(
    { _id: id, user: req.user._id },
    { title: req.body.title },
    {
      new: true,
    }
  );
  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  // console.log("deleteTask: ", req.params);
  const id = req.params.taskId;
  const task = await Task.findById(id);
  if (!task) {
    res.status(404);
    throw new Error("task not found");
  }
  await task.deleteOne();
  res.status(200).json(task);
});

module.exports = {
  getAllTasks,
  createTask,
  taskOrderUpdate,
  updateTaskTitle,
  deleteTask,
};
