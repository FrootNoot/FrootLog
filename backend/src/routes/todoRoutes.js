// src/routes/todoRoutes.js
const express = require('express');
const { getTodos, addTodo, deleteTodo } = require('../controllers/todoController');
const router = express.Router();

router.get('/todos', getTodos);
router.post('/todos', addTodo);
router.delete('/todos/:id', deleteTodo);

module.exports = router;
