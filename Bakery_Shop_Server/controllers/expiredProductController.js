// controllers/expiredProductController.js
const ExpiredProduct = require('../models/ExpiredProduct');

exports.getExpiredProducts = async (req, res) => {
  try {
    // ✅ FINDS ONLY expired products for the logged-in vendor
    const expiredItems = await ExpiredProduct.find({ vendorId: req.vendorId })
                                            .sort({ movedAt: -1 });
    res.json(expiredItems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expired products.", error: err.message });
  }
};