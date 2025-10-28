// models/Sale.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  // Store the price at the time of sale
  price: {
    type: Number,
    required: true,
  }
});

const saleSchema = new Schema({
  // ✅ ADD THIS VENDOR LINK:
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  items: [saleItemSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
  invoiceNo: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sale', saleSchema);