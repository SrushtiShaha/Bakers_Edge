// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "axios";

// // // const VendorRegister = () => {
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     phone: "",
// // //     altPhone: "",
// // //     shopName: "",
// // //     shopAddress: "",
// // //     aadhar: "",
// // //     email: "",
// // //     password: "",
// // //   });

// // //   const navigate = useNavigate();

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;

// // //     // Validation rules
// // //     if (name === "name" && /[^a-zA-Z\s]/.test(value)) return; // only letters and spaces
// // //     if ((name === "phone" || name === "altPhone") && (!/^\d*$/.test(value) || value.length > 10)) return; // only numbers, max 10
// // //     if (name === "aadhar" && (!/^\d*$/.test(value) || value.length > 12)) return; // only numbers, max 12
// // //     if (name === "email" && value.length > 20) return; // max length 20

// // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const validateForm = () => {
// // //     const { name, phone, altPhone, shopName, shopAddress, aadhar, email, password } = formData;
// // //     if (!name || !phone || !altPhone || !shopName || !shopAddress || !aadhar || !email || !password) {
// // //       alert("Please fill in all fields.");
// // //       return false;
// // //     }
// // //     if (phone.length !== 10 || altPhone.length !== 10) {
// // //       alert("Phone numbers must be exactly 10 digits.");
// // //       return false;
// // //     }
// // //     if (aadhar.length !== 12) {
// // //       alert("Aadhar number must be exactly 12 digits.");
// // //       return false;
// // //     }
// // //     if (password.length !== 8) {
// // //       alert("Password must be at least 8 characters.");
// // //       return false;
// // //     }
// // //     return true;
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!validateForm()) return;

// // //     try {
// // //       await axios.post(`${process.env.REACT_APP_API_URL}/api/vendor/register`, formData);
// // //       alert("Account created successfully! You can login now.");
// // //       navigate("/vendor/login");
// // //     } catch (err) {
// // //       // console.error(err);
// // //       alert("Error creating account. Please try again.");
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //     {/* Minimal Navbar with only bakery name */}
// // //       <nav className="navbar navbar-dark bg-dark px-4">
// // //         <span className="navbar-brand mb-0 h1 mx-auto text-center" style={{ fontSize: '1.8rem' }}>
// // //           इंद्रायणी बेकर्स
// // //         </span>
// // //       </nav>
// // //     <div className="container col-md-5 mt-4">
// // //       <h2 className="text-center">Vendor Registration</h2>
// // //       <form onSubmit={handleSubmit} className="mt-4">
// // //         <div className="mb-2">
// // //           <label>Full Name</label>
// // //           <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
// // //         </div>
// // //         <div className="mb-2">
// // //           <label>Phone Number</label>
// // //           <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" />
// // //         </div>
// // //         <div className="mb-2">
// // //           <label>Alternate Phone Number</label>
// // //           <input type="text" name="altPhone" value={formData.altPhone} onChange={handleChange} className="form-control" />
// // //         </div>
// // //         <div className="mb-2">
// // //           <label>Shop Name</label>
// // //           <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} className="form-control" />
// // //         </div>
// // //         <div className="mb-2">
// // //           <label>Shop Address</label>
// // //           <input type="text" name="shopAddress" value={formData.shopAddress} onChange={handleChange} className="form-control" />
// // //         </div>
// // //         {/* <div className="mb-2">
// // //           <label>Aadhar Number</label>
// // //           <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} className="form-control" />
// // //         </div> */}
// // //         <div className="mb-2">
// // //           <label>Email</label>
// // //           <input type="text" name="email" value={formData.email} onChange={handleChange} className="form-control" />
// // //         </div>
// // //         <div className="mb-3">
// // //           <label>Password (min 8 chars)</label>
// // //           <input
// // //             type="password"
// // //             name="password"
// // //             value={formData.password}
// // //             onChange={handleChange}
// // //             className="form-control"
// // //             maxLength={8}
// // //           />
// // //         </div>
// // //         <button className="btn btn-success w-100" type="submit">Create Account</button>
// // //       </form>
// // //     </div>
// // //     </>
// // //   );
// // // };

// // // export default VendorRegister;

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "@fortawesome/fontawesome-free/css/all.min.css";
// // import "./AddVendor.css"; // Styles below

