const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createExportRequest,
  getExportRequests,
  updateExportRequest
} = require('../controllers/export.controller');

router.post('/', protect, createExportRequest);
router.get('/', protect, getExportRequests);
router.patch('/:id', protect, updateExportRequest);

module.exports = router; 