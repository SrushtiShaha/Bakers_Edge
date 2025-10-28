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

//   // ✅ Edit Vendor
//   const handleEdit = async () => {
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
//       toast.error("Error updating vendor");
//     }
//   };

//   // ✅ Change Vendor Password
//   const handleChangePassword = async () => {
//     if (newPassword.length < 8) {
//       toast.error("Password must be 8 characters long");
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
//       toast.error("Error changing password");
//     }
//   };

//   // ✅ Delete Vendor
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this vendor?")) return;
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_API_URL}/api/admin/vendor/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Vendor deleted successfully");
//       fetchVendors();
//     } catch (err) {
//       console.error("Delete error:", err);
//       toast.error("Error deleting vendor");
//     }
//   };

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

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewVendors.css";
import { FaTrash, FaFileExcel, FaFilePdf } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [editVendor, setEditVendor] = useState(null);
  const [passwordVendor, setPasswordVendor] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("adminToken");

  // ✅ Fetch all approved vendors
  const fetchVendors = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/vendors`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVendors(res.data);
    } catch (err) {
      console.error("Error fetching vendors:", err);
      toast.error("Failed to load vendors");
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToExcel = () => {
    toast.info("Export to Excel coming soon!");
  };

  const exportToPDF = () => {
    toast.info("Export to PDF coming soon!");
  };

   // Utility function for email validation
  const isValidEmail = (email) => {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Utility function for phone validation (assuming 10-digit number)
  const isValidPhone = (phone) => {
    // Allows exactly 10 digits
    return /^[0-9]{10}$/.test(phone);
  };

  // ✅ Edit Vendor
  const handleEdit = async () => {
    // 🛑 FIX: Add client-side validation for email and phone
    if (!isValidEmail(editVendor.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!isValidPhone(editVendor.phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/admin/vendor/${editVendor._id}`,
        editVendor,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Vendor updated successfully");
      setEditVendor(null);
      fetchVendors();
    } catch (err) {
      console.error("Edit error:", err);
      toast.error(err.response?.data?.message || "Error updating vendor");
    }
  };

  // ✅ Change Vendor Password
  const handleChangePassword = async () => {
    // 🛑 FIX: Ensure the password is exactly 8 characters long
    if (newPassword.length !== 8) {
      toast.error("Password must be exactly 8 characters long");
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/admin/vendor/${passwordVendor._id}/password`,
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password updated successfully");
      setPasswordVendor(null);
      setNewPassword("");
    } catch (err) {
      console.error("Password change error:", err);
      // Added better error handling based on server response
      toast.error(err.response?.data?.message || "Error changing password"); 
    }
  };

  // ✅ Delete Vendor
  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this vendor?")) return;
   try {
    await axios.delete(
     // 🛑 FIX: Changed endpoint from /vendor/ to /vendors/ (plural)
       `${process.env.REACT_APP_API_URL}/api/admin/vendors/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Vendor deleted successfully");
     fetchVendors();
   } catch (err) {
     console.error("Delete error:", err);
    // Assuming your server returns the error message here
    toast.error(err.response?.data?.message || "Error deleting vendor");
   }
   };

  return (
    <div className="vendor-container fade-in">
      <div className="vendor-header shadow-sm">
        <h2 className="vendor-title">Manage Approved Vendors</h2>
        <div className="vendor-actions">
          <button className="excel-btn btn-animate" onClick={exportToExcel}>
            <FaFileExcel /> Excel
          </button>
          <button className="pdf-btn btn-animate" onClick={exportToPDF}>
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search vendor..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="vendor-search"
      />

      <div className="table-responsive fade-in">
        <table className="vendor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Shop Name</th>
              <th>Phone</th>
              <th>Shop Address</th>
              <th>Aadhar</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr key={vendor._id}>
                <td>{vendor.name}</td>
                <td>{vendor.email}</td>
                <td>{vendor.shopName}</td>
                <td>{vendor.phone}</td>
                <td>{vendor.shopAddress}</td>
                <td>{vendor.adharNo}</td>
                <td>{vendor.status || "Approved"}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => setEditVendor({ ...vendor })}
                  >
                    ✏ Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setPasswordVendor(vendor)}
                  >
                    🔑 Password
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(vendor._id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Vendor Modal */}
      {editVendor && (
        <div className="modal show d-block" style={{ background: "#00000088" }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h3>Edit Vendor</h3>
              <label>Name</label>
              <input
                type="text"
                className="form-control my-2"
                value={editVendor.name}
                onChange={(e) =>
                  setEditVendor({ ...editVendor, name: e.target.value })
                }
              />
              <label>Email</label>
              <input
                type="email"
                className="form-control my-2"
                value={editVendor.email}
                onChange={(e) =>
                  setEditVendor({ ...editVendor, email: e.target.value })
                }
              />
              <label>Shop Name</label>
              <input
                type="text"
                className="form-control my-2"
                value={editVendor.shopName}
                onChange={(e) =>
                  setEditVendor({ ...editVendor, shopName: e.target.value })
                }
              />
              <label>Phone</label>
              <input
                type="text"
                className="form-control my-2"
                value={editVendor.phone}
                onChange={(e) =>
                  setEditVendor({ ...editVendor, phone: e.target.value })
                }
              />
              <label>Address</label>
              <input
                type="text"
                className="form-control my-2"
                value={editVendor.shopAddress}
                onChange={(e) =>
                  setEditVendor({
                    ...editVendor,
                    shopAddress: e.target.value,
                  })
                }
              />
              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setEditVendor(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleEdit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {passwordVendor && (
        <div className="modal show d-block" style={{ background: "#00000088" }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5>Change Password for {passwordVendor.name}</h5>
              <input
                type="password"
                className="form-control my-2"
                placeholder="Enter 8-character password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value.slice(0, 8))}
                maxLength={8}
              />
              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setPasswordVendor(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-warning"
                  onClick={handleChangePassword}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewVendors;