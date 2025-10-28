// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css'
// import Navbar from './Navbar'; 

// // Component now accepts vendorName and handleLogout as props
// const Dashboard = ({ shopName, vendorName, handleLogout }) => {
//   return (
//     <div className="bakery-dashboard">
//       {/* <Navbar /> */}
//       <div className="bakery-overlay container-fluid mt-4">
        
//         <div className="row">
//           <div className="col-12 text-center">
//             <h1 className="display-4 text-primary">{shopName || 'इंद्रायणी स्वीट्स अँड बेकर्स'}</h1>
//             {/* <p className="lead text-secondary">Welcome to the best bakery and sweets shop in town!</p> */}
//             <p className="lead text-secondary">Welcome, **{vendorName || 'Vendor'}**, to your dashboard!</p>
//           </div>
//         </div>

//         {/* --- New Section for Vendor Name and Logout Button --- */}
//         <div className="row mt-3 mb-4 align-items-center">
//           <div className="col-md-8 col-sm-6">
//           </div>
//           <div className="col-md-4 col-sm-6 text-end">
//           </div>
//         </div>
        
//         <hr />
        
//         <div className="row mt-4 d-flex justify-content-center">
//           {/* Card 2: Products in Stock */}
//           <div className="col-md-3">
//             <div className="card text-white bg-success mb-3">
//               <div className="card-header">Products in Stock</div>
//               <div className="card-body">
//                 <h5 className="card-title">Manage and update product.</h5>
//                 <p className="card-text">Inventory</p>
//                 <Link to="/products" className="btn btn-light">Manage Stock</Link>
//               </div>
//             </div>
//           </div>

//           {/* Card 3: Customers */}
//           <div className="col-md-3">
//             <div className="card text-black bg-warning mb-3">
//               <div className="card-header">Customers</div>
//               <div className="card-body">
//                 <h5 className="card-title">Customers</h5>
//                 <p className="card-text">View and manage your customer data.</p>
//                 <Link to="/customers" className="btn btn-light">Manage Customers</Link>
//               </div>
//             </div>
//           </div>

//           {/* Card 4: Reports */}
//           <div className="col-md-3">
//             <div className="card text-white bg-danger mb-3">
//               <div className="card-header">Reports</div>
//               <div className="card-body">
//                 <h5 className="card-title">Monthly Reports</h5>
//                 <p className="card-text">View sales and other reports.</p>
//                 <Link to="/reports" className="btn btn-light">View Reports</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Dashboard = () => {
  const [vendorName, setVendorName] = useState('');
  const navigate = useNavigate();

  // Fetch vendor data from backend
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const token = localStorage.getItem("vendorToken");
        if (!token || token.length > 2000) {
          localStorage.removeItem("vendorToken");
          navigate("/login");
          return;
        }

        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/vendor/me`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) {
          localStorage.removeItem("vendorToken");
          navigate("/login");
          return;
        }

      const data = await res.json();
        setVendorName(data.vendorName || 'Vendor');
      } catch (err) {
        console.error("Error fetching vendor data:", err);
        localStorage.removeItem("vendorToken");
        navigate("/login");
      }
    };

    fetchVendorData();
  }, [navigate]);

  

  return (
    <div className="bakery-dashboard">    

      {/* Main dashboard content */}
      <div className="bakery-overlay container-fluid mt-4">
        <div className="row">
          <div className="col-12 text-center">
            <p className="text-xl md:text-2xl font-semibold text-pink-700 text-center mt-4 animate-bounce-slow">
              🧁 Welcome, <span className="animate-gradient bg-gradient-to-r from-pink-500 via-yellow-500 to-pink-500 bg-clip-text text-transparent font-bold">{vendorName}</span>! Manage your shop below.
            </p>
          </div>
        </div>
        <hr />
        <div className="row mt-4 d-flex justify-content-center">
          {/* Products Card */}
          <div className="col-md-3">
            <div className="card text-white bg-success mb-3">
              <div className="card-header">Products in Stock</div>
              <div className="card-body">
                <h5 className="card-title">Manage and update products</h5>
                <p className="card-text">Keep your inventory up-to-date.</p>
                <Link to="/products" className="btn btn-light mt-3">Manage Stock</Link>
              </div>
            </div>
          </div>

          {/* Customers Card */}
          <div className="col-md-3">
            <div className="card text-black bg-warning mb-3">
              <div className="card-header">Customers</div>
              <div className="card-body">
                <h5 className="card-title">Customers</h5>
                <p className="card-text">View and manage your customer data.</p>
                <Link to="/customers" className="btn btn-light mt-3">Manage Customers</Link>
              </div>
            </div>
          </div>

          {/* Reports Card */}
          <div className="col-md-3">
            <div className="card text-white bg-danger mb-3">
              <div className="card-header">Reports</div>
              <div className="card-body">
                <h5 className="card-title">Monthly Reports</h5>
                <p className="card-text">View sales and performance analytics.</p>
                <Link to="/reports" className="btn btn-light mt-3">View Reports</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
{`
  /* Fade-in animation */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 1.2s ease-out forwards;
  }

  /* Shimmer gradient animation for name */
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradientMove 3s ease infinite;
  }
    @keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-9px); }
}
.animate-bounce-slow {
  animation: bounceSlow 3s ease-in-out infinite;
}

`}
</style>
    </div>
  );
};

export default Dashboard;