const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

exports.login = async (req, res) => {
  const { password } = req.body;

  const storedPassword = process.env.ADMIN_PASSWORD;
  if (password === storedPassword) {
    res.status(200).json({ message: 'Authenticated successfully' });
  } else {
    res.status(401).json({ message: 'Incorrect password' });
  }
};
