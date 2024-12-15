const db = require('./db');

// TO DO 테이블 생성
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(200) NOT NULL,
      done BOOLEAN NOT NULL DEFAULT 0
    );
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created successfully.');
    }
  });
});
