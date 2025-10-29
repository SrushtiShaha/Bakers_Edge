// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
// // // import { toast, ToastContainer } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";

// // // const VendorSettings = () => {
// // //   const [vendor, setVendor] = useState({
// // //     shopName: "",
// // //     contact: "",
// // //     upiId: "",
// // //     upiQr: "",
// // //   });

// // //   const [passwordData, setPasswordData] = useState({
// // //     currentPassword: "",
// // //     newPassword: "",
// // //     confirmPassword: "",
// // //   });

// // //   const [loading, setLoading] = useState(true);
// // //   const [qrPreview, setQrPreview] = useState(null);

// // //   const apiUrl = process.env.REACT_APP_API_URL;

// // //   // ---------------- FETCH VENDOR DETAILS ----------------
// // //   useEffect(() => {
// // //     const fetchVendorData = async () => {
// // //       try {
// // //         const token = localStorage.getItem("vendorToken");
// // //         const res = await axios.get(`${apiUrl}/api/admin/vendor/me`, {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });
// // //         setVendor({
// // //           shopName: res.data.shopName || "",
// // //           contact: res.data.contact || "",
// // //           upiId: res.data.upiId || "",
// // //           upiQr: res.data.upiQr || "",
// // //         });
// // //         setQrPreview(res.data.upiQr || null);
// // //       } catch (err) {
// // //         console.error(err);
// // //         toast.error("Failed to fetch vendor info");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchVendorData();
// // //   }, [apiUrl]);

// // //   // ---------------- HANDLERS ----------------
// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setVendor((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   // ✅ FIXED PASSWORD HANDLER (uses id instead of name)
// // //   const handlePasswordChange = (e) => {
// // //     const { id, value } = e.target;
// // //     setPasswordData((prev) => ({
// // //       ...prev,
// // //       [id]: value,
// // //     }));
// // //   };

// // //   const handleQrUpload = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => {
// // //         setVendor((prev) => ({ ...prev, upiQr: reader.result }));
// // //         setQrPreview(reader.result);
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };

// // //   // ---------------- SAVE SHOP DETAILS ----------------
// // //   const handleSave = async () => {
// // //     try {
// // //       const token = localStorage.getItem("vendorToken");
// // //       await axios.patch(`${apiUrl}/api/admin/vendor/me`, vendor, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       toast.success("Vendor details updated successfully!");
// // //     } catch (err) {
// // //       console.error(err);
// // //       toast.error("Error updating vendor info");
// // //     }
// // //   };

// // //   // ---------------- CHANGE PASSWORD (with Auto Logout) ----------------
// // //   const handlePasswordSave = async () => {
// // //     const trimmedData = {
// // //       currentPassword: (passwordData.currentPassword || "").trim(),
// // //       newPassword: (passwordData.newPassword || "").trim(),
// // //       confirmPassword: (passwordData.confirmPassword || "").trim(),
// // //     };

// // //     const { currentPassword, newPassword, confirmPassword } = trimmedData;

// // //     console.log("🔍 Password Debug:", {
// // //       currentPassword,
// // //       newPassword,
// // //       confirmPassword,
// // //       length: newPassword.length,
// // //     });

// // //     if (!currentPassword || !newPassword || !confirmPassword) {
// // //       toast.error("Please fill in all password fields");
// // //       return;
// // //     }
// // //     if (newPassword !== confirmPassword) {
// // //       toast.error("New passwords do not match");
// // //       return;
// // //     }
// // //     if (newPassword.length < 8) {
// // //       toast.error("New password must be at least 8 characters");
// // //       return;
// // //     }

// // //     try {
// // //       const token = localStorage.getItem("vendorToken");
// // //       await axios.put(
// // //         `${apiUrl}/api/admin/vendor/me/password`,
// // //         { currentPassword, newPassword },
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );

// // //       toast.success("✅ Password updated successfully! Logging out...");

// // //       // ✅ AUTO LOGOUT AFTER SUCCESS (2 seconds delay)
// // //       setTimeout(() => {
// // //         localStorage.removeItem("vendorToken");
// // //         window.location.href = "/vendorlogin"; // change if your route differs
// // //       }, 2000);

// // //       // Reset fields
// // //       setPasswordData({
// // //         currentPassword: "",
// // //         newPassword: "",
// // //         confirmPassword: "",
// // //       });
// // //     } catch (err) {
// // //       console.error("❌ Password Update Error:", err);
// // //       const message = err.response?.data?.message || "Error updating password";
// // //       toast.error(message);
// // //     }
// // //   };

