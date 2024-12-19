import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/taskController";
import {
  createTaskValidators,
  deleteTaskValidators,
  getAllTasksValidators,
  updateTaskValidators,
} from "../validations/taskValidator";
export const router = express.Router();
export default router;

router
  .route("/")
  .post(createTaskValidators, createTask)
  .get(getAllTasks)
  .put(updateTaskValidators, updateTask)
  .delete(deleteTaskValidators, deleteTask);
