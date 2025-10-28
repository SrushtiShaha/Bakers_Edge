// RoleSelector.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <>
      {/* Minimal Navbar with only bakery name */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand mb-0 h1 mx-auto text-center" style={{ fontSize: '1.8rem' }}>
          इंद्रायणी बेकर्स
        </span>
      </nav>
    <div className="text-center mt-5">
      <h1>Welcome to Bakery Portal</h1>
      <button className="btn btn-primary m-2 p-3" onClick={() => handleSelect('admin')}>
        <b>Admin Login</b>
      </button>
      <button className="btn btn-success m-2 p-3" onClick={() => handleSelect('vendor')}>
        <b>Vendor Login</b>
      </button>
    </div>
    </>
  );
};

export default RoleSelector;
