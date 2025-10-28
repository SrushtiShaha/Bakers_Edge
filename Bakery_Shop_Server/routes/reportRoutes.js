const express = require('express');
const router = express.Router();
const controller = require('../controllers/reportController');
const vendorAuth = require('../middleware/vendorAuth'); // 1. Import auth

// 2. Add vendorAuth to ALL report routes
router.get('/daily', vendorAuth, controller.getDailyReport);
router.get('/monthly', vendorAuth, controller.getMonthlyReport);
router.get('/top-products', vendorAuth, controller.getTopProducts);
router.get('/slow-products', vendorAuth, controller.getSlowProducts);
router.get('/customer-report', vendorAuth, controller.getCustomerReport);
router.get('/stock-report', vendorAuth, controller.getCurrentStockReport);
router.get('/outstanding-ledger', vendorAuth, controller.getOutstandingLedger);

module.exports = router;