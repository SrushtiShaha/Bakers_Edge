// // // const Admin = require("../models/Admin");
// // // const VendorRequest = require("../models/VendorRequest");
// // // const Vendor = require("../models/Vendor");
// // // const bcrypt = require("bcryptjs");
// // // const jwt = require("jsonwebtoken");
// // // const sendSms = require("../utils/sendSms");   
// // // const sendEmail = require("../utils/sendEmail");

// // // // ---------------- Admin Login ----------------
// // // exports.adminLogin = async (req, res) => {
// // //   try {
// // //     const { username, password } = req.body;

// // //     if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
// // //       return res.status(401).json({ message: "Invalid admin credentials" });
// // //     }

// // //     const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
// // //       expiresIn: "1d",
// // //     });

// // //     res.json({ message: "Login successful", token });
// // //   } catch (err) {
// // //     console.error("Admin login error:", err);
// // //     res.status(500).json({ message: "Server error" });
// // //   }
// // // };

// // // // ---------------- Vendor Login ----------------
// // // exports.vendorLogin = async (req, res) => {
// // //   try {
// // //     const { phone, password } = req.body;

// // //     // 1. Find the vendor by phone number
// // //     const vendor = await Vendor.findOne({ phone }); //
// // //     if (!vendor) {
// // //       return res.status(401).json({ message: "Invalid phone number or password" }); //
// // //     }

// // //     // 2. Check if the vendor is approved
// // //     if (!vendor.isApproved) {
// // //         return res.status(403).json({ message: "Account pending approval or disabled" }); //
// // //     }

// // //     // ✅ FIX: Check if the vendor has a password hash before comparison
// // //     if (!vendor.password) {
// // //         console.error(`Vendor ${vendor.email || vendor.phone} found but has no password hash. Account needs admin setup.`);
// // //         return res.status(401).json({ message: "Account setup incomplete. Please contact support or try resetting your password." });
// // //     }

// // //     // 3. Compare password
// // //     const isMatch = await bcrypt.compare(password, vendor.password); //
// // //     if (!isMatch) {
// // //       return res.status(401).json({ message: "Invalid phone number or password" }); //
// // //     }

// // //     // 4. Generate JWT
// // //     const token = jwt.sign(
// // //       { role: "vendor", id: vendor._id, email: vendor.email },
// // //       process.env.JWT_SECRET,
// // //       { expiresIn: "1d" }
// // //     ); //

// // //     res.json({ message: "Vendor login successful", token, vendor }); //
// // //   } catch (err) {
// // //     console.error("Vendor login error:", err);
// // //     res.status(500).json({ message: "Server error" }); //
// // //   }
// // // };

// // // // ---------------- Get Dashboard ----------------
// // // exports.getDashboard = async (req, res) => {
// // //   try {
// // //     res.json({ message: "Admin dashboard data" });
// // //   } catch (err) {
// // //     console.error("Dashboard error:", err);
// // //     res.status(500).json({ message: "Server error" });
// // //   }
// // // };

// // // // ---------------- Get All Vendors ----------------
// // // exports.getAllVendors = async (req, res) => {
// // //   try {
// // //     const vendors = await Vendor.find();
// // //     res.status(200).json(vendors);
// // //   } catch (err) {
// // //     console.error("Error fetching vendors:", err);
// // //     res.status(500).json({ message: "Server error" });
// // //   }
// // // };

// // // // ---------------- Get all pending vendor requests ----------------
// // // exports.getPendingVendors = async (req, res) => {
// // //   try {
// // //     // Fetch all requests that are NOT approved yet
// // //     const pendingRequests = await VendorRequest.find({ isApproved: false }); //
    
// // //     console.log("Pending Vendor Requests:", pendingRequests);

// // //     res.json(pendingRequests);
// // //   } catch (err) {
// // //     console.error("Error fetching pending vendor requests:", err);
// // //     res.status(500).json({ message: "Server error" });
// // //   }
// // // };

// // // // ---------------- Approve vendor request ----------------
// // // exports.approveVendorRequest = async (req, res) => {
// // //   try {
// // //     const { password } = req.body;
// // //     const requestId = req.params.id;

// // //     const request = await VendorRequest.findById(requestId);
// // //     if (!request) {
// // //       console.log(`[APPROVE ERROR] Request ID ${requestId} not found.`);
// // //       return res.status(404).json({ message: "Request not found" });
// // //     }

