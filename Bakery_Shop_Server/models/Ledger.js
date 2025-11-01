// models/Ledger.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ledgerSchema = new Schema({
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
  // ✅ New field: Always an array
  products: {
    type: [String], // simple string list, or use [Object] if you store objects
    default: [],
  },
  total: {
    type: Number,
    required: true,
    default: 0,
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