// // //   // ---------------- LOADING SPINNER ----------------
// // //   if (loading) {
// // //     return (
// // //       <div className="d-flex justify-content-center align-items-center vh-100">
// // //         <Spinner animation="border" variant="primary" />
// // //       </div>
// // //     );
// // //   }

// // //   // ---------------- RENDER ----------------
// // //   return (
// // //     <Container className="py-4">
// // //       <ToastContainer position="top-right" autoClose={3000} />

// // //       {/* -------- VENDOR SETTINGS CARD -------- */}
// // //       <Card
// // //         className="shadow-lg mx-auto p-4"
// // //         style={{
// // //           maxWidth: "600px",
// // //           borderRadius: "15px",
// // //           background: "linear-gradient(145deg, #fff8dc, #ffe4e1)",
// // //         }}
// // //       >
// // //         <h4 className="text-center mb-4" style={{ color: "#6a0572" }}>
// // //           ⚙️ Vendor Settings
// // //         </h4>

// // //         <Form>
// // //           <Form.Group className="mb-3">
// // //             <Form.Label>Shop Name</Form.Label>
// // //             <Form.Control
// // //               type="text"
// // //               name="shopName"
// // //               value={vendor.shopName}
// // //               onChange={handleChange}
// // //               placeholder="Enter your shop name"
// // //             />
// // //           </Form.Group>

// // //           <Form.Group className="mb-3">
// // //             <Form.Label>Contact Number</Form.Label>
// // //             <Form.Control
// // //               type="text"
// // //               name="contact"
// // //               value={vendor.contact}
// // //               onChange={handleChange}
// // //               placeholder="Enter contact number"
// // //             />
// // //           </Form.Group>

// // //           <Form.Group className="mb-3">
// // //             <Form.Label>UPI ID</Form.Label>
// // //             <Form.Control
// // //               type="text"
// // //               name="upiId"
// // //               value={vendor.upiId}
// // //               onChange={handleChange}
// // //               placeholder="example@upi"
// // //             />
// // //           </Form.Group>

// // //           <Form.Group className="mb-3">
// // //             <Form.Label>UPI QR Code</Form.Label>
// // //             <Form.Control type="file" accept="image/*" onChange={handleQrUpload} />
// // //             {qrPreview && (
// // //               <div className="text-center mt-3">
// // //                 <img
// // //                   src={qrPreview}
// // //                   alt="UPI QR Preview"
// // //                   style={{
// // //                     width: "150px",
// // //                     height: "150px",
// // //                     borderRadius: "10px",
// // //                     border: "1px solid #ccc",
// // //                   }}
// // //                 />
// // //               </div>
// // //             )}
// // //           </Form.Group>

// // //           <div className="text-center mt-4">
// // //             <Button
// // //               variant="success"
// // //               onClick={handleSave}
// // //               style={{
// // //                 padding: "10px 20px",
// // //                 borderRadius: "10px",
// // //                 fontWeight: "bold",
// // //                 backgroundColor: "#6a0572",
// // //                 border: "none",
// // //               }}
// // //             >
// // //               💾 Save Changes
// // //             </Button>
// // //           </div>
// // //         </Form>
// // //       </Card>

// // //       {/* -------- CHANGE PASSWORD CARD -------- */}
// // //       <Card
// // //         className="shadow-lg mx-auto p-4 mt-4"
// // //         style={{
// // //           maxWidth: "600px",
// // //           borderRadius: "15px",
// // //           background: "#ffffff",
// // //         }}
// // //       >
// // //         <h4 className="text-center mb-4" style={{ color: "#004085" }}>
// // //           🔑 Change Password
// // //         </h4>

// // //         <Form>
// // //           <Form.Group className="mb-3">
// // //             <Form.Label>Current Password</Form.Label>
// // //             <Form.Control
// // //               type="password"
// // //               id="currentPassword"
// // //               value={passwordData.currentPassword}
// // //               onChange={handlePasswordChange}
// // //               onBlur={handlePasswordChange}
// // //               placeholder="Enter your current password"
// // //             />
// // //           </Form.Group>

// // //           <Form.Group className="mb-3">
// // //             <Form.Label>New Password</Form.Label>
// // //             <Form.Control
// // //               type="password"
// // //               id="newPassword"
// // //               value={passwordData.newPassword}
// // //               onChange={handlePasswordChange}
// // //               onBlur={handlePasswordChange}
// // //               placeholder="Enter new password (min. 8 characters)"
// // //             />
// // //           </Form.Group>

