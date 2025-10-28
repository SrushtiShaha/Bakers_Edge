// routes/expiredProductRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/expiredProductController');
const vendorAuth = require('../middleware/vendorAuth'); // ✅ Import auth

// ✅ Add vendorAuth to the route
router.get('/', vendorAuth, controller.getExpiredProducts);

module.exports = router;