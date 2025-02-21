const Product = require('../models/product.model');
const QRCode = require('qrcode');
const cloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');

// Create new product
exports.createProduct = async (req, res) => {
    try {
        const { title, description, quantity, category } = req.body;

        // Generate unique product identifier
        const productId = new mongoose.Types.ObjectId();
        
        // Create QR code content
        const qrContent = JSON.stringify({
            id: productId,
            title,
            category
        });

        // Generate QR code
        const qrCodeDataUrl = await QRCode.toDataURL(qrContent);

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(qrCodeDataUrl, {
            folder: 'product-qrcodes',
            public_id: `qr_${productId}`,
        });

        // Create product
        const product = await Product.create({
            _id: productId,
            user: req.user._id,
            title,
            description,
            quantity,
            category,
            qrCode: uploadResult.secure_url,
            qrCodePublicId: uploadResult.public_id
        });

        // Check if quantity is low
        if (quantity <= 10) {
            console.log(`Low stock alert for ${title}: ${quantity} items remaining`);
        }

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Product creation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create product'
        });
    }
};

// Get all products for a user
exports.getUserProducts = async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id });
        
        // Check for low stock items
        const lowStockProducts = products.filter(product => product.quantity <= 10);
        
        res.status(200).json({
            success: true,
            products,
            lowStockAlerts: lowStockProducts.map(product => ({
                productId: product._id,
                title: product.title,
                quantity: product.quantity
            }))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update product quantity
exports.updateProductQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if user owns the product
        if (product.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this product'
            });
        }

        product.quantity = quantity;
        await product.save();

        // Check if quantity is now low
        if (quantity <= 10) {
            // Implement notification system here
            console.log(`Low stock alert for ${product.title}: ${quantity} items remaining`);
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete product and its QR code from Cloudinary
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if user owns the product
        if (product.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this product'
            });
        }

        // Delete QR code from Cloudinary
        if (product.qrCodePublicId) {
            await cloudinary.uploader.destroy(product.qrCodePublicId);
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Product and QR code deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single product by QR code
exports.getProductByQR = async (req, res) => {
    try {
        const { qrCode } = req.params;
        const product = await Product.findOne({ qrCode });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
