// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import ViewVendors from "./ViewVendors";
// // import { toast } from "react-toastify";
// // import "./AdminDashboard.css";
// // import AddVendor from './AddVendor'
// // import PendingApprovals from "./PendingApprovals";

// // const AdminDashboard = () => {
// //   const [vendors, setVendors] = useState([]);
// //   const [pendingRequests, setPendingRequests] = useState([]); 
// //   const [selectedView, setSelectedView] = useState("dashboard");
// //   const [newVendor, setNewVendor] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     shopName: "",
// //     phone: "",
// //     shopAddress: "",
// //     adharNo: "", 
// //   });
// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [activeTab, setActiveTab] = useState("dashboard");
// //   const token = localStorage.getItem("adminToken");

// //   const [password, setPassword] = useState("");
// //   const [selectedRequest, setSelectedRequest] = useState(null); 

// //   const handleTabClick = (tab) => {
// //     setActiveTab(tab);
// //     if (tab === "dashboard") setSelectedView("dashboard");
// //     else if (tab === "viewVendors") setSelectedView("view");
// //     else if (tab === "VendorRegister") setSelectedView("add");
// //   };

// //   useEffect(() => {
// //     fetchApprovedVendors();
// //     fetchPendingRequests();
// //   }, []);

// //   const fetchApprovedVendors = async () => {
// //     try {
// //       const token = localStorage.getItem("adminToken");
// //       const res = await axios.get("http://localhost:10000/api/admin/vendors", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setVendors(res.data || []);
// //     } catch (err) {
// //       console.error("Error fetching vendors:", err.response?.data || err.message);
// //     }
// //   };
  
// //   const fetchPendingRequests = async () => {
// //     try {
// //       const token = localStorage.getItem("adminToken");
// //       const res = await axios.get("http://localhost:10000/api/admin/vendor/requests", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setPendingRequests(res.data || []);
// //     } catch (err) {
// //       console.error("Error fetching pending requests:", err.response?.data || err.message);
// //     }
// //   };

// //   // ---------- Validation helpers ----------
// //   const validators = {
// //     name: (v) => {
// //       if (!v || !v.trim()) return "Name is required.";
// //       if (!/^[A-Za-z\s]+$/.test(v)) return "Name must contain only letters and spaces.";
// //       return "";
// //     },
// //     email: (v) => {
// //       if (!v || !v.trim()) return "Email is required.";
// //       const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //       if (!re.test(v)) return "Enter a valid email address.";
// //       return "";
// //     },
// //     password: (v) => {
// //       if (!v) return "Password is required.";
// //       if (v.length !== 8) return "Password must be exactly 8 characters.";
// //       return "";
// //     },
// //     businessName: (v) => {
// //       if (!v || !v.trim()) return "Business name is required.";
// //       return "";
// //     },
// //     phone: (v) => {
// //       if (!v) return "Phone is required.";
// //       // ✅ Updated regex for E.164 format (+[0-9]{1,3}[0-9]{10} or 10 digits)
// //       const e164Regex = /^\+?[0-9]{1,15}$/; 
      
// //       if (!e164Regex.test(v)) {
// //           return "Phone must be a valid E.164 format (e.g., +919876543210) or 10 digits.";
// //       }
      
// //       // Basic length check for India (+91 followed by 10 digits = 12 characters total)
// //       const sanitized = v.replace('+', '');
// //       if (sanitized.length < 10 || sanitized.length > 15) { // Allowing up to 15 digits for flexibility
// //           return "Phone number length is usually between 10 and 15 digits (including country code).";
// //       }
      
// //       return "";
// //     },
// //     address: (v) => {
// //       if (!v || !v.trim()) return "Address is required.";
// //       return "";
// //     },
// //     adharNo: (v) => { 
// //       if (!v) return "Aadhar number is required.";
// //       if (!/^\d{12}$/.test(v)) return "Aadhar must be exactly 12 digits.";
// //       return "";
// //     }
// //   };

// //   const validateField = (field, value) => {
// //     const fn = validators[field];
// //     if (!fn) return "";
// //     const message = fn(value);
// //     setErrors((prev) => ({ ...prev, [field]: message }));
// //     return message === "";
// //   };

// //   const validateAll = () => {
// //     const nextErrors = {};
// //     let ok = true;
// //     Object.keys(validators).forEach((field) => {
// //       const valid = validators[field](newVendor[field]);
// //       nextErrors[field] = valid;
// //       if (valid) ok = false;
// //     });
// //     setErrors(nextErrors);
// //     return ok;
// //   };

