// // const mongoose = require('mongoose');

// // const vendorSchema = new mongoose.Schema({
// //   requestId: { type: mongoose.Schema.Types.ObjectId, ref: "VendorRequest" },
// //   name: { type: String, required: true },
// //   phone: { type: String, required: true },
// //   shopName: { type: String, required: true },
// //   shopAddress: { type: String, required: true },
// //   adharNo: { type: String, required: true, unique: true },
// //   email: { type: String, required: true, unique: true },
// //   password: {type: String, requried: true},
// //   isApproved: { type: Boolean, default: false }
// // },{ 
// //   timestamps: true,
// //   collection: "vendorData"   
// // });

// // module.exports = mongoose.model('Vendor', vendorSchema, 'vendors');

// const mongoose = require('mongoose');

// const vendorSchema = new mongoose.Schema({
//   requestId: { type: mongoose.Schema.Types.ObjectId, ref: "VendorRequest" },
//   name: { type: String, required: true },
//   phone: { type: String, required: true },
//   shopName: { type: String, required: true },
//   shopAddress: { type: String, required: true },
//   adharNo: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   isApproved: { type: Boolean, default: false },

//   // 🆕 Vendor Settings fields
//   contact: { type: String, default: "" },
//   upiId: { type: String, default: "" },
//   upiQr: { type: String, default: "" }, // can store base64 string or file URL
// },
// { timestamps: true, collection: "vendors" });

// module.exports = mongoose.model("Vendor", vendorSchema);

// models/Vendor.js
const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "VendorRequest" },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  shopName: { type: String, required: true },
  shopAddress: { type: String, required: true },
  adharNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isApproved: { type: Boolean, default: false },

  // 🆕 Vendor Settings fields
  contact: { type: String, default: "" },
  upiId: { type: String, default: "" },
  upiQr: { type: String, default: "" }, // can store base64 string or file URL
},
{ timestamps: true, collection: "vendors" });

module.exports = mongoose.model("Vendor", vendorSchema);