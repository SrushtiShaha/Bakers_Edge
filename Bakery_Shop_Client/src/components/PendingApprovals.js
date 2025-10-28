// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // const PendingApprovals = () => {
// //   const [requests, setRequests] = useState([]);
// //   const [selectedRequest, setSelectedRequest] = useState(null);
// //   const [password, setPassword] = useState("");

// //   // Load all vendor requests
// //   useEffect(() => {
// //     const fetchRequests = async () => {
// //       try {
// //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/vendor/requests`);
// //         setRequests(res.data);
// //       } catch (err) {
// //         console.error("Error fetching requests:", err);
// //       }
// //     };
// //     fetchRequests();
// //   }, []);

// //   // Approve Vendor Request
// //   const handleApprove = async () => {
// //     if (!password || password.length < 8) {
// //       toast.error("Password must be at least 8 characters!");
// //       return;
// //     }

// //     try {
// //       await axios.post(
// //         `${process.env.REACT_APP_API_URL}/api/vendor/approve/${selectedRequest._id}`,
// //         { password }
// //       );
// //       toast.success("Vendor approved successfully!");
// //       setPassword("");
// //       setSelectedRequest(null);
// //       // Refresh list
// //       setRequests(requests.filter(r => r._id !== selectedRequest._id));
// //     } catch (err) {
// //       console.error("Error approving vendor:", err);
// //       toast.error("Failed to approve vendor!");
// //     }
// //   };

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">Pending Vendor Requests</h2>
// //       <ul>
// //         {requests.map((req) => (
// //           <li key={req._id} className="p-4 bg-white shadow mb-3 flex justify-between items-center">
// //             <div>
// //               <p><b>{req.name}</b> ({req.businessName})</p>
// //               <p>{req.email} | {req.phone}</p>
// //             </div>
// //             <button
// //               onClick={() => setSelectedRequest(req)}
// //               className="px-4 py-2 bg-green-600 text-white rounded-lg"
// //             >
// //               Approve
// //             </button>
// //           </li>
// //         ))}
// //       </ul>

// //       {/* Modal for entering password */}
// //       {selectedRequest && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //           <div className="bg-white p-6 rounded-xl shadow-lg w-96">
// //             <h3 className="text-xl font-bold mb-4">Set Password for {selectedRequest.name}</h3>
// //             <input
// //               type="password"
// //               placeholder="Enter password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="w-full p-2 border rounded mb-4"
// //             />
// //             <div className="flex justify-end space-x-3">
// //               <button
// //                 onClick={() => setSelectedRequest(null)}
// //                 className="px-4 py-2 bg-gray-400 text-white rounded-lg"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleApprove}
// //                 className="px-4 py-2 bg-green-600 text-white rounded-lg"
// //               >
// //                 Approve
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PendingApprovals;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion"; // for animation

// const PendingApprovals = () => {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     const res = await axios.get("http://localhost:10000/api/admin/pending-requests");
//     setRequests(res.data);
//   };

//   const handleApprove = async (id) => {
//     await axios.post(`http://localhost:10000/api/admin/approve/${id}`);
//     fetchRequests();
//   };

//   const handleReject = async (id) => {
//     await axios.post(`http://localhost:10000/api/admin/reject/${id}`);
//     fetchRequests();
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:10000/api/admin/delete/${id}`);
//     fetchRequests();
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Pending Vendor Approvals</h2>
//       <div className="row">
//         {requests.map((req, index) => (
//           <motion.div
//             key={req._id}
//             className="col-md-4 mb-4"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <div className="card shadow-lg border-0 rounded-3">
//               <div className="card-body">
//                 <h5 className="card-title">{req.shopName}</h5>
//                 <p className="card-text"><b>Name:</b> {req.name}</p>
//                 <p className="card-text"><b>Phone:</b> {req.phone}</p>
//                 <p className="card-text"><b>Address:</b> {req.shopAddress}</p>
//                 <p className="card-text"><b>Aadhar:</b> {req.aadharNumber}</p>

//                 <div className="d-flex justify-content-between">
//                   <button className="btn btn-success" onClick={() => handleApprove(req._id)}>Approve</button>
//                   <button className="btn btn-warning" onClick={() => handleReject(req._id)}>Reject</button>
//                   <button className="btn btn-danger" onClick={() => handleDelete(req._id)}>Delete</button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PendingApprovals = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [password, setPassword] = useState("");

  // Load all vendor requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/vendor/requests`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
        toast.error("Failed to load vendor requests.");
      }
    };
    fetchRequests();
  }, []);

  // Approve Vendor Request
  const handleApprove = async () => {
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
      toast.success("Vendor approved successfully!");
      setPassword("");
      setSelectedRequest(null);
      setRequests(requests.filter((r) => r._id !== selectedRequest._id));
    } catch (err) {
      console.error("Error approving vendor:", err);
      toast.error("Failed to approve vendor!");
    }
  };

  // Reject request
  const handleReject = async (id) => {
    if (!window.confirm("Reject this vendor request?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/admin/vendor/request/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.info("Vendor request rejected.");
      setRequests(requests.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error rejecting request:", err);
      toast.error("Failed to reject vendor!");
    }
  };

  // Delete request
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vendor request permanently?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/admin/vendor/request/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Vendor request deleted.");
      setRequests(requests.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error deleting request:", err);
      toast.error("Failed to delete vendor request!");
    }
  };

  return (
    <div className="p-6 fade-in">
      <h2 className="text-2xl font-bold text-pink-700 mb-6">
        Pending Vendor Applications
      </h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No pending vendor applications.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-t-4 border-pink-400"
            >
              <h3 className="text-lg font-bold text-gray-800">{req.name}</h3>
              <p className="text-sm text-gray-600">{req.shopName}</p>
              <p className="text-sm text-gray-600">{req.email}</p>
              <p className="text-sm text-gray-600">📞 {req.phone}</p>
              <p className="text-sm text-gray-600">🏠 {req.shopAddress}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setSelectedRequest(req)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(req._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleDelete(req._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Password Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              Set Password for {selectedRequest.name}
            </h3>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;