// // //     // ✅ CHECK FOR EXISTING VENDOR BEFORE APPROVAL
// // //     const existingVendor = await Vendor.findOne({
// // //       $or: [{ email: request.email }, { adharNo: request.adharNo }] //
// // //     });

// // //     if (existingVendor) {
// // //       // 🛑 Log the conflict details for debugging the 400 error
// // //       console.error(`[APPROVE ERROR] Conflict found for request ${requestId}. 
// // //         Field(s) conflicted: ${existingVendor.email === request.email ? 'Email' : ''} ${existingVendor.adharNo === request.adharNo ? 'Aadhar' : ''}
// // //         Existing Vendor ID: ${existingVendor._id}`);
      
// // //       // ✅ Return a 400 Bad Request if a duplicate is found
// // //       return res.status(400).json({ message: "A vendor with this email or Aadhar number already exists." }); //
// // //     }

// // //     const hashedPassword = await bcrypt.hash(password, 10); //

// // //     const newVendor = new Vendor({
// // //       name: request.name,
// // //       email: request.email,
// // //       phone: request.phone,
// // //       shopName: request.shopName,
// // //       shopAddress: request.shopAddress,
// // //       adharNo: request.adharNo,
// // //       password: hashedPassword,
// // //       isApproved: true
// // //     });

// // //     await newVendor.save(); //
// // //     await VendorRequest.findByIdAndDelete(requestId); //

// // //     // ✅ Send the password via SMS
// // //     const smsBody = `Your vendor account has been approved. Your temporary password is: ${password}. Please login and change it.`;
// // //     await sendSms(request.phone, smsBody); //
// // //     console.log(`[SMS SUCCESS] Sent SMS for vendor ${newVendor.email}`);


// // //     // ✅ Send the password via Email
// // //     const emailSubject = "Vendor Account Approved";
// // //     const emailText = `Hello ${request.name},\n\nYour vendor account for ${request.shopName} has been approved.\nYour temporary password is: ${password}\n\nPlease log in and change your password immediately.\n\nThank you,\nAdmin Team`;
// // //     await sendEmail(request.email, emailSubject, emailText); //
// // //     console.log(`[EMAIL SUCCESS] Sent email for vendor ${newVendor.email}`);


// // //     res.json({ message: "Vendor approved and moved to Vendors", vendor: newVendor }); //
// // //   } catch (err) {
// // //     // 🛑 Log a generic error if the database or external services failed after validation
// // //     console.error("Error approving vendor:", err);
// // //     res.status(500).json({ message: "Server error" }); //
// // //   }
// // // };

// // // // ---------------- Delete/Reject vendor request ----------------
// // // exports.deleteVendorRequest = async (req, res) => {
// // //   try {
// // //     const requestId = req.params.id;
// // //     const deleted = await VendorRequest.findByIdAndDelete(requestId); //

// // //     if (!deleted) return res.status(404).json({ message: "Request not found" }); //

// // //     res.json({ message: "Vendor request deleted" });
// // //   } catch (err) {
// // //     console.error("Error deleting vendor request:", err);
// // //     res.status(500).json({ message: "Server error" }); //
// // //   }
// // // };

// // // // ---------------- DELETE APPROVED VENDOR ----------------
// // // exports.deleteVendor = async (req, res) => {
// // //   try {
// // //     const vendorId = req.params.id;
// // //     const deleted = await Vendor.findByIdAndDelete(vendorId); //

// // //     if (!deleted) {
// // //       console.log(`[DELETE ERROR] Approved Vendor ID ${vendorId} not found.`);
// // //       return res.status(404).json({ message: "Vendor not found" }); //
// // //     }

// // //     console.log(`[DELETE SUCCESS] Approved Vendor ID ${vendorId} deleted.`);
// // //     res.json({ message: "Vendor deleted successfully" });
// // //   } catch (err) {
// // //     console.error("Error deleting approved vendor:", err);
// // //     res.status(500).json({ message: "Server error" }); //
// // //   }
// // // };

// // // // ---------------- Update Vendor ----------------
// // // exports.updateVendor = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body, { new: true }); //
// // //     if (!updatedVendor) {
// // //       return res.status(404).json({ message: "Vendor not found" }); //
// // //     }
// // //     res.json({ message: "Vendor updated successfully", vendor: updatedVendor }); //
// // //   } catch (err) {
// // //     console.error("Error updating vendor:", err);
// // //     res.status(500).json({ message: "Server error" }); //
// // //   }
// // // };

// // // // ---------------- Change Vendor Password ----------------
// // // exports.changeVendorPassword = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const { password } = req.body;

