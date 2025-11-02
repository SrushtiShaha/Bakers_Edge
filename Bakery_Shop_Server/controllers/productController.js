// // // const Product = require('../models/Product');

// // // exports.getProducts = async (req, res) => {
// // //   try {
// // //     const products = await Product.find();
// // //     res.json(products);
// // //   } catch (err) {
// // //     res.status(500).json({ message: err.message });
// // //   }
// // // };

// // // exports.getProductByBarcode = async (req, res) => {
// // //   try {
// // //     const product = await Product.findOne({ barcode: req.params.barcode });
// // //     if (!product) return res.status(404).json({ message: 'Product not found' });
// // //     res.json(product);
// // //   } catch (err) {
// // //     res.status(500).json({ message: err.message });
// // //   }
// // // };



// // // exports.addProduct = async (req, res) => {
// // //   try {
// // //     const product = new Product(req.body);
// // //     const saved = await product.save();
// // //     res.status(201).json(saved);
// // //   } catch (err) {
// // //     console.error('Add Product Error:', err.message);
// // //     res.status(400).json({ message: err.message, errors: err.errors });
// // //   }
// // // };


// // // exports.updateStock = async (req, res) => {
// // //   try {
// // //     const product = await Product.findById(req.params.id);
// // //     product.quantity += Number(req.body.quantity);
// // //     await product.save();
// // //     res.json(product);
// // //   } catch (err) {
// // //     res.status(400).json({ message: err.message });
// // //   }
// // // };


// // // exports.stockIn = async (req, res) => {
// // //   try {
// // //     const product = await Product.findById(req.params.id);
// // //     product.quantity += req.body.amount;
// // //     await product.save();
// // //     res.json(product);
// // //   } catch (err) {
// // //     res.status(400).json({ message: err.message });
// // //   }
// // // };


// // // exports.stockOut = async (req, res) => {
// // //   try {
// // //     const product = await Product.findById(req.params.id);
// // //     product.quantity -= req.body.amount; 
// // //     if (product.quantity < 0) {
// // //       return res.status(400).json({ message: 'Not enough stock available' });
// // //     }
// // //     await product.save();
// // //     res.json(product);
// // //   } catch (err) {
// // //     res.status(400).json({ message: err.message });
// // //   }
// // // };


// // // // exports.updateProduct = async (req, res) => {
// // // //   try {
// // // //     const product = await Product.findById(req.params.id);
// // // //     if (product) {
// // // //       product.name = req.body.name || product.name;
// // // //       product.quantity = req.body.quantity || product.quantity;
// // // //       product.price = req.body.price || product.price;
// // // //       await product.save();
// // // //       res.json(product);
// // // //     } else {
// // // //       res.status(404).json({ message: 'Product not found' });
// // // //     }
// // // //   } catch (err) {
// // // //     res.status(400).json({ message: err.message });
// // // //   }
// // // // };

// // // // In productController.js

// // // exports.updateProduct = async (req, res) => {
// // //   try {
// // //     // This method finds the product by its ID and updates it
// // //     // with all the fields from req.body (price, dates, weight, etc.)
// // //     const updatedProduct = await Product.findByIdAndUpdate(
// // //       req.params.id,
// // //       req.body, // Passes the entire payload from React
// // //       { 
// // //         new: true, // This option returns the new, updated document
// // //         runValidators: true // This runs your Mongoose model validations
// // //       }
// // //     );

// // //     if (!updatedProduct) {
// // //       return res.status(404).json({ message: 'Product not found' });
// // //     }

// // //     // Send the fully updated product back to your React app
// // //     res.json(updatedProduct); 

// // //   } catch (err) {
// // //     res.status(400).json({ message: err.message });
// // //   }
// // // };

// // // exports.deleteProduct = async (req, res) => {
// // //   try {
// // //     const product = await Product.findByIdAndDelete(req.params.id);
// // //     if (!product) {
// // //       return res.status(404).json({ message: "Product not found" });
// // //     }
// // //     res.status(200).json({ message: "Product deleted successfully" });
// // //   } catch (err) {
// // //     res.status(500).json({ message: "Error deleting product", error: err.message });
// // //   }
// // // };

// // const Product = require('../models/Product');