// // //           <Form.Group className="mb-3">
// // //             <Form.Label>Confirm New Password</Form.Label>
// // //             <Form.Control
// // //               type="password"
// // //               id="confirmPassword"
// // //               value={passwordData.confirmPassword}
// // //               onChange={handlePasswordChange}
// // //               onBlur={handlePasswordChange}
// // //               placeholder="Confirm your new password"
// // //             />
// // //           </Form.Group>

// // //           <div className="text-center mt-4">
// // //             <Button
// // //               variant="primary"
// // //               onClick={handlePasswordSave}
// // //               style={{
// // //                 padding: "10px 20px",
// // //                 borderRadius: "10px",
// // //                 fontWeight: "bold",
// // //               }}
// // //             >
// // //               🔒 Update Password
// // //             </Button>
// // //           </div>
// // //         </Form>
// // //       </Card>
// // //     </Container>
// // //   );
// // // };

// // // export default VendorSettings;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const VendorSettings = () => {
// //   const [vendor, setVendor] = useState({
// //     shopName: "",
// //     contact: "",
// //     upiId: "",
// //     upiQr: "",
// //   });

// //   const [passwordData, setPasswordData] = useState({
// //     currentPassword: "",
// //     newPassword: "",
// //     confirmPassword: "",
// //   });

// //   const [loading, setLoading] = useState(true);
// //   const [qrPreview, setQrPreview] = useState(null);

// //   const apiUrl = process.env.REACT_APP_API_URL;

// //   useEffect(() => {
// //     const fetchVendorData = async () => {
// //       try {
// //         const token = localStorage.getItem("vendorToken");
// //         const res = await axios.get(`${apiUrl}/api/admin/vendor/me`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setVendor({
// //           shopName: res.data.shopName || "",
// //           contact: res.data.contact || "",
// //           upiId: res.data.upiId || "",
// //           upiQr: res.data.upiQr || "",
// //         });
// //         setQrPreview(res.data.upiQr || null);
// //       } catch (err) {
// //         console.error(err);
// //         toast.error("Failed to fetch vendor info");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchVendorData();
// //   }, [apiUrl]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setVendor((prev) => ({ ...prev, [name]: value }));
// //   };

// //   // --- FIX IS HERE ---
// //   // Ensure this function is correct and 'e.target' is spelled correctly.
// //   const handlePasswordChange = (e) => {
// //     const { name, value } = e.target; // Check for typos here
// //     setPasswordData((prev) => ({ ...prev, [name]: value }));
// //   };
// //   // --- END FIX ---

// //   const handleQrUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setVendor((prev) => ({ ...prev, upiQr: reader.result }));
// //         setQrPreview(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleSave = async () => {
// //     try {
// //       const token = localStorage.getItem("vendorToken");
// //       await axios.patch(`${apiUrl}/api/admin/vendor/me`, vendor, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       toast.success("Vendor details updated successfully!");
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Error updating vendor info");
// //     }
// //   };

// //   const handlePasswordSave = async () => {
// //     const trimmedData = {
// //       currentPassword: passwordData.currentPassword.trim(),
// //       newPassword: passwordData.newPassword.trim(),
// //       confirmPassword: passwordData.confirmPassword.trim(),
// //     };
    
// //     const { currentPassword, newPassword, confirmPassword } = trimmedData;

// //     if (!currentPassword || !newPassword || !confirmPassword) {
// //       toast.error("Please fill in all password fields");
// //       return;
// //     }
// //     if (newPassword !== confirmPassword) {
// //       toast.error("New passwords do not match");
// //       return;
// //     }
    
// //     // This validation should match your server's validation
// //     if (newPassword.length < 8) {
// //       toast.error("New password must be at least 8 characters");
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem("vendorToken");
// //       await axios.put(
// //         `${apiUrl}/api/admin/vendor/me/password`,
// //         { currentPassword, newPassword },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       toast.success("Password updated successfully!");
// //       setPasswordData({
// //         currentPassword: "",
// //         newPassword: "",
// //         confirmPassword: "",
// //       });
// //     } catch (err) {
// //       // This is where your error is being caught
// //       console.error("❌ Password Update Error:", err); 
// //       const message = err.response?.data?.message || "Error updating password";
// //       toast.error(message);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="d-flex justify-content-center align-items-center vh-100">
// //         <Spinner animation="border" variant="primary" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <Container className="py-4">
// //       <ToastContainer position="top-right" autoClose={3000} />
// //       <Card
// //         className="shadow-lg mx-auto p-4"
// //         style={{
// //           maxWidth: "600px",
// //           borderRadius: "15px",
// //           background: "linear-gradient(145deg, #fff8dc, #ffe4e1)",
// //         }}
// //       >
// //         <h4 className="text-center mb-4" style={{ color: "#6a0572" }}>
// //           ⚙️ Vendor Settings
// //         </h4>

