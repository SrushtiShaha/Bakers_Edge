const Customer = require('../models/Customer');

exports.getCustomers = async (req, res) => {
  try {
    // ✅ FIX: Find only customers that match the logged-in vendor's ID
    const customers = await Customer.find({ vendorId: req.vendorId });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addCustomer = async (req, res) => {
  try {
    // ✅ FIX: Create a new customer object that combines
    // the form data (req.body) with the logged-in vendor's ID (req.vendorId)
    const customer = new Customer({
      ...req.body,
      vendorId: req.vendorId, // <-- This links the customer to the vendor
    });

    const saved = await customer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};