const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createProduct } = require('../controllers/product.controller');
const Product = require('../models/product.model');

// Create product route
router.post('/', protect, createProduct);

// Get user's products
router.get('/user', protect, async (req, res) => {
  try {
    console.log('User ID:', req.user._id); // Debug log
    const products = await Product.find({ user: req.user._id });
    console.log('Found products:', products); // Debug log
    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

module.exports = router;