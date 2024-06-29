const db = require('../db/config');

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `;
  await db.runQuery(query);
};

const createUser = async (email, password) => {
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  await db.runQuery(query, [email, password]);
};

const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  return db.getQuery(query, [email]);
};

module.exports = {
  createUserTable,
  createUser,
  getUserByEmail
};
