// models/Ledger.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ledgerSchema = new Schema({
  // ✅ ADD THIS VENDOR LINK:
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  sale: {
    type: Schema.Types.ObjectId,
    ref: 'Sale',
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['paid', 'unpaid'],
    default: 'unpaid',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ledger', ledgerSchema);