// //   const handleNameChange = (e) => {
// //     const filtered = e.target.value.replace(/[^A-Za-z\s]/g, "");
// //     setNewVendor((prev) => ({ ...prev, name: filtered })); // ✅ Corrected 'p' to 'prev'
// //     validateField("name", filtered);
// //   };

// //   const handlePhoneChange = (e) => {
// //     const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
// //     setNewVendor((prev) => ({ ...prev, phone: digits })); // ✅ Corrected 'p' to 'prev'
// //     if (digits.length === 10) validateField("phone", digits);
// //     else setErrors((prev) => ({ ...prev, phone: "Phone must be exactly 10 digits." }));
// //   };
  
// //   const handleAdharNoChange = (e) => { 
// //     const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
// //     setNewVendor((prev) => ({ ...prev, adharNo: digits })); // ✅ Corrected 'p' to 'prev'
// //     if (digits.length === 12) validateField("adharNo", digits);
// //     else setErrors((prev) => ({ ...prev, adharNo: "Aadhar must be exactly 12 digits." }));
// //   };


// //   const handleEmailChange = (e) => {
// //     const v = e.target.value;
// //     setNewVendor((prev) => ({ ...prev, email: v })); // ✅ Corrected 'p' to 'prev'
// //     if (v.includes("@")) validateField("email", v);
// //     else setErrors((prev) => ({ ...prev, email: "" }));
// //   };

// //   const handlePasswordChange = (e) => {
// //     const v = e.target.value.slice(0, 8);
// //     setNewVendor((prev) => ({ ...prev, password: v })); // ✅ Corrected 'p' to 'prev'
// //     if (v.length === 8) validateField("password", v);
// //     else setErrors((prev) => ({ ...prev, password: "Password must be exactly 8 characters." }));
// //   };

// //   const handleGenericChange = (field) => (e) => {
// //     const v = e.target.value;
// //     setNewVendor((prev) => ({ ...prev, [field]: v })); // ✅ Corrected 'p' to 'prev'
// //     validateField(field, v);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const token = localStorage.getItem("adminToken"); 
// //     if (!token) {
// //       toast.error("Admin not logged in!");
// //       return;
// //     }

// //     axios.post(`${process.env.REACT_APP_API_URL}/api/admin/vendors`, newVendor, {
// //       headers: { Authorization: `Bearer ${token}` }
// //     })
// //     .then((res) => {
// //       toast.success("Vendor added successfully!");
// //       fetchApprovedVendors();
// //       setNewVendor({
// //         name: "",
// //         email: "",
// //         password: "",
// //         businessName: "",
// //         phone: "",
// //         address: "",
// //         adharNo: "", 
// //       });
// //       setSelectedView("view");
// //     })
// //     .catch((err) => {
// //       console.error("Error creating vendor:", err);
// //       toast.error(err.response?.data?.message || "Error creating vendor");
// //     });
// //   };

// //   const finalizeApprove = async () => {
// //     if (!password || password.length < 8) {
// //       toast.error("Password must be at least 8 characters!");
// //       return;
// //     }
    
// //     try {
// //       const token = localStorage.getItem("adminToken");
// //       await axios.post(
// //         `${process.env.REACT_APP_API_URL}/api/admin/vendor/approve/${selectedRequest._id}`,
// //         { password },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       toast.success("Vendor approved successfully!");
// //       setPassword("");
// //       setSelectedRequest(null);
// //       fetchApprovedVendors(); 
// //       fetchPendingRequests(); 
// //     } catch (err) {
// //       console.error("Error approving vendor:", err);
// //       toast.error(err.response?.data?.message || "Failed to approve vendor!");
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this vendor request?")) return;
// //     try {
// //       await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/vendor/request/${id}`, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       toast.info("Vendor request deleted.");
// //       fetchPendingRequests();
// //     } catch (err) {
// //       console.error("Error deleting vendor request:", err);
// //       toast.error("Failed to delete vendor request!");
// //     }
// //   };

// //   const handleAdminLogin = async () => {
// //     try {
// //       const res = await axios.post("http://localhost:10000/api/admin/login", {
// //         email: "admin@123",  
// //         password: "12345678",       
// //       });
// //       localStorage.setItem("adminToken", res.data.token);
// //       alert("Admin logged in!");
// //     } catch (err) {
// //       alert("Invalid credentials");
// //     }
// //   };

// //   return (
// //     <div className="admin-container d-flex" style={{ minHeight: "100vh" }}>
// //       <div className="sidebar">
// //         <h3>🏠 Admin Panel</h3><br></br>
// //         <ul>
// //           <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => handleTabClick("dashboard")}> <h5>📊 Dashboard</h5> </li>
// //           <li className={activeTab === "VendorRegister" ? "active" : ""} onClick={() => handleTabClick("VendorRegister")}> <h5>➕ Add Vendors</h5> </li>
// //           <li className={activeTab === "viewVendors" ? "active" : ""} onClick={() => handleTabClick("viewVendors")}> <h5>📋 Manage Profile</h5> </li>
// //         </ul>
// //         <button className="logout-btn" onClick={() => {
// //               localStorage.removeItem("adminToken");
// //               window.location.href = "/";
// //             }}>Logout</button>
// //       </div>
// //       <div className="content px-3 py-4" style={{ flex: 1 }}>
// //         {selectedView === "dashboard" && (
// //           <>
// //             <h1 className="mb-4">Vendor Management Overview</h1>
// //             <div className="dashboard-overview">
// //               <div
// //                 className="card stat-card animate-fade"
// //                 onClick={() => setSelectedView("view")}
// //                 style={{ cursor: "pointer" }}
// //               >
// //                 <i className="fas fa-users fa-3x icon"></i>
// //                 <h2>Total Vendors</h2>
// //                 <p>{vendors.length}</p>
// //               </div>

// //               <div
// //                 className="card stat-card animate-fade delay-1"
// //                 onClick={() => setSelectedView("pendingApprovals")}
// //                 style={{ cursor: "pointer" }}
// //               >
// //                 <i className="fas fa-hourglass-half fa-3x icon"></i>
// //                 <h2>Pending Approvals</h2>
// //                 <p>{pendingRequests.length}</p>
// //               </div>
// //             </div>
// //           </>
// //         )}

// //         {selectedView === "add" && (
// //           <>
// //             <h3 className="mb-4">➕ Add New Vendor</h3>

// //             <form onSubmit={handleSubmit}>
// //               <div className="vendor-form-grid">
// //                 <div className="form-group-box">
// //                   <label>Name</label>
// //                   <input
// //                     type="text"
// //                     value={newVendor.name}
// //                     onChange={handleNameChange}
// //                     className={`form-control ${errors.name ? "input-invalid" : ""}`}
// //                     placeholder="Full name"
// //                   />
// //                   {errors.name && <div className="field-error">{errors.name}</div>}
// //                 </div>

// //                 <div className="form-group-box">
// //                   <label>Email</label>
// //                   <input
// //                     type="email"
// //                     value={newVendor.email}
// //                     onChange={handleEmailChange}
// //                     className={`form-control ${errors.email ? "input-invalid" : ""}`}
// //                     placeholder="example@domain.com"
// //                   />
// //                   {errors.email && <div className="field-error">{errors.email}</div>}
// //                 </div>

// //                 <div className="form-group-box">
// //                   <label>Password (exactly 8 chars)</label>
// //                   <input
// //                     type="password"
// //                     value={newVendor.password}
// //                     onChange={handlePasswordChange}
// //                     className={`form-control ${errors.password ? "input-invalid" : ""}`}
// //                     placeholder="8 characters"
// //                     maxLength={8}
// //                   />
// //                   {errors.password && <div className="field-error">{errors.password}</div>}
// //                 </div>

// //                 <div className="form-group-box">
// //                   <label>Business Name</label>
// //                   <input
// //                     type="text"
// //                     value={newVendor.businessName}
// //                     onChange={handleGenericChange("businessName")}
// //                     className={`form-control ${errors.businessName ? "input-invalid" : ""}`}
// //                     placeholder="Shop / business name"
// //                   />
// //                   {errors.businessName && <div className="field-error">{errors.businessName}</div>}
// //                 </div>

// //                 <div className="form-group-box">
// //                   <label>Phone Number</label>
// //                   <input
// //                     type="text"
// //                     value={newVendor.phone}
// //                     onChange={handlePhoneChange}
// //                     className={`form-control ${errors.phone ? "input-invalid" : ""}`}
// //                     placeholder="10 digits"
// //                     inputMode="numeric"
// //                   />
// //                   {errors.phone && <div className="field-error">{errors.phone}</div>}
// //                 </div>

// //                 <div className="form-group-box">
// //                   <label>Address</label>
// //                   <input
// //                     type="text"
// //                     value={newVendor.address}
// //                     onChange={handleGenericChange("address")}
// //                     className={`form-control ${errors.address ? "input-invalid" : ""}`}
// //                     placeholder="Shop address"
// //                   />
// //                   {errors.address && <div className="field-error">{errors.address}</div>}
// //                 </div>