// // // ✅ Get all products
// // exports.getProducts = async (req, res) => {
// //   try {
// //     const products = await Product.find();
// //     res.json(products);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ✅ Get product by barcode
// // exports.getProductByBarcode = async (req, res) => {
// //   try {
// //     const product = await Product.findOne({ barcode: req.params.barcode });
// //     if (!product) return res.status(404).json({ message: 'Product not found' });
// //     res.json(product);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ✅ Add or update product (supports multiple expiry batches)
// // exports.addProduct = async (req, res) => {
// //   try {
// //     const { name, quantity, price, weight, expiryDate, manufacturingDate } = req.body;

// //     // Check if product already exists
// //     let product = await Product.findOne({ name: new RegExp(`^${name}$`, 'i') });

// //     if (product) {
// //       // Add or merge expiry batch
// //       if (!product.expiryBatches) product.expiryBatches = [];

// //       const existingBatch = product.expiryBatches.find(
// //         (b) => new Date(b.expiryDate).toDateString() === new Date(expiryDate).toDateString()
// //       );

// //       if (existingBatch) {
// //         existingBatch.quantity += Number(quantity);
// //       } else {
// //         product.expiryBatches.push({ expiryDate, quantity });
// //       }

// //       // Update base fields
// //       product.price = price;
// //       product.weight = weight;
// //       product.manufacturingDate = manufacturingDate;

// //       const updated = await product.save();
// //       res.json(updated);
// //     } else {
// //       // Create new product
// //       const newProduct = new Product({
// //         name,
// //         price,
// //         weight,
// //         manufacturingDate,
// //         expiryBatches: [{ expiryDate, quantity }]
// //       });
// //       const saved = await newProduct.save();
// //       res.status(201).json(saved);
// //     }
// //   } catch (err) {
// //     console.error('Add Product Error:', err.message);
// //     res.status(400).json({ message: err.message, errors: err.errors });
// //   }
// // };

// // // ✅ Update stock by adding quantity (general purpose)
// // exports.updateStock = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product) return res.status(404).json({ message: 'Product not found' });

// //     // Update total quantity by default (if no expiry batch info)
// //     if (!product.expiryBatches || product.expiryBatches.length === 0) {
// //       product.expiryBatches = [{ expiryDate: req.body.expiryDate, quantity: req.body.quantity }];
// //     } else {
// //       const existingBatch = product.expiryBatches.find(
// //         (b) => new Date(b.expiryDate).toDateString() === new Date(req.body.expiryDate).toDateString()
// //       );
// //       if (existingBatch) existingBatch.quantity += Number(req.body.quantity);
// //       else product.expiryBatches.push({ expiryDate: req.body.expiryDate, quantity: req.body.quantity });
// //     }

// //     const updated = await product.save();
// //     res.json(updated);
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // };

// // // ✅ Stock In (Increase quantity)
// // exports.stockIn = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product) return res.status(404).json({ message: 'Product not found' });

// //     // Add stock to latest batch if exists
// //     if (product.expiryBatches && product.expiryBatches.length > 0) {
// //       product.expiryBatches[0].quantity += req.body.amount;
// //     } else {
// //       product.expiryBatches = [{ expiryDate: new Date(), quantity: req.body.amount }];
// //     }

// //     const updated = await product.save();
// //     res.json(updated);
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // };

// // // ✅ Stock Out (Decrease quantity)
// // exports.stockOut = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product) return res.status(404).json({ message: 'Product not found' });

// //     let remaining = req.body.amount;
// //     let totalQty = product.expiryBatches.reduce((sum, b) => sum + b.quantity, 0);

// //     if (remaining > totalQty) {
// //       return res.status(400).json({ message: 'Not enough stock available' });
// //     }

// //     // Deduct quantity starting from the oldest batch
// //     for (let batch of product.expiryBatches) {
// //       if (remaining <= 0) break;
// //       if (batch.quantity <= remaining) {
// //         remaining -= batch.quantity;
// //         batch.quantity = 0;
// //       } else {
// //         batch.quantity -= remaining;
// //         remaining = 0;
// //       }
// //     }

// //     // Remove empty batches
// //     product.expiryBatches = product.expiryBatches.filter(b => b.quantity > 0);

// //     const updated = await product.save();
// //     res.json(updated);
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // };

// // // ✅ Update product (price, weight, etc.)
// // exports.updateProduct = async (req, res) => {
// //   try {
// //     const updatedProduct = await Product.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true, runValidators: true }
// //     );

// //     if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
// //     res.json(updatedProduct);
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // };

