// // // // import React from 'react';
// // // // import { Link } from 'react-router-dom';
// // // // import { NavLink } from "react-router-dom";
// // // // import 'bootstrap/dist/css/bootstrap.min.css';

// // // // const Navbar = () => (
// // // //     <nav className="navbar navbar-expand-lg custom-navbar px-4 sticky-top shadow-sm">
// // // //       <NavLink className="navbar-brand fw-bold fs-4 text-white" to="/dashboard">
// // // //         🍰 इंद्रायणी बेकर्स
// // // //       </NavLink>
// // // //       {/* // <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg px-4">
// // // //       // <NavLink className="navbar-brand fw-bold fs-4" to="/dashboard">
// // // //       //   🍰 इंद्रायणी बेकर्स
// // // //       // </NavLink> */}
// // // //   {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4"> */}
// // // //     {/* <Link className="navbar-brand" to="/">  इंद्रायणी बेकर्स </Link> */}
// // // //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
// // // //       <span className="navbar-toggler-icon"></span>
// // // //     </button>
// // // //     <div className="navbar-collapse" id="navbarNav">
// // // //     {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
// // // //       <ul className="navbar-nav ms-auto">
// // // //         <li className="nav-item">
// // // //           <Link className="nav-link" to="/products">Stock</Link>
// // // //         </li>
// // // //         <li className="nav-item">
// // // //           <Link className="nav-link" to="/sales">Sales</Link>
// // // //         </li>
// // // //         <li className="nav-item">
// // // //           <Link className="nav-link" to="/customers">Customers</Link>
// // // //         </li>
// // // //         <li className="nav-item">
// // // //           <Link className="nav-link" to="/reports">Reports</Link>
// // // //         </li>
// // // //         <li className="nav-item">
// // // //           <Link className="nav-link" to="/ledger">Ledger</Link>
// // // //         </li>
// // // //         <li className="nav-item ms-lg-3">
// // // //               <button
// // // //                 className="btn btn-outline-light"
// // // //                 onClick={handleLogout} // Now correctly defined as a prop
// // // //               >
// // // //                 <i className="fas fa-sign-out-alt me-2"></i> Logout
// // // //               </button>
// // // //             </li>
// // // //           </ul>
          
// // // //           {/* Display vendor name in the navbar */}
// // // //           <span className="navbar-text text-white me-3">
// // // //             Welcome, **{vendorName || 'Vendor'}** {/* Now correctly defined as a prop */}
// // // //           </span>
// // // //     </div>
// // // //   </nav>
// // // // );

// // // // export default Navbar;

// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { NavLink } from "react-router-dom";
// // // import 'bootstrap/dist/css/bootstrap.min.css';

// // // // FIX: Update the component signature to accept props { vendorName, handleLogout }
// // // const Navbar = ({ shopName, vendorName, handleLogout }) => ( 
// // //     <nav className="navbar navbar-expand-lg custom-navbar px-4 sticky-top shadow-sm">
// // //       <NavLink className="navbar-brand fw-bold fs-4 text-white" to="/dashboard">
// // //         🍰 {shopName || 'इंद्रायणी बेकर्स'} 
// // //       </NavLink>  
// // //     {/* Display vendor name in the navbar */}
// // //       <span className="navbar-text text-white me-3">
// // //         Welcome, **{vendorName || 'Vendor'}** 
// // //       </span>
// // //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
// // //       <span className="navbar-toggler-icon"></span>
// // //     </button>
// // //     {/* <div className="navbar-collapse" id="navbarNav"> */}
// // //     {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
// // //       <ul className="navbar-nav ms-auto">
// // //         <li className="nav-item">
// // //           <Link className="nav-link" to="/products">Stock</Link>
// // //         </li>
// // //         <li className="nav-item">
// // //           <Link className="nav-link" to="/sales">Sales</Link>
// // //         </li>
// // //         <li className="nav-item">
// // //           <Link className="nav-link" to="/customers">Customers</Link>
// // //         </li>
// // //         <li className="nav-item">
// // //           <Link className="nav-link" to="/reports">Reports</Link>
// // //         </li>
// // //         <li className="nav-item">
// // //           <Link className="nav-link" to="/ledger">Ledger</Link>
// // //         </li>
// // //         <li className="nav-item ms-lg-3">
// // //           {/* <button
// // //             className="btn btn-outline-light"
// // //             onClick={handleLogout} // ✅ handleLogout is now defined
// // //           >
// // //             <i className="fas fa-sign-out-alt me-2"></i> 
// // //             <Link to="/">Logout</Link>
// // //           </button> */}
// // //           <button className="btn btn-outline-light"
// // //             onClick={() => {
// // //               if (window.confirm("Are you sure you want to logout?")) {
// // //                 localStorage.removeItem("adminToken");
// // //                 window.location.href = "/";
// // //               }
// // //             }}
// // //           >
// // //             <i className="fas fa-sign-out-alt me-2"></i>
// // //             Logout
// // //           </button>
// // //         </li>
// // //       </ul>
// // //     {/* </div> */}
// // //   </nav>
// // // );

