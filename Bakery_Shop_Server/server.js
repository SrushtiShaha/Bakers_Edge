// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const dotenv = require('dotenv');
// // // const cors = require('cors');
// // // const vendorRoutes = require('./routes/vendorRoutes');
// // // const adminRoutes = require('./routes/adminRoutes');

// // // dotenv.config(); 
// // // const app = express();

// // // // ✅ Only one CORS import + use
// // // app.use(cors({
// // //   origin: ['http://localhost:3000', 'https://bakery-shop-client.vercel.app'],
// // //   credentials: true
// // // }));

// // // app.use(express.json());

// // // // MongoDB Connection
// // // const MONGO_URI = process.env.MONGO_URI;
// // // if (!MONGO_URI) {
// // //   console.error('.env file is missing or MONGO_URI not defined');
// // //   process.exit(1);
// // // }

// // // // mongoose.connect(MONGO_URI, {
// // // //   dbName: "bakery_shop_db"
// // // // })
// // // mongoose.connect(process.env.MONGO_URI, {
// // //   useNewUrlParser: true,
// // //   useUnifiedTopology: true
// // // })
// // // .then(() => console.log("MongoDB connected"))
// // // .catch(err => console.error("MongoDB connection error:", err));

// // // // Test route
// // // app.get('/', (req, res) => {
// // //   res.send('Bakery Server is running ✅');
// // // });

// // // // API Routes
// // // app.use('/api/customers', require('./routes/customerRoutes'));
// // // app.use('/api/products', require('./routes/productRoutes'));
// // // app.use('/api/sales', require('./routes/salesRoutes'));
// // // app.use('/api/ledger', require('./routes/ledgerRoutes'));
// // // app.use('/api/reports', require('./routes/reportRoutes'));
// // // app.use('/api/admin', adminRoutes);
// // // app.use('/api/vendor', vendorRoutes);

// // // // 404 Handler
// // // app.use((req, res) => {
// // //   res.status(404).json({ message: 'Route not found' });
// // // });

// // // // ✅ Only one app.listen
// // // const PORT = process.env.PORT || 10000;
// // // app.listen(PORT, () => {
// // //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// // // });

// // // require('dotenv').config(); // MUST be the first line to load variables before modules use them
// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // // const dotenv = require('dotenv'); // Removed unused import variable
// // // const cors = require('cors');
// // // const vendorRoutes = require('./routes/vendorRoutes');
// // // const adminRoutes = require('./routes/adminRoutes');
// // // const router = express.Router();
// // // const productRoutes = require('./routes/productRoutes');
// // // const salesRoutes = require('./routes/salesRoutes');
// // // const expiredProductRoutes = require('./routes/expiredProductRoutes');
// // // const reportRoutes = require('./routes/reportRoutes');

// // // const app = express();

// // // app.use(cors()); // Use cors
// // // app.use(express.json());

// // // // ✅ Only one CORS import + use
// // // app.use(cors({
// // //   origin: ['http://localhost:3000', 'https://bakery-shop-client.vercel.app'],
// // //   credentials: true
// // // }));

// // // //app.use(express.json());
// // // app.use(express.json({ limit: '10mb' }));
// // // app.use(express.urlencoded({ limit: '10mb', extended: true }));

// // // // MongoDB Connection
// // // // We can remove the local variable definition since dotenv is now guaranteed to be loaded.
// // // const MONGO_URI = process.env.MONGO_URI; 
// // // if (!MONGO_URI) {
// // //   console.error('.env file is missing or MONGO_URI not defined');
// // //   process.exit(1);
// // // }

// // // mongoose.connect(process.env.MONGO_URI, {
// // //   useNewUrlParser: true,
// // //   useUnifiedTopology: true
// // // })
// // // .then(() => console.log("MongoDB connected"))
// // // .catch(err => console.error("MongoDB connection error:", err));

// // // // Test route
// // // app.get('/', (req, res) => {
// // //   res.send('Bakery Server is running ✅');
// // // });

// // // // API Routes
// // // app.use('/api/customers', require('./routes/customerRoutes'));
// // // app.use('/api/products', require('./routes/productRoutes'));
// // // app.use('/api/sales', require('./routes/salesRoutes'));
// // // app.use('/api/ledger', require('./routes/ledgerRoutes'));
// // // app.use('/api/reports', require('./routes/reportRoutes'));
// // // app.use('/api/expired-products', expiredProductRoutes);
// // // app.use('/api/admin', adminRoutes);
// // // app.use('/api/vendor', vendorRoutes);
// // // app.use('/api/reports', reportRoutes);

// // // // 404 Handler
// // // app.use((req, res) => {
// // //   res.status(404).json({ message: 'Route not found' });
// // // });

// // // // ✅ Only one app.listen
// // // const PORT = process.env.PORT || 10000;
// // // app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// // // app.listen(PORT, () => {
// // //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// // // });

// // // --- CORRECT (for Mongoose) ---
// // // This updates all fields in the request body

// // require('dotenv').config(); // This MUST be the first line
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');

// // // --- Import all your route files ---
// // const vendorRoutes = require('./routes/vendorRoutes');
// // const adminRoutes = require('./routes/adminRoutes');
// // const productRoutes = require('./routes/productRoutes');
// // const salesRoutes = require('./routes/salesRoutes');
// // const expiredProductRoutes = require('./routes/expiredProductRoutes');
// // const reportRoutes = require('./routes/reportRoutes');
// // const customerRoutes = require('./routes/customerRoutes');
// // const ledgerRoutes = require('./routes/ledgerRoutes');

