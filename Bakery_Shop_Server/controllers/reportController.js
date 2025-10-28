// controllers/reportController.js
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Ledger = require('../models/Ledger');
const mongoose = require('mongoose');

// Helper to get vendorId as ObjectId
const getVendorId = (req) => new mongoose.Types.ObjectId(req.vendorId);

exports.getDailyReport = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      { $match: { vendorId: getVendorId(req) } }, // ✅ Filter by Vendor
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: -1 } }, // Sort descending (newest first)
      { $limit: 7 }, // Limit to last 7 days
      { $project: { date: '$_id', total: { $round: ['$total', 2] }, _id: 0 } }
    ]);
    res.json(sales.reverse()); // Reverse to show oldest to newest
  } catch (err) {
    res.status(500).json({ message: 'Error fetching daily report', error: err.message });
  }
};

exports.getMonthlyReport = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      { $match: { vendorId: getVendorId(req) } }, // ✅ Filter by Vendor
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          total: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: -1 } }, // Sort descending
      { $limit: 12 }, // Limit to last 12 months
      { $project: { month: '$_id', total: { $round: ['$total', 2] }, _id: 0 } }
    ]);
    res.json(sales.reverse()); // Reverse to show oldest to newest
  } catch (err) {
    res.status(500).json({ message: 'Error fetching monthly report', error: err.message });
  }
};

exports.getTopProducts = async (req, res) => {
  try {
    const topProducts = await Sale.aggregate([
      { $match: { vendorId: getVendorId(req) } }, // ✅ Filter by Vendor
      { $unwind: '$items' },
      { $group: {
          _id: '$items.product',
          totalQuantity: { $sum: '$items.quantity' }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      { $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      { $project: {
          _id: '$productDetails._id',
          name: '$productDetails.name',
          totalQuantity: 1
        }
      }
    ]);
    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching top products', error: err.message });
  }
};

exports.getSlowProducts = async (req, res) => {
  try {
    const slowProducts = await Sale.aggregate([
      { $match: { vendorId: getVendorId(req) } }, // ✅ Filter by Vendor
      { $unwind: '$items' },
      { $group: {
          _id: '$items.product',
          totalQuantity: { $sum: '$items.quantity' }
        }
      },
      { $sort: { totalQuantity: 1 } }, // Sort ascending
      { $limit: 5 },
      { $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      { $project: {
          _id: '$productDetails._id',
          name: '$productDetails.name',
          totalQuantity: 1
        }
      }
    ]);
    res.json(slowProducts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching slow products', error: err.message });
  }
};

exports.getCustomerReport = async (req, res) => {
  try {
    const topCustomers = await Sale.aggregate([
      { $match: { vendorId: getVendorId(req) } }, // ✅ Filter by Vendor
      { $group: {
          _id: '$customer',
          totalSpent: { $sum: '$totalAmount' }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
      { $lookup: {
          from: 'customers',
          localField: '_id',
          foreignField: '_id',
          as: 'customerDetails'
        }
      },
      { $unwind: '$customerDetails' },
      // ✅ Ensure customer lookup also respects vendorId
      { $match: { 'customerDetails.vendorId': getVendorId(req) } },
      { $project: {
          _id: '$customerDetails._id',
          name: '$customerDetails.name',
          contact: '$customerDetails.contact',
          totalSpent: { $round: ['$totalSpent', 2] }
        }
      }
    ]);
    res.json(topCustomers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching customer report', error: err.message });
  }
};

exports.getCurrentStockReport = async (req, res) => {
  try {
    const lowStock = await Product.aggregate([
      { $match: { vendorId: getVendorId(req) } }, // ✅ Filter by Vendor
      { $addFields: {
          stock: { $sum: '$expiryBatches.quantity' }
        }
      },
      { $match: {
          stock: { $lte: 5, $gt: 0 } // Only show items low on stock, not out of stock
        }
      },
      { $sort: { stock: 1 } },
      { $project: { name: 1, stock: 1 } }
    ]);
    res.json(lowStock);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stock report', error: err.message });
  }
};

exports.getOutstandingLedger = async (req, res) => {
  try {
    const outstanding = await Ledger.find({ 
      vendorId: req.vendorId, // ✅ Filter by Vendor
      status: { $ne: 'paid' },
      total: { $gt: 0 }
    })
      .populate('customer', 'name contact')
      .sort({ createdAt: -1 });

    res.json(outstanding);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching outstanding ledger', error: err.message });
  }
};