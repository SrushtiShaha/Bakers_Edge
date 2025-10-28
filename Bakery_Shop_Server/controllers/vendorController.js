// // const Vendor = require('../models/Vendor');
// // const bcrypt = require('bcryptjs');

// // // Create or Register Vendor (used by both admin and public routes)

// // // READ

// // exports.getVendors = async (req, res) => {
// //   try {
// //     const vendors = await Vendor.find();
// //     res.json(vendors);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // exports.requestVendor = async (req, res) => {
// //   try {
// //     const { name, phone, description, amount, place } = req.body;

// //     if (!name || !phone || !description || !amount || !place) {
// //       return res.status(400).json({ message: "All fields are required" });
// //     }

// //     const request = await VendorRequest.create({
// //       name,
// //       phone,
// //       description,
// //       amount,
// //       place
// //     });

// //     res.status(201).json(request);
// //   } catch (err) {
// //     console.error("Error submitting vendor request:", err);
// //     res.status(500).json({ message: "Server error", error: err.message });
// //   }
// // };

// const VendorRequest = require('../models/VendorRequest');  // ✅ make sure this is imported
// const Vendor = require('../models/Vendor');
// const bcrypt = require('bcryptjs');
// // const VendorRequest = require('../models/VendorRequestForm');

// // exports.requestVendor = async (req, res) => {
// //   try {
// //     console.log("📥 Vendor request body:", req.body);

// //     const { name, phone, shopName, shopAddress, adharNo } = req.body;

// //     if (!name || !phone || !shopName || !shopAddress || !adharNo) {
// //       return res.status(400).json({ message: "All fields are required" });
// //     }

// //     const request = await VendorRequest.create({ name, phone, shopName, shopAddress, adharNo });

// //     console.log("✅ Vendor request saved:", request);

// //     res.status(201).json({ message: "Vendor request submitted successfully", request });
// //   } catch (err) {
// //     console.error("❌ Error submitting vendor request:", err);
// //     res.status(500).json({ message: "Server error", error: err.message });
// //   }
// // };

// exports.requestVendor = async (req, res) => {
//   try {
//     console.log("📥 Vendor request body:", req.body);

//     const { name, phone, shopName, shopAddress, adharNo, email } = req.body;

//     if (!name || !phone || !shopName || !shopAddress || !adharNo || email) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const request = new VendorRequest({ name, phone, shopName, shopAddress, adharNo, email });

//     const savedRequest = await request.save();
//     console.log("✅ Vendor request saved:", savedRequest);

//     res.status(201).json({ message: "Vendor request submitted successfully", request: savedRequest });
//   } catch (err) {
//     console.error("❌ Error submitting vendor request:", err); // This prints full error
//     res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// };

// console.log("Loaded vendorController:", module.exports);

// exports.createOrRegisterVendor = async (req, res) => {
//   try {
//     console.log("📥 Vendor request body:", req.body);

//     const {
//       name,
//       phone,
//       shopName,
//       shopAddress,
//       adharNo,
//       email
//     } = req.body;

//     // Check for existing email
//     const existing = await Vendor.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create vendor
//     const newVendor = new Vendor({
//       name,
//       phone,
//       shopName,
//       shopAddress,
//       adharNo,
//       email
//     });

//     await newVendor.save();

//     res.status(201).json({
//       message: "Vendor created successfully",
//       vendor: newVendor
//     });
//   } catch (err) {
//     console.error("❌ Vendor creation error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// exports.vendorLogin = async (req, res) => {
//   try {
//     const { phone, password } = req.body;

//     // check vendor by phone
//     const vendor = await Vendor.findOne({ phone });
//     if (!vendor) {
//       return res.status(401).json({ message: "Invalid phone number or password" });
//     }

//     // compare entered password with hashed password
//     const isMatch = await bcrypt.compare(password, vendor.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid phone number or password" });
//     }

//     // login success
//     res.json({
//       message: "Login successful",
//       vendor: {
//         id: vendor._id,
//         name: vendor.name,
//         phone: vendor.phone,
//         shopName: vendor.shopName,
//         shopAddress: vendor.shopAddress,
//         email: vendor.email,
//       }
//     });

