const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 파일 경로 설정
const db = new sqlite3.Database('./todos.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite3 database.');
  }
});

module.exports = db;