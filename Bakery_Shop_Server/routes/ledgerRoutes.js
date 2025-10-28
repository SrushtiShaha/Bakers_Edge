// routes/ledgerRoutes.js

const express = require('express');
const router = express.Router();
const vendorAuth = require('../middleware/vendorAuth');
const ledgerController = require('../controllers/ledgerController');

// GET all pending ledgers for the vendor
router.get('/', vendorAuth, ledgerController.getLedgers);

// POST a new manual ledger entry for the vendor
router.post('/', vendorAuth, ledgerController.createLedger);

// PATCH a ledger to 'paid'
router.patch('/:id/pay', vendorAuth, ledgerController.markAsPaid);

// PATCH a ledger with a partial payment
router.patch('/:id/partial-pay', vendorAuth, ledgerController.partialPay);

module.exports = router;