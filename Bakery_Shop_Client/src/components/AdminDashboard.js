import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [vendorCount, setVendorCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:10000";

  // --- Responsive Sidebar Detection ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setIsOpen(false);
      } else {
        setIsMobile(false);
        setIsOpen(true);
      }
    };
    handleResize(); // check initial screen size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Toggle Sidebar ---
  const toggleSidebar = () => setIsOpen(!isOpen);

  // --- Logout with confirmation and toast ---
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("adminToken");
      toast.success("Logged out successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/"), 2000);
    }
  };

  // --- Fetch counts for dashboard ---
  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const [vendorsRes, pendingRes] = await Promise.all([
        axios.get(`${API_URL}/api/admin/vendors`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/api/admin/vendor/requests`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setVendorCount(vendorsRes.data?.length || 0);
      setPendingCount(pendingRes.data?.length || 0);
    } catch (err) {
      console.error("Error fetching dashboard counts:", err.response?.data || err.message);
    }
  };

  return (
    <div className="admin-layout">
      {/* Toast Container */}
      <ToastContainer />

      {/* Sidebar */}
      <motion.div
        className={`sidebar ${isMobile ? "mobile-sidebar" : ""}`}
        animate={{ width: isOpen ? (isMobile ? "70%" : 230) : (isMobile ? 0 : 70) }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? "⮜" : "⮞"}
        </button>
        {isOpen && <h3 className="sidebar-title">Admin Panel</h3>}
        {isOpen && (
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/admin/dashboard" end activeclassname="active">
                📊 Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/dashboard/add-vendor" activeclassname="active">
                ➕ Add Vendor
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/dashboard/view-vendors" activeclassname="active">
                📋 View Vendors
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/dashboard/pending-approvals" activeclassname="active">
                ⏳ Pending Approvals
              </NavLink>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                🚪 Logout
              </button>
            </li>
          </ul>
        )}
      </motion.div>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div className="overlay" onClick={toggleSidebar}></div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Toggle button for mobile */}
        {isMobile && !isOpen && (
          <button className="mobile-toggle" onClick={toggleSidebar}>
            ☰
          </button>
        )}
        <Outlet context={{ vendorCount, pendingCount }} />
      </div>
    </div>
  );
};

export default AdminDashboard;
