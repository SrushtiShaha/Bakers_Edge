// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const Vendor = require('../models/Vendor');
// const bcrypt = require('bcryptjs');
// const adminAuth = require('../middleware/adminAuth');
// const VendorRequest = require("../models/VendorRequest");
// const vendorController = require('../controllers/vendorController');
// console.log("vendorController in routes:", vendorController);

// // Admin adding vendor
// // router.post('/', vendorController.createOrRegisterVendor);

// // Public vendor registration
// // router.post('/register', vendorController.createOrRegisterVendor);

// // router.post('/vendor/request', vendorController.requestVendor);

// router.post("/request", vendorController.requestVendor);

// // router.post("/login", vendorController.vendorLogin);
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const vendor = await Vendor.findOne({ email });

//   if (!vendor) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   const isMatch = await bcrypt.compare(password, vendor.password);
//   if (!isMatch) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ role: 'vendor', id: vendor._id }, process.env.JWT_SECRET);
//   res.json({ token });
// });

// // router.post("/request", async (req, res) => {
// //   try {
// //     const { name, email, businessName, phone, address } = req.body;

// //     // Prevent duplicate request
// //     const existing = await VendorRequest.findOne({ email });
// //     if (existing) {
// //       return res.status(400).json({ message: "Request already submitted" });
// //     }

// //     // Save request
// //     const newRequest = new VendorRequest({
// //       name,
// //       email,
// //       businessName,
// //       phone,
// //       address,
// //     });

// //     await newRequest.save();
// //     res.status(201).json({ message: "Vendor request submitted successfully" });
// //   } catch (error) {
// //     console.error("Error creating vendor request:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // Vendor request route (goes into VendorRequest table)
// // router.post("/request", async (req, res) => {
// //   try {
// //     const { name, email, businessName, phone, address } = req.body;

// //     // check duplicate requests
// //     const existing = await VendorRequest.findOne({ email });
// //     if (existing) {
// //       return res.status(400).json({ message: "Request already submitted with this email" });
// //     }

// //     const newRequest = new VendorRequest({
// //       name,
// //       email,
// //       businessName,
// //       phone,
// //       address,
// //     });

// //     await newRequest.save();
// //     res.status(201).json({ message: "Vendor request saved successfully" });
// //   } catch (error) {
// //     console.error("❌ Error creating vendor request:", error.message);
// //     res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // });

// // Vendor request route
// router.post("/request", async (req, res) => {
//   try {
//     const newRequest = new VendorRequest(req.body);
//     await newRequest.save();
//     res.status(201).json({ message: "Vendor request submitted successfully" });
//   } catch (err) {
//     console.error("Error saving vendor request:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Approve Vendor Request (Admin action → creates real vendor)
// // router.post("/approve/:id", async (req, res) => {
// //   try {
// //     const { password } = req.body; // Admin enters password
// //     const request = await VendorRequest.findById(req.params.id);

// //     if (!request) return res.status(404).json({ message: "Request not found" });

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Create real vendor
// //     const vendor = new Vendor({
// //       name: request.name,
// //       email: request.email,
// //       businessName: request.businessName,
// //       phone: request.phone,
// //       address: request.address,
// //       password: hashedPassword,
// //       isApproved: true
// //     });

// //     await vendor.save();

// //     // Update request status
// //     request.status = "Approved";
// //     await request.save();

// //     res.status(201).json({ message: "Vendor approved and moved to vendors table", vendor });
// //   } catch (err) {
// //     console.error("Error approving vendor:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // Get all vendors
// router.get('/', vendorController.getAllVendors);
// // router.get('/vendors', vendorController.getVendors); 

// // Admin fetches pending vendor requests
// router.get('/vendor/requests', adminAuth, async (req, res) => {
//   try {
//     const requests = await VendorRequest.find();
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // router.get('/vendors', vendorController.getVendors);

// // Admin approves request → moves to Vendor collection
// router.post('/vendor/approve/:id', adminAuth, async (req, res) => {
//   try {
//     const { password } = req.body;
//     const request = await VendorRequest.findById(req.params.id);
//     if (!request) return res.status(404).json({ message: "Request not found" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newVendor = new Vendor({
//       name: request.name,
//       email: request.email,
//       phone: request.phone,
//       businessName: request.businessName,
//       address: request.address,
//       password: hashedPassword,
//       isApproved: true
//     });

//     await newVendor.save();
//     await VendorRequest.findByIdAndDelete(req.params.id);

//     res.json({ message: "Vendor approved and moved to Vendors", vendor: newVendor });
//   } catch (err) {
//     console.error("❌ Approve vendor error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Update vendor
// router.put('/:id', vendorController.updateVendor);

// // Delete vendor
// router.delete('/:id', vendorController.deleteVendor);

// /**
//  * Edit vendor details (Admin only)
//  */
// router.put('/:id', adminAuth, async (req, res) => {
//   try {
//     const updatedVendor = await Vendor.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedVendor) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }
//     res.json({ message: "Vendor updated successfully", vendor: updatedVendor });
//   } catch (error) {
//     console.error("Error updating vendor:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /**
//  * Change vendor password (Admin only)
//  */
// router.put('/:id/change-password', adminAuth, async (req, res) => {
//   try {
//     const { password } = req.body;
//     if (!password || password.length < 8) {
//       return res.status(400).json({ message: "Password must be at least 8 characters" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const vendor = await Vendor.findByIdAndUpdate(
//       req.params.id,
//       { password: hashedPassword },
//       { new: true }
//     );

//     if (!vendor) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }
//     res.json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error("Error changing password:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /**
//  * Delete vendor (Admin only)
//  */
// router.delete('/:id', adminAuth, async (req, res) => {
//   try {
//     const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
//     if (!deletedVendor) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }
//     res.json({ message: "Vendor deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting vendor:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const vendorController = require('../controllers/vendorController');

// --------------------- Public Routes ---------------------

// Vendor submits a request (public)
router.post('/request', vendorController.requestVendor);

// Vendor login (public)
router.post('/login', vendorController.vendorLogin);

// --------------------- Admin Routes ---------------------

// Admin creates or registers a vendor directly
router.post('/admin/create', adminAuth, vendorController.createOrRegisterVendor);

// Get all vendors (admin)
// router.get('/', adminAuth, vendorController.getAllVendors);

// Update vendor (admin)
router.put('/:id', adminAuth, vendorController.updateVendor);

// Delete vendor (admin)
router.delete('/:id', adminAuth, vendorController.deleteVendor);

// Vendor Requests (Admin only)
router.get('/', adminAuth, vendorController.getVendorRequests);
router.post('/approve/:id', adminAuth, vendorController.approveRequest);
router.put('/reject/:id', adminAuth, vendorController.rejectRequest);
router.delete('/request/:id', adminAuth, vendorController.deleteRequest);


// Change vendor password (admin)
router.put('/:vendorId/change-password', adminAuth, vendorController.changePassword);

module.exports = router;
