// controllers/salesController.js
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.recordSale = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { customer, items, totalAmount, invoiceNo } = req.body;
    const vendorId = req.vendorId; // Get from auth middleware

    if (!customer) {
      return res.status(400).json({ message: 'Customer is required.' });
    }

    const productUpdates = [];
    const saleItemsWithPrice = [];

    // 1. Validate all items and stock
    for (const item of items) {
      // ✅ Find product by ID *and* vendorId
      const product = await Product.findOne({
        _id: item.product,
        vendorId: vendorId
      }).session(session);
      
      if (!product) {
        throw new Error(`Product not found.`);
      }

      const totalQuantity = product.expiryBatches.reduce((sum, batch) => sum + batch.quantity, 0);
      if (totalQuantity < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}. Available: ${totalQuantity}`);
      }

      productUpdates.push({ product, quantityToDeduct: item.quantity });
      saleItemsWithPrice.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price // Save price at time of sale
      });
    }

    // 2. Deduct stock (FIFO)
    for (const update of productUpdates) {
      let { product, quantityToDeduct } = update;
      
      product.expiryBatches.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

      for (const batch of product.expiryBatches) {
        if (quantityToDeduct <= 0) break;
        if (batch.quantity >= quantityToDeduct) {
          batch.quantity -= quantityToDeduct;
          quantityToDeduct = 0;
        } else {
          quantityToDeduct -= batch.quantity;
          batch.quantity = 0;
        }
      }
      product.expiryBatches = product.expiryBatches.filter(batch => batch.quantity > 0);
      await product.save({ session });
    }

    // 3. Create the sale
    const sale = new Sale({
      vendorId: vendorId, // ✅ Tag with vendorId
      customer: customer,
      items: saleItemsWithPrice,
      totalAmount: totalAmount,
      invoiceNo: invoiceNo
    });
    const savedSale = await sale.save({ session });

    await session.commitTransaction();
    res.status(201).json(savedSale);

  } catch (err) {
    await session.abortTransaction();
    console.error('Error in recordSale:', err);
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
};