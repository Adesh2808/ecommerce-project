const express = require('express');
const Saved = require('../models/User'); // Using User model
const auth = require('../middleware/auth');
const axios = require('axios');

const router = express.Router();

// Add to saved
router.post('/add/:productId', auth, async (req, res) => {
  const { productId } = req.params;
  try {
    const user = await Saved.findById(req.user.id);
    if (!user.saved.includes(Number(productId))) {
      user.saved.push(Number(productId));
      await user.save();
    }
    res.json({ message: 'Added to saved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove from saved
router.delete('/remove/:productId', auth, async (req, res) => {
  const { productId } = req.params;
  try {
    const user = await Saved.findById(req.user.id);
    user.saved = user.saved.filter(id => id !== Number(productId));
    await user.save();
    res.json({ message: 'Removed from saved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get saved products
router.get('/', auth, async (req, res) => {
  try {
    const user = await Saved.findById(req.user.id);
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data.filter(product => user.saved.includes(product.id));
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;