import dotenv from "dotenv";
import express from "express";
// import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index";
import tasksRouter from "./routes/tasks";

dotenv.config();
const app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/tasks", tasksRouter);

app.listen(process.env.PORT);
console.log("express listen");
