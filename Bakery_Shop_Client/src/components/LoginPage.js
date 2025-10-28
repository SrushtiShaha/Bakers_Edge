// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { toast } from "react-toastify";
// // import './LoginPage.css';

// // const LoginPage = () => {
// //   const [role, setRole] = useState('vendor');
// //   const [username, setUsername] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     // Password must be exactly 8 characters
// //     if (password.length !== 8) {
// //       alert('Password must be exactly 8 characters.');
// //       return;
// //     }

// //     // if (role === 'admin') {
// //     //   if (!username || !password) {
// //     //     alert('Please fill in all fields');
// //     //     return;
// //     //   }
// //     //   if (username === 'admin@123' && password === '12345678') {
// //     //     localStorage.setItem('adminToken', 'admin-auth-token');
// //     //     navigate('/admin/dashboard');
// //     //   } else {
// //     //     alert('Wrong username or password');
// //     //   }
// //     //   return;
// //     // }

// //     if (role === 'admin') {
// //       try {
// //         const res = axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, { username, password })
// //         .then(res => {
// //             localStorage.setItem("adminToken", res.data.token); // ✅ store real JWT
// //             navigate("/admin/dashboard");
// //         })

// //         // await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, { username, password });
// //         // localStorage.setItem('adminToken', res.data.token); // ✅ store actual JWT
// //         // toast.success("Login successful!");
// //         // navigate("/admin/dashboard");
// //       } catch (err) {
// //         toast.error(err.response?.data?.message || "Invalid credentials");
// //       }
// //       return;
// //     }

// //     if (role === 'vendor') {
// //       if (!phone || !password) {
// //         alert('Please fill in all fields');
// //         return;
// //       }

// //       // Validate phone number: exactly 10 digits
// //       const phoneRegex = /^[0-9]{10}$/;
// //       if (!phoneRegex.test(phone)) {
// //         alert('Phone number must be exactly 10 digits and contain only numbers.');
// //         return;
// //       }

// //       try {
// //         const res = await axios.post(
// //           `${process.env.REACT_APP_API_URL}/api/vendor/login`,
// //           { phone, password }
// //         );
// //         localStorage.setItem('vendorToken', res.data.token);
// //         navigate('/Dashboard');
// //       } catch (err) {
// //         alert('Invalid phone number or password');
// //         console.error(err);
// //       }
// //     }
// //   };

// //   const handleSubmit = (e) => {
// //   e.preventDefault();

// //   axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, {
// //     username: username,
// //     password: password
// //   })
// //   .then((res) => {
// //     // ✅ Save token from backend response
// //     localStorage.setItem("adminToken", res.data.token);
// //     toast.success("Login successful!");
// //     navigate("/admin/dashboard");
// //   })
// //   .catch((err) => {
// //     toast.error(err.response?.data?.message || "Invalid credentials");
// //   });
// // };


// //   // axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, { username, password })
// //   //   .then(res => {
// //   //       // Save token for later API requests
// //   //       localStorage.setItem("adminToken", res.data.token);

// //   //       toast.success("Login successful!");
// //   //       navigate("/admin/dashboard"); // redirect to dashboard
// //   //   })
// //   //   .catch(err => {
// //   //       toast.error(err.response?.data?.message || "Login failed");
// //   //   });


// //   return (
// //     <>
// //       <div className="login-container">
// //         {/* <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"> */}

// //         <div className="login-card animate-slide-up">
// //           <h2 className="login-title">Login</h2>

