const User = require('../models/userModel');

// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar que todos los campos estén presentes
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya está registrado' });
    }

    // Crear nuevo usuario
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

module.exports = { registerUser };
