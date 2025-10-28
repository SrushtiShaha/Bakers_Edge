// const validAdmin = {
//   username: "admin@123",
//   password: "123"
// };

// const handleAdminLogin = () => {
//   if (!username || !password) {
//     alert("Please fill in all fields");
//     return;
//   }

//   if (username === validAdmin.username && password === validAdmin.password) {
//     localStorage.setItem("adminToken", "admin-auth-token");
//     navigate("/admin/dashboard");
//   } else {
//     alert("Wrong username or password");
//   }
// };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validAdmin = {
    username: "admin@123",
    password: "12345678"
  };

  const handleAdminLogin = () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (username === validAdmin.username && password === validAdmin.password) {
      localStorage.setItem("adminToken", "admin-auth-token");
      navigate("/admin/dashboard");
    } else {
      alert("Wrong username or password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Admin Login</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary w-100" onClick={handleAdminLogin}>
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
