const dotenv = require("dotenv");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("./database/init.js");

const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup")
const cors = require("cors");

dotenv.config();
const app = express();
app.listen(4040);

app.use(
  cors({
    origin: "*",
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/todos", todosRouter);
app.use("/users", usersRouter);
app.use("/signup", signupRouter)
app.use("/", loginRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
