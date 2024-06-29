const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Review = require('../models/Review');

const SECRET_KEY = "thirupathireddy";

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.getUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.createUser(email, hashedPassword);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addReview = async (req, res) => {
  try {
    const { rating, description, userName, postId } = req.body;
    await Review.addReview(rating, description, userName, postId);
    res.status(201).json({ message: 'Review added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const { postId } = req.query;
    const reviews = await Review.getReviewsByPostId(postId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  addReview,
  getReviews
};
