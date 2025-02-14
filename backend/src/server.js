const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const exerciseRoutes = require('./routes/exerciseRoutes');

app.use('/exercises', exerciseRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