// //         <Form>
// //           {/* ... other form groups ... */}
// //            <Form.Group className="mb-3">
// //             <Form.Label>Shop Name</Form.Label>
// //             <Form.Control
// //               type="text"
// //               name="shopName"
// //               value={vendor.shopName}
// //               onChange={handleChange}
// //               placeholder="Enter your shop name"
// //             />
// //           </Form.Group>

// //           <Form.Group className="mb-3">
// //             <Form.Label>Contact Number</Form.Label>
// //             <Form.Control
// //               type="text"
// //               name="contact"
// //               value={vendor.contact}
// //               onChange={handleChange}
// //               placeholder="Enter contact number"
// //             />
// //           </Form.Group>

// //           <Form.Group className="mb-3">
// //             <Form.Label>UPI ID</Form.Label>
// //             <Form.Control
// //               type="text"
// //               name="upiId"
// //               value={vendor.upiId}
// //               onChange={handleChange}
// //               placeholder="example@upi"
// //             />
// //           </Form.Group>

// //           <Form.Group className="mb-3">
// //             <Form.Label>UPI QR Code</Form.Label>
// //             <Form.Control type="file" accept="image/*" onChange={handleQrUpload} />
// //             {qrPreview && (
// //               <div className="text-center mt-3">
// //                 <img
// //                   src={qrPreview}
// //                   alt="UPI QR Preview"
// //                   style={{
// //                     width: "150px",
// //                     height: "150px",
// //                     borderRadius: "10px",
// //                     border: "1px solid #ccc",
// //                   }}
// //                 />
// //               </div>
// //             )}
// //           </Form.Group>

// //           <div className="text-center mt-4">
// //             <Button
// //               variant="success"
// //               onClick={handleSave}
// //               style={{
// //                 padding: "10px 20px",
// //                 borderRadius: "10px",
// //                 fontWeight: "bold",
// //                 backgroundColor: "#6a0572",
// //                 border: "none",
// //               }}
// //             >
// //               💾 Save Changes
// //             </Button>
// //           </div>
// //         </Form>
// //       </Card>

// //       <Card
// //         className="shadow-lg mx-auto p-4 mt-4"
// //         style={{
// //           maxWidth: "600px",
// //           borderRadius: "15px",
// //           background: "#ffffff",
// //         }}
// //       >
// //         <h4 className="text-center mb-4" style={{ color: "#004085" }}>
// //           🔑 Change Password
// //         </h4>
// //         <Form>
// //           <Form.Group className="mb-3">
// //             <Form.Label>Current Password</Form.Label>
// //             <Form.Control
// //               type="password"
// //               name="currentPassword"
// //               value={passwordData.currentPassword}
// //               onChange={handlePasswordChange}
// //               placeholder="Enter your current password"
// //             />
// //           </Form.Group>
          
// //           <Form.Group className="mb-3">
// //             <Form.Label>New Password</Form.Label>
// //             <Form.Control
// //               type="password"
// //               name="newPassword"
// //               value={passwordData.newPassword}
// //               onChange={handlePasswordChange}
// //               placeholder="Enter new password (min. 8 characters)"
// //             />
// //           </Form.Group>
          
// //           <Form.Group className="mb-3">
// //             <Form.Label>Confirm New Password</Form.Label>
// //             <Form.Control
// //               type="password"
// //               name="confirmPassword"
// //               value={passwordData.confirmPassword}
// //               onChange={handlePasswordChange}
// //               placeholder="Confirm your new password"
// //             />
// //           </Form.Group>
          
// //           <div className="text-center mt-4">
// //             <Button
// //               variant="primary"
// //               onClick={handlePasswordSave}
// //               style={{
// //                 padding: "10px 20px",
// //                 borderRadius: "10px",
// //                 fontWeight: "bold",
// //               }}
// //             >
// //               🔒 Update Password
// //             </Button>
// //           </div>
// //         </Form>
// //       </Card>

