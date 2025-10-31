// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import "./index.css";
// // import App from "./App";
// // import Navbar from "./components/Navbar"; // 👈 NEW: Import Navbar
// // import AdminDashboard from "./components/AdminDashboard";
// // import VendorDashboard from "./components/Dashboard"; // Note: renamed to VendorDashboard for clarity in routing
// // import VendorRequestForm from "./components/VendorRequestForm";
// // import PendingApprovals from "./components/PendingApprovals";
// // import ProductForm from "./components/ProductForm"; // 👈 NEW: Import ProductForm
// // import SalesForm from "./components/SalesForm"; // 👈 NEW: Import SalesForm
// // import CustomerForm from "./components/CustomerForm"; // 👈 NEW: Import CustomerForm
// // import Reports from "./components/Reports"; // 👈 NEW: Import Reports
// // import Ledger from "./components/Ledger"; // 👈 NEW: Import Ledger
// // import ViewVendors from "./components/ViewVendors"; // 👈 NEW: Import ViewVendors

// // import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
// // import reportWebVitals from "./reportWebVitals";

// // // Protected Route for Admin
// // const AdminProtected = ({ children }) => {
// //   const token = localStorage.getItem("adminToken");
// //   return token ? children : <Navigate to="/" />;
// // };

// // // Protected Route for Vendor
// // const VendorProtected = ({ children }) => {
// //   const token = localStorage.getItem("vendorToken");
// //   return token ? children : <Navigate to="/" />;
// // };

// // // Generic Protected Route (assuming a logged-in state is required for most features)
// // const ProtectedRoute = ({ children }) => {
// //   const adminToken = localStorage.getItem("adminToken");
// //   const vendorToken = localStorage.getItem("vendorToken");
// //   return (adminToken || vendorToken) ? children : <Navigate to="/" />;
// // };

// // const router = createBrowserRouter([
// //   // Landing Page (App is used to manage modals/toast container)
// //   { path: "/", element: <App /> },
  
// //   // Vendor Request/Admin Approvals
// //   { path: "/vendor", element: <VendorRequestForm /> },
// //   { path: "/admin/pending", element: <PendingApprovals /> },

// //   // Admin dashboard (protected)
// //   {
// //     path: "/admin/dashboard",
// //     element: (
// //       <AdminProtected>
// //         <AdminDashboard />
// //       </AdminProtected>
// //     ),
// //   },

// //   // Vendor dashboard (protected) - path was /dashboard
// //   {
// //     path: "/dashboard",
// //     element: (
// //       <VendorProtected>
// //         <Navbar /> {/* Assuming Vendor Dashboard needs a Navbar */}
// //         <VendorDashboard />
// //       </VendorProtected>
// //     ),
// //   },
  
// //   // ------------------------------------------------------------------
// //   // Feature Routes (Moved from App.js and wrapped in ProtectedRoute)
// //   // ------------------------------------------------------------------

// //   { 
// //     path: "/products", 
// //     element: (
// //       <ProtectedRoute>
// //         <Navbar /> 
// //         <ProductForm />
// //       </ProtectedRoute>
// //     )
// //   },
  
// //   { 
// //     path: "/sales", 
// //     element: (
// //       <ProtectedRoute>
// //         <Navbar /> 
// //         <SalesForm />
// //       </ProtectedRoute>
// //     )
// //   },
  
// //   { 
// //     path: "/customers", // 👈 This is the route that was failing
// //     element: (
// //       <ProtectedRoute>
// //         <Navbar /> 
// //         <CustomerForm />
// //       </ProtectedRoute>
// //     )
// //   },
  
// //   { 
// //     path: "/reports", 
// //     element: (
// //       <ProtectedRoute>
// //         <Navbar /> 
// //         <Reports />
// //       </ProtectedRoute>
// //     )
// //   },
  
// //   { 
// //     path: "/ledger", 
// //     element: (
// //       <ProtectedRoute>
// //         <Navbar /> 
// //         <Ledger />
// //       </ProtectedRoute>
// //     )
// //   },
  
// //   { 
// //     path: "/admin/view-vendors", 
// //     element: (
// //       <AdminProtected>
// //         <Navbar /> {/* Assuming this page needs a Navbar */}
// //         <ViewVendors />
// //       </AdminProtected>
// //     )
// //   },
  
