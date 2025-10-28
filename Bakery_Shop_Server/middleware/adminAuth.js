// // // middleware/adminAuth.js
// // const jwt = require("jsonwebtoken");

// // const adminAuth = (req, res, next) => {
// //   const authHeader = req.headers["authorization"];

// //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //     return res.status(401).json({ message: "Unauthorized - No token" });
// //   }

// //   const token = authHeader.split(" ")[1]; // "Bearer <token>"
// //   if (!token) {
// //     return res.status(401).json({ message: "Invalid token format" });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.admin = decoded; // store admin info
// //     next();
// //   } catch (err) {
// //     return res.status(401).json({ message: "Invalid or expired token" });
// //   }
// // };

// // module.exports = function(req, res, next) {
// //   const authHeader = req.headers.authorization;

// //   if (!authHeader || !authHeader.startsWith('Bearer ')) {
// //     return res.status(401).json({ msg: 'No token provided' });
// //   }

// //   const token = authHeader.split(' ')[1];

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.admin = decoded;
// //     next();
// //   } catch (err) {
// //     return res.status(401).json({ msg: 'Invalid or expired token' });
// //   }
// // };

// // module.exports = adminAuth;

// // middleware/adminAuth.js
// const jwt = require("jsonwebtoken");

// const adminAuth = (req, res, next) => {
//   const authHeader = req.headers["authorization"];

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized - No token" });
//   }

//   const token = authHeader.split(" ")[1]; // "Bearer <token>"
//   if (!token) {
//     return res.status(401).json({ message: "Invalid token format" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = decoded; // store admin info
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = adminAuth;

// middleware/adminAuth.js
const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // store admin info
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminAuth;