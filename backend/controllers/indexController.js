const {StatusCodes} = require('http-status-codes');
const {addTodoService, getTodoService, removeTodoService, editTodoService} = require('../services/todoService');

const addTodo = async (req, res) => {
    const {title} = req.body;

    try{
        const result = await addTodoService(title);
        return res.status(StatusCodes.CREATED).json({
            id: result.insertId,
            title: title,
            status: 0
        });
    } catch(err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
};

const getTodos = async (req, res) => {
    try{
        const result = await getTodoService();
        return res.status(StatusCodes.OK).json(result);
    } catch(err) {
        console.error(err);
        if(err.message === 'not found'){
            return res.status(StatusCodes.NOT_FOUND).end();
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
};

const removeTodo = async (req, res) => {
    const {id} = req.params;

    try{
        const result = await removeTodoService(id);
        return res.status(StatusCodes.OK).json(result);
    } catch(err) {
        console.error(err);
        if(err.message === 'not found'){
            return res.status(StatusCodes.NOT_FOUND).end();
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
};

const editTodo = async (req, res) => {
    const {id} = req.params;
    const {title, status} = req.body;

    try{
        const result = await editTodoService(id, title, status);
        return res.status(StatusCodes.OK).json({
            id: id,
            title: title,
            status: status
        });
    } catch(err) {
        console.error(err);
        if(err.message === 'not found'){
            return res.status(StatusCodes.NOT_FOUND).end();
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
};

module.exports = {
    addTodo,
    getTodos,
    removeTodo,
    editTodo
}