// //   // Catch-all 404
// //   { path: "*", element: <h2>404 - Page Not Found</h2> },
// // ]);

// // const root = ReactDOM.createRoot(document.getElementById("root"));
// // root.render(
// //   <React.StrictMode>
// //     <RouterProvider router={router} />
// //   </React.StrictMode>
// // );

// // reportWebVitals();

// // index.js

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import Navbar from "./components/Navbar";
// import AdminDashboard from "./components/AdminDashboard";
// import VendorDashboard from "./components/Dashboard"; // Note: renamed to VendorDashboard for clarity in routing
// import VendorRequestForm from "./components/VendorRequestForm";
// import PendingApprovals from "./components/PendingApprovals";
// import ProductForm from "./components/ProductForm";
// import SalesForm from "./components/SalesForm";
// import CustomerForm from "./components/CustomerForm";
// import Reports from "./components/Reports";
// import Ledger from "./components/Ledger";
// import ViewVendors from "./components/ViewVendors";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // <-- Consolidated Bootstrap JS

// // --- NEW IMPORTS (from App.js) ---
// import LoginPage from "./components/LoginPage";
// // ⚠️ CHECK THIS PATH: Make sure 'RegisterPage' is correct
// // If you want /register to show the customer form, change this back
// import RegisterPage from "./components/VendorRequestForm"; 


// import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
// import reportWebVitals from "./reportWebVitals";

// // Protected Route for Admin
// const AdminProtected = ({ children }) => {
//   const token = localStorage.getItem("adminToken");
//   return token ? children : <Navigate to="/" />;
// };

// // Protected Route for Vendor
// const VendorProtected = ({ children }) => {
//   const token = localStorage.getItem("vendorToken");
//   return token ? children : <Navigate to="/" />;
// };

// // Generic Protected Route (assuming a logged-in state is required for most features)
// const ProtectedRoute = ({ children }) => {
//   const adminToken = localStorage.getItem("adminToken");
//   const vendorToken = localStorage.getItem("vendorToken");
//   return (adminToken || vendorToken) ? children : <Navigate to="/" />;
// };

// const router = createBrowserRouter([
//   // Landing Page (App is used to manage modals/toast container)
//   { path: "/", element: <App /> },
  
//   // --- NEW: Routes moved from App.js ---
//   { path: "/login", element: <LoginPage /> },
//   { path: "/register", element: <RegisterPage /> }, //

//   // Vendor Request/Admin Approvals
//   { path: "/vendor", element: <VendorRequestForm /> },
//   { path: "/admin/pending", element: <PendingApprovals /> },

//   // Admin dashboard (protected)
//   {
//     path: "/admin/dashboard",
//     element: (
//       <AdminProtected>
//         <AdminDashboard />
//       </AdminProtected>
//     ),
//   },

//   // Vendor dashboard (protected) - path was /dashboard
//   {
//     path: "/dashboard",
//     element: (
//       <VendorProtected>
//         <Navbar /> {/* Assuming Vendor Dashboard needs a Navbar */}
//         <VendorDashboard />
//       </VendorProtected>
//     ),
//   },
  
//   // ------------------------------------------------------------------
//   // Feature Routes (Moved from App.js and wrapped in ProtectedRoute)
//   // ------------------------------------------------------------------

//   { 
//     path: "/products", 
//     element: (
//       <ProtectedRoute>
//         <Navbar /> 
//         <ProductForm />
//       </ProtectedRoute>
//     )
//   },
  
//   { 
//     path: "/sales", 
//     element: (
//       <ProtectedRoute>
//         <Navbar /> 
//         <SalesForm />
//       </ProtectedRoute>
//     )
//   },
  
//   { 
//     path: "/customers", // 👈 This is the route that was failing
//     element: (
//       <ProtectedRoute>
//         <Navbar /> 
//         <CustomerForm />
//       </ProtectedRoute>
//     )
//   },
  
//   { 
//     path: "/reports", 
//     element: (
//       <ProtectedRoute>
//         <Navbar /> 
//         <Reports />
//       </ProtectedRoute>
//     )
//   },
  
//   { 
//     path: "/ledger", 
//     element: (
//       <ProtectedRoute>
//         <Navbar /> 
//         <Ledger />
//       </ProtectedRoute>
//     )
//   },
  
