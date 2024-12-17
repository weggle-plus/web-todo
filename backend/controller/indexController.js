const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const addTodo = (req, res) => {
    const {title} = req.body;

    let sql = `INSERT INTO todo (title, status) VALUES (?, 0)`;
    let values = [title];
    
    conn.query(sql, values,
        (err, results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            } else {
                return res.status(StatusCodes.CREATED).json({
                    id: results.insertId,
                    title: title,
                    status: 0
                });
            }
        }
    );
};

const getTodos = (req, res) => {
    let sql = 'SELECT * FROM todo';

    conn.query(sql,
        (err, results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            } else {
                if(results.length){
                    return res.status(StatusCodes.OK).json(results);
                } else {
                    return res.status(StatusCodes.NOT_FOUND).end();
                }
            }
        }
    );
};

const removeTodo = (req, res) => {
    const {id} = req.params;

    let sql = `DELETE FROM todo WHERE id = ?`;
    let values = [id];
    
    conn.query(sql, values,
        (err, results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            } else {
                if(results.affectedRows != 0){
                    return res.status(StatusCodes.OK).json(results);
                } else {
                    return res.status(StatusCodes.NOT_FOUND).end();
                }
            }
        }
    );
};

const editTodo = (req, res) => {
    const {id} = req.params;
    const {title, newStatus} = req.body;

    let sql = ``;
    let values = [];

    if(title){
        sql = `UPDATE todo SET title = ? WHERE id = ?`;
        values = [title, id];
    } else {
        sql = `UPDATE todo SET status = ? WHERE id = ?`
        values = [newStatus, id];
    }
    
    conn.query(sql, values,
        (err, results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            } else {
                if(results.affectedRows != 0){
                    return res.status(StatusCodes.OK).json({
                        id: id,
                        title: title,
                        status: newStatus
                    });
                } else {
                    return res.status(StatusCodes.NOT_FOUND).end();
                }
            }
        }
    );
};

module.exports = {
    addTodo,
    getTodos,
    removeTodo,
    editTodo
}