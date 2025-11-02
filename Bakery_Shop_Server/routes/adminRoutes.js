// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminController");
// const adminAuth = require("../middleware/adminAuth");

// // ---------------- Admin Login ----------------
// router.post("/login", adminController.adminLogin);

// router.post('/vendor/request', async (req, res) => {
//   try {
//     const { name, phone, shopName, shopAddress, adharNo, email } = req.body;

//     if (!name || !phone || !shopName || !shopAddress || !adharNo || !email) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // ... create new VendorRequest
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ---------------- Protected Admin Routes ----------------
// router.get("/dashboard", adminAuth, adminController.getDashboard);

// // ✅ Get all vendors (approved)
// router.get("/vendors", adminAuth, adminController.getAllVendors);

// // ---------------- Vendor Login ----------------
// router.post("/vendor/login", adminController.vendorLogin); 

// // ✅ Get all pending vendor requests
// router.get("/vendor/requests", adminAuth, adminController.getPendingVendors);

// // ✅ Approve vendor request
// router.post("/vendor/approve/:id", adminAuth, adminController.approveVendorRequest);

// // ✅ Delete/Reject vendor request
// router.delete("/vendor/request/:id", adminAuth, adminController.deleteVendorRequest);
// // ✅ Update vendor details
// router.put("/vendor/:id", adminAuth, adminController.updateVendor);
// // 🚀 FINAL FIX: Delete approved vendor (from Vendor collection)
// // This MUST exist to match the client's DELETE /api/admin/vendors/:id call.
// router.delete("/vendors/:id", adminAuth, adminController.deleteVendor);
// // ✅ Change vendor password
// router.put("/vendor/:id/password", adminAuth, adminController.changeVendorPassword);


// module.exports = router;

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");
const vendorAuth = require("../middleware/vendorAuth");

// Admin Login
router.post("/login", adminController.adminLogin);

// Vendor Login
router.post("/vendor/login", adminController.vendorLogin);

// Vendor Requests
router.get("/vendor/requests", adminAuth, adminController.getPendingVendors);
router.post("/vendor/approve/:id", adminAuth, adminController.approveVendorRequest);
router.delete("/vendor/request/:id", adminAuth, adminController.deleteVendorRequest);

// Vendors (approved)
router.get("/vendors", adminAuth, adminController.getAllVendors);
router.delete("/vendors/:id", adminAuth, adminController.deleteVendor);
router.put("/vendor/:id", adminAuth, adminController.updateVendor);
router.put("/vendor/:id/password", adminAuth, adminController.changeVendorPassword);

// Dashboard
router.get("/dashboard", adminAuth, adminController.getDashboard);

// Get logged-in vendor info
router.get("/vendor/me", vendorAuth, adminController.getVendorMe);

router.patch("/vendor/me",vendorAuth, adminController.updateVendorMe);

router.put("/vendor/password", vendorAuth, adminController.updateMyPassword);

router.get('/vendors/export/excel', adminAuth, adminController.exportVendorsToExcel);
router.get('/vendors/export/pdf', adminAuth, adminController.exportVendorsToPdf);

module.exports = router;