// //                  <div className="form-group-box">
// //                   <label>Aadhar Number</label>
// //                   <input
// //                     type="text"
// //                     value={newVendor.adharNo}
// //                     onChange={handleAdharNoChange}
// //                     className={`form-control ${errors.adharNo ? "input-invalid" : ""}`}
// //                     placeholder="12 digits"
// //                     inputMode="numeric"
// //                   />
// //                   {errors.adharNo && <div className="field-error">{errors.adharNo}</div>}
// //                 </div>
// //               </div>

// //               <div className="d-flex justify-content-center mt-4">
// //                 <button type="submit" className="btn btn-success px-4" disabled={isSubmitting}>
// //                   {isSubmitting ? "Saving…" : "Add Vendor"}
// //                 </button>
// //               </div>
// //             </form>
// //           </>
// //         )}

// //         {selectedView === "pendingApprovals" && (
// //           <div className="pending-approvals">
// //             <h2 className="mb-4 text-2xl font-semibold">Pending Vendor Applications</h2>

// //             {pendingRequests.length > 0 ? (
// //               pendingRequests.map((vendor) => (
// //                 <div
// //                   key={vendor._id}
// //                   className="vendor-card transition transform hover:scale-[1.02] hover:shadow-lg duration-300 ease-in-out p-5 mb-5 rounded-xl shadow-md bg-white border-l-4 border-blue-500 animate-fade"
// //                 >
// //                   <p><strong>Name:</strong> {vendor.name}</p>
// //                   <p><strong>Email:</strong> {vendor.email}</p>
// //                   <p><strong>Shop Name:</strong> {vendor.shopName}</p>
// //                   <p><strong>Mobile:</strong> {vendor.phone}</p>
// //                   <p><strong>Address:</strong> {vendor.shopAddress}</p>
// //                   <p><strong>Aadhar:</strong> {vendor.adharNo}</p>

// //                   <div className="mt-4 flex gap-3">
// //                     <button
// //                       className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-200"
// //                       onClick={() => setSelectedRequest(vendor)}
// //                     >
// //                       Approve
// //                     </button>
// //                     <button
// //                       className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-200"
// //                       onClick={() => handleDelete(vendor._id)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <p className="text-gray-500">No pending vendor applications.</p>
// //             )}
// //           </div>
// //         )}
        
// //         {/* Password Modal */}
// //         {selectedRequest && (
// //           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //             <div className="bg-white p-6 rounded-xl shadow-lg w-96">
// //               <h3 className="text-xl font-bold mb-4">Set Password for {selectedRequest.name}</h3>
// //               <input
// //                 type="password"
// //                 placeholder="Enter password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="w-full p-2 border rounded mb-4"
// //               />
// //               <div className="flex justify-end space-x-3">
// //                 <button
// //                   onClick={() => {setSelectedRequest(null); setPassword("")}}
// //                   className="px-4 py-2 bg-gray-400 text-white rounded-lg"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={finalizeApprove}
// //                   className="px-4 py-2 bg-green-600 text-white rounded-lg"
// //                 >
// //                   Approve
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {selectedView === "view" && <ViewVendors />}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ViewVendors from "./ViewVendors";
// import { toast } from "react-toastify";
// import "./AdminDashboard.css";
// import AddVendor from './AddVendor'
// import PendingApprovals from "./PendingApprovals";

// const AdminDashboard = () => {
//   const [vendors, setVendors] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]); 
//   const [selectedView, setSelectedView] = useState("dashboard");
//   const [newVendor, setNewVendor] = useState({
//     name: "",
//     email: "",
//     password: "",
//     shopName: "",
//     phone: "",
//     shopAddress: "",
//     adharNo: "", 
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const token = localStorage.getItem("adminToken");

//   const [password, setPassword] = useState("");
//   const [selectedRequest, setSelectedRequest] = useState(null); 

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     if (tab === "dashboard") setSelectedView("dashboard");
//     else if (tab === "viewVendors") setSelectedView("view");
//     else if (tab === "VendorRegister") setSelectedView("add");
//   };

//   useEffect(() => {
//     fetchApprovedVendors();
//     fetchPendingRequests();
//   }, []);

//   const fetchApprovedVendors = async () => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       const res = await axios.get("http://localhost:10000/api/admin/vendors", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setVendors(res.data || []);
//     } catch (err) {
//       console.error("Error fetching vendors:", err.response?.data || err.message);
//     }
//   };
  
//   const fetchPendingRequests = async () => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       const res = await axios.get("http://localhost:10000/api/admin/vendor/requests", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPendingRequests(res.data || []);
//     } catch (err) {
//       console.error("Error fetching pending requests:", err.response?.data || err.message);
//     }
//   };

