const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors package
const dotenv = require('dotenv');
const User = require('./models/User');
const Review = require('./models/Review');
const routes = require('./routes/routes');

dotenv.config();

const app = express();

// Enable CORS for all origins (you can restrict this to specific origins)
app.use(cors());

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create tables if they don't exist
(async () => {
  await User.createUserTable();
  await Review.createReviewTable();
})();

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
