// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./ViewVendors.css";
// // import { FaTrash, FaFileExcel, FaFilePdf } from "react-icons/fa";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const ViewVendors = () => {
// //   const [vendors, setVendors] = useState([]);
// //   const [editVendor, setEditVendor] = useState(null);
// //   const [passwordVendor, setPasswordVendor] = useState(null);
// //   const [newPassword, setNewPassword] = useState("");
// //   const [searchTerm, setSearchTerm] = useState("");

// //   const token = localStorage.getItem("adminToken");

// //   // ✅ Fetch all approved vendors
// //   const fetchVendors = async () => {
// //     try {
// //       const res = await axios.get(
// //         `${process.env.REACT_APP_API_URL}/api/admin/vendors`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       setVendors(res.data);
// //     } catch (err) {
// //       console.error("Error fetching vendors:", err);
// //       toast.error("Failed to load vendors");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchVendors();
// //   }, []);

// //   const handleSearchChange = (e) => {
// //     setSearchTerm(e.target.value);
// //   };

// //   const filteredVendors = vendors.filter((vendor) =>
// //     vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const exportToExcel = () => {
// //     toast.info("Export to Excel coming soon!");
// //   };

// //   const exportToPDF = () => {
// //     toast.info("Export to PDF coming soon!");
// //   };

// //   // ✅ Edit Vendor
// //   const handleEdit = async () => {
// //     try {
// //       await axios.put(
// //         `${process.env.REACT_APP_API_URL}/api/admin/vendor/${editVendor._id}`,
// //         editVendor,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       toast.success("Vendor updated successfully");
// //       setEditVendor(null);
// //       fetchVendors();
// //     } catch (err) {
// //       console.error("Edit error:", err);
// //       toast.error("Error updating vendor");
// //     }
// //   };

// //   // ✅ Change Vendor Password
// //   const handleChangePassword = async () => {
// //     if (newPassword.length < 8) {
// //       toast.error("Password must be 8 characters long");
// //       return;
// //     }

// //     try {
// //       await axios.put(
// //         `${process.env.REACT_APP_API_URL}/api/admin/vendor/${passwordVendor._id}/password`,
// //         { password: newPassword },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       toast.success("Password updated successfully");
// //       setPasswordVendor(null);
// //       setNewPassword("");
// //     } catch (err) {
// //       console.error("Password change error:", err);
// //       toast.error("Error changing password");
// //     }
// //   };

// //   // ✅ Delete Vendor
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this vendor?")) return;
// //     try {
// //       await axios.delete(
// //         `${process.env.REACT_APP_API_URL}/api/admin/vendor/${id}`,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       toast.success("Vendor deleted successfully");
// //       fetchVendors();
// //     } catch (err) {
// //       console.error("Delete error:", err);
// //       toast.error("Error deleting vendor");
// //     }
// //   };

// //   return (
// //     <div className="vendor-container fade-in">
// //       <div className="vendor-header shadow-sm">
// //         <h2 className="vendor-title">Manage Approved Vendors</h2>
// //         <div className="vendor-actions">
// //           <button className="excel-btn btn-animate" onClick={exportToExcel}>
// //             <FaFileExcel /> Excel
// //           </button>
// //           <button className="pdf-btn btn-animate" onClick={exportToPDF}>
// //             <FaFilePdf /> PDF
// //           </button>
// //         </div>
// //       </div>

// //       <input
// //         type="text"
// //         placeholder="Search vendor..."
// //         value={searchTerm}
// //         onChange={handleSearchChange}
// //         className="vendor-search"
// //       />

// //       <div className="table-responsive fade-in">
// //         <table className="vendor-table">
// //           <thead>
// //             <tr>
// //               <th>Name</th>
// //               <th>Email</th>
// //               <th>Shop Name</th>
// //               <th>Phone</th>
// //               <th>Shop Address</th>
// //               <th>Aadhar</th>
// //               <th>Status</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredVendors.map((vendor) => (
// //               <tr key={vendor._id}>
// //                 <td>{vendor.name}</td>
// //                 <td>{vendor.email}</td>
// //                 <td>{vendor.shopName}</td>
// //                 <td>{vendor.phone}</td>
// //                 <td>{vendor.shopAddress}</td>
// //                 <td>{vendor.adharNo}</td>
// //                 <td>{vendor.status || "Approved"}</td>
// //                 <td>
// //                   <button
// //                     className="btn btn-primary btn-sm me-2"
// //                     onClick={() => setEditVendor({ ...vendor })}
// //                   >
// //                     ✏ Edit
// //                   </button>
// //                   <button
// //                     className="btn btn-warning btn-sm me-2"
// //                     onClick={() => setPasswordVendor(vendor)}
// //                   >
// //                     🔑 Password
// //                   </button>
// //                   <button
// //                     className="btn btn-danger btn-sm"
// //                     onClick={() => handleDelete(vendor._id)}
// //                   >
// //                     🗑 Delete
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Edit Vendor Modal */}
// //       {editVendor && (
// //         <div className="modal show d-block" style={{ background: "#00000088" }}>
// //           <div className="modal-dialog">
// //             <div className="modal-content p-3">
// //               <h3>Edit Vendor</h3>
// //               <label>Name</label>
// //               <input
// //                 type="text"
// //                 className="form-control my-2"
// //                 value={editVendor.name}
// //                 onChange={(e) =>
// //                   setEditVendor({ ...editVendor, name: e.target.value })
// //                 }
// //               />
// //               <label>Email</label>
// //               <input
// //                 type="email"
// //                 className="form-control my-2"
// //                 value={editVendor.email}
// //                 onChange={(e) =>
// //                   setEditVendor({ ...editVendor, email: e.target.value })
// //                 }
// //               />
// //               <label>Shop Name</label>
// //               <input
// //                 type="text"
// //                 className="form-control my-2"
// //                 value={editVendor.shopName}
// //                 onChange={(e) =>
// //                   setEditVendor({ ...editVendor, shopName: e.target.value })
// //                 }
// //               />
// //               <label>Phone</label>
// //               <input
// //                 type="text"
// //                 className="form-control my-2"
// //                 value={editVendor.phone}
// //                 onChange={(e) =>
// //                   setEditVendor({ ...editVendor, phone: e.target.value })
// //                 }
// //               />
// //               <label>Address</label>
// //               <input
// //                 type="text"
// //                 className="form-control my-2"
// //                 value={editVendor.shopAddress}
// //                 onChange={(e) =>
// //                   setEditVendor({
// //                     ...editVendor,
// //                     shopAddress: e.target.value,
// //                   })
// //                 }
// //               />
// //               <div className="d-flex justify-content-end mt-3">
// //                 <button
// //                   className="btn btn-secondary me-2"
// //                   onClick={() => setEditVendor(null)}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button className="btn btn-success" onClick={handleEdit}>
// //                   Save Changes
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Password Change Modal */}
// //       {passwordVendor && (
// //         <div className="modal show d-block" style={{ background: "#00000088" }}>
// //           <div className="modal-dialog">
// //             <div className="modal-content p-3">
// //               <h5>Change Password for {passwordVendor.name}</h5>
// //               <input
// //                 type="password"
// //                 className="form-control my-2"
// //                 placeholder="Enter 8-character password"
// //                 value={newPassword}
// //                 onChange={(e) => setNewPassword(e.target.value.slice(0, 8))}
// //                 maxLength={8}
// //               />
// //               <div className="d-flex justify-content-end mt-3">
// //                 <button
// //                   className="btn btn-secondary me-2"
// //                   onClick={() => setPasswordVendor(null)}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   className="btn btn-warning"
// //                   onClick={handleChangePassword}
// //                 >
// //                   Change
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ViewVendors;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ViewVendors.css";
// import { FaTrash, FaFileExcel, FaFilePdf } from "react-icons/fa";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ViewVendors = () => {
//   const [vendors, setVendors] = useState([]);
//   const [editVendor, setEditVendor] = useState(null);
//   const [passwordVendor, setPasswordVendor] = useState(null);
//   const [newPassword, setNewPassword] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const token = localStorage.getItem("adminToken");

//   // ✅ Fetch all approved vendors
//   const fetchVendors = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_API_URL}/api/admin/vendors`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setVendors(res.data);
//     } catch (err) {
//       console.error("Error fetching vendors:", err);
//       toast.error("Failed to load vendors");
//     }
//   };

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredVendors = vendors.filter((vendor) =>
//     vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const exportToExcel = () => {
//     toast.info("Export to Excel coming soon!");
//   };

//   const exportToPDF = () => {
//     toast.info("Export to PDF coming soon!");
//   };

//    // Utility function for email validation
//   const isValidEmail = (email) => {
//     // Simple regex for email validation
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   // Utility function for phone validation (assuming 10-digit number)
//   const isValidPhone = (phone) => {
//     // Allows exactly 10 digits
//     return /^[0-9]{10}$/.test(phone);
//   };

//   // ✅ Edit Vendor
//   const handleEdit = async () => {
//     // 🛑 FIX: Add client-side validation for email and phone
//     if (!isValidEmail(editVendor.email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }
//     if (!isValidPhone(editVendor.phone)) {
//       toast.error("Phone number must be exactly 10 digits");
//       return;
//     }

//     try {
//       await axios.put(
//         `${process.env.REACT_APP_API_URL}/api/admin/vendor/${editVendor._id}`,
//         editVendor,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Vendor updated successfully");
//       setEditVendor(null);
//       fetchVendors();
//     } catch (err) {
//       console.error("Edit error:", err);
//       toast.error(err.response?.data?.message || "Error updating vendor");
//     }
//   };

//   // ✅ Change Vendor Password
//   const handleChangePassword = async () => {
//     // 🛑 FIX: Ensure the password is exactly 8 characters long
//     if (newPassword.length !== 8) {
//       toast.error("Password must be exactly 8 characters long");
//       return;
//     }

//     try {
//       await axios.put(
//         `${process.env.REACT_APP_API_URL}/api/admin/vendor/${passwordVendor._id}/password`,
//         { password: newPassword },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Password updated successfully");
//       setPasswordVendor(null);
//       setNewPassword("");
//     } catch (err) {
//       console.error("Password change error:", err);
//       // Added better error handling based on server response
//       toast.error(err.response?.data?.message || "Error changing password"); 
//     }
//   };

//   // ✅ Delete Vendor
//   const handleDelete = async (id) => {
//   if (!window.confirm("Are you sure you want to delete this vendor?")) return;
//    try {
//     await axios.delete(
//      // 🛑 FIX: Changed endpoint from /vendor/ to /vendors/ (plural)
//        `${process.env.REACT_APP_API_URL}/api/admin/vendors/${id}`,
//     { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Vendor deleted successfully");
//      fetchVendors();
//    } catch (err) {
//      console.error("Delete error:", err);
//     // Assuming your server returns the error message here
//     toast.error(err.response?.data?.message || "Error deleting vendor");
//    }
//    };

//   return (
//     <div className="vendor-container fade-in">
//       <div className="vendor-header shadow-sm">
//         <h2 className="vendor-title">Manage Approved Vendors</h2>
//         <div className="vendor-actions">
//           <button className="excel-btn btn-animate" onClick={exportToExcel}>
//             <FaFileExcel /> Excel
//           </button>
//           <button className="pdf-btn btn-animate" onClick={exportToPDF}>
//             <FaFilePdf /> PDF
//           </button>
//         </div>
//       </div>

//       <input
//         type="text"
//         placeholder="Search vendor..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//         className="vendor-search"
//       />

//       <div className="table-responsive fade-in">
//         <table className="vendor-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Shop Name</th>
//               <th>Phone</th>
//               <th>Shop Address</th>
//               <th>Aadhar</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredVendors.map((vendor) => (
//               <tr key={vendor._id}>
//                 <td>{vendor.name}</td>
//                 <td>{vendor.email}</td>
//                 <td>{vendor.shopName}</td>
//                 <td>{vendor.phone}</td>
//                 <td>{vendor.shopAddress}</td>
//                 <td>{vendor.adharNo}</td>
//                 <td>{vendor.status || "Approved"}</td>
//                 <td>
//                   <button
//                     className="btn btn-primary btn-sm me-2"
//                     onClick={() => setEditVendor({ ...vendor })}
//                   >
//                     ✏ Edit
//                   </button>
//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     onClick={() => setPasswordVendor(vendor)}
//                   >
//                     🔑 Password
//                   </button>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(vendor._id)}
//                   >
//                     🗑 Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Vendor Modal */}
//       {editVendor && (
//         <div className="modal show d-block" style={{ background: "#00000088" }}>
//           <div className="modal-dialog">
//             <div className="modal-content p-3">
//               <h3>Edit Vendor</h3>
//               <label>Name</label>
//               <input
//                 type="text"
//                 className="form-control my-2"
//                 value={editVendor.name}
//                 onChange={(e) =>
//                   setEditVendor({ ...editVendor, name: e.target.value })
//                 }
//               />
//               <label>Email</label>
//               <input
//                 type="email"
//                 className="form-control my-2"
//                 value={editVendor.email}
//                 onChange={(e) =>
//                   setEditVendor({ ...editVendor, email: e.target.value })
//                 }
//               />
//               <label>Shop Name</label>
//               <input
//                 type="text"
//                 className="form-control my-2"
//                 value={editVendor.shopName}
//                 onChange={(e) =>
//                   setEditVendor({ ...editVendor, shopName: e.target.value })
//                 }
//               />
//               <label>Phone</label>
//               <input
//                 type="text"
//                 className="form-control my-2"
//                 value={editVendor.phone}
//                 onChange={(e) =>
//                   setEditVendor({ ...editVendor, phone: e.target.value })
//                 }
//               />
//               <label>Address</label>
//               <input
//                 type="text"
//                 className="form-control my-2"
//                 value={editVendor.shopAddress}
//                 onChange={(e) =>
//                   setEditVendor({
//                     ...editVendor,
//                     shopAddress: e.target.value,
//                   })
//                 }
//               />
//               <div className="d-flex justify-content-end mt-3">
//                 <button
//                   className="btn btn-secondary me-2"
//                   onClick={() => setEditVendor(null)}
//                 >
//                   Cancel
//                 </button>
//                 <button className="btn btn-success" onClick={handleEdit}>
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Password Change Modal */}
//       {passwordVendor && (
//         <div className="modal show d-block" style={{ background: "#00000088" }}>
//           <div className="modal-dialog">
//             <div className="modal-content p-3">
//               <h5>Change Password for {passwordVendor.name}</h5>
//               <input
//                 type="password"
//                 className="form-control my-2"
//                 placeholder="Enter 8-character password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value.slice(0, 8))}
//                 maxLength={8}
//               />
//               <div className="d-flex justify-content-end mt-3">
//                 <button
//                   className="btn btn-secondary me-2"
//                   onClick={() => setPasswordVendor(null)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="btn btn-warning"
//                   onClick={handleChangePassword}
//                 >
//                   Change
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewVendors;

