// Temporary empty middleware for testing
const protect = (req, res, next) => {
  console.log('Auth middleware bypassed for testing');
  next();
};

module.exports = { protect };