const sqlite3 = require("sqlite3").verbose();

const path = require("path");

const dbPath = path.join(__dirname, "todos.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error("Error opening database:", err.message);
  return console.log(`Connected to SQLite3 database. at ${dbPath}`);
});

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON;", (err) => {
    if (err) {
      console.error("Error enabling foreign keys: ", err.message);
    } else {
      console.log("Foreign key constraint is enabled");
    }
  });
});

module.exports = db;
