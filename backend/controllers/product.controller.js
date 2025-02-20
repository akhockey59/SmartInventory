const Product = require('../models/product.model');
const QRCode = require('qrcode');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create new product
exports.createProduct = async (req, res) => {
    try {
        const { title, description, quantity, category } = req.body;

        // Generate QR code data URL
        const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify({
            title,
            description,
            quantity,
            category,
            createdAt: new Date()
        }));

        let qrCodeUrl = '';
        let qrCodePublicId = '';

        // Only try to upload to Cloudinary if credentials are configured
        if (process.env.CLOUDINARY_API_KEY) {
            try {
                // Upload QR code to Cloudinary
                const uploadResponse = await cloudinary.uploader.upload(qrCodeDataUrl, {
                    folder: 'product-qrcodes'
                });
                qrCodeUrl = uploadResponse.secure_url;
                qrCodePublicId = uploadResponse.public_id;
            } catch (cloudinaryError) {
                console.error('Cloudinary upload error:', cloudinaryError);
                // Continue without Cloudinary if upload fails
            }
        }

        // Create product with or without QR code URL
        const product = await Product.create({
            user: req.user._id,
            title,
            description,
            quantity,
            category,
            qrCode: qrCodeUrl,
            qrCodePublicId: qrCodePublicId
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
