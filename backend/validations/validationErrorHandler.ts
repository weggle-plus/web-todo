import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export function validationErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = validationResult(req);

  if (error.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json(error).end();
    return;
  }

  next();
}
