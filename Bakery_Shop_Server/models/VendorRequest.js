// // const mongoose = require("mongoose");

// // const vendorRequestSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   businessName: { type: String, required: true },
// //   phone: { type: String, required: true },
// //   address: { type: String, required: true },
// //   status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
// // }, { timestamps: true, collection: "vendorRequests" });

// // module.exports = mongoose.model("VendorRequest", vendorRequestSchema);
// const mongoose = require("mongoose");

// const vendorRequestSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   businessName: { type: String, required: true },
//   address: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("VendorRequest", vendorRequestSchema);

// models/VendorRequest.js
const mongoose = require('mongoose');

const VendorRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  shopName: { type: String, required: true },
  shopAddress: { type: String, required: true },
  adharNo: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
  isApproved: { type: Boolean, default: false }
});

module.exports = mongoose.model('VendorRequest', VendorRequestSchema);