// // // ✅ Delete product
// // exports.deleteProduct = async (req, res) => {
// //   try {
// //     const product = await Product.findByIdAndDelete(req.params.id);
// //     if (!product) return res.status(404).json({ message: "Product not found" });
// //     res.status(200).json({ message: "Product deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ message: "Error deleting product", error: err.message });
// //   }
// // };

// const Product = require('../models/Product');
// const ExpiredProduct = require('../models/ExpiredProduct'); 

// exports.moveExpiredProducts = async (req, res) => {
//   const session = await Product.startSession();
//   session.startTransaction();
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const products = await Product.find({ 
//       'expiryBatches.expiryDate': { $lt: today } 
//     }).session(session);

//     let movedCount = 0;

//     for (const product of products) {
//       const remainingBatches = [];
//       const expiredBatches = product.expiryBatches.filter(batch => {
//         if (new Date(batch.expiryDate) < today) {
//           return true;
//         }
//         remainingBatches.push(batch);
//         return false;
//       });

//       if (expiredBatches.length > 0) {
//         for (const batch of expiredBatches) {
//           const expiredRecord = new ExpiredProduct({
//             originalProductId: product._id,
//             name: product.name,
//             price: product.price,
//             weight: product.weight,
//             expiredBatch: batch
//           });
//           await expiredRecord.save({ session });
//           movedCount += batch.quantity;
//         }
        
//         product.expiryBatches = remainingBatches;
//         await product.save({ session });
//       }
//     }

//     await session.commitTransaction();
//     res.status(200).json({ message: `${movedCount} expired item(s) moved to archives.` });

//   } catch (err) {
//     await session.abortTransaction();
//     console.error('Error moving expired products:', err);
//     res.status(500).json({ message: 'Error moving expired products' });
//   } finally {
//     session.endSession();
//   }
// };

// // ✅ Get all products (NOW SORTED ALPHABETICALLY)
// // exports.getProducts = async (req, res) => {
// //   try {
// //     // Added .sort({ name: 1 }) to sort alphabetically by name
// //     const products = await Product.find().sort({ name: 1 });
// //     res.json(products);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// // ✅ Get product by barcode
// exports.getProductByBarcode = async (req, res) => {
//   try {
//     const product = await Product.findOne({ barcode: req.params.barcode });
//     if (!product) return res.status(404).json({ message: 'Product not found' });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Add or update product (LOGIC UPDATED)
// // exports.addProduct = async (req, res) => {
// //   try {
// //     const { name, quantity, price, weight, expiryDate, manufacturingDate } = req.body;

// //     // --- LOGIC CHANGE HERE ---
// //     // Find a product that matches NAME, PRICE, and WEIGHT
// //     // We use 'i' for case-insensitive name search
// //     let product = await Product.findOne({ 
// //       name: new RegExp(`^${name}$`, 'i'),
// //       price: price,
// //       weight: weight || '' // Handle null or empty string weights
// //     });
// //     // --- END OF LOGIC CHANGE ---

// //     if (product) {
// //       // --- PRODUCT MATCHES: Add batch to this entry ---
// //       if (!product.expiryBatches) product.expiryBatches = [];

// //       const existingBatch = product.expiryBatches.find(
// //         (b) => new Date(b.expiryDate).toDateString() === new Date(expiryDate).toDateString()
// //       );

// //       if (existingBatch) {
// //         existingBatch.quantity += Number(quantity);
// //       } else {
// //         product.expiryBatches.push({ expiryDate, quantity });
// //       }

// //       // We don't need to update price/weight, they are already matched
// //       product.manufacturingDate = manufacturingDate;

// //       const updated = await product.save();
// //       res.json(updated);
// //     } else {
// //       // --- NO MATCH: Create a new product entry ---
// //       const newProduct = new Product({
// //         name,
// //         price,
// //         weight,
// //         manufacturingDate,
// //         expiryBatches: [{ expiryDate, quantity }]
// //       });
// //       const saved = await newProduct.save();
// //       res.status(201).json(saved);
// //     }
// //   } catch (err) {
// //     console.error('Add Product Error:', err.message);
// //     res.status(400).json({ message: err.message, errors: err.errors });
// //   }
// // };

// // In controllers/productController.js

// // GET /
// exports.getProducts = async (req, res) => {
//   try {
//     // ONLY find products matching the logged-in vendor
//     const products = await Product.find({ vendorId: req.vendorId });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // POST /
// exports.addProduct = async (req, res) => {
//   try {
//     // When creating a new product, TAG it with the vendor's ID
//     const product = new Product({
//       ...req.body,
//       vendorId: req.vendorId // Add the vendor's ID
//     });
//     const saved = await product.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // PUT /:id
// exports.updateProduct = async (req, res) => {
//   try {
//     // Find the product by its ID *AND* the vendor's ID
//     // This prevents one vendor from editing another vendor's product
//     const updated = await Product.findOneAndUpdate(
//       { _id: req.params.id, vendorId: req.vendorId },
//       req.body,
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ message: "Product not found or unauthorized" });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE /:id
// exports.deleteProduct = async (req, res) => {
//   try {
//     // Find the product by its ID *AND* the vendor's ID
//     const deleted = await Product.findOneAndDelete({
//       _id: req.params.id,
//       vendorId: req.vendorId
//     });
//     if (!deleted) return res.status(404).json({ message: "Product not found or unauthorized" });
//     res.json({ message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Update stock (general purpose) - No change needed
// exports.updateStock = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     if (!product.expiryBatches || product.expiryBatches.length === 0) {
//       product.expiryBatches = [{ expiryDate: req.body.expiryDate, quantity: req.body.quantity }];
//     } else {
//       const existingBatch = product.expiryBatches.find(
//         (b) => new Date(b.expiryDate).toDateString() === new Date(req.body.expiryDate).toDateString()
//       );
//       if (existingBatch) existingBatch.quantity += Number(req.body.quantity);
//       else product.expiryBatches.push({ expiryDate: req.body.expiryDate, quantity: req.body.quantity });
//     }