//   // ---------- Validation helpers ----------
//   const validators = {
//     name: (v) => {
//       if (!v || !v.trim()) return "Name is required.";
//       if (!/^[A-Za-z\s]+$/.test(v)) return "Name must contain only letters and spaces.";
//       return "";
//     },
//     email: (v) => {
//       if (!v || !v.trim()) return "Email is required.";
//       const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!re.test(v)) return "Enter a valid email address.";
//       return "";
//     },
//     password: (v) => {
//       if (!v) return "Password is required.";
//       if (v.length !== 8) return "Password must be exactly 8 characters.";
//       return "";
//     },
//     businessName: (v) => {
//       if (!v || !v.trim()) return "Business name is required.";
//       return "";
//     },
//     phone: (v) => {
//       if (!v) return "Phone is required.";
//       // ✅ Updated regex for E.164 format (+[0-9]{1,3}[0-9]{10} or 10 digits)
//       const e164Regex = /^\+?[0-9]{1,15}$/; 
      
//       if (!e164Regex.test(v)) {
//           return "Phone must be a valid E.164 format (e.g., +919876543210) or 10 digits.";
//       }
      
//       // Basic length check for India (+91 followed by 10 digits = 12 characters total)
//       const sanitized = v.replace('+', '');
//       if (sanitized.length < 10 || sanitized.length > 15) { // Allowing up to 15 digits for flexibility
//           return "Phone number length is usually between 10 and 15 digits (including country code).";
//       }
      
//       return "";
//     },
//     address: (v) => {
//       if (!v || !v.trim()) return "Address is required.";
//       return "";
//     },
//     adharNo: (v) => { 
//       if (!v) return "Aadhar number is required.";
//       if (!/^\d{12}$/.test(v)) return "Aadhar must be exactly 12 digits.";
//       return "";
//     }
//   };

//   const validateField = (field, value) => {
//     const fn = validators[field];
//     if (!fn) return "";
//     const message = fn(value);
//     setErrors((prev) => ({ ...prev, [field]: message }));
//     return message === "";
//   };

//   const validateAll = () => {
//     const nextErrors = {};
//     let ok = true;
//     Object.keys(validators).forEach((field) => {
//       const valid = validators[field](newVendor[field]);
//       nextErrors[field] = valid;
//       if (valid) ok = false;
//     });
//     setErrors(nextErrors);
//     return ok;
//   };

//   const handleNameChange = (e) => {
//     const filtered = e.target.value.replace(/[^A-Za-z\s]/g, "");
//     setNewVendor((prev) => ({ ...prev, name: filtered })); 
//     validateField("name", filtered);
//   };

//   const handlePhoneChange = (e) => {
//     const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
//     setNewVendor((prev) => ({ ...prev, phone: digits })); 
//     if (digits.length === 10) validateField("phone", digits);
//     else setErrors((prev) => ({ ...prev, phone: "Phone must be exactly 10 digits." }));
//   };
  
//   const handleAdharNoChange = (e) => { 
//     const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
//     setNewVendor((prev) => ({ ...prev, adharNo: digits })); 
//     if (digits.length === 12) validateField("adharNo", digits);
//     else setErrors((prev) => ({ ...prev, adharNo: "Aadhar must be exactly 12 digits." }));
//   };


//   const handleEmailChange = (e) => {
//     const v = e.target.value;
//     setNewVendor((prev) => ({ ...prev, email: v })); 
//     if (v.includes("@")) validateField("email", v);
//     else setErrors((prev) => ({ ...prev, email: "" }));
//   };

//   const handlePasswordChange = (e) => {
//     const v = e.target.value.slice(0, 8);
//     setNewVendor((prev) => ({ ...prev, password: v })); 
//     if (v.length === 8) validateField("password", v);
//     else setErrors((prev) => ({ ...prev, password: "Password must be exactly 8 characters." }));
//   };

//   const handleGenericChange = (field) => (e) => {
//     const v = e.target.value;
//     setNewVendor((prev) => ({ ...prev, [field]: v })); 
//     validateField(field, v);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("adminToken"); 
//     if (!token) {
//       toast.error("Admin not logged in!");
//       return;
//     }

//     axios.post(`${process.env.REACT_APP_API_URL}/api/admin/vendors`, newVendor, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then((res) => {
//       toast.success("Vendor added successfully!");
//       fetchApprovedVendors();
//       setNewVendor({
//         name: "",
//         email: "",
//         password: "",
//         businessName: "",
//         phone: "",
//         address: "",
//         adharNo: "", 
//       });
//       setSelectedView("view");
//     })
//     .catch((err) => {
//       console.error("Error creating vendor:", err);
//       toast.error(err.response?.data?.message || "Error creating vendor");
//     });
//   };