// src/components/ViewVendors.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";
// Assuming you are using 'react-bootstrap' for modals.
// If not, replace <Modal>, <Button>, <Form> with your modal components.

// --- FIX: Validation Helpers ---
const isValidEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const isValidPhone = (phone) => {
  if (!phone) return false;
  // This regex matches 10 digits (starting 6-9) or +91 followed by 10 digits (starting 6-9)
  const re = /^(?:\+91)?[6-9]\d{9}$/;
  return re.test(String(phone));
};
// --- End of Fix ---

const ViewVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // For download buttons

  // State for Modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // State for Forms
  const [currentVendor, setCurrentVendor] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [passwordFormData, setPasswordFormData] = useState({ password: "" });
  const [errors, setErrors] = useState({});

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchApprovedVendors();
  }, []);

  const fetchApprovedVendors = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/vendors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendors(res.data || []);
    } catch (err) {
      console.error("Error fetching vendors:", err);
      toast.error("Could not fetch vendors.");
    }
  };

  // --- Download Handler ---
  const handleDownload = async (format) => {
    setIsLoading(true);
    const endpoint =
      format === "excel"
        ? `${API_URL}/api/admin/vendors/export/excel`
        : `${API_URL}/api/admin/vendors/export/pdf`;

    const filename =
      format === "excel"
        ? "approved_vendors.xlsx"
        : "approved_vendors.pdf";

    try {
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // Crucial
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`Downloaded ${format.toUpperCase()} file!`);
    } catch (err) {
      console.error(`Error downloading ${format} file:`, err);
      toast.error(`Failed to download ${format} file.`);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Edit Modal Handlers ---
  const handleShowEditModal = (vendor) => {
    setCurrentVendor(vendor);
    setEditFormData({
      name: vendor.name,
      email: vendor.email,
      phone: vendor.phone,
      shopName: vendor.shopName,
      shopAddress: vendor.shopAddress,
    });
    setErrors({});
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentVendor(null);
    setEditFormData({});
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEditForm = () => {
    const newErrors = {};
    if (!editFormData.name) newErrors.name = "Name is required.";
    if (!editFormData.shopName) newErrors.shopName = "Shop name is required.";

    // Using the validation functions that were missing
    if (!isValidEmail(editFormData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!isValidPhone(editFormData.phone)) {
      newErrors.phone =
        "Please enter a valid 10-digit phone number (or +91 format).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateVendor = async () => {
    if (!validateEditForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      await axios.put(
        `${API_URL}/api/admin/vendor/${currentVendor._id}`,
        editFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Vendor updated successfully!");
      fetchApprovedVendors();
      handleCloseEditModal();
    } catch (err) {
      console.error("Error updating vendor:", err);
      toast.error(err.response?.data?.message || "Failed to update vendor.");
    }
  };

  // --- Password Modal Handlers ---
  const handleShowPasswordModal = (vendor) => {
    setCurrentVendor(vendor);
    setPasswordFormData({ password: "" });
    setErrors({});
    setShowPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setCurrentVendor(null);
    setPasswordFormData({ password: "" });
  };

  const handlePasswordChange = (e) => {
    setPasswordFormData({ password: e.target.value });
  };

  const handleUpdatePassword = async () => {
    const { password } = passwordFormData;
    if (!password || password.length < 8) {
      setErrors({ password: "Password must be at least 8 characters." });
      return;
    }
    setErrors({});

    try {
      await axios.put(
        `${API_URL}/api/admin/vendor/${currentVendor._id}/password`,
        { password }, // Send as { password: "..." }
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Vendor password updated successfully!");
      handleClosePasswordModal();
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error(err.response?.data?.message || "Failed to update password.");
    }
  };

  // --- Delete Handler (FIXED) ---
  const handleDelete = async (vendorId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this vendor? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/api/admin/vendors/${vendorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Vendor deleted successfully.");
      fetchApprovedVendors();
    } catch (err) { // <-- This brace was missing
      console.error("Error deleting vendor:", err);
      toast.error(err.response?.data?.message || "Failed to delete vendor.");
    }
  };

  return (
    <div>
      <h2 className="mb-4">Manage Approved Vendors</h2>

      {/* --- DOWNLOAD BUTTONS --- */}
      <div className="mb-3 d-flex justify-content-end gap-2">
        <button
          className="btn btn-success"
          onClick={() => handleDownload("excel")}
          disabled={isLoading}
        >
          <i className="fas fa-file-excel me-1"></i>
          {isLoading ? "Downloading..." : "Export to Excel"}
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDownload("pdf")}
          disabled={isLoading}
        >
          <i className="fas fa-file-pdf me-1"></i>
          {isLoading ? "Downloading..." : "Export to PDF"}
        </button>
      </div>
      {/* --- END DOWNLOAD BUTTONS --- */}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Shop Name</th>
              <th>Address</th>
              <th>Aadhar</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.length > 0 ? (
              vendors.map((vendor) => (
                <tr key={vendor._id}>
                  <td>{vendor.name}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.phone}</td>
                  <td>{vendor.shopName}</td>
                  <td>{vendor.shopAddress}</td>
                  <td>{vendor.adharNo}</td>
                  <td>
                    {/* --- UPDATED BUTTONS WITH TEXT --- */}
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      title="Edit Details"
                      onClick={() => handleShowEditModal(vendor)}
                    >
                      <i className="fas fa-minus me-1"></i> Edit
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      title="Change Password"
                      onClick={() => handleShowPasswordModal(vendor)}
                    >
                      <i className="fas fa-key me-1"></i> Password
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      title="Delete Vendor"
                      onClick={() => handleDelete(vendor._id)}
                    >
                      <i className="fas fa-trash me-1"></i> Delete
                    </Button>
                    {/* --- END UPDATED BUTTONS --- */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No approved vendors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- Edit Vendor Modal --- */}
      {currentVendor && (
        <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Vendor: {currentVendor.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditFormChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditFormChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditFormChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Shop Name</Form.Label>
                <Form.Control
                  type="text"
                  name="shopName"
                  value={editFormData.shopName}
                  onChange={handleEditFormChange}
                  isInvalid={!!errors.shopName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.shopName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Shop Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="shopAddress"
                  value={editFormData.shopAddress}
                  onChange={handleEditFormChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdateVendor}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* --- Change Password Modal --- */}
      {currentVendor && (
        <Modal
          show={showPasswordModal}
          onHide={handleClosePasswordModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Change Password for {currentVendor.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Min 8 characters"
                  value={passwordFormData.password}
                  onChange={handlePasswordChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePasswordModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdatePassword}>
              Update Password
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ViewVendors;