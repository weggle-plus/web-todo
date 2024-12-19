import { body } from "express-validator";
import { validationErrorHandler } from "./validationErrorHandler";
import { TASKS } from "../constants/databaseInfo";

const validateId = body(TASKS.ID)
  .notEmpty()
  .isInt()
  .withMessage("Valid id require.");

const validateStartDate = body(TASKS.START_DATE)
  .notEmpty()
  .isDate()
  .withMessage("Valid start_date require.");

const validateSubject = body(TASKS.SUBJECT)
  .notEmpty()
  .withMessage("Valid subject require.");

const validateComplete = body(TASKS.COMPLETE)
  .notEmpty()
  .isBoolean()
  .withMessage("Valid complete require.");

export const createTaskValidators = [
  validateStartDate,
  validateSubject,
  validationErrorHandler,
];

export const getAllTasksValidators = [
  validateStartDate,
  validationErrorHandler,
];

export const updateTaskValidators = [
  validateId,
  validateSubject,
  validateComplete,
  validationErrorHandler,
];

export const deleteTaskValidators = [validateId, validationErrorHandler];