// // const app = express();

// // // --- Middleware Setup ---
// // // 1. Configure CORS
// // app.use(cors({
// //   origin: ['http://localhost:3000', 'https://bakery-shop-client.vercel.app'],
// //   credentials: true
// // }));

// // // 2. Configure Body Parsers (This fixes the 'req.body' is empty problem)
// // // Increased limit for large payloads (like base64 QR code images)
// // app.use(express.json({ limit: '10mb' }));
// // app.use(express.urlencoded({ limit: '10mb', extended: true }));


// // // --- MongoDB Connection ---
// // const MONGO_URI = process.env.MONGO_URI; 
// // if (!MONGO_URI) {
// //   console.error('.env file is missing or MONGO_URI not defined');
// //   process.exit(1);
// // }

// // mongoose.connect(MONGO_URI, { // Removed deprecated options
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // })
// // .then(() => console.log("MongoDB connected"))
// // .catch(err => console.error("MongoDB connection error:", err));


// // // --- API Routes ---
// // // (These MUST come AFTER the middleware setup)
// // app.use('/api/customers', customerRoutes);
// // app.use('/api/products', productRoutes);
// // app.use('/api/sales', salesRoutes);
// // app.use('/api/ledger', ledgerRoutes);
// // app.use('/api/reports', reportRoutes);
// // app.use('/api/expired-products', expiredProductRoutes);
// // app.use('/api/admin', adminRoutes);
// // app.use('/api/vendor', vendorRoutes);


// // // --- Test Route ---
// // app.get('/', (req, res) => {
// //   res.send('Bakery Server is running ✅');
// // });


// // // --- 404 Handler ---
// // // (This should be after all other routes)
// // app.use((req, res) => {
// //   res.status(404).json({ message: 'Route not found' });
// // });


// // // --- Start Server ---
// // const PORT = process.env.PORT || 10000;
// // app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// // router.put('/api/products/:id', async (req, res) => {
// //   try {
// //     const updatedProduct = await Product.findByIdAndUpdate(
// //       req.params.id,
// //       req.body, // <-- This passes the *entire* payload (quantity, price, dates)
// //       { 
// //         new: true, // This returns the new, updated document
// //         runValidators: true 
// //       }
// //     );

// //     if (!updatedProduct) {
// //       return res.status(404).json({ message: 'Product not found' });
// //     }
    
// //     // This now returns the fully updated product to your React app
// //     res.json(updatedProduct); 

// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// require('dotenv').config(); // This MUST be the first line
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // --- Import all your route files ---
// const vendorRoutes = require('./routes/vendorRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const productRoutes = require('./routes/productRoutes');
// const salesRoutes = require('./routes/salesRoutes');
// const expiredProductRoutes = require('./routes/expiredProductRoutes');
// const reportRoutes = require('./routes/reportRoutes');
// const customerRoutes = require('./routes/customerRoutes');
// const ledgerRoutes = require('./routes/ledgerRoutes');

// const app = express();

// // --- Middleware Setup ---
// // 1. Configure CORS
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://bakery-shop-client.vercel.app'],
//   credentials: true
// }));


// // 2. Configure Body Parsers (This fixes the 'req.body' is empty problem)
// // Increased limit for large payloads (like base64 QR code images)
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

// // --- MongoDB Connection ---
// const MONGO_URI = process.env.MONGO_URI; 
// if (!MONGO_URI) {
//   console.error('.env file is missing or MONGO_URI not defined');
//   process.exit(1);
// }

// // REMOVED 'useNewUrlParser' and 'useUnifiedTopology'
// mongoose.connect(MONGO_URI) 
// .then(() => console.log("MongoDB connected"))
// .catch(err => console.error("MongoDB connection error:", err));


// // --- API Routes ---
// // (These MUST come AFTER the middleware setup)
// app.use('/api/customers', customerRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/sales', salesRoutes);
// app.use('/api/ledger', ledgerRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/expired-products', expiredProductRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/vendor', vendorRoutes);


// // --- Test Route ---
// app.get('/', (req, res) => {
//   res.send('Bakery Server is running ✅');
// });


// // --- 404 Handler ---
// // (This should be after all other routes)
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });


// // --- Start Server ---
// const PORT = process.env.PORT || 10000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// // --- PROBLEM CODE REMOVED ---
// // The router.put(...) block that was here has been deleted.

require('dotenv').config(); // This MUST be the first line
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- Import all your route files ---
const vendorRoutes = require('./routes/vendorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');
const expiredProductRoutes = require('./routes/expiredProductRoutes');
const reportRoutes = require('./routes/reportRoutes');
const customerRoutes = require('./routes/customerRoutes');
const ledgerRoutes = require('./routes/ledgerRoutes');

const app = express();

// --- Middleware Setup ---
// 1. Configure CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://bakery-shop-client.vercel.app'],
  credentials: true
}));

// 2. Configure Body Parsers
//    FIX: The duplicate app.use(express.json()) line has been removed.
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// --- MongoDB Connection ---
const MONGO_URI = process.env.MONGO_URI; 
if (!MONGO_URI) {
  console.error('.env file is missing or MONGO_URI not defined');
  process.exit(1);
}

//    FIX: Removed 'useNewUrlParser' and 'useUnifiedTopology'
mongoose.connect(MONGO_URI) 
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));


// --- API Routes ---
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/ledger', ledgerRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/expired-products', expiredProductRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vendor', vendorRoutes);


// --- Test Route ---
app.get('/', (req, res) => {
  res.send('Bakery Server is running ✅');
});


// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


// --- Start Server ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

