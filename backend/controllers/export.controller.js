const Product = require('../models/product.model');
const InventoryTransaction = require('../models/inventory.model');

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

    const transaction = await InventoryTransaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Export request not found'
      });
    }

    // If approving, update product quantity
    if (status === 'approved') {
      const product = await Product.findById(transaction.product);
      if (product.quantity < transaction.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient product quantity'
        });
      }
      product.quantity -= transaction.quantity;
      await product.save();
    }

    transaction.status = status;
    await transaction.save();

    res.status(200).json({
      success: true,
      transaction
    });
  } catch (error) {
    console.error('Update export request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update export request'
    });
  }
}; 