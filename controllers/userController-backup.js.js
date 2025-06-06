// Temporary empty controllers for testing
const registerUser = (req, res) => {
  res.json({ message: 'registerUser working' });
};

const loginUser = (req, res) => {
  res.json({ message: 'loginUser working' });
};

const updateUser = (req, res) => {
  res.json({ message: 'updateUser working' });
};

const verifyToken = (req, res) => {
  res.json({ message: 'verifyToken working' });
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  verifyToken
};