// // //     if (!password || password.length < 8) {
// // //       return res.status(400).json({ message: "Password must be at least 8 characters" }); //
// // //     }

// // //     const vendor = await Vendor.findById(id); //
// // //     if (!vendor) {
// // //       return res.status(404).json({ message: "Vendor not found" }); //
// // //     }

// // //     const hashedPassword = await bcrypt.hash(password, 10); //
// // //     vendor.password = hashedPassword;
// // //     await vendor.save(); //

// // //     res.json({ message: "Password changed successfully" }); //
// // //   } catch (err) {
// // //     console.error("Error changing password:", err);
// // //     res.status(500).json({ message: "Server error" }); //
// // //   }
// // // };

// // const Admin = require("../models/Admin");
// // const VendorRequest = require("../models/VendorRequest");
// // const Vendor = require("../models/Vendor");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const sendSms = require("../utils/sendSms");   
// // const sendEmail = require("../utils/sendEmail");

// // // ---------------- Admin Login ----------------
// // exports.adminLogin = async (req, res) => {
// //   try {
// //     const { username, password } = req.body;

// //     if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
// //       return res.status(401).json({ message: "Invalid admin credentials" });
// //     }

// //     const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
// //       expiresIn: "1d",
// //     });

// //     res.json({ message: "Login successful", token });
// //   } catch (err) {
// //     console.error("Admin login error:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // ---------------- Vendor Login ----------------
// // exports.vendorLogin = async (req, res) => {
// //   try {
// //     const { phone, password } = req.body;

// //     const vendor = await Vendor.findOne({ phone });
// //     if (!vendor) return res.status(401).json({ message: "Invalid phone number or password" });

// //     if (!vendor.isApproved)
// //       return res.status(403).json({ message: "Account pending approval or disabled" });

// //     if (!vendor.password)
// //       return res.status(401).json({ message: "Account setup incomplete. Contact admin." });

// //     const isMatch = await bcrypt.compare(password, vendor.password);
// //     if (!isMatch) return res.status(401).json({ message: "Invalid phone number or password" });

// //     const token = jwt.sign(
// //       { role: "vendor", id: vendor._id, email: vendor.email },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1d" }
// //     );

// //     res.json({ message: "Vendor login successful", token, vendor });
// //   } catch (err) {
// //     console.error("Vendor login error:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // ---------------- Get Dashboard ----------------
// // exports.getDashboard = async (req, res) => {
// //   try {
// //     res.json({ message: "Admin dashboard data" });
// //   } catch (err) {
// //     console.error("Dashboard error:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // ---------------- Get All Vendors ----------------
// // exports.getAllVendors = async (req, res) => {
// //   try {
// //     const vendors = await Vendor.find();
// //     res.status(200).json(vendors);
// //   } catch (err) {
// //     console.error("Error fetching vendors:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // ---------------- Get all pending vendor requests ----------------
// // exports.getPendingVendors = async (req, res) => {
// //   try {
// //     const pendingRequests = await VendorRequest.find({ isApproved: false });
// //     res.json(pendingRequests);
// //   } catch (err) {
// //     console.error("Error fetching pending vendor requests:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // ---------------- Approve vendor request ----------------
// // exports.approveVendorRequest = async (req, res) => {
// //   try {
// //     const { password } = req.body;
// //     const requestId = req.params.id;

// //     const request = await VendorRequest.findById(requestId);
// //     if (!request) return res.status(404).json({ message: "Request not found" });

// //     const existingVendor = await Vendor.findOne({
// //       $or: [{ email: request.email }, { adharNo: request.adharNo }]
// //     });

