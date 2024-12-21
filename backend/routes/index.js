const {addTodo, getTodos, removeTodo, editTodo} = require('../controllers/indexController');
const {body} = require('express-validator');
const {checkValidateError} = require('../middleware/validator');
const express = require('express');
const router = express.Router();

router.use(express.json());

//add a todo item
router.post('/', [
    body('title').notEmpty().withMessage('add todo: validation error - title'),
    checkValidateError
], addTodo);

//get all todo and done items
router.get('/', getTodos);

//delete a single todo item
router.delete('/:id', removeTodo);

//edit a single todo item
router.put('/:id', [
    body('title').optional().notEmpty().withMessage('edit todo: validation error - title'),
    body('status').optional().isIn([0, 1]).withMessage('edit todo: validation error - status'),
    checkValidateError
], editTodo);

module.exports = router;
