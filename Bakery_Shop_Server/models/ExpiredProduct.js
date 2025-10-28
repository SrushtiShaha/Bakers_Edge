// models/ExpiredProduct.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expiredProductSchema = new Schema({
  // ✅ ADD THIS VENDOR LINK:
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  originalProductId: { type: Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  price: { type: Number },
  weight: { type: String },
  expiredBatch: {
    quantity: { type: Number, required: true },
    expiryDate: { type: Date, required: true }
  },
  movedAt: {
    type: Date,
    default: Date.now
  }
});

// Index to help find expired products by vendor
expiredProductSchema.index({ vendorId: 1, movedAt: -1 });

module.exports = mongoose.model('ExpiredProduct', expiredProductSchema);