// //     if (existingVendor)
// //       return res.status(400).json({ message: "Vendor with email or Aadhar already exists." });

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newVendor = new Vendor({
// //       name: request.name,
// //       email: request.email,
// //       phone: request.phone,
// //       shopName: request.shopName,
// //       shopAddress: request.shopAddress,
// //       adharNo: request.adharNo,
// //       password: hashedPassword,
// //       isApproved: true
// //     });

// //     await newVendor.save();
// //     await VendorRequest.findByIdAndDelete(requestId);

// //     await sendSms(request.phone, `Your vendor account is approved. Temporary password: ${password}`);
// //     await sendEmail(
// //       request.email,
// //       "Vendor Account Approved",
// //       `Hello ${request.name},\nYour vendor account has been approved.\nTemporary password: ${password}`
// //     );

// //     res.json({ message: "Vendor approved and moved to Vendors", vendor: newVendor });
// //   } catch (err) {
// //     console.error("Error approving vendor:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // ---------------- Delete/Reject vendor request ----------------
// // exports.deleteVendorRequest = async (req, res) => {
// //   try {
// //     const requestId = req.params.id;
// //     const deleted = await VendorRequest.findByIdAndDelete(requestId);
// //     if (!deleted) return res.status(404).json({ message: "Request not found" });
// //     res.json({ message: "Vendor request deleted" });
// //   } catch (err) {
// //     console.error("Error deleting vendor request:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // ---------------- DELETE APPROVED VENDOR ----------------
// // exports.deleteVendor = async (req, res) => {
// //   try {
// //     const vendorId = req.params.id;
// //     const deleted = await Vendor.findByIdAndDelete(vendorId);
// //     if (!deleted) return res.status(404).json({ message: "Vendor not found" });
// //     res.json({ message: "Vendor deleted successfully" });
// //   } catch (err) {
// //     console.error("Error deleting approved vendor:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // ---------------- Update Vendor ----------------
// // exports.updateVendor = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body, { new: true });
// //     if (!updatedVendor) return res.status(404).json({ message: "Vendor not found" });
// //     res.json({ message: "Vendor updated successfully", vendor: updatedVendor });
// //   } catch (err) {
// //     console.error("Error updating vendor:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // ---------------- Change Vendor Password ----------------
// // exports.changeVendorPassword = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { password } = req.body;

// //     if (!password || password.length < 8)
// //       return res.status(400).json({ message: "Password must be at least 8 characters" });

// //     const vendor = await Vendor.findById(id);
// //     if (!vendor) return res.status(404).json({ message: "Vendor not found" });

// //     vendor.password = await bcrypt.hash(password, 10);
// //     await vendor.save();

// //     res.json({ message: "Password changed successfully" });
// //   } catch (err) {
// //     console.error("Error changing password:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // ---------------- Get logged-in vendor info ----------------
// // // exports.getVendorMe = async (req, res) => {
// // //   try {
// // //     const vendor = await Vendor.findById(req.vendorId).select("name shopName phone email");
// // //     if (!vendor) return res.status(404).json({ message: "Vendor not found" });

// // //     res.json({
// // //       vendorName: vendor.name,
// // //       shopName: vendor.shopName,
// // //       phone: vendor.phone,
// // //       email: vendor.email
// // //     });
// // //   } catch (err) {
// // //     console.error("Get vendor info error:", err);
// // //     res.status(500).json({ message: "Server error" });
// // //   }
// // // };

// // // exports.getVendorMe = async (req, res) => {
// // //   try {
// // //     const vendor = await Vendor.findById(req.vendorId).select("name shopName phone shopAddress email");
// // //     if (!vendor) return res.status(404).json({ message: "Vendor not found" });

// // //     res.json({
// // //       vendorName: vendor.name,
// // //       shopName: vendor.shopName,
// // //       shopAddress: vendor.shopAddress,
// // //       phone: vendor.phone,
// // //       email: vendor.email
// // //     });
// // //   } catch (err) {
// // //     console.error("Get vendor info error:", err);
// // //     res.status(500).json({ message: "Server error" });
// // //   }
// // // };

// // exports.updateVendorMe = async (req, res) => {
// //   try {
// //     const vendorId = req.vendorId; // from vendorAuth middleware
// //     const { shopName, contact, upiId, upiQr } = req.body;

// //     const vendor = await Vendor.findById(vendorId);
// //     if (!vendor) return res.status(404).json({ message: "Vendor not found" });

// //     if (shopName) vendor.shopName = shopName;
// //     if (contact) vendor.contact = contact;
// //     if (upiId) vendor.upiId = upiId;
// //     if (upiQr) vendor.upiQr = upiQr;

// //     await vendor.save();

// //     res.json({ message: "Vendor settings updated successfully", vendor });
// //   } catch (err) {
// //     console.error("Error updating vendor info:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // ---------------- Get logged-in vendor info ----------------
// // exports.getVendorMe = async (req, res) => {
// //   try {
// //     const vendor = await Vendor.findById(req.vendorId).select(
// //       "name shopName phone shopAddress email upiId upiQr contact"
// //     );
// //     if (!vendor) return res.status(404).json({ message: "Vendor not found" });

// //     res.json({
// //       vendorName: vendor.name,
// //       shopName: vendor.shopName,
// //       shopAddress: vendor.shopAddress,
// //       phone: vendor.phone,
// //       email: vendor.email,
// //       contact: vendor.contact,
// //       upiId: vendor.upiId,
// //       upiQr: vendor.upiQr,
// //     });
// //   } catch (err) {
// //     console.error("Get vendor info error:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// const Admin = require("../models/Admin");
// const VendorRequest = require("../models/VendorRequest");
// const Vendor = require("../models/Vendor");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const sendSms = require("../utils/sendSms");
// const sendEmail = require("../utils/sendEmail");

// // ---------------- Admin Login ----------------
// exports.adminLogin = async (req, res) => {
//   // ... (No change here)
//   try {
//     const { username, password } = req.body;

//     if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
//       return res.status(401).json({ message: "Invalid admin credentials" });
//     }

//     const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.json({ message: "Login successful", token });
//   } catch (err) {
//     console.error("Admin login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ---------------- Vendor Login (FIXED) ----------------
// exports.vendorLogin = async (req, res) => {
//   try {
//     const { phone, password } = req.body; // 'phone' arrives as "+919876543210"

//     // 1. Create the 10-digit version of the phone number
//     const phoneWithoutPrefix = phone.startsWith('+91') ? phone.substring(3) : phone;

//     // 2. Search for a vendor who has EITHER the prefixed number OR just the 10 digits
//     const vendor = await Vendor.findOne({
//       $or: [{ phone: phone }, { phone: phoneWithoutPrefix }]
//     });
    
//     // 3. Continue with original logic
//     if (!vendor) return res.status(401).json({ message: "Invalid phone number or password" });

//     if (!vendor.isApproved)
//       return res.status(403).json({ message: "Account pending approval or disabled" });

//     if (!vendor.password)
//       return res.status(401).json({ message: "Account setup incomplete. Contact admin." });

//     const isMatch = await bcrypt.compare(password, vendor.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid phone number or password" });

//     const token = jwt.sign(
//       { role: "vendor", id: vendor._id, email: vendor.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({ message: "Vendor login successful", token, vendor });
//   } catch (err) {
//     console.error("Vendor login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ---------------- Get Dashboard ----------------
// exports.getDashboard = async (req, res) => {
//   // ... (No change here)
//   try {
//     res.json({ message: "Admin dashboard data" });
//   } catch (err) {
//     console.error("Dashboard error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ---------------- Get All Vendors ----------------
// exports.getAllVendors = async (req, res) => {
//   // ... (No change here)
//   try {
//     const vendors = await Vendor.find();
//     res.status(200).json(vendors);
//   } catch (err) {
//     console.error("Error fetching vendors:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ---------------- Get all pending vendor requests ----------------
// exports.getPendingVendors = async (req, res) => {
//   // ... (No change here)
//   try {
//     const pendingRequests = await VendorRequest.find({ isApproved: false });
//     res.json(pendingRequests);
//   } catch (err) {
//     console.error("Error fetching pending vendor requests:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ---------------- Approve vendor request ----------------
// exports.approveVendorRequest = async (req, res) => {
//   // ... (No change here)
//   try {
//     const { password } = req.body;
//     const requestId = req.params.id;

//     const request = await VendorRequest.findById(requestId);
//     if (!request) return res.status(404).json({ message: "Request not found" });

//     const existingVendor = await Vendor.findOne({
//       $or: [{ email: request.email }, { adharNo: request.adharNo }]
//     });

//     if (existingVendor)
//       return res.status(400).json({ message: "Vendor with email or Aadhar already exists." });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newVendor = new Vendor({
//       name: request.name,
//       email: request.email,
//       phone: request.phone,
//       shopName: request.shopName,
//       shopAddress: request.shopAddress,
//       adharNo: request.adharNo,
//       password: hashedPassword,
//       isApproved: true
//     });

//     await newVendor.save();
//     await VendorRequest.findByIdAndDelete(requestId);

//     await sendSms(request.phone, `Your vendor account is approved. Temporary password: ${password}`);
//     await sendEmail(
//       request.email,
//       "Vendor Account Approved",
//       `Hello ${request.name},\nYour vendor account has been approved.\nTemporary password: ${password}`
//     );

//     res.json({ message: "Vendor approved and moved to Vendors", vendor: newVendor });
//   } catch (err) {
//     console.error("Error approving vendor:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ---------------- Delete/Reject vendor request ----------------
// exports.deleteVendorRequest = async (req, res) => {
//   // ... (No change here)
//   try {
//     const requestId = req.params.id;
//     const deleted = await VendorRequest.findByIdAndDelete(requestId);
//     if (!deleted) return res.status(404).json({ message: "Request not found" });
//     res.json({ message: "Vendor request deleted" });
//   } catch (err) {
//     console.error("Error deleting vendor request:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ---------------- DELETE APPROVED VENDOR ----------------
// exports.deleteVendor = async (req, res) => {
//   // ... (No change here)
//   try {
//     const vendorId = req.params.id;
//     const deleted = await Vendor.findByIdAndDelete(vendorId);
//     if (!deleted) return res.status(404).json({ message: "Vendor not found" });
//     res.json({ message: "Vendor deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting approved vendor:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ---------------- Update Vendor ----------------
// exports.updateVendor = async (req, res) => {
//   // ... (No change here)
//   try {
//     const { id } = req.params;
//     const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updatedVendor) return res.status(404).json({ message: "Vendor not found" });
//     res.json({ message: "Vendor updated successfully", vendor: updatedVendor });
//   } catch (err) {
//     console.error("Error updating vendor:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ---------------- Change Vendor Password ----------------
// exports.changeVendorPassword = async (req, res) => {
//   // ... (No change here)
//   try {
//     const { id } = req.params;
//     const { password } = req.body;

//     if (!password || password.length < 8)
//       return res.status(400).json({ message: "Password must be at least 8 characters" });

//     const vendor = await Vendor.findById(id);
//     if (!vendor) return res.status(404).json({ message: "Vendor not found" });

//     vendor.password = await bcrypt.hash(password, 10);
//     await vendor.save();

//     res.json({ message: "Password changed successfully" });
//   } catch (err) {
//     console.error("Error changing password:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ---------------- Update logged-in vendor info ----------------
// exports.updateVendorMe = async (req, res) => {
//   // ... (No change here)
//   try {
//     const vendorId = req.vendorId; // from vendorAuth middleware
//     const { shopName, contact, upiId, upiQr } = req.body;

//     const vendor = await Vendor.findById(vendorId);
//     if (!vendor) return res.status(404).json({ message: "Vendor not found" });

//     if (shopName) vendor.shopName = shopName;
//     if (contact) vendor.contact = contact;
//     if (upiId) vendor.upiId = upiId;
//     if (upiQr) vendor.upiQr = upiQr;

//     await vendor.save();

//     res.json({ message: "Vendor settings updated successfully", vendor });
//   } catch (err) {
//     console.error("Error updating vendor info:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ---------------- Get logged-in vendor info ----------------
// exports.getVendorMe = async (req, res) => {
//   // ... (No change here)
//   try {
//     const vendor = await Vendor.findById(req.vendorId).select(
//       "name shopName phone shopAddress email upiId upiQr contact"
//     );
//     if (!vendor) return res.status(404).json({ message: "Vendor not found" });

//     res.json({
//       vendorName: vendor.name,
//       shopName: vendor.shopName,
//       shopAddress: vendor.shopAddress,
//       phone: vendor.phone,
//       email: vendor.email,
//       contact: vendor.contact,
//       upiId: vendor.upiId,
//       upiQr: vendor.upiQr,
//     });
//   } catch (err) {
//     console.error("Get vendor info error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.updateMyPassword = async (req, res) => {
//   try {
//     const vendorId = req.vendorId; // from vendorAuth middleware
//     const { currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ message: "Current and new passwords are required" });
//     }

//     if (newPassword.length < 8) {
//       return res.status(400).json({ message: "New password must be at least 8 characters" });
//     }

//     const vendor = await Vendor.findById(vendorId);
//     if (!vendor) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }

//     // Check if the current password is correct
//     const isMatch = await bcrypt.compare(currentPassword, vendor.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Incorrect current password" });
//     }

//     // Hash the new password
//     vendor.password = await bcrypt.hash(newPassword, 10);
//     await vendor.save();

//     res.json({ message: "Password updated successfully" });

//   } catch (err) {
//     console.error("Error updating vendor password:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const Admin = require("../models/Admin");
const VendorRequest = require("../models/VendorRequest");
const Vendor = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendSms = require("../utils/sendSms");
const sendEmail = require("../utils/sendEmail");
const excel = require('exceljs');
const PDFDocument = require('pdfkit');

// ... (all other functions remain the same) ...

// ---------------- Admin Login ----------------
exports.adminLogin = async (req, res) => {
  // ... (No change here)
  try {
    const { username, password } = req.body;

    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Vendor Login (FIXED) ----------------
exports.vendorLogin = async (req, res) => {
  // ... (No change here)
  try {
    const { phone, password } = req.body; // 'phone' arrives as "+919876543210"

    // 1. Create the 10-digit version of the phone number
    const phoneWithoutPrefix = phone.startsWith('+91') ? phone.substring(3) : phone;

    // 2. Search for a vendor who has EITHER the prefixed number OR just the 10 digits
    const vendor = await Vendor.findOne({
      $or: [{ phone: phone }, { phone: phoneWithoutPrefix }]
    });
    
    // 3. Continue with original logic
    if (!vendor) return res.status(401).json({ message: "Invalid phone number or password" });

    if (!vendor.isApproved)
      return res.status(403).json({ message: "Account pending approval or disabled" });

    if (!vendor.password)
      return res.status(401).json({ message: "Account setup incomplete. Contact admin." });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid phone number or password" });

    const token = jwt.sign(
      { role: "vendor", id: vendor._id, email: vendor.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Vendor login successful", token, vendor });
  } catch (err) {
    console.error("Vendor login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Get Dashboard ----------------
exports.getDashboard = async (req, res) => {
  // ... (No change here)
  try {
    res.json({ message: "Admin dashboard data" });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Get All Vendors ----------------
exports.getAllVendors = async (req, res) => {
  // ... (No change here)
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (err) {
    console.error("Error fetching vendors:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Get all pending vendor requests ----------------
exports.getPendingVendors = async (req, res) => {
  // ... (No change here)
  try {
    const pendingRequests = await VendorRequest.find({ isApproved: false });
    res.json(pendingRequests);
  } catch (err) {
    console.error("Error fetching pending vendor requests:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Approve vendor request ----------------
exports.approveVendorRequest = async (req, res) => {
  // ... (No change here)
  try {
    const { password } = req.body;
    const requestId = req.params.id;

    const request = await VendorRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    const existingVendor = await Vendor.findOne({
      $or: [{ email: request.email }, { adharNo: request.adharNo }]
    });

    if (existingVendor)
      return res.status(400).json({ message: "Vendor with email or Aadhar already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      name: request.name,
      email: request.email,
      phone: request.phone,
      shopName: request.shopName,
      shopAddress: request.shopAddress,
      adharNo: request.adharNo,
      password: hashedPassword,
      isApproved: true
    });

    await newVendor.save();
    await VendorRequest.findByIdAndDelete(requestId);

    await sendSms(request.phone, `Your vendor account is approved. Temporary password: ${password}`);
    await sendEmail(
      request.email,
      "Vendor Account Approved",
      `Hello ${request.name},\nYour vendor account has been approved.\nTemporary password: ${password}`
    );

    res.json({ message: "Vendor approved and moved to Vendors", vendor: newVendor });
  } catch (err) {
    console.error("Error approving vendor:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Delete/Reject vendor request ----------------
exports.deleteVendorRequest = async (req, res) => {
  // ... (No change here)
  try {
    const requestId = req.params.id;
    const deleted = await VendorRequest.findByIdAndDelete(requestId);
    if (!deleted) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Vendor request deleted" });
  } catch (err) {
    console.error("Error deleting vendor request:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- DELETE APPROVED VENDOR ----------------
exports.deleteVendor = async (req, res) => {
  // ... (No change here)
  try {
    const vendorId = req.params.id;
    const deleted = await Vendor.findByIdAndDelete(vendorId);
    if (!deleted) return res.status(404).json({ message: "Vendor not found" });
    res.json({ message: "Vendor deleted successfully" });
  } catch (err) {
    console.error("Error deleting approved vendor:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Update Vendor ----------------
exports.updateVendor = async (req, res) => {
  // ... (No change here)
  try {
    const { id } = req.params;
    const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedVendor) return res.status(404).json({ message: "Vendor not found" });
    res.json({ message: "Vendor updated successfully", vendor: updatedVendor });
  } catch (err) {
    console.error("Error updating vendor:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Change Vendor Password (by Admin) ----------------
exports.changeVendorPassword = async (req, res) => {
  // ... (No change here)
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters" });

    const vendor = await Vendor.findById(id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    vendor.password = await bcrypt.hash(password, 10);
    await vendor.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Update logged-in vendor info ----------------
exports.updateVendorMe = async (req, res) => {
  // ... (No change here)
  try {
    const vendorId = req.vendorId; // from vendorAuth middleware
    const { shopName, contact, upiId, upiQr } = req.body;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    if (shopName) vendor.shopName = shopName;
    if (contact) vendor.contact = contact;
    if (upiId) vendor.upiId = upiId;
    if (upiQr) vendor.upiQr = upiQr;

    await vendor.save();

    res.json({ message: "Vendor settings updated successfully", vendor });
  } catch (err) {
    console.error("Error updating vendor info:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Get logged-in vendor info ----------------
exports.getVendorMe = async (req, res) => {
  // ... (No change here)
  try {
    const vendor = await Vendor.findById(req.vendorId).select(
      "name shopName phone shopAddress email upiId upiQr contact"
    );
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    res.json({
      vendorName: vendor.name,
      shopName: vendor.shopName,
      shopAddress: vendor.shopAddress,
      phone: vendor.phone,
      email: vendor.email,
      contact: vendor.contact,
      upiId: vendor.upiId,
      upiQr: vendor.upiQr,
    });
  } catch (err) {
    console.error("Get vendor info error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// --- UPDATED ---
// ---------------- Change Logged-in Vendor's Own Password ----------------
// exports.updateMyPassword = async (req, res) => {
//   try {
//     const vendorId = req.vendorId; // from vendorAuth middleware
    
//     // Trim the incoming values from req.body
//     const currentPassword = req.body.currentPassword ? req.body.currentPassword.trim() : "";
//     const newPassword = req.body.newPassword ? req.body.newPassword.trim() : "";

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ message: "Current and new passwords are required" });
//     }
    
//     // Check length *after* trimming
//     if (newPassword.length < 8) {
//       return res.status(400).json({ message: "New password must be at least 8 characters" });
//     }

//     const vendor = await Vendor.findById(vendorId);
//     if (!vendor) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }

//     // Compare the trimmed current password
//     const isMatch = await bcrypt.compare(currentPassword, vendor.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Incorrect current password" });
//     }

//     // Hash and save the trimmed new password
//     vendor.password = await bcrypt.hash(newPassword, 10);
//     await vendor.save();

//     res.json({ message: "Password updated successfully" });

//   } catch (err) {
//     console.error("Error updating vendor password:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// ---------------- Change Logged-in Vendor's Own Password ----------------
exports.updateMyPassword = async (req, res) => {
  try {
    const vendorId = req.vendorId; // from vendorAuth middleware
    const { currentPassword, newPassword } = req.body;

    console.log("🔹 Received password data:", req.body); // ✅ Debug log
    
    // ✅ 1. Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new passwords are required" });
    }

    if (newPassword.trim().length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters" });
    }

    // ✅ 2. Find vendor
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // ✅ 3. Check current password
    const isMatch = await bcrypt.compare(currentPassword, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    // ✅ 4. Hash and save new password
    vendor.password = await bcrypt.hash(newPassword.trim(), 10);
    await vendor.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("❌ Error updating vendor password:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * [NEW] Export Vendors to Excel
 */
exports.exportVendorsToExcel = async (req, res) => {
  try {
    const vendors = await Vendor.find({ isApproved: true });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Approved Vendors");

    worksheet.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Shop Name", key: "shopName", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Aadhar No", key: "adharNo", width: 20 },
      { header: "Shop Address", key: "shopAddress", width: 50 },
    ];

    vendors.forEach((vendor) => {
      worksheet.addRow(vendor);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "approved_vendors.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Error exporting to Excel:", err);
    res.status(500).json({ message: "Error exporting to Excel" });
  }
};

/**
 * [NEW] Export Vendors to PDF
 */
exports.exportVendorsToPdf = async (req, res) => {
  try {
    const vendors = await Vendor.find({ isApproved: true });

    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "approved_vendors.pdf"
    );

    doc.pipe(res);

    // Title
    doc.fontSize(18).font("Helvetica-Bold").text("Approved Vendors List", { align: "center" });
    doc.moveDown();

    // Loop through vendors
    vendors.forEach((vendor) => {
      doc.fontSize(12).font("Helvetica-Bold").text(`Shop: ${vendor.shopName}`);
      doc.fontSize(10).font("Helvetica")
         .text(`Name: ${vendor.name}`)
         .text(`Email: ${vendor.email}`)
         .text(`Phone: ${vendor.phone}`)
         .text(`Aadhar: ${vendor.adharNo}`)
         .text(`Address: ${vendor.shopAddress}`);
      doc.moveDown();
      doc.lineCap('butt').moveTo(30, doc.y).lineTo(565, doc.y).stroke();
      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    console.error("Error exporting to PDF:", err);
    res.status(500).json({ message: "Error exporting to PDF" });
  }
};