//     const updated = await product.save();
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // ✅ Stock In (Increase quantity) - No change needed
// exports.stockIn = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     if (product.expiryBatches && product.expiryBatches.length > 0) {
//       product.expiryBatches[0].quantity += req.body.amount;
//     } else {
//       product.expiryBatches = [{ expiryDate: new Date(), quantity: req.body.amount }];
//     }

//     const updated = await product.save();
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // ✅ Stock Out (Decrease quantity) - No change needed
// exports.stockOut = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     let remaining = req.body.amount;
//     let totalQty = product.expiryBatches.reduce((sum, b) => sum + b.quantity, 0);

//     if (remaining > totalQty) {
//       return res.status(400).json({ message: 'Not enough stock available' });
//     }

//     for (let batch of product.expiryBatches) {
//       if (remaining <= 0) break;
//       if (batch.quantity <= remaining) {
//         remaining -= batch.quantity;
//         batch.quantity = 0;
//       } else {
//         batch.quantity -= remaining;
//         remaining = 0;
//       }
//     }

//     product.expiryBatches = product.expiryBatches.filter(b => b.quantity > 0);

//     const updated = await product.save();
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // ✅ Update product (price, weight, etc.) - No change needed
// // exports.updateProduct = async (req, res) => {
// //   try {
// //     const updatedProduct = await Product.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true, runValidators: true }
// //     );

// //     if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
// //     res.json(updatedProduct);
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // };

// // ✅ Delete product - No change needed
// // exports.deleteProduct = async (req, res) => {
// //   try {
// //     const product = await Product.findByIdAndDelete(req.params.id);
// //     if (!product) return res.status(404).json({ message: "Product not found" });
// //     res.status(200).json({ message: "Product deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ message: "Error deleting product", error: err.message });
// //   }
// // };

// controllers/productController.js
const Product = require('../models/Product');
const ExpiredProduct = require('../models/ExpiredProduct'); 

// GET /

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.vendorId }).sort({ name: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, quantity, price, weight, expiryDate, manufacturingDate } = req.body;
    let product = await Product.findOne({ name: new RegExp(`^${name}$`, 'i'), vendorId: req.vendorId });

    if (product) {
      const existing = product.expiryBatches.find(b =>
        new Date(b.expiryDate).toDateString() === new Date(expiryDate).toDateString()
      );
      if (existing) existing.quantity += Number(quantity);
      else product.expiryBatches.push({ expiryDate, quantity });

      product.price = price;
      product.weight = weight;
      product.manufacturingDate = manufacturingDate;
      const updated = await product.save();
      return res.json(updated);
    }

    const newProduct = new Product({
      vendorId: req.vendorId,
      name, price, weight, manufacturingDate,
      expiryBatches: [{ expiryDate, quantity }]
    });
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// PUT /:id
exports.updateProduct = async (req, res) => {
  try {
    // ✅ CHECKS for both ID and vendorId
    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, vendorId: req.vendorId },
      req.body, // Pass only price, name, weight, mfg date
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Product not found or unauthorized" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /:id
exports.deleteProduct = async (req, res) => {
  try {
    // ✅ CHECKS for both ID and vendorId
    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
      vendorId: req.vendorId
    });
    if (!deleted) return res.status(404).json({ message: "Product not found or unauthorized" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /move-expired
exports.moveExpiredProducts = async (req, res) => {
  const session = await Product.startSession();
  session.startTransaction();
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // ✅ FINDS ONLY expired products for the logged-in vendor
    const products = await Product.find({ 
      'expiryBatches.expiryDate': { $lt: today },
      vendorId: req.vendorId 
    }).session(session);

    let movedCount = 0;

    for (const product of products) {
      const remainingBatches = [];
      const expiredBatches = product.expiryBatches.filter(batch => {
        if (new Date(batch.expiryDate) < today) return true;
        remainingBatches.push(batch);
        return false;
      });

      if (expiredBatches.length > 0) {
        for (const batch of expiredBatches) {
          const expiredRecord = new ExpiredProduct({
            originalProductId: product._id,
            name: product.name,
            price: product.price,
            weight: product.weight,
            expiredBatch: batch,
            vendorId: product.vendorId // ✅ COPIES vendorId to expired doc
          });
          await expiredRecord.save({ session });
          movedCount += batch.quantity;
        }
        
        product.expiryBatches = remainingBatches;
        await product.save({ session });
      }
    }

    await session.commitTransaction();
    res.status(200).json({ message: `${movedCount} expired item(s) moved to archives.` });

  } catch (err) {
    await session.abortTransaction();
    console.error('Error moving expired products:', err);
    res.status(500).json({ message: 'Error moving expired products' });
  } finally {
    session.endSession();
  }
};

// GET /barcode/:barcode
exports.getProductByBarcode = async (req, res) => {
  try {
    // ✅ CHECKS for both barcode and vendorId
    const product = await Product.findOne({ 
      barcode: req.params.barcode, 
      vendorId: req.vendorId 
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- Other Stock Routes ---

// PUT /:id/stock
exports.updateStock = async (req, res) => {
  try {
    // ✅ CHECKS for both ID and vendorId
    const product = await Product.findOne({ _id: req.params.id, vendorId: req.vendorId });
    if (!product) return res.status(404).json({ message: 'Product not found or unauthorized' });

    // (Your existing batch logic is fine)
    if (!product.expiryBatches) product.expiryBatches = [];
    const existingBatch = product.expiryBatches.find(
      (b) => new Date(b.expiryDate).toDateString() === new Date(req.body.expiryDate).toDateString()
    );
    if (existingBatch) existingBatch.quantity += Number(req.body.quantity);
    else product.expiryBatches.push({ expiryDate: req.body.expiryDate, quantity: req.body.quantity });

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /:id/stockin
exports.stockIn = async (req, res) => {
  try {
    // ✅ CHECKS for both ID and vendorId
    const product = await Product.findOne({ _id: req.params.id, vendorId: req.vendorId });
    if (!product) return res.status(404).json({ message: 'Product not found or unauthorized' });

    if (product.expiryBatches && product.expiryBatches.length > 0) {
      product.expiryBatches[0].quantity += req.body.amount;
    } else {
      product.expiryBatches = [{ expiryDate: new Date(), quantity: req.body.amount }];
    }
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /:id/stockout
exports.stockOut = async (req, res) => {
  try {
    // ✅ CHECKS for both ID and vendorId
    const product = await Product.findOne({ _id: req.params.id, vendorId: req.vendorId });
    if (!product) return res.status(404).json({ message: 'Product not found or unauthorized' });

    let remaining = req.body.amount;
    let totalQty = product.expiryBatches.reduce((sum, b) => sum + b.quantity, 0);
    if (remaining > totalQty) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }
    // (Your existing stock-out logic is fine)
    for (let batch of product.expiryBatches) {
      if (remaining <= 0) break;
      if (batch.quantity <= remaining) {
        remaining -= batch.quantity;
        batch.quantity = 0;
      } else {
        batch.quantity -= remaining;
        remaining = 0;
      }
    }
    product.expiryBatches = product.expiryBatches.filter(b => b.quantity > 0);
    
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};