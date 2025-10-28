// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const vendorAuth = require('../middleware/vendorAuth');

// ✅ GET /api/customers - PROTECTED
// This route now requires a vendor token and will only return *that* vendor's customers.
router.get('/', vendorAuth, customerController.getCustomers);

// ✅ POST /api/customers - PROTECTED
// This route now requires a vendor token and will *save* the customer with that vendor's ID.
router.post('/', vendorAuth, customerController.addCustomer);

// ❌ REMOVE THE DUPLICATE, UNPROTECTED ROUTES
// router.get('/', customerController.getCustomers);
// router.post('/', customerController.addCustomer);

module.exports = router;