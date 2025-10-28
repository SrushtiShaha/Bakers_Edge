// controllers/ledgerController.js
const Ledger = require('../models/Ledger');

// GET /api/ledger
exports.getLedgers = async (req, res) => {
  try {
    const ledgers = await Ledger.find({ 
      vendorId: req.vendorId, // Filter by vendor
      total: { $gt: 0 }, 
      status: { $ne: 'paid' }
    })
      .populate('customer', 'name contact address')
      .populate('sale', 'invoiceNo')
      .sort({ createdAt: -1 });

    res.json(ledgers);
  } catch (error) {
    console.error('Ledger fetch error:', error);
    res.status(500).json({ message: 'Server error fetching ledgers' });
  }
};

// POST /api/ledger
exports.createLedger = async (req, res) => {
  const { customer, products, total, sale } = req.body; 

  try {
    if (!customer || !total) {
      return res.status(400).json({ message: 'Missing required fields: customer or total' });
    }

    const newLedger = new Ledger({ 
      customer, 
      products, 
      total, 
      sale, 
      vendorId: req.vendorId // Tag with vendorId
    });
    const saved = await newLedger.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error('Ledger create error:', error);
    res.status(500).json({ message: 'Server error creating ledger' });
  }
};

// PATCH /api/ledger/:id/pay
exports.markAsPaid = async (req, res) => {
  try {
    const updatedLedger = await Ledger.findOneAndUpdate(
      { _id: req.params.id, vendorId: req.vendorId }, // Check vendor
      { status: 'paid', total: 0 },
      { new: true }
    );

    if (!updatedLedger) {
      return res.status(404).json({ message: 'Ledger not found or unauthorized' });
    }

    res.json({ message: 'Ledger marked as paid', ledger: updatedLedger });

  } catch (error) {
    console.error('Ledger pay error:', error);
    res.status(500).json({ message: 'Server error updating ledger' });
  }
};

// PATCH /api/ledger/:id/partial-pay
exports.partialPay = async (req, res) => {
  try {
    const ledgerId = req.params.id;
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    const ledger = await Ledger.findOne({ _id: ledgerId, vendorId: req.vendorId });
    if (!ledger) {
      return res.status(404).json({ success: false, message: 'Ledger not found or unauthorized' });
    }

    const newTotal = ledger.total - amount;
    if (newTotal < 0) {
      return res.status(400).json({ success: false, message: 'Amount exceeds total' });
    }

    ledger.total = newTotal;
    if (newTotal === 0) {
      ledger.status = 'paid';
    }

    const updatedLedger = await ledger.save();
    res.json({
      success: true,
      message: 'Partial payment updated',
      ledger: updatedLedger
    });

  } catch (error) {
    console.error('Partial payment error:', error);
    res.status(500).json({ success: false, message: 'Server error processing partial payment' });
  }
};