// // // export default Navbar;

// // import React, { useState, useEffect } from 'react';
// // import { NavLink, useNavigate } from 'react-router-dom';
// // import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { FiLogOut } from 'react-icons/fi';

// // const VendorNavbar = () => {
// //   const [vendorName, setVendorName] = useState('');
// //   const [shopName, setShopName] = useState('');
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchVendorData = async () => {
// //       try {
// //         const token = localStorage.getItem('vendorToken');
// //         if (!token || token.length > 2000) {
// //           localStorage.removeItem('vendorToken');
// //           navigate('/login');
// //           return;
// //         }

// //         const apiUrl = process.env.REACT_APP_API_URL;
// //         if (!apiUrl) {
// //           localStorage.removeItem('vendorToken');
// //           navigate('/login');
// //           return;
// //         }

// //         const res = await fetch(`${apiUrl}/api/admin/vendor/me`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });

// //         if (!res.ok) {
// //           localStorage.removeItem('vendorToken');
// //           navigate('/login');
// //           return;
// //         }

// //         const data = await res.json();
// //         setVendorName(data.vendorName || 'Vendor');
// //         setShopName(data.shopName || 'इंद्रायणी स्वीट्स अँड बेकर्स');
// //       } catch (err) {
// //         console.error(err);
// //         localStorage.removeItem('vendorToken');
// //         navigate('/login');
// //       }
// //     };

// //     fetchVendorData();
// //   }, [navigate]);

// //   const handleLogout = () => {
// //     if (window.confirm('Are you sure you want to logout?')) {
// //       localStorage.removeItem('vendorToken');
// //       localStorage.removeItem('vendorData');
// //       navigate('/');
// //     }
// //   };

// //   return (
// //     <Navbar
// //       expand="lg"
// //       style={{
// //         background: 'linear-gradient(90deg, #ffb6c1, #fff176)',
// //       }}
// //       sticky="top"
// //       className="shadow-sm"
// //     >
// //       <Container>
// //         <Navbar.Brand
// //           as={NavLink}
// //           to="/dashboard"
// //           style={{ color: '#6a0572', fontWeight: 'bold' }}
// //         >
// //           🍰 {shopName || 'इंद्रायणी बेकर्स'}
// //         </Navbar.Brand>

// //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
// //         <Navbar.Collapse id="basic-navbar-nav">
// //           <Nav className="ms-auto align-items-center">
// //             {[
// //               { to: '/products', label: '🧁 Stock' },
// //               { to: '/sales', label: '🍪 Sales' },
// //               { to: '/customers', label: '🍩 Customers' },
// //               { to: '/ledger', label: '📒 Ledger' },
// //               { to: '/reports', label: '📊 Reports' },
// //             ].map((item) => (
// //               <Nav.Link
// //                 key={item.to}
// //                 as={NavLink}
// //                 to={item.to}
// //                 className="fw-semibold text-dark mx-2 nav-item-hover"
// //               >
// //                 {item.label}
// //               </Nav.Link>
// //             ))}

// //             {/* Vendor greeting */}
// //             <span
// //               className="fw-semibold text-dark mx-3"
// //               style={{ fontSize: '0.95rem' }}
// //             >
// //               👋 {vendorName || 'Vendor'}
// //             </span>

// //             {/* Logout button */}
// //             <Button
// //               variant="outline-danger"
// //               size="sm"
// //               onClick={handleLogout}
// //               className="d-flex align-items-center logout-hover"
// //             >
// //               <FiLogOut className="me-1" /> Logout
// //             </Button>
// //           </Nav>
// //         </Navbar.Collapse>
// //       </Container>

// //       {/* Hover effects */}
// //       <style>
// //         {`
// //           /* Nav items hover */
// //           .nav-item-hover {
// //             transition: transform 0.2s, color 0.2s;
// //           }
// //           .nav-item-hover:hover {
// //             color: #2c2c2c !important; /* Dark hover color */
// //             text-decoration: underline;
// //             transform: scale(1.05); /* Slight zoom */
// //           }

// //           /* Logout button hover */
// //           .logout-hover {
// //             transition: transform 0.2s, background-color 0.2s, color 0.2s;
// //           }
// //           .logout-hover:hover {
// //             background-color: #2c2c2c;
// //             border-color: #2c2c2c;
// //             color: #fff;
// //             transform: scale(1.05);
// //           }
// //         `}
// //       </style>
// //     </Navbar>
// //   );
// // };

// // export default VendorNavbar;

// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Navbar, Nav, Container, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FiLogOut } from "react-icons/fi";

// const VendorNavbar = () => {
//   const [vendorName, setVendorName] = useState("");
//   const [shopName, setShopName] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVendorData = async () => {
//       try {
//         const token = localStorage.getItem("vendorToken");
//         if (!token) {
//           navigate("/login");
//           return;
//         }

//         const apiUrl = process.env.REACT_APP_API_URL;
//         const res = await fetch(`${apiUrl}/api/admin/vendor/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!res.ok) {
//           localStorage.removeItem("vendorToken");
//           navigate("/login");
//           return;
//         }

//         const data = await res.json();
//         setVendorName(data.vendorName || "Vendor");
//         setShopName(data.shopName || "इंद्रायणी बेकर्स");
//       } catch (err) {
//         console.error(err);
//         localStorage.removeItem("vendorToken");
//         navigate("/login");
//       }
//     };

//     fetchVendorData();
//   }, [navigate]);

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.removeItem("vendorToken");
//       navigate("/");
//     }
//   };

//   return (
//     <Navbar
//       expand="lg"
//       sticky="top"
//       className="shadow-md"
//       style={{
//         background: "linear-gradient(90deg, #ffb6c1, #fff176)",
//         zIndex: 50,
//       }}
//     >
//       <Container>
//         <Navbar.Brand
//           as={NavLink}
//           to="/dashboard"
//           style={{
//             color: "#6a0572",
//             fontWeight: "bold",
//             fontSize: "1.4rem",
//             textShadow: "0 0 2px #fff",
//           }}
//         >
//           🍰 {shopName}
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto align-items-center">
//             {[
//               { to: "/products", label: "🧁 Stock" },
//               { to: "/sales", label: "🍪 Sales" },
//               { to: "/customers", label: "🍩 Customers" },
//               { to: "/ledger", label: "📒 Ledger" },
//               { to: "/reports", label: "📊 Reports" },
//             ].map((item) => (
//               <Nav.Link
//                 key={item.to}
//                 as={NavLink}
//                 to={item.to}
//                 className="fw-semibold mx-2"
//                 style={{
//                   color: "#4a148c",
//                   fontSize: "1rem",
//                   textDecoration: "none",
//                 }}
//               >
//                 {item.label}
//               </Nav.Link>
//             ))}

//             {/* Vendor greeting */}
//             <span
//               className="fw-semibold mx-3"
//               style={{ fontSize: "0.95rem", color: "#4a148c" }}
//             >
//               👋 {vendorName}
//             </span>

//             {/* Logout button */}
//             <Button
//               variant="outline-dark"
//               size="sm"
//               onClick={handleLogout}
//               className="d-flex align-items-center"
//               style={{
//                 borderColor: "#4a148c",
//                 color: "#4a148c",
//                 fontWeight: "600",
//               }}
//             >
//               <FiLogOut className="me-1" /> Logout
//             </Button>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>

//       {/* Force visible text (Tailwind override fix) */}
//       <style>
//         {`
//           .navbar * {
//             color: #4a148c !important;
//           }

//           .navbar .nav-link.active {
//             text-decoration: underline;
//             color: #000 !important;
//           }

//           .navbar-toggler {
//             border-color: #6a0572 !important;
//           }

//           .navbar-toggler-icon {
//             background-image: none !important;
//             color: #6a0572 !important;
//             font-weight: bold;
//             position: relative;
//           }

//           .navbar-toggler-icon::before {
//             content: "☰";
//             font-size: 1.2rem;
//             color: #6a0572;
//           }
//         `}
//       </style>
//     </Navbar>
//   );
// };

// export default VendorNavbar;

// Navbar.js

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// ⛔️ import { Navbar, Nav, Container, Button } from "react-bootstrap"; // <-- REMOVED
// ⛔️ import "bootstrap/dist/css/bootstrap.min.css"; // <-- REMOVED
import { FiLogOut, FiMenu, FiX, FiSettings } from "react-icons/fi"; // Added Menu/X icons

const VendorNavbar = () => {
  const [vendorName, setVendorName] = useState("");
  const [shopName, setShopName] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const token = localStorage.getItem("vendorToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const apiUrl = process.env.REACT_APP_API_URL;
        const res = await fetch(`${apiUrl}/api/admin/vendor/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("vendorToken");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setVendorName(data.vendorName || "Vendor");
        setShopName(data.shopName || "इंद्रायणी बेकर्स");
      } catch (err) {
        console.error(err);
        localStorage.removeItem("vendorToken");
        navigate("/login");
      }
    };

    fetchVendorData();
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("vendorToken");
      navigate("/");
    }
  };

  const navLinks = [
    { to: "/products", label: "🧁 Stock" },
    { to: "/sales", label: "🍪 Sales" },
    { to: "/customers", label: "🍩 Customers" },
    { to: "/ledger", label: "📒 Ledger" },
    { to: "/reports", label: "📊 Reports" },
  ];

  const linkClass = "block md:inline-block px-3 py-2 rounded-md font-semibold text-purple-800 hover:bg-purple-100";
  const activeLinkClass = "block md:inline-block px-3 py-2 rounded-md font-semibold text-purple-900 bg-purple-200";
   
  // ✅ Navigate to Vendor Settings
  const goToSettings = () => {
    navigate('/vendorsettings');
  };

  return (
    <nav
      className="sticky top-0 z-50 shadow-md"
      style={{
        background: "linear-gradient(90deg, #ffb6c1, #fff176)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand */}
          <div className="flex-shrink-0">
            <NavLink
              to="/dashboard"
              className="font-bold text-xl"
              style={{
                color: "#6a0572",
                textShadow: "0 0 2px #fff",
              }}
            >
              🍰 {shopName}
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => isActive ? activeLinkClass : linkClass}
              >
                {item.label}
              </NavLink>
            ))}
             {/* Vendor settings link */}
             <FiSettings style={{ marginLeft: 4, cursor: 'pointer' }} onClick={goToSettings} />
            <span
              className="fw-semibold text-dark mx-3 vendor-settings-hover"
              style={{ fontSize: '0.95rem' }}
              
              title="Open Vendor Settings"
            >
            👋 {vendorName || 'Vendor'} 
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-1.5 rounded-md text-sm font-semibold border transition-colors
                         border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
            >
              <FiLogOut className="me-1 h-4 w-4" /> Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-800 hover:bg-purple-100 focus:outline-none"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => isActive ? activeLinkClass : linkClass}
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="border-t border-purple-200 pt-4 pb-3">
          <div className="flex items-center px-5">
            <span
              className="font-semibold"
              style={{ fontSize: "0.95rem", color: "#4a148c" }}
            >
              👋 {vendorName}
            </span>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-md text-base font-semibold border
                         border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
            >
              <FiLogOut className="me-2 h-5 w-5" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* ⛔️ REMOVED <style> block */}
    </nav>
  );
};

export default VendorNavbar;