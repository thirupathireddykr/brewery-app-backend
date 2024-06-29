const db = require('../db/config');

const createReviewTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rating INTEGER NOT NULL,
      description TEXT NOT NULL,
      userName TEXT NOT NULL,
      postId INTEGER NOT NULL
    )
  `;
  await db.runQuery(query);
};

const addReview = async (rating, description, userName, postId) => {
  const query = 'INSERT INTO reviews (rating, description, userName, postId) VALUES (?, ?, ?, ?)';
  await db.runQuery(query, [rating, description, userName, postId]);
};

const getReviewsByPostId = async (postId) => {
  const query = 'SELECT * FROM reviews WHERE postId = ?';
  return db.allQuery(query, [postId]);
};

module.exports = {
  createReviewTable,
  addReview,
  getReviewsByPostId
};
