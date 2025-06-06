const Product = require('../models/productModel');

// @desc    Crear un nuevo producto
// @route   POST /api/product/create
// @access  Privado
const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Validación básica
    if (!name || !price) {
      return res.status(400).json({ message: 'Nombre y precio son obligatorios' });
    }

    // Crear el producto asociado al usuario autenticado
    const product = new Product({
      name,
      description,
      price,
      user: req.user._id, // Asociar el producto al usuario que lo creó
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// @desc    Obtener todos los productos del usuario
// @route   GET /api/products/readall
// @access  Privado
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/products/readone/:id
// @access  Privado
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// @desc    Actualizar un producto
// @route   PUT /api/products/update/:id
// @access  Privado
const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const product = await Product.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// @desc    Eliminar un producto
// @route   DELETE /api/products/delete/:id
// @access  Privado
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await product.deleteOne();
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};