const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createTransaction,
    getProductTransactions,
    getUserTransactions
} = require('../controllers/transaction.controller');

router.post('/', protect, createTransaction);
router.get('/product/:productId', protect, getProductTransactions);
router.get('/user', protect, getUserTransactions);

module.exports = router;