// // const VendorRegister = () => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     phone: "",
// //     businessName: "",
// //     address: "",
// //   });
  
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     if (name === "name" && /[^a-zA-Z\s]/.test(value)) return;
// //     if ((name === "phone" || name === "altPhone") && (!/^\d*$/.test(value) || value.length > 10)) return;
// //     if (name === "email" && value.length > 50) return;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const validateForm = () => {
// //     const { name, phone, altPhone, shopName, shopAddress, email, password } = formData;
// //     if (!name || !phone || !altPhone || !shopName || !shopAddress || !email || !password) {
// //       alert("Please fill in all fields."); return false;
// //     }
// //     if (phone.length !== 10 || altPhone.length !== 10) {
// //       alert("Phone numbers must be exactly 10 digits."); return false;
// //     }
// //     if (password.length < 8) {
// //       alert("Password must be at least 8 characters."); return false;
// //     }
// //     return true;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;
// //     try {
// //       await axios.post(`${process.env.REACT_APP_API_URL}/api/vendor/register`, formData);
// //       alert("Account created successfully! You can login now.");
// //       navigate("/vendor/login");
// //     } catch {
// //       alert("Error creating account. Please try again.");
// //     }
// //   };

// //   return (
// //     <>
// //       <nav className="navbar navbar-dark bg-dark px-4">
// //         <span className="navbar-brand h1 mx-auto" style={{ fontSize: "1.8rem" }}>
// //           इंद्रायणी बेकर्स
// //         </span>
// //       </nav>

// //       <div className="register-page">
// //         <div className="register-card">
// //           <h2><i className="fas fa-user-plus me-2 text-success"></i>Vendor Registration</h2>
// //           <form onSubmit={handleSubmit} className="register-form">
// //             <div className="form-row">
// //               <div className="form-group">
// //                 <label>Full Name</label>
// //                 <div className="input-icon"><i className="fas fa-user"></i>
// //                   <input type="text" name="name" value={formData.name} onChange={handleChange} />
// //                 </div>
// //               </div>
// //               <div className="form-group">
// //                 <label>Phone Number</label>
// //                 <div className="input-icon"><i className="fas fa-phone"></i>
// //                   <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="form-row">
// //               <div className="form-group">
// //                 <label>Alternate Phone</label>
// //                 <div className="input-icon"><i className="fas fa-phone-alt"></i>
// //                   <input type="text" name="altPhone" value={formData.altPhone} onChange={handleChange} />
// //                 </div>
// //               </div>
// //               <div className="form-group">
// //                 <label>Shop Name</label>
// //                 <div className="input-icon"><i className="fas fa-store"></i>
// //                   <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="form-group full-width">
// //               <label>Shop Address</label>
// //               <div className="input-icon"><i className="fas fa-map-marker-alt"></i>
// //                 <input type="text" name="shopAddress" value={formData.shopAddress} onChange={handleChange} />
// //               </div>
// //             </div>

// //             <div className="form-row">
// //               <div className="form-group">
// //                 <label>Email</label>
// //                 <div className="input-icon"><i className="fas fa-envelope"></i>
// //                   <input type="text" name="email" value={formData.email} onChange={handleChange} />
// //                 </div>
// //               </div>
// //               <div className="form-group">
// //                 <label>Password (min 8 chars)</label>
// //                 <div className="input-icon"><i className="fas fa-lock"></i>
// //                   <input type="password" name="password" value={formData.password} onChange={handleChange} maxLength={8} />
// //                 </div>
// //               </div>
// //             </div>

// //             <button type="submit" className="submit-btn">
// //               <i className="fas fa-check-circle me-2"></i>Create Account
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default VendorRegister;

// // // import React, { useState } from "react";
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";
// // // import "@fortawesome/fontawesome-free/css/all.min.css";
// // // import "./AddVendor.css";
// // // import { toast } from "react-toastify";
// // // import { Form, Button, Row, Col, Card } from "react-bootstrap";

// // // const AddVendor = () => {
// // //   const [vendor, setVendor] = useState({
// // //     name: '',
// // //     phone: '',
// // //     altPhone: '',
// // //     shopName: '',
// // //     shopAddress: '',
// // //     aadhar: '',
// // //     username: '',
// // //     password: ''
// // //   });

// // //   const handleChange = (e) => {
// // //     setVendor({ ...vendor, [e.target.name]: e.target.value });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       await axios.post('http://localhost:10000/api/vendor/register', vendor);
// // //       alert('Vendor added successfully');
// // //     } catch (error) {
// // //       console.error(error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="add-vendor-container">
// // //       <h2>Add Vendor</h2>
// // //       {/* <form className="vendor-form" onSubmit={handleSubmit}>
// // //         <label>Name</label>
// // //         <input type="text" name="name" value={vendor.name} onChange={handleChange} />