//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getAllVendors = async (req, res) => {
//   try {
//     const vendors = await Vendor.find();
//     res.status(200).json(vendors);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE
// exports.updateVendor = async (req, res) => {
//   try {
//     const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).json(vendor);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE
// exports.deleteVendor = async (req, res) => {
//   try {
//     await Vendor.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Vendor deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.changePassword = async (req, res) => {
//   try {
//     const { vendorId } = req.params; // vendor id from URL
//     const { oldPassword, newPassword } = req.body;

//     const vendor = await Vendor.findById(vendorId);
//     if (!vendor) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }

//     // check old password
//     const isMatch = await bcrypt.compare(oldPassword, vendor.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Old password is incorrect" });
//     }

//     // hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     vendor.password = hashedPassword;
//     await vendor.save();

//     res.json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error("Error changing password:", error);
//     res.status(500).json({ message: "Server error while changing password" });
//   }
// }; 

const VendorRequest = require('../models/VendorRequest');
const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Vendor submits a request (public)
 */
exports.requestVendor = async (req, res) => {
  try {
    console.log("📥 Vendor request body:", req.body);

    const { name, phone, shopName, shopAddress, adharNo, email } = req.body;

    // Validate all fields
    if (!name || !phone || !shopName || !shopAddress || !adharNo || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prevent duplicate request by email
    const existing = await VendorRequest.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Request already submitted with this email" });
    }

    const request = new VendorRequest({ name, phone, shopName, shopAddress, adharNo, email });
    const savedRequest = await request.save();

    console.log("✅ Vendor request saved:", savedRequest);

    res.status(201).json({ message: "Vendor request submitted successfully", request: savedRequest });
  } catch (err) {
    console.error("❌ Error submitting vendor request:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/**
 * Admin or public creates/registers a vendor
 */
exports.createOrRegisterVendor = async (req, res) => {
  try {
    console.log("📥 Vendor creation body:", req.body);

    const { name, phone, shopName, shopAddress, adharNo, email, password } = req.body;

    // Validate all fields
    if (!name || !phone || !shopName || !shopAddress || !adharNo || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing email
    const existing = await Vendor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create vendor
    const newVendor = new Vendor({
      name,
      phone,
      shopName,
      shopAddress,
      adharNo,
      email,
      password: hashedPassword
    });

    await newVendor.save();

    res.status(201).json({
      message: "Vendor created successfully",
      vendor: newVendor
    });
  } catch (err) {
    console.error("❌ Vendor creation error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * Vendor login
 */
exports.vendorLogin = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const vendor = await Vendor.findOne({ phone });
    if (!vendor) {
      return res.status(401).json({ message: "Invalid phone number or password" });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid phone number or password" });
    }

    const token = jwt.sign({ role: 'vendor', id: vendor._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({
      message: "Login successful",
      token,
      vendor: {
        id: vendor._id,
        name: vendor.name,
        phone: vendor.phone,
        shopName: vendor.shopName,
        shopAddress: vendor.shopAddress,
        email: vendor.email,
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get all vendors
 */
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Update vendor
 */
exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Delete vendor
 */
exports.deleteVendor = async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Change vendor password
 */
exports.changePassword = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { oldPassword, newPassword } = req.body;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    const isMatch = await bcrypt.compare(oldPassword, vendor.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    vendor.password = hashedPassword;
    await vendor.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error while changing password" });
  }
};

// ---------------- Get all pending vendor requests (Admin) ----------------
exports.getVendorRequests = async (req, res) => {
  try {
    const requests = await VendorRequest.find({ status: "pending" }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error("❌ Error fetching vendor requests:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Approve request and move to Vendors ----------------
exports.approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const request = await VendorRequest.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // hash password
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    // create vendor in Vendor table
    const vendor = new Vendor({
      requestId: request._id,
      name: request.name,
      phone: request.phone,
      shopName: request.shopName,
      shopAddress: request.shopAddress,
      adharNo: request.adharNo,
      email: request.email,
      password: hashedPassword,
      isApproved: true,
    });
    await vendor.save();

    // update request status
    request.status = "approved";
    await request.save();

    res.json({ message: "Vendor approved", vendor });
  } catch (err) {
    console.error("❌ Approve error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Reject request ----------------
exports.rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await VendorRequest.findByIdAndUpdate(id, { status: "rejected" });
    res.json({ message: "Request rejected" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Delete request ----------------
exports.deleteRequest = async (req, res) => {
  try {
    await VendorRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
