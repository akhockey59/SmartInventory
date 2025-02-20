const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  logout, 
  getProfile 
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

// Define routes with their respective controller functions
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(protect, getProfile);

module.exports = router; 