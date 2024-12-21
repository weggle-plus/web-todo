const conn = require('../mariadb');

const addTodoService = (title) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO todo (title, status) VALUES (?, 0)`;
        let values = [title];
    
        conn.query(sql, values,
            (err, results) => {
                if(err){
                    return reject(err);
                }
                resolve(results);
            }
        );
    });
};

const getTodoService = () => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM todo';

        conn.query(sql,
            (err, results) => {
                if(err){
                    return reject(err);
                }
                if(results.length === 0){
                    return reject(new Error('not found'));
                }
                resolve(results);
            }
        );
    });
};

const removeTodoService = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM todo WHERE id = ?`;
        let values = [id];
    
        conn.query(sql, values,
            (err, results) => {
                if(err){
                    return reject(err);
                }
                if(results.affectedRows === 0){
                    return reject(new Error('not found'));
                }
    
                resolve(results);
            }
        );
    });
};

const editTodoService = (id, title, status) => {
    return new Promise((resolve, reject) => {
        let sql = ``;
        let values = [];
        
        if(title){
            sql = `UPDATE todo SET title = ? WHERE id = ?`;
            values = [title, id];
        } else {
            sql = `UPDATE todo SET status = ? WHERE id = ?`
            values = [status, id];
        }

        conn.query(sql, values,
            (err, results) => {
                if(err){
                    return reject(err);
                }
                if(results.affectedRows === 0){
                    return reject(new Error('not found'));
                }
                resolve(results);
            }
        );
    });
};

module.exports = {
    addTodoService,
    getTodoService,
    removeTodoService,
    editTodoService
};