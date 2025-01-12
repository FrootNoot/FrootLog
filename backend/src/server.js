const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

app.post('/todo', async (req, res) => {
  const { text, text2, completed = false } = req.body;

  try {
    const query = `
      INSERT INTO "toDoItems" (text1, text2, completed)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await db.query(query, [text, text2, completed]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding todo item:', err.stack);
    res.status(500).json({ error: 'Failed to add todo item' });
  }
});

app.get('/todo', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "toDoItems" ORDER BY id ASC;');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching todo items:', err.stack);
    res.status(500).json({ error: 'Failed to fetch todo items' });
  }
});

app.put('/todo/completed/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTodo = await db.query(
      `UPDATE "toDoItems"
       SET completed = $1
       WHERE id = $2
       RETURNING *`,
      [completed, id]
    );

    if (updatedTodo.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo.rows[0]);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Database error' });
  }
});


app.put('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const { text, text2, completed } = req.body;

  try {
    const query = `
      UPDATE "toDoItems"
      SET text1 = $1, text2 = $2, completed = $3
      WHERE id = $4
      RETURNING *;
    `;
    const result = await db.query(query, [text, text2, completed, id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Todo item not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating todo item:', err.stack);
    res.status(500).json({ error: 'Failed to update todo item' });
  }
});

app.delete('/todo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      DELETE FROM "toDoItems"
      WHERE id = $1
      RETURNING *;
    `;
    const result = await db.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Todo item not found' });
    }
    res.status(200).json({ message: 'Todo item deleted successfully' });
  } catch (err) {
    console.error('Error deleting todo item:', err.stack);
    res.status(500).json({ error: 'Failed to delete todo item' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
