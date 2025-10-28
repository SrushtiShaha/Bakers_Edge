// // const jwt = require("jsonwebtoken");

// // const vendorAuth = (req, res, next) => {
// //   const authHeader = req.headers["authorization"];
// //   const token = authHeader && authHeader.split(" ")[1];

// //   if (!token) return res.status(401).json({ message: "Unauthorized" });

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.vendorId = decoded.id; // minimal info
// //     next();
// //   } catch (err) {
// //     return res.status(403).json({ message: "Invalid token" });
// //   }
// // };

// // module.exports = vendorAuth;

// // Example structure for vendorAuth.js

// const jwt = require('jsonwebtoken');
// const Vendor = require('../models/Vendor'); // Assuming you might check against DB

// const vendorAuth = async (req, res, next) => {
//     const authHeader = req.header('Authorization');
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         console.log('[vendorAuth] Failed: No Bearer token found');
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     const token = authHeader.replace('Bearer ', '');
//     // --- Log the received token ---
//     // console.log('[vendorAuth] Received Token:', token); // Optional: Only log if needed, can be verbose

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // --- Log the decoded payload ---
//         console.log('[vendorAuth] Decoded Token Payload:', decoded);

//         // --- IMPORTANT: Ensure 'id' exists in your payload and attach it ---
//         if (!decoded.id) {
//              console.error('[vendorAuth] Failed: Token payload missing "id" field.');
//              return res.status(401).json({ message: 'Token is invalid (missing ID)' });
//         }
//         req.vendorId = decoded.id; // Or decoded._id, depending on how you sign it
        
//         // --- Log the attached ID ---
//         console.log('[vendorAuth] Attached req.vendorId:', req.vendorId); 

//         // Optional: Check if vendor still exists in DB
//         // const vendor = await Vendor.findById(req.vendorId);
//         // if (!vendor) throw new Error('Vendor not found');

//         next(); // Proceed to the controller function
//     } catch (err) {
//         console.error('[vendorAuth] Failed:', err.message);
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };

// module.exports = vendorAuth;

// middleware/vendorAuth.js
const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor'); // Assuming you might check against DB

const vendorAuth = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('[vendorAuth] Failed: No Bearer token found');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    // --- Log the received token ---
    // console.log('[vendorAuth] Received Token:', token); // Optional: Only log if needed, can be verbose

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // --- Log the decoded payload ---
        console.log('[vendorAuth] Decoded Token Payload:', decoded);

        // --- IMPORTANT: Ensure 'id' exists in your payload and attach it ---
        if (!decoded.id) {
             console.error('[vendorAuth] Failed: Token payload missing "id" field.');
             return res.status(401).json({ message: 'Token is invalid (missing ID)' });
        }
        req.vendorId = decoded.id; // Or decoded._id, depending on how you sign it
        
        // --- Log the attached ID ---
        console.log('[vendorAuth] Attached req.vendorId:', req.vendorId); 

        // Optional: Check if vendor still exists in DB
        // const vendor = await Vendor.findById(req.vendorId);
        // if (!vendor) throw new Error('Vendor not found');

        next(); // Proceed to the controller function
    } catch (err) {
        console.error('[vendorAuth] Failed:', err.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = vendorAuth;