const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const {
  getAllTasks,
  createTask,
  taskOrderUpdate,
  updateTaskTitle,
  deleteTask,
} = require("../controllers/taskController.js");
router
  .route("/")
  .get(authMiddleware, getAllTasks)
  .post(authMiddleware, createTask)
  .put(taskOrderUpdate);

router
  .route("/:taskId")
  .patch(authMiddleware, updateTaskTitle)
  .delete(authMiddleware, deleteTask);

module.exports = router;
