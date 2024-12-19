import { StatusCodes } from "http-status-codes";
import { connection } from "../databases/mariadb";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { TABLES, TASKS } from "../constants/databaseInfo";

export function createTask(req: Request, res: Response) {
  const { start_date, subject } = req.body;

  const sql = `INSERT INTO ${TABLES.TASKS} (${TASKS.START_DATE}, ${TASKS.SUBJECT}) VALUES (?, ?)`;
  const values = [start_date, subject];

  connection.query<ResultSetHeader>(sql, values, (err, result) => {
    if (err !== null) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST);
      return;
    }

    res.status(StatusCodes.CREATED).end();
  });
}

export function getAllTasks(req: Request, res: Response) {
  const { start_date } = req.query;

  // const sql = `SELECT * FROM ${TABLES.TASKS} WHERE ${TASKS.START_DATE}=?`;
  const sql = `SELECT * FROM ${TABLES.TASKS}`;
  const values = [start_date];

  connection.query<RowDataPacket[]>(sql, values, (err, result) => {
    const tasks = result;

    if (err !== null) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    if (tasks.length === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    const tasksObject = {
      tasks: tasks,
    };

    res.status(StatusCodes.OK).json(tasksObject).end();
  });
}

export function updateTask(req: Request, res: Response) {
  const { id, subject, complete } = req.body;

  const sql = `UPDATE ${TABLES.TASKS} SET ${TASKS.SUBJECT}=?, ${TASKS.COMPLETE}=? WHERE ${TASKS.ID}=?`;
  const values = [subject, complete, id];

  connection.query<ResultSetHeader>(sql, values, (err, result) => {
    const task = result;

    if (err !== null) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    if (task.affectedRows === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    res.status(StatusCodes.OK).end();
  });
}

export function deleteTask(req: Request, res: Response) {
  const { id } = req.body;
  const sql = `DELETE FROM ${TABLES.TASKS} WHERE ${TASKS.ID}=?`;
  const values = [id];

  connection.query<ResultSetHeader>(sql, values, (err, result) => {
    const task = result;

    if (err !== null) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    if (task.affectedRows === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    res.status(StatusCodes.OK).end();
  });
}
