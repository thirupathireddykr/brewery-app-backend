const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Controllers');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', controllers.registerUser);
router.post('/login', controllers.loginUser);
router.post('/reviews', authMiddleware, controllers.addReview);
router.get('/reviews', controllers.getReviews);

module.exports = router;