// // //         <label>Phone Number</label>
// // //         <input type="text" name="phone" value={vendor.phone} onChange={handleChange} />

// // //         <label>Alternate Phone</label>
// // //         <input type="text" name="altPhone" value={vendor.altPhone} onChange={handleChange} />

// // //         <label>Shop Name</label>
// // //         <input type="text" name="shopName" value={vendor.shopName} onChange={handleChange} />

// // //         <label>Shop Address</label>
// // //         <input type="text" name="shopAddress" value={vendor.shopAddress} onChange={handleChange} />

// // //         <label>Aadhar Number</label>
// // //         <input type="text" name="aadhar" value={vendor.aadhar} onChange={handleChange} />

// // //         <label>Username</label>
// // //         <input type="text" name="username" value={vendor.username} onChange={handleChange} />

// // //         <label>Password</label>
// // //         <input type="password" name="password" value={vendor.password} onChange={handleChange} />

// // //         <button type="submit" className="submit-btn">Add Vendor</button>
// // //       </form> */}

// // //       <form className="vendor-form" onSubmit={handleSubmit}>
// // //         {/* <div className="form-row">
// // //           <div className="form-group">
// // //             <label>Name</label>
// // //             <input type="text" name="name" value={vendor.name} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-group">
// // //             <label>Phone Number</label>
// // //             <input type="number" name="phone" value={vendor.phone} onChange={handleChange} />
// // //           </div>
// // //         </div>

// // //         <div className="form-row">
// // //           <div className="form-group">
// // //             <label>Shop Name</label>
// // //             <input type="text" name="shopName" value={vendor.shopName} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-group">
// // //             <label>Address</label>
// // //             <input type="text" name="shopAddress" value={vendor.shopAddress} onChange={handleChange} />
// // //           </div>
// // //         </div>

// // //         <div className="form-row">
// // //           <div className="form-group">
// // //             <label>Email</label>
// // //             <input type="email" name="email" value={vendor.email} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-group">
// // //             <label>Password</label>
// // //             <input type="password" name="password" value={vendor.password} onChange={handleChange} />
// // //           </div>
// // //         </div> */}

// // //         <div style={{
// // //   display: 'grid',
// // //   gridTemplateColumns: '1fr 1fr', // two equal columns
// // //   gap: '20px',
// // //   maxWidth: '800px'
// // // }}>
// // //   <div>
// // //     <label>Name</label>
// // //     <input type="text" />
// // //   </div>

// // //   <div>
// // //     <label>Phone Number</label>
// // //     <input type="text" />
// // //   </div>

// // //   <div>
// // //     <label>Alternate Phone Number</label>
// // //     <input type="text" />
// // //   </div>

// // //   <div>
// // //     <label>Shop Name</label>
// // //     <input type="text" />
// // //   </div>

// // //   <div>
// // //     <label>Shop Address</label>
// // //     <input type="text" />
// // //   </div>

// // //   <div>
// // //     <label>Aadhar Number</label>
// // //     <input type="text" />
// // //   </div>
// // // </div>


// // //         <button type="submit" className="submit-btn">Add Vendor</button>
// // //       </form>

// // //     </div>
// // //   );
// // // };

// // // export default AddVendor;

// import React, { useState } from "react";
// import axios from "axios";

// function AddVendor() {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     shopName: "",
//     shopAddress: "",
//     adharNo: "",
//     email: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const { name, phone, shopName, shopAddress, adharNo, email } = formData;
//     if (!name || !phone || !shopName || !shopAddress || !adharNo || !email) {
//       alert("Please fill in all fields.");
//       return false;
//     }
//     if (phone.length !== 10) {
//       alert("Phone number must be exactly 10 digits.");
//       return false;
//     }
//     if (adharNo.length !== 12) {
//       alert("Aadhar number must be exactly 12 digits.");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const res = await axios.post("http://localhost:10000/api/admin/vendors", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("adminToken")}`
//         }
//       });

//       alert(res.data.message);
//       setFormData({
//         name: "",
//         phone: "",
//         shopName: "",
//         shopAddress: "",
//         adharNo: "",
//         email: ""
//       });
//     } catch (error) {
//       console.error("❌ Error adding vendor:", error);
//       alert("Failed to add vendor");
//     }
//   };

