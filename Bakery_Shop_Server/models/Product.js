// // const mongoose = require('mongoose');
// // const productSchema = new mongoose.Schema({
// //   name: { 
// //     type: String, 
// //     required: true
// //    },
// //   quantity: { 
// //     type: Number, 
// //     required: true
// //    },
// //   price: {
// //      type: Number,
// //       required: true
// //      },
// //   barcode: { 
// //     type: String
// //   },
// //   weight: { type: String }, // ✅ added this line
// //   expiryDate: { 
// //     type: Date 
// //   },
// //   manufacturingDate: { 
// //     type: Date
// //    }
// // }, { timestamps: true });

// // // Auto-generate barcode based on _id after save
// // productSchema.post('save', async function(doc, next) {
// //   if (!doc.barcode) {
// //     doc.barcode = doc._id.toString();
// //     await doc.save();
// //   }
// //   next();
// // });

// // module.exports = mongoose.model('Product', productSchema);

// const mongoose = require('mongoose');

// // Define sub-schema for expiry batches
// const expiryBatchSchema = new mongoose.Schema({
//   expiryDate: { type: Date, required: true },
//   quantity: { type: Number, required: true },
// });

// // Main Product schema
// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   weight: { type: String },
//   manufacturingDate: { type: Date },
//   barcode: { type: String },

//   // ✅ Instead of a single expiryDate + quantity, 
//   // we store all batches here.
//   expiryBatches: { type: [expiryBatchSchema], default: [] },
// }, { timestamps: true });

// // Virtual total quantity (auto-calculated)
// productSchema.virtual('totalQuantity').get(function() {
//   return this.expiryBatches.reduce((sum, b) => sum + (b.quantity || 0), 0);
// });

// // Auto-generate barcode after save
// productSchema.post('save', async function (doc, next) {
//   if (!doc.barcode) {
//     doc.barcode = doc._id.toString();
//     await doc.save();
//   }
//   next();
// });

// module.exports = mongoose.model('Product', productSchema);

// models/Product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const batchSchema = new Schema({
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true }
});

const productSchema = new Schema({
  // ✅ ADD THIS VENDOR LINK:
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: String },
  manufacturingDate: { type: Date },
  expiryBatches: [batchSchema],
  barcode: { type: String, unique: false } // Note: Barcode might not be unique across *all* vendors
}, {
  timestamps: true
});

// Create an index to help find products by vendor and name
productSchema.index({ vendorId: 1, name: 1 });

module.exports = mongoose.model('Product', productSchema);
