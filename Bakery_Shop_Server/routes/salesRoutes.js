const express = require('express');
const router = express.Router();
const controller = require('../controllers/salesController');
const vendorAuth = require('../middleware/vendorAuth'); // 1. Import auth

// 2. Add vendorAuth to the route
router.post('/', vendorAuth, controller.recordSale);

module.exports = router;