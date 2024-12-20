const sqlite3 = require("sqlite3").verbose();

// 운영체제마다 파일 경로의 형식이 다른 점을 보완하기 위한 JS 내장 모듈
const path = require("path");

// 절대 경로로 데이터베이스 파일 경로 설정
const dbPath = path.join(__dirname, "todos.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error("Error opening database:", err.message);
  return console.log(`Connected to SQLite3 database. at ${dbPath}`);
});

module.exports = db;
