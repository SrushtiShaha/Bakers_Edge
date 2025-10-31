import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./AdminDashboard.css";

const AdminHome = () => {
  const { vendorCount, pendingCount } = useOutletContext();

  return (
    <div className="dashboard-home">
      <h2 className="mb-4 text-2xl font-semibold">Admin Dashboard Overview</h2>

      <div className="dashboard-cards">
        <Link to="/admin/dashboard/view-vendors" style={{ textDecoration: 'none', color: 'inherit' }}>
        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <i className="fas fa-users fa-3x icon"></i>
          <h3>Total Vendors</h3>
          <p>{vendorCount}</p>
        </motion.div>
        </Link>

        <Link to="/admin/dashboard/pending-approvals" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div
                className="stat-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                >
                <i className="fas fa-hourglass-half fa-3x icon"></i>
                <h3>Pending Approvals</h3>
                <p>{pendingCount}</p>
            </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
