// src/controllers/TodoController.js
const pool = require('../db');

// Fetch all todos
exports.getTodos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new todo
exports.addTodo = async (req, res) => {
  const { text, text2, completed } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO todos (text, text2, completed) VALUES ($1, $2, $3) RETURNING *',
      [text, text2, completed || false]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