// //     </Container>
// //   );
// // };

// // export default VendorSettings;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const VendorSettings = () => {
//   const [vendor, setVendor] = useState({
//     shopName: "",
//     contact: "",
//     upiId: "",
//     upiQr: "",
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [qrPreview, setQrPreview] = useState(null);
//   const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:10000";

//   // ✅ Fetch vendor info
//   useEffect(() => {
//     const fetchVendorData = async () => {
//       try {
//         const token = localStorage.getItem("vendorToken");
//         const res = await axios.get(`${apiUrl}/api/admin/vendor/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setVendor({
//           shopName: res.data.shopName || "",
//           contact: res.data.contact || "",
//           upiId: res.data.upiId || "",
//           upiQr: res.data.upiQr || "",
//         });
//         setQrPreview(res.data.upiQr || null);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to fetch vendor info");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVendorData();
//   }, [apiUrl]);

//   // ✅ Handle vendor field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVendor((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Handle password input
//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Handle QR upload
//   const handleQrUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setVendor((prev) => ({ ...prev, upiQr: reader.result }));
//         setQrPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // ✅ Save vendor info
//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("vendorToken");
//       await axios.patch(`${apiUrl}/api/admin/vendor/me`, vendor, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Vendor details updated successfully!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Error updating vendor info");
//     }
//   };

//   // ✅ Save new password
//   const handlePasswordSave = async () => {
//     const { currentPassword, newPassword, confirmPassword } = passwordData;

//     if (!currentPassword || !newPassword || !confirmPassword) {
//       toast.error("Please fill in all password fields");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error("New passwords do not match");
//       return;
//     }

//     if (newPassword.trim().length < 8) {
//       toast.error("New password must be at least 8 characters");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("vendorToken");

//       console.log("Sending password data:", { currentPassword, newPassword });

//       const response = await axios.put(
//         `${apiUrl}/api/admin/vendor/me/password`,
//         JSON.stringify({ currentPassword, newPassword }),
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       toast.success(response.data.message || "Password updated successfully!");
//       setPasswordData({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       console.error("❌ Password Update Error:", err);
//       const message = err.response?.data?.message || "Error updating password";
//       toast.error(message);
//     }
//   };