// //           <div className="role-selection" style={{ textAlign: 'center' }}>
// //             <label style={{ fontSize: '18px', marginRight: '20px' }}>
// //               <input
// //                 type="radio"
// //                 name="role"
// //                 value="vendor"
// //                 checked={role === 'vendor'}
// //                 onChange={() => {
// //                   setRole('vendor');
// //                   setUsername('');
// //                   setPhone('');
// //                   setPassword('');
// //                 }}
// //                 style={{ transform: 'scale(1.3)', marginRight: '8px' }}
// //               />
// //               Vendor
// //             </label>
// //             <label style={{ fontSize: '18px' }}>
// //               <input
// //                 type="radio"
// //                 name="role"
// //                 value="admin"
// //                 checked={role === 'admin'}
// //                 onChange={() => {
// //                   setRole('admin');
// //                   setUsername('');
// //                   setPhone('');
// //                   setPassword('');
// //                 }}
// //                 style={{ transform: 'scale(1.3)', marginRight: '8px' }}
// //               />
// //               Admin
// //             </label>
// //           </div>

// //           <form onSubmit={handleLogin} style={{ textAlign: 'center' }}>
// //             {role === 'admin' && (
// //               <div className="input-group" style={{ marginTop: '20px' }}>
// //                 <div className="input-with-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
// //                   <i className="fas fa-user-tie" style={{ marginRight: '10px' }}></i>
// //                   <input
// //                     type="text"
// //                     placeholder="Enter username"
// //                     value={username}
// //                     onChange={(e) => setUsername(e.target.value)}
// //                     autoFocus
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //             )}

// //             {role === 'vendor' && (
// //               <div className="input-group" style={{ marginTop: '20px' }}>
// //                 <div className="input-with-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
// //                   <i className="fas fa-phone" style={{ marginRight: '10px' }}></i>
// //                   <input
// //                     type="text"
// //                     placeholder="Enter phone number"
// //                     value={phone}
// //                     onChange={(e) => {
// //                       const value = e.target.value.replace(/[^0-9]/g, ''); // allow only numbers
// //                       setPhone(value);
// //                     }}
// //                     maxLength={10} // optional: limit to 10 digits
// //                   />

// //                 </div>
// //               </div>
// //             )}

// //             <div className="input-group" style={{ marginTop: '20px' }}>
// //               <div className="input-with-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
// //                 <i className="fas fa-lock" style={{ marginRight: '10px' }}></i>
// //                 <input
// //                   type="password"
// //                   placeholder="Enter your password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   minLength="8"
// //                   maxLength="8"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             <button className="login-btn" type="submit" style={{ marginTop: '20px' }}>
// //               Login
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default LoginPage;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";
// import './LoginPage.css';

// const LoginPage = () => {
//   const [role, setRole] = useState('vendor');
//   const [username, setUsername] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Validate password length
//     if (password.length !== 11) {
//       toast.error('Password must be exactly 11 characters.');
//       return;
//     }

//     try {
//       if (role === 'admin') {
//         const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, {
//           username,
//           password
//         });
//         // Save admin token
//         localStorage.setItem("adminToken", res.data.token);
//         toast.success("Admin login successful!");
//         navigate("/admin/dashboard");
//       }

//       if (role === 'vendor') {
//         if (!phone) {
//           toast.error('Phone number is required');
//           return;
//         }

//         const phoneRegex = /^[0-9]{10}$/;
//         if (!phoneRegex.test(phone)) {
//           toast.error('Phone number must be exactly 10 digits.');
//           return;
//         }

//         const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/vendor/login`, {
//           phone,
//           password
//         });

//         localStorage.setItem("vendorToken", res.data.token);
//         toast.success("Vendor login successful!");
//         navigate("/dashboard");
//       }

//     } catch (err) {
//       console.error("Login error:", err);
//       toast.error(err.response?.data?.message || "Invalid credentials");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card animate-slide-up">
//         <h2 className="login-title">Login</h2>

//         <div className="role-selection" style={{ textAlign: 'center' }}>
//           <label style={{ fontSize: '18px', marginRight: '20px' }}>
//             <input
//               type="radio"
//               name="role"
//               value="vendor"
//               checked={role === 'vendor'}
//               onChange={() => {
//                 setRole('vendor');
//                 setUsername('');
//                 setPhone('');
//                 setPassword('');
//               }}
//               style={{ transform: 'scale(1.3)', marginRight: '8px' }}
//             />
//             Vendor
//           </label>
//           <label style={{ fontSize: '18px' }}>
//             <input
//               type="radio"
//               name="role"
//               value="admin"
//               checked={role === 'admin'}
//               onChange={() => {
//                 setRole('admin');
//                 setUsername('');
//                 setPhone('');
//                 setPassword('');
//               }}
//               style={{ transform: 'scale(1.3)', marginRight: '8px' }}
//             />
//             Admin
//           </label>
//         </div>

//         <form onSubmit={handleLogin} style={{ textAlign: 'center' }}>
//           {role === 'admin' && (
//             <input
//               type="text"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               style={{ marginTop: '20px', padding: '10px', width: '80%' }}
//             />
//           )}

//           {role === 'vendor' && (
//             <input
//               type="text"
//               placeholder="Enter phone number"
//               value={phone}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/[^0-9]/g, '');
//                 setPhone(value);
//               }}
//               maxLength={10}
//               required
//               style={{ marginTop: '20px', padding: '10px', width: '80%' }}
//             />
//           )}

//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             // minLength={15}
//             maxLength={15}
//             required
//             style={{ marginTop: '20px', padding: '10px', width: '80%' }}
//           />

//           <button type="submit" className="login-btn" style={{ marginTop: '20px' }}>
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";
// import './LoginPage.css';

// const LoginPage = () => {
//   const [role, setRole] = useState('vendor');
//   const [username, setUsername] = useState('');
//   const [phone, setPhone] = useState(''); // Stores only the 10 digits
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Validate password length: must be less than or equal to 20
//     if (password.length > 20 || password.length === 0) {
//       toast.error('Password is required and must be 20 characters or less.');
//       return;
//     }

//     try {
//       if (role === 'admin') {
//         // Admin login logic
//         if (!username) {
//           toast.error('Username is required for admin login.');
//           return;
//         }

//         const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, {
//           username,
//           password
//         });
//         
//         localStorage.setItem("adminToken", res.data.token);
//         toast.success("Admin login successful!");
//         navigate("/admin/dashboard");

//       } else if (role === 'vendor') {
//         // Vendor login logic
//         if (!phone) {
//           toast.error('Phone number is required');
//           return;
//         }

//         // Validate phone number: exactly 10 digits (after the implied +91)
//         const phoneRegex = /^[0-9]{10}$/;
//         if (!phoneRegex.test(phone)) {
//           toast.error('Phone number must be exactly 10 digits.');
//           return;
//         }

//         const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/vendor/login`, {
//           phone, // Sending only the 10 digits to the API
//           password
//         });

//         localStorage.setItem("vendorToken", res.data.token);
//         toast.success("Vendor login successful!");
//         navigate("/dashboard");
//       }

//     } catch (err) {
//       console.error("Login error:", err);
//       toast.error(err.response?.data?.message || "Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card animate-slide-up">
//         <h2 className="login-title">Login</h2>

//         <div className="role-selection" style={{ textAlign: 'center' }}>
//           <label style={{ fontSize: '18px', marginRight: '20px' }}>
//             <input
//               type="radio"
//               name="role"
//               value="vendor"
//               checked={role === 'vendor'}
//               onChange={() => {
//                 setRole('vendor');
//                 setUsername('');
//                 setPhone('');
//                 setPassword('');
//               }}
//               style={{ transform: 'scale(1.3)', marginRight: '8px' }}
//             />
//             Vendor
//           </label>
//           <label style={{ fontSize: '18px' }}>
//             <input
//               type="radio"
//               name="role"
//               value="admin"
//               checked={role === 'admin'}
//               onChange={() => {
//                 setRole('admin');
//                 setUsername('');
//                 setPhone('');
//                 setPassword('');
//               }}
//               style={{ transform: 'scale(1.3)', marginRight: '8px' }}
//             />
//             Admin
//           </label>
//         </div>

//         <form onSubmit={handleLogin} style={{ textAlign: 'center' }}>
//           {role === 'admin' && (
//             <input
//               type="text"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               style={{ marginTop: '20px', padding: '10px', width: '80%' }}
//             />
//           )}

//           {role === 'vendor' && (
//             // UI for phone number with +91 prefix - Kept your existing structure/style
//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//               <span style={{ padding: '10px', backgroundColor: '#eee', border: '1px solid #ccc', borderRight: 'none', borderRadius: '5px 0 0 5px', fontSize: '16px' }}>
//                 +91
//               </span>
//               <input
//                 type="tel" 
//                 placeholder="Enter 10 digit phone number"
//                 value={phone}
//                 onChange={(e) => {
//                   // Allow only digits and limit to 10 characters
//                   const value = e.target.value.replace(/[^0-9]/g, '');
//                   setPhone(value);
//                 }}
//                 maxLength={10}
//                 required
//                 style={{ padding: '10px', width: '70%', border: '1px solid #ccc', borderRadius: '0 5px 5px 0' }}
//               />
//             </div>
//           )}

//           <input
//             type="password"
//             placeholder="Enter your password (Max 20 chars)"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             maxLength={20} // Password max length set to 20
//             required
//             style={{ marginTop: '20px', padding: '10px', width: '80%' }}
//           />

//           <button type="submit" className="login-btn" style={{ marginTop: '20px' }}>
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import './LoginPage.css';

const LoginPage = () => {
  const [role, setRole] = useState('vendor');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();


    try {
      if (role === 'admin') {
        // Admin login
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, {
          username,
          password
        });
        // Save admin token
        localStorage.setItem("adminToken", res.data.token);
        toast.success("Admin login successful!");
        navigate("/admin/dashboard");
      }

      if (role === 'vendor') {
        if (!phone) {
          toast.error('Phone number is required');
          return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
          toast.error('Phone number must be exactly 10 digits.');
          return;
        }
        
        // 🚀 FIX: Prepend the +91 prefix to match the format stored in the database
        const vendorPhone = "+91" + phone;

        // ✅ CORRECT API ENDPOINT FOR VENDOR LOGIN
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/vendor/login`, {
          phone: vendorPhone, // Use the prefixed number for the login attempt
          password
        });

        localStorage.setItem("vendorToken", res.data.token);
        toast.success("Vendor login successful!");
        navigate("/dashboard");
      }

    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };


  return (
    <div className="login-container">
      <div className="login-card animate-slide-up">
        <h2 className="login-title">Login</h2>

        <div className="role-selection" style={{ textAlign: 'center' }}>
          <label style={{ fontSize: '18px', marginRight: '20px' }}>
            <input
              type="radio"
              name="role"
              value="vendor"
              checked={role === 'vendor'}
              onChange={() => {
                setRole('vendor');
                setUsername('');
                setPhone('');
                setPassword('');
              }}
              style={{ transform: 'scale(1.3)', marginRight: '8px' }}
            />
            Vendor
          </label>
          <label style={{ fontSize: '18px' }}>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={() => {
                setRole('admin');
                setUsername('');
                setPhone('');
                setPassword('');
              }}
              style={{ transform: 'scale(1.3)', marginRight: '8px' }}
            />
            Admin
          </label>
        </div>

        <form onSubmit={handleLogin} style={{ textAlign: 'center' }}>
          {role === 'admin' && (
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ marginTop: '20px', padding: '10px', width: '80%', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          )}

          {role === 'vendor' && (
            <input
              type="text"
              placeholder="Enter 10-digit phone number" // Updated placeholder
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setPhone(value);
              }}
              maxLength={10}
              required
              style={{ marginTop: '20px', padding: '10px', width: '80%', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          )}

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            maxLength={20}
            required
            style={{ marginTop: '20px', padding: '10px', width: '80%', border: '1px solid #ddd', borderRadius: '5px' }}
          />

          <button type="submit" className="login-btn" style={{ marginTop: '20px' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;