//   return (
//     <div className="add-vendor-form">
//       <h2>Add Vendor</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
//         <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
//         <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} placeholder="Shop Name" />
//         <input type="text" name="shopAddress" value={formData.shopAddress} onChange={handleChange} placeholder="Shop Address" />
//         <input type="text" name="adharNo" value={formData.adharNo} onChange={handleChange} placeholder="Aadhar Number" />
//         <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
//         <button type="submit">Add Vendor</button>
//       </form>
//     </div>
//   );
// }

// export default AddVendor;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// We accept the onFormSubmitSuccess prop from the AdminDashboard
function AddVendor({ onFormSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    shopName: "",
    shopAddress: "",
    adharNo: "",
    email: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const E164_REGEX = /^\+?[0-9]{10,13}$/;

  // --- All handlers and validation logic remain unchanged ---

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    let sanitized = value.replace(/[^\d+]/g, '');

    if (sanitized.startsWith('+')) {
      sanitized = '+' + sanitized.replace(/\+/g, '').slice(0, 13);
    } else {
      sanitized = sanitized.slice(0, 13);
    }
    setFormData((prev) => ({ ...prev, phone: sanitized }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "name") {
      newValue = value.replace(/[^A-Za-z\s]/g, "");
    } else if (name === "adharNo") {
      newValue = value.replace(/\D/g, "").slice(0, 12);
    } else if (name === "phone") {
      setFormData({ ...formData, [name]: value });
      return;
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const validateForm = () => {
    const { name, phone, shopName, shopAddress, adharNo, email } = formData;

    if (!name || !phone || !shopName || !shopAddress || !adharNo || !email) {
      toast.error("All fields are required!");
      return false;
    }
    if (!/^[A-Za-z ]+$/.test(name)) {
      toast.error("Name must only contain letters (A-Z, a-z)");
      return false;
    }
    if (!E164_REGEX.test(phone)) {
      toast.error("Mobile number must be in E.164 format (e.g., +919876543210).");
      return false;
    }
    const digitsOnlyLength = phone.replace(/\+/g, '').length;
    if (digitsOnlyLength < 10 || digitsOnlyLength > 14) {
      toast.error("Mobile number must contain 10 digits.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address");
      return false;
    }
    if (!/^\d{12}$/.test(adharNo)) {
      toast.error("Aadhar number must be 12 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(
        "http://localhost:10000/api/vendor/request",
        formData
      );

      toast.success("Request sent to admin successfully!");
      setIsSubmitted(true); 

      // Call the function passed from the parent dashboard
      if (onFormSubmitSuccess) {
        onFormSubmitSuccess();
      }

      setFormData({
        name: "",
        phone: "",
        shopName: "",
        shopAddress: "",
        adharNo: "",
        email: ""
      });

    } catch (error) {
      console.error("❌ Error adding vendor request:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  // --- START OF TAILWIND DESIGN ---
  return (
    // Main container for the form
    <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg mx-auto">
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
        Add New Vendor
      </h2>

      {isSubmitted ? (
        // Success Message
        <div className="text-center py-10">
          <svg className="w-20 h-20 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p className="text-xl font-semibold text-gray-700">
            Vendor Request Submitted!
          </p>
          <p className="text-gray-500 mt-2">
            You can now approve this vendor from the pending approvals page.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-6 w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
          >
            Add Another Request
          </button>
        </div>
      ) : (
        // The Form
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Form Group for Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {/* Form Group for Mobile */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="e.g., +919876543210"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {/* Form Group for Shop Name */}
          <div>
            <label htmlFor="shopName" className="block text-sm font-medium text-gray-700 mb-1">
              Shop Name
            </label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              placeholder="Shop Name"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {/* Form Group for Shop Address */}
          <div>
            <label htmlFor="shopAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Shop Address
            </label>
            <input
              type="text"
              id="shopAddress"
              name="shopAddress"
              value={formData.shopAddress}
              onChange={handleChange}
              placeholder="Shop Address"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {/* Form Group for Aadhar */}
          <div>
            <label htmlFor="adharNo" className="block text-sm font-medium text-gray-700 mb-1">
              Aadhar Number
            </label>
            <input
              type="text"
              id="adharNo"
              name="adharNo"
              value={formData.adharNo}
              onChange={handleChange}
              placeholder="12 digits"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {/* Form Group for Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Submit Request
          </button>
        </form>
      )}
    </div>
  );
}

export default AddVendor;