//   // ✅ Loading spinner
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   return (
//     <Container className="py-4">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* Vendor Settings Card */}
//       <Card
//         className="shadow-lg mx-auto p-4"
//         style={{
//           maxWidth: "600px",
//           borderRadius: "15px",
//           background: "linear-gradient(145deg, #fff8dc, #ffe4e1)",
//         }}
//       >
//         <h4 className="text-center mb-4" style={{ color: "#6a0572" }}>
//           ⚙️ Vendor Settings
//         </h4>

//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Shop Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="shopName"
//               value={vendor.shopName}
//               onChange={handleChange}
//               placeholder="Enter your shop name"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Contact Number</Form.Label>
//             <Form.Control
//               type="text"
//               name="contact"
//               value={vendor.contact}
//               onChange={handleChange}
//               placeholder="Enter contact number"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>UPI ID</Form.Label>
//             <Form.Control
//               type="text"
//               name="upiId"
//               value={vendor.upiId}
//               onChange={handleChange}
//               placeholder="example@upi"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>UPI QR Code</Form.Label>
//             <Form.Control type="file" accept="image/*" onChange={handleQrUpload} />
//             {qrPreview && (
//               <div className="text-center mt-3">
//                 <img
//                   src={qrPreview}
//                   alt="UPI QR Preview"
//                   style={{
//                     width: "150px",
//                     height: "150px",
//                     borderRadius: "10px",
//                     border: "1px solid #ccc",
//                   }}
//                 />
//               </div>
//             )}
//           </Form.Group>

//           <div className="text-center mt-4">
//             <Button
//               variant="success"
//               onClick={handleSave}
//               style={{
//                 padding: "10px 20px",
//                 borderRadius: "10px",
//                 fontWeight: "bold",
//                 backgroundColor: "#6a0572",
//                 border: "none",
//               }}
//             >
//               💾 Save Changes
//             </Button>
//           </div>
//         </Form>
//       </Card>

//       {/* Password Change Card */}
//       <Card
//         className="shadow-lg mx-auto p-4 mt-4"
//         style={{
//           maxWidth: "600px",
//           borderRadius: "15px",
//           background: "#ffffff",
//         }}
//       >
//         <h4 className="text-center mb-4" style={{ color: "#004085" }}>
//           🔑 Change Password
//         </h4>

//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Current Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="currentPassword"
//               value={passwordData.currentPassword}
//               onChange={handlePasswordChange}
//               placeholder="Enter your current password"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>New Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="newPassword"
//               value={passwordData.newPassword}
//               onChange={handlePasswordChange}
//               placeholder="Enter new password (min. 8 characters)"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Confirm New Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="confirmPassword"
//               value={passwordData.confirmPassword}
//               onChange={handlePasswordChange}
//               placeholder="Confirm your new password"
//             />
//           </Form.Group>

//           <div className="text-center mt-4">
//             <Button
//               variant="primary"
//               onClick={handlePasswordSave}
//               style={{
//                 padding: "10px 20px",
//                 borderRadius: "10px",
//                 fontWeight: "bold",
//               }}
//             >
//               🔒 Update Password
//             </Button>
//           </div>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default VendorSettings;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VendorSettings = () => {
  const [vendor, setVendor] = useState({
    shopName: "",
    contact: "",
    upiId: "",
    upiQr: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [qrPreview, setQrPreview] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:10000";

  // ✅ Fetch vendor info
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const token = localStorage.getItem("vendorToken");
        const res = await axios.get(`${apiUrl}/api/admin/vendor/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVendor({
          shopName: res.data.shopName || "",
          contact: res.data.contact || "",
          upiId: res.data.upiId || "",
          upiQr: res.data.upiQr || "",
        });
        setQrPreview(res.data.upiQr || null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch vendor info");
      } finally {
        setLoading(false);
      }
    };
    fetchVendorData();
  }, [apiUrl]);

  // ✅ Handle vendor field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle password input
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle QR upload
  const handleQrUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVendor((prev) => ({ ...prev, upiQr: reader.result }));
        setQrPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Save vendor info
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("vendorToken");
      await axios.patch(`${apiUrl}/api/admin/vendor/me`, vendor, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Vendor details updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error updating vendor info");
    }
  };

  // ✅ Change password (fixed endpoint)
  const handlePasswordSave = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.trim().length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    try {
      const token = localStorage.getItem("vendorToken");

      console.log("Sending password data:", { currentPassword, newPassword });

      // ✅ FIXED ENDPOINT
      const response = await axios.put(
        `${apiUrl}/api/admin/vendor/password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("❌ Password Update Error:", err);
      const message = err.response?.data?.message || "Error updating password";
      toast.error(message);
    }
  };

  // ✅ Loading spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Vendor Settings Card */}
      <Card
        className="shadow-lg mx-auto p-4"
        style={{
          maxWidth: "600px",
          borderRadius: "15px",
          background: "linear-gradient(145deg, #fff8dc, #ffe4e1)",
        }}
      >
        <h4 className="text-center mb-4" style={{ color: "#6a0572" }}>
          ⚙️ Vendor Settings
        </h4>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Shop Name</Form.Label>
            <Form.Control
              type="text"
              name="shopName"
              value={vendor.shopName}
              onChange={handleChange}
              placeholder="Enter your shop name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={vendor.contact}
              onChange={handleChange}
              placeholder="Enter contact number"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>UPI ID</Form.Label>
            <Form.Control
              type="text"
              name="upiId"
              value={vendor.upiId}
              onChange={handleChange}
              placeholder="example@upi"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>UPI QR Code</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleQrUpload} />
            {qrPreview && (
              <div className="text-center mt-3">
                <img
                  src={qrPreview}
                  alt="UPI QR Preview"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            )}
          </Form.Group>

          <div className="text-center mt-4">
            <Button
              variant="success"
              onClick={handleSave}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                fontWeight: "bold",
                backgroundColor: "#6a0572",
                border: "none",
              }}
            >
              💾 Save Changes
            </Button>
          </div>
        </Form>
      </Card>

      {/* Password Change Card */}
      <Card
        className="shadow-lg mx-auto p-4 mt-4"
        style={{
          maxWidth: "600px",
          borderRadius: "15px",
          background: "#ffffff",
        }}
      >
        <h4 className="text-center mb-4" style={{ color: "#004085" }}>
          🔑 Change Password
        </h4>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter your current password"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password (min. 8 characters)"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm your new password"
            />
          </Form.Group>

          <div className="text-center mt-4">
            <Button
              variant="primary"
              onClick={handlePasswordSave}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              🔒 Update Password
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default VendorSettings;
