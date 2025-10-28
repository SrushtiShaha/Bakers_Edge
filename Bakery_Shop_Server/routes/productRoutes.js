// // // const express = require('express');
// // // const router = express.Router();
// // // const controller= require('../controllers/productController.js');

// // // // const controller = require('../controllers/productController');
// // // const Product = require('../models/Product');


// // // // Get all products
// // // router.get('/', controller.getProducts);

// // // // Add a new product
// // // router.post('/', controller.addProduct);

// // // // Add route to get product by barcode
// // // router.get('/barcode/:barcode', controller.getProductByBarcode);


// // // // Update stock (increment or decrement)
// // // router.put('/:id/stock', controller.updateStock);

// // // // Stock In (Increase stock)
// // // router.put('/:id/stockin', controller.stockIn);

// // // // Stock Out (Decrease stock)
// // // router.put('/:id/stockout', controller.stockOut);

// // // // Update product details (Edit)
// // // router.put('/:id', controller.updateProduct);

// // // // Delete product
// // // router.delete('/:id', controller.deleteProduct);



// // // module.exports = router;


// // const express = require('express');
// // const router = express.Router();
// // const controller = require('../controllers/productController.js');

// // router.get('/', controller.getProducts);
// // router.post('/', controller.addProduct);
// // router.post('/move-expired', controller.moveExpiredProducts);
// // router.get('/barcode/:barcode', controller.getProductByBarcode);
// // router.put('/:id/stock', controller.updateStock);
// // router.put('/:id/stockin', controller.stockIn);
// // router.put('/:id/stockout', controller.stockOut);
// // router.put('/:id', controller.updateProduct);
// // router.delete('/:id', controller.deleteProduct);

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/productController.js');
// const vendorAuth = require('../middleware/vendorAuth'); // 1. Import auth

// // 2. Add vendorAuth to EVERY route
// router.get('/', vendorAuth, controller.getProducts);
// router.post('/', vendorAuth, controller.addProduct);
// router.post('/move-expired', vendorAuth, controller.moveExpiredProducts);
// router.get('/barcode/:barcode', vendorAuth, controller.getProductByBarcode);
// router.put('/:id/stock', vendorAuth, controller.updateStock);
// router.put('/:id/stockin', vendorAuth, controller.stockIn);
// router.put('/:id/stockout', vendorAuth, controller.stockOut);
// router.put('/:id', vendorAuth, controller.updateProduct);
// router.delete('/:id', vendorAuth, controller.deleteProduct);

// module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController.js');
const vendorAuth = require('../middleware/vendorAuth'); // 1. Import auth

// 2. Add vendorAuth to EVERY route
router.get('/', vendorAuth, controller.getProducts);
router.post('/', vendorAuth, controller.addProduct);
router.post('/move-expired', vendorAuth, controller.moveExpiredProducts);
router.get('/barcode/:barcode', vendorAuth, controller.getProductByBarcode);
router.put('/:id/stock', vendorAuth, controller.updateStock);
router.put('/:id/stockin', vendorAuth, controller.stockIn);
router.put('/:id/stockout', vendorAuth, controller.stockOut);
router.put('/:id', vendorAuth, controller.updateProduct);
router.delete('/:id', vendorAuth, controller.deleteProduct);

module.exports = router;