//   const finalizeApprove = async () => {
//     if (!password || password.length < 8) {
//       toast.error("Password must be at least 8 characters!");
//       return;
//     }
    
//     try {
//       const token = localStorage.getItem("adminToken");
//       await axios.post(
//         `${process.env.REACT_APP_API_URL}/api/admin/vendor/approve/${selectedRequest._id}`,
//         { password },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Vendor approved successfully! SMS and Email confirmation sent.");
//       setPassword("");
//       setSelectedRequest(null);
//       fetchApprovedVendors(); 
//       fetchPendingRequests(); 
//     } catch (err) {
//       console.error("Error approving vendor:", err);
//       // ✅ Improved error handling to display the 400 error message from the server
//       const errorMessage = err.response?.data?.message || "Failed to approve vendor. Server error or network issue.";
//       toast.error(errorMessage);

//       // If the error is due to a 400 conflict, remove the modal but don't refresh the list
//       if (err.response && err.response.status === 400) {
//         setPassword("");
//         setSelectedRequest(null);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this vendor request?")) return;
//     try {
//       await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/vendor/request/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       toast.info("Vendor request deleted.");
//       fetchPendingRequests();
//     } catch (err) {
//       console.error("Error deleting vendor request:", err);
//       toast.error("Failed to delete vendor request!");
//     }
//   };

//   const handleAdminLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:10000/api/admin/login", {
//         email: "admin@123",  
//         password: "12345678",       
//       });
//       localStorage.setItem("adminToken", res.data.token);
//       alert("Admin logged in!");
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="admin-container d-flex" style={{ minHeight: "100vh" }}>
//       <div className="sidebar">
//         <h3>🏠 Admin Panel</h3><br></br>
//         <ul>
//           <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => handleTabClick("dashboard")}> <h5>📊 Dashboard</h5> </li>
//           <li className={activeTab === "VendorRegister" ? "active" : ""} onClick={() => handleTabClick("VendorRegister")}> <h5>➕ Add Vendors</h5> </li>
//           <li className={activeTab === "viewVendors" ? "active" : ""} onClick={() => handleTabClick("viewVendors")}> <h5>📋 Manage Profile</h5> </li>
//         </ul>
//         <button className="logout-btn" onClick={() => {
//               localStorage.removeItem("adminToken");
//               window.location.href = "/";
//             }}>Logout</button>
//       </div>
//       <div className="content px-3 py-4" style={{ flex: 1 }}>
//         {selectedView === "dashboard" && (
//           <>
//             <h1 className="mb-4">Vendor Management Overview</h1>
//             <div className="dashboard-overview">
//               <div
//                 className="card stat-card animate-fade"
//                 onClick={() => setSelectedView("view")}
//                 style={{ cursor: "pointer" }}
//               >
//                 <i className="fas fa-users fa-3x icon"></i>
//                 <h2>Total Vendors</h2>
//                 <p>{vendors.length}</p>
//               </div>

//               <div
//                 className="card stat-card animate-fade delay-1"
//                 onClick={() => setSelectedView("pendingApprovals")}
//                 style={{ cursor: "pointer" }}
//               >
//                 <i className="fas fa-hourglass-half fa-3x icon"></i>
//                 <h2>Pending Approvals</h2>
//                 <p>{pendingRequests.length}</p>
//               </div>
//             </div>
//           </>
//         )}

//         {selectedView === "add" && (
//           <>
//             <h3 className="mb-4">➕ Add New Vendor</h3>

//             <form onSubmit={handleSubmit}>
//               <div className="vendor-form-grid">
//                 <div className="form-group-box">
//                   <label>Name</label>
//                   <input
//                     type="text"
//                     value={newVendor.name}
//                     onChange={handleNameChange}
//                     className={`form-control ${errors.name ? "input-invalid" : ""}`}
//                     placeholder="Full name"
//                   />
//                   {errors.name && <div className="field-error">{errors.name}</div>}
//                 </div>

//                 <div className="form-group-box">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     value={newVendor.email}
//                     onChange={handleEmailChange}
//                     className={`form-control ${errors.email ? "input-invalid" : ""}`}
//                     placeholder="example@domain.com"
//                   />
//                   {errors.email && <div className="field-error">{errors.email}</div>}
//                 </div>

//                 <div className="form-group-box">
//                   <label>Password (exactly 8 chars)</label>
//                   <input
//                     type="password"
//                     value={newVendor.password}
//                     onChange={handlePasswordChange}
//                     className={`form-control ${errors.password ? "input-invalid" : ""}`}
//                     placeholder="8 characters"
//                     maxLength={8}
//                   />
//                   {errors.password && <div className="field-error">{errors.password}</div>}
//                 </div>

//                 <div className="form-group-box">
//                   <label>Business Name</label>
//                   <input
//                     type="text"
//                     value={newVendor.shopName}
//                     onChange={handleGenericChange("shopName")}
//                     className={`form-control ${errors.shopName ? "input-invalid" : ""}`}
//                     placeholder="Shop / business name"
//                   />
//                   {errors.shopName && <div className="field-error">{errors.shopName}</div>}
//                 </div>

//                 <div className="form-group-box">
//                   <label>Phone Number</label>
//                   <input
//                     type="text"
//                     value={newVendor.phone}
//                     onChange={handlePhoneChange}
//                     className={`form-control ${errors.phone ? "input-invalid" : ""}`}
//                     placeholder="10 digits"
//                     inputMode="numeric"
//                   />
//                   {errors.phone && <div className="field-error">{errors.phone}</div>}
//                 </div>

//                 <div className="form-group-box">
//                   <label>Address</label>
//                   <input
//                     type="text"
//                     value={newVendor.shopAddress}
//                     onChange={handleGenericChange("shopAddress")}
//                     className={`form-control ${errors.shopAddress ? "input-invalid" : ""}`}
//                     placeholder="Shop address"
//                   />
//                   {errors.shopAddress && <div className="field-error">{errors.shopAddress}</div>}
//                 </div>

//                  <div className="form-group-box">
//                   <label>Aadhar Number</label>
//                   <input
//                     type="text"
//                     value={newVendor.adharNo}
//                     onChange={handleAdharNoChange}
//                     className={`form-control ${errors.adharNo ? "input-invalid" : ""}`}
//                     placeholder="12 digits"
//                     inputMode="numeric"
//                   />
//                   {errors.adharNo && <div className="field-error">{errors.adharNo}</div>}
//                 </div>
//               </div>

//               <div className="d-flex justify-content-center mt-4">
//                 <button type="submit" className="btn btn-success px-4" disabled={isSubmitting}>
//                   {isSubmitting ? "Saving…" : "Add Vendor"}
//                 </button>
//               </div>
//             </form>
//           </>
//         )}

//         {selectedView === "pendingApprovals" && (
//           <div className="pending-approvals">
//             <h2 className="mb-4 text-2xl font-semibold">Pending Vendor Applications</h2>

//             {pendingRequests.length > 0 ? (
//               pendingRequests.map((vendor) => (
//                 <div
//                   key={vendor._id}
//                   className="vendor-card transition transform hover:scale-[1.02] hover:shadow-lg duration-300 ease-in-out p-5 mb-5 rounded-xl shadow-md bg-white border-l-4 border-blue-500 animate-fade"
//                 >
//                   <p><strong>Name:</strong> {vendor.name}</p>
//                   <p><strong>Email:</strong> {vendor.email}</p>
//                   <p><strong>Shop Name:</strong> {vendor.shopName}</p>
//                   <p><strong>Mobile:</strong> {vendor.phone}</p>
//                   <p><strong>Address:</strong> {vendor.shopAddress}</p>
//                   <p><strong>Aadhar:</strong> {vendor.adharNo}</p>

//                   <div className="mt-4 flex gap-3">
//                     <button
//                       className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-200"
//                       onClick={() => setSelectedRequest(vendor)}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-200"
//                       onClick={() => handleDelete(vendor._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No pending vendor applications.</p>
//             )}
//           </div>
//         )}
        
//         {/* Password Modal */}
//         {selectedRequest && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-xl shadow-lg w-96">
//               <h3 className="text-xl font-bold mb-4">Set Password for {selectedRequest.name}</h3>
//               <input
//                 type="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-2 border rounded mb-4"
//               />
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => {setSelectedRequest(null); setPassword("")}}
//                   className="px-4 py-2 bg-gray-400 text-white rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={finalizeApprove}
//                   className="px-4 py-2 bg-green-600 text-white rounded-lg"
//                 >
//                   Approve
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {selectedView === "view" && <ViewVendors />}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewVendors from "./ViewVendors";
import { toast } from "react-toastify";
import "./AdminDashboard.css";
import AddVendor from './AddVendor'; 
// import PendingApprovals from "./PendingApprovals"; 

const AdminDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedView, setSelectedView] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("dashboard");
  const token = localStorage.getItem("adminToken");

  const [password, setPassword] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "dashboard") setSelectedView("dashboard");
    else if (tab === "viewVendors") setSelectedView("view");
    else if (tab === "VendorRegister") setSelectedView("add");
  };

  useEffect(() => {
    fetchApprovedVendors();
    fetchPendingRequests();
  }, []);

  const fetchApprovedVendors = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:10000/api/admin/vendors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendors(res.data || []);
    } catch (err) {
      console.error("Error fetching vendors:", err.response?.data || err.message);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:10000/api/admin/vendor/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingRequests(res.data || []);
    } catch (err) {
      console.error("Error fetching pending requests:", err.response?.data || err.message);
    }
  };

  const finalizeApprove = async () => {
    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/vendor/approve/${selectedRequest._id}`,
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Vendor approved successfully! SMS and Email confirmation sent.");
      setPassword("");
      setSelectedRequest(null);
      fetchApprovedVendors();
      fetchPendingRequests();
    } catch (err) {
      console.error("Error approving vendor:", err);
      const errorMessage = err.response?.data?.message || "Failed to approve vendor. Server error or network issue.";
      toast.error(errorMessage);

      if (err.response && err.response.status === 400) {
        setPassword("");
        setSelectedRequest(null);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vendor request?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/vendor/request/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.info("Vendor request deleted.");
      fetchPendingRequests();
    } catch (err) {
      console.error("Error deleting vendor request:", err);
      toast.error("Failed to delete vendor request!");
    }
  };

  const handleAdminLogin = async () => {
    try {
      const res = await axios.post("http://localhost:10000/api/admin/login", {
        email: "admin@123",
        password: "12345678",
      });
      localStorage.setItem("adminToken", res.data.token);
      alert("Admin logged in!");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="admin-container d-flex" style={{ minHeight: "100vh" }}>
      <div className="sidebar">
        <h3>🏠 Admin Panel</h3><br></br>
        <ul>
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => handleTabClick("dashboard")}> <h5>📊 Dashboard</h5> </li>
          <li className={activeTab === "VendorRegister" ? "active" : ""} onClick={() => handleTabClick("VendorRegister")}> <h5>➕ Add Vendors</h5> </li>
          <li className={activeTab === "viewVendors" ? "active" : ""} onClick={() => handleTabClick("viewVendors")}> <h5>📋 Manage Profile</h5> </li>
        </ul>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/";
        }}>Logout</button>
      </div>
      <div className="content px-3 py-4" style={{ flex: 1 }}>
        {selectedView === "dashboard" && (
          <>
            <h1 className="mb-4">Vendor Management Overview</h1>
            <div className="dashboard-overview">
              <div
                className="card stat-card animate-fade"
                onClick={() => setSelectedView("view")}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-users fa-3x icon"></i>
                <h2>Total Vendors</h2>
                <p>{vendors.length}</p>
              </div>

              <div
                className="card stat-card animate-fade delay-1"
                onClick={() => setSelectedView("pendingApprovals")}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-hourglass-half fa-3x icon"></i>
                <h2>Pending Approvals</h2>
                <p>{pendingRequests.length}</p>
              </div>
            </div>
          </>
        )}

        {selectedView === "add" && (
          <AddVendor onFormSubmitSuccess={fetchPendingRequests} />
        )}

        {selectedView === "pendingApprovals" && (
          <div className="pending-approvals">
            <h2 className="mb-4 text-2xl font-semibold">Pending Vendor Applications</h2>

            {pendingRequests.length > 0 ? (
              pendingRequests.map((vendor) => (
                <div
                  key={vendor._id}
                  className="vendor-card transition transform hover:scale-[1.02] hover:shadow-lg duration-300 ease-in-out p-5 mb-5 rounded-xl shadow-md bg-white border-l-4 border-blue-500 animate-fade"
                >
                  <p><strong>Name:</strong> {vendor.name}</p>
                  <p><strong>Email:</strong> {vendor.email}</p>
                  <p><strong>Shop Name:</strong> {vendor.shopName}</p>
                  <p><strong>Mobile:</strong> {vendor.phone}</p>
                  <p><strong>Address:</strong> {vendor.shopAddress}</p>
                  <p><strong>Aadhar:</strong> {vendor.adharNo}</p>

                  <div className="mt-4 flex gap-3">
                    <button
                      className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-200"
                      onClick={() => setSelectedRequest(vendor)}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-200"
                      onClick={() => handleDelete(vendor._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No pending vendor applications.</p>
            )}
          </div>
        )}
        
        {/* Password Modal */}
        {selectedRequest && (
          // --- THIS IS THE FIX ---
          // Changed bg-opacity-5F0 to bg-opacity-50
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {/* --- END OF FIX --- */}
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
              <h3 className="text-xl font-bold mb-4">Set Password for {selectedRequest.name}</h3>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => { setSelectedRequest(null); setPassword("") }}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={finalizeApprove}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedView === "view" && <ViewVendors />}
      </div>
    </div>
  );
};

export default AdminDashboard;