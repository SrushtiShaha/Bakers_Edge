// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const VendorRequestForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     shopName: "",
//     shopAddress: "",
//     adharNo: "",
//     email: "",
//   });

// const [errors, setErrors] = useState({});
// // Regex allows optional '+' followed by 10 to 15 digits.
// const E164_REGEX = /^\+?[0-9]{10,15}$/; 

// const handlePhoneChange = (e) => {
//     const value = e.target.value;
    
//     // Allow only digits and a single plus sign at the start
//     let sanitized = value.replace(/[^\d+]/g, '');

//     // Ensure plus sign is only at the beginning and only one
//     if (sanitized.startsWith('+')) {
//         // Remove any subsequent '+' signs and limit total length to 16 (+ and 15 digits)
//         sanitized = '+' + sanitized.replace(/\+/g, '').slice(0, 15);
//     } else {
//         sanitized = sanitized.slice(0, 15); // Max 15 characters without '+'
//     }
    
//     setFormData((prev) => ({ ...prev, phone: sanitized }));
//     // Note: validateField is assumed to be defined elsewhere if needed for real-time validation.
// };

//   const validateForm = () => {
//     const { name, phone, shopName, shopAddress, adharNo, email } = formData;

//     if (!name || !phone || !shopName || !shopAddress || !adharNo || !email) {
//       toast.error("All fields are required!");
//       return false;
//     }

    
//     // ✅ Name: Only alphabets and spaces
//     if (!/^[A-Za-z ]+$/.test(name)) {
//       toast.error("Name must only contain letters (A-Z, a-z)");
//       return false;
//     }

//     // ✅ Phone: Must be in E.164 format
//     if (!E164_REGEX.test(phone)) {
//         toast.error("Mobile number must be in E.164 format (e.g., +919876543210).");
//         return false;
//     }
//     const digitsOnlyLength = phone.replace(/\+/g, '').length;
//     if (digitsOnlyLength < 10 || digitsOnlyLength > 15) {
//         toast.error("Mobile number must contain 10 to 15 digits.");
//         return false;
//     }

//     // ✅ Email: standard format
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       toast.error("Enter a valid email address");
//       return false;
//     }

//     // ✅ Aadhar: 12 digits only
//     if (!/^\d{12}$/.test(adharNo)) {
//       toast.error("Aadhar number must be 12 digits");
//       return false;
//     }

//     return true;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     let newValue = value;

//     // Restrict inputs by field
//     if (name === "name") {
//       // Only letters and spaces
//       newValue = value.replace(/[^A-Za-z\s]/g, "");
//     } else if (name === "adharNo") {
//       // Only digits, max 12
//       newValue = value.replace(/\D/g, "").slice(0, 12);
//     } else if (name === "phone") {
//         // Phone handled by handlePhoneChange (below), skip generic handleChange
//         setFormData({ ...formData, [name]: value });
//         return;
//     }

//     setFormData({ ...formData, [name]: newValue });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     // Ensure the final phone number sent is in E.164 format
//     // The backend should fix this, but sending it correctly from here is best practice.
//     // If the user entered '7058384919', the backend sendSms utility will fix it to '+917058384919'.

//     console.log("Submitting vendor request data:", formData);

//     try {
//       await axios.post(
//         `${process.env.REACT_APP_API_URL}/api/vendor/request`,
//         formData
//       );

//       toast.success("Request sent to admin successfully!");
//       setFormData({
//         name: "",
//         phone: "",
//         shopName: "",
//         shopAddress: "",
//         adharNo: "",
//         email: "",
//       });
//     } catch (err) {
//       console.error("Error submitting request:", err);
//       toast.error(err.response?.data?.message || "Server error");
//     }
//   };

//   return (
//     <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg">
//       <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
//         Vendor Registration
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         />
//         {/* ✅ Using the E.164 specific handler */}
//         <input
//           type="text"
//           name="phone"
//           placeholder="Mobile (E.164 format: e.g., +919876xxxxxx)"
//           value={formData.phone}
//           onChange={handlePhoneChange}
//           className="w-full p-3 border rounded-lg"
//         />
//         <input
//           type="text"
//           name="shopName"
//           placeholder="Shop Name"
//           value={formData.shopName}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         />
//         <input
//           type="text"
//           name="shopAddress"
//           placeholder="Shop Address"
//           value={formData.shopAddress}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         />
//         <input
//           type="text"
//           name="adharNo"
//           placeholder="Aadhar Number"
//           value={formData.adharNo}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//         />

//         <button
//           type="submit"
//           className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
//         >
//           Submit Request
//         </button>
//       </form>
//     </div>
//   );
// };

// export default VendorRequestForm;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VendorRequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    shopName: "",
    shopAddress: "",
    adharNo: "",
    email: "",
  });

  // 1. ADD NEW STATE TO TRACK SUCCESS
  const [isSubmitted, setIsSubmitted] = useState(false); 
  
  const [errors, setErrors] = useState({});
  // Regex allows optional '+' followed by 10 to 15 digits.
  const E164_REGEX = /^\+?[0-9]{10,13}$/; 

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Submitting vendor request data:", formData);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/vendor/request`,
        formData
      );

      toast.success("Request sent to admin successfully!");
      
      // 2. SET isSubmitted TO TRUE ON SUCCESS
      setIsSubmitted(true); 

    } catch (err) {
      console.error("Error submitting request:", err);
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  // 3. CONDITIONAL RENDERING LOGIC
  return (
    <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
        Vendor Registration
      </h2>
      
      {isSubmitted ? (
        // RENDER SUCCESS MESSAGE AFTER SUBMISSION
        <div className="text-center py-10">
          <svg className="w-20 h-20 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p className="text-xl font-semibold text-gray-700">
            Your request has been submitted!
          </p>
          <p className="text-gray-500 mt-2">
            The administrator will review your details and contact you soon.
          </p>
        </div>
      ) : (
        // RENDER THE FORM IF NOT YET SUBMITTED
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="phone"
            placeholder="Mobile (E.164 format: e.g., +919876xxxxxx)"
            value={formData.phone}
            onChange={handlePhoneChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            value={formData.shopName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="shopAddress"
            placeholder="Shop Address"
            value={formData.shopAddress}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="adharNo"
            placeholder="Aadhar Number"
            value={formData.adharNo}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
          >
            Submit Request
          </button>
        </form>
      )}
    </div>
  );
};

export default VendorRequestForm;