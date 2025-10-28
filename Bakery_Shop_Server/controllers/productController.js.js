// const Product = require('../models/Product');

// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getProductByBarcode = async (req, res) => {
//   try {
//     const product = await Product.findOne({ barcode: req.params.barcode });
//     if (!product) return res.status(404).json({ message: 'Product not found' });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// // exports.addProduct = async (req, res) => {
// //   try {
// //     const product = new Product(req.body);
// //     const saved = await product.save();
// //     res.status(201).json(saved);
// //   } catch (err) {
// //     console.error('Add Product Error:', err.message);
// //     res.status(400).json({ message: err.message, errors: err.errors });
// //   }
// // };

// // productController.js
// exports.addProduct = async (req, res) => {
//   try {
//     const { name, expiryDate, quantity } = req.body;

//     // Check if a product with the SAME name & expiryDate already exists
//     const existingProduct = await Product.findOne({ 
//       name: new RegExp(`^${name}$`, 'i'), 
//       expiryDate: expiryDate 
//     });

//     if (existingProduct) {
//       // Just update the quantity for this same batch
//       existingProduct.quantity += Number(quantity);
//       const updated = await existingProduct.save();
//       return res.json(updated);
//     } else {
//       // Create new batch entry
//       const newProduct = new Product(req.body);
//       const saved = await newProduct.save();
//       return res.status(201).json(saved);
//     }
//   } catch (err) {
//     console.error('Add Product Error:', err.message);
//     res.status(400).json({ message: err.message, errors: err.errors });
//   }
// };


// exports.updateStock = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     product.quantity += Number(req.body.quantity);
//     await product.save();
//     res.json(product);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


// exports.stockIn = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     product.quantity += req.body.amount;
//     await product.save();
//     res.json(product);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


// exports.stockOut = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     product.quantity -= req.body.amount; 
//     if (product.quantity < 0) {
//       return res.status(400).json({ message: 'Not enough stock available' });
//     }
//     await product.save();
//     res.json(product);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


// exports.updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       product.name = req.body.name || product.name;
//       product.quantity = req.body.quantity || product.quantity;
//       product.price = req.body.price || product.price;
//       await product.save();
//       res.json(product);
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting product", error: err.message });
//   }
// };

const Product = require('../models/Product');

// ✅ Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get product by barcode
exports.getProductByBarcode = async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add product or update quantity if same name + expiryDate exists
exports.addProduct = async (req, res) => {
  try {
    const { name, expiryDate, quantity } = req.body;

    // Check for existing product with same name & expiry date
    const existingProduct = await Product.findOne({
      name: new RegExp(`^${name}$`, 'i'), // case-insensitive match
      expiryDate: expiryDate
    });

    if (existingProduct) {
      // Add quantity to the same batch
      existingProduct.quantity += Number(quantity);
      const updated = await existingProduct.save();
      return res.json(updated);
    } else {
      // Create a new batch
      const newProduct = new Product(req.body);
      const saved = await newProduct.save();
      return res.status(201).json(saved);
    }
  } catch (err) {
    console.error('Add Product Error:', err.message);
    res.status(400).json({ message: err.message });
  }
};

// ✅ Update product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};
