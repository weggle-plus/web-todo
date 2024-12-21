const db = require("./db");

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(200) NOT NULL,
      done BOOLEAN NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      user_id TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      }
      console.log("todos Table is ready");
    }
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,         
    password TEXT NOT NULL,                   
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP  
    );
  `,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      }
    }
  );
});
