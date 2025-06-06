// Temporary empty controllers for testing
const createProduct = (req, res) => {
  res.json({ message: 'createProduct working' });
};

const getAllProducts = (req, res) => {
  res.json({ message: 'getAllProducts working' });
};

const getProductById = (req, res) => {
  res.json({ message: 'getProductById working' });
};

const updateProduct = (req, res) => {
  res.json({ message: 'updateProduct working' });
};

const deleteProduct = (req, res) => {
  res.json({ message: 'deleteProduct working' });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};