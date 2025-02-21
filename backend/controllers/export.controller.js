const nodemailer = require('nodemailer');
const Product = require('../models/product.model');
const InventoryTransaction = require('../models/inventory.model');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.createExportRequest = async (req, res) => {
  try {
    const {
      productId,
      quantity,
      transportType,
      laborers,
      destination,
      note,
      transportCost,
      laborCost,
      totalCost
    } = req.body;

    // Create inventory transaction
    const transaction = await InventoryTransaction.create({
      product: productId,
      user: req.user._id,
      type: 'remove',
      quantity: parseInt(quantity),
      note: `Export Request - ${note || ''}
             Transport: ${transportType}
             Workers: ${laborers}
             Destination: ${destination}
             Total Cost: ₹${totalCost}`,
      status: 'pending',
      transportType,
      destination,
      laborers: parseInt(laborers),
      transportCost,
      laborCost,
      totalCost
    });

    res.status(201).json({
      success: true,
      transaction
    });
  } catch (error) {
    console.error('Export request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create export request'
    });
  }
};

exports.getExportRequests = async (req, res) => {
  try {
    const transactions = await InventoryTransaction.find({
      type: 'remove'
    })
    .populate('product')
    .populate('user', 'name email')
    .sort('-createdAt');

    res.status(200).json({
      success: true,
      transactions
    });
  } catch (error) {
    console.error('Get export requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch export requests'
    });
  }
};

exports.updateExportRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const transaction = await InventoryTransaction.findById(id)
      .populate('user', 'name email')
      .populate('product', 'title');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Export request not found'
      });
    }

    // Update status
    transaction.status = status;
    await transaction.save();

    // Send email notification
    const emailSubject = `Export Request ${status.charAt(0).toUpperCase() + status.slice(1)}`;
    const emailText = `
      Dear ${transaction.user.name},

      Your export request for ${transaction.product.title} has been ${status}.

      Details:
      - Product: ${transaction.product.title}
      - Quantity: ${transaction.quantity}
      - Transport: ${transaction.transportType}
      - Workers: ${transaction.laborers}
      - Total Cost: ₹${transaction.totalCost}

      ${status === 'approved' 
        ? 'Our team will contact you shortly for further arrangements.'
        : 'Please contact support if you have any questions.'}

      Best regards,
      Your Export Team
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: transaction.user.email,
      subject: emailSubject,
      text: emailText
    });

    res.status(200).json({
      success: true,
      message: `Request ${status} and notification sent`
    });

  } catch (error) {
    console.error('Update export request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update export request'
    });
  }
}; 