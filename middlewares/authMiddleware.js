const jwt = require('jsonwebtoken');
const SECRET_KEY = "thirupatireddy";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    const decoded = await jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
