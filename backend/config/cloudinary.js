const cloudinary = require('cloudinary').v2;

if (process.env.CLOUDINARY_API_KEY) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
} else {
    console.warn('Cloudinary credentials not found. QR code upload will be disabled.');
}

module.exports = cloudinary;