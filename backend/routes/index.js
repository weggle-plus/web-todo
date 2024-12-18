const {addTodo, getTodos, removeTodo, editTodo} = require('../controller/indexController');
var express = require('express');
var router = express.Router();

router.use(express.json());

//add a todo item
router.post('/', addTodo);

//get all todo and done items
router.get('/', getTodos);

//delete a single todo item
router.delete('/:id', removeTodo);

//edit a single todo item
router.put('/:id', editTodo);

module.exports = router;