//   { 
//     path: "/admin/view-vendors", 
//     element: (
//       <AdminProtected>
//         <Navbar /> {/* Assuming this page needs a Navbar */}
//         <ViewVendors />
//       </AdminProtected>
//     )
//   },
  
//   // Catch-all 404
//   { path: "*", element: <h2>404 - Page Not Found</h2> },
// ]);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// reportWebVitals();

// index.js
// index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; 
import App from "./App";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import VendorDashboard from "./components/Dashboard";
import VendorRequestForm from "./components/VendorRequestForm";
import PendingApprovals from "./components/PendingApprovals";
import ProductForm from "./components/ProductForm";
import SalesForm from "./components/SalesForm";
import CustomerForm from "./components/CustomerForm";
import Reports from "./components/Reports";
import Ledger from "./components/Ledger";
import ViewVendors from "./components/ViewVendors";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/VendorRequestForm"; 
import VendorSetting from "./components/VendorSettings";
import AdminHome from "./components/AdminHome";
import AddVendor from "./components/AddVendor";


import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

// Protected Route for Admin
const AdminProtected = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/" />;
};

// Protected Route for Vendor
const VendorProtected = ({ children }) => {
  const token = localStorage.getItem("vendorToken");
  return token ? children : <Navigate to="/" />;
};

// Generic Protected Route (ONLY use for pages accessible by BOTH)
// We are not using this for the vendor routes anymore.
const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  const vendorToken = localStorage.getItem("vendorToken");
  return (adminToken || vendorToken) ? children : <Navigate to="/" />;
};

const router = createBrowserRouter([
  // Landing Page (App is used to manage modals/toast container)
  { path: "/", element: <App /> },
  
  // --- NEW: Routes moved from App.js ---
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> }, //

  // Vendor Request/Admin Approvals
  { path: "/vendor", element: <VendorRequestForm /> },
  { path: "/admin/pending", element: <PendingApprovals /> },

  // Admin dashboard (protected)
  {
    path: "/admin/dashboard",
    element: (
      <AdminProtected>
        <AdminDashboard />
      </AdminProtected>
    ),
    children: [
    { index: true, element: <AdminHome /> }, // default home
    { path: "add-vendor", element: <AddVendor /> },
    { path: "view-vendors", element: <ViewVendors /> },
    { path: "pending-approvals", element: <PendingApprovals /> },
  ],
  },

  // Vendor dashboard (protected)
  {
    path: "/dashboard",
    element: (
      <VendorProtected>
        <Navbar />
        <VendorDashboard />
      </VendorProtected>
    ),
  },
  
  // ------------------------------------------------------------------
  // Feature Routes (Moved from App.js and wrapped in ProtectedRoute)
  // ------------------------------------------------------------------

  { 
    path: "/products", 
    element: (
      // ✅ FIXED: Use VendorProtected, not ProtectedRoute
      <VendorProtected>
        <Navbar /> 
        <ProductForm />
      </VendorProtected>
    )
  },
  
  { 
    path: "/vendorsettings", 
    element: (
      // ✅ FIXED: Use VendorProtected, not ProtectedRoute
      <VendorProtected>
        <Navbar /> 
        <VendorSetting />
      </VendorProtected>
    )
  },
  { 
    path: "/sales", 
    element: (
      // ✅ FIXED: Use VendorProtected, not ProtectedRoute
      <VendorProtected>
        <Navbar /> 
        <SalesForm />
      </VendorProtected>
    )
  },
  
  { 
    path: "/customers",
    element: (
      // ✅ FIXED: Use VendorProtected, not ProtectedRoute
      <VendorProtected>
        <Navbar /> 
        <CustomerForm />
      </VendorProtected>
    )
  },
  
  { 
    path: "/reports", 
    element: (
      // ✅ FIXED: Use VendorProtected, not ProtectedRoute
      <VendorProtected>
        <Navbar /> 
        <Reports />
      </VendorProtected>
    )
  },
  
  { 
    path: "/ledger", 
    element: (
      // ✅ FIXED: Use VendorProtected, not ProtectedRoute
      <VendorProtected>
        <Navbar /> 
        <Ledger />
      </VendorProtected>
    )
  },
  
  { 
    path: "/admin/view-vendors", 
    element: (
      <AdminProtected>
        <Navbar />
        <ViewVendors />
      </AdminProtected>
    )
  },
  
  // Catch-all 404
  { path: "*", element: <h2>404 - Page Not Found</h2> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();