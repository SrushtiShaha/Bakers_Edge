// models/Customer.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  // ✅ ADD THIS VENDOR LINK:
  vendorId: {
    type: Schema.Types.ObjectId, // This is the Vendor's _id
    ref: 'Vendor',                // This links to your 'Vendor' model
    required: true,
  },
  // You can add timestamps if you like
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // }
});

module.exports = mongoose.model('Customer', customerSchema);