const Transaction = require('../models/inventory.model');
const Product = require('../models/product.model');
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Function to send low stock alert
const sendLowStockAlert = async (product, currentStock) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: product.user.email,
            subject: `Low Stock Alert - ${product.title}`,
            html: `
                <h1>Low Stock Alert</h1>
                <p>Product: ${product.title}</p>
                <p>Current Stock: ${currentStock}</p>
                <p>Please restock soon to avoid stockout.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Low stock alert email sent for ${product.title}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Create new transaction and update product stock
exports.createTransaction = async (req, res) => {
    try {
        const { productId, type, quantity, note } = req.body;

        // Find the product
        const product = await Product.findById(productId).populate('user');
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Calculate new stock level
        let newQuantity = product.quantity;
        if (type === 'add') {
            newQuantity += quantity;
        } else if (type === 'remove') {
            if (product.quantity < quantity) {
                return res.status(400).json({
                    success: false,
                    message: 'Insufficient stock'
                });
            }
            newQuantity -= quantity;
        }

        // Create transaction
        const transaction = await Transaction.create({
            product: productId,
            user: req.user.id,
            type,
            quantity,
            note
        });

        // Update product quantity
        product.quantity = newQuantity;
        await product.save();

        // Check for low stock (threshold set to 10)
        if (newQuantity <= 10) {
            await sendLowStockAlert(product, newQuantity);
        }

        res.status(201).json({
            success: true,
            transaction,
            newStockLevel: newQuantity,
            lowStockAlert: newQuantity <= 10
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get transaction history for a product
exports.getProductTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ product: req.params.productId })
            .populate('product', 'title')
            .populate('user', 'name')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all transactions for a user
exports.getUserTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id })
            .populate('product', 'title')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 