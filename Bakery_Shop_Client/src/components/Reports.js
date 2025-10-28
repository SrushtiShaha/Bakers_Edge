// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { FaCalendarDay, FaCalendarAlt } from 'react-icons/fa';

// // const Reports = () => {
// //   const [dailyReport, setDailyReport] = useState([]);
// //   const [monthlyReport, setMonthlyReport] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //  const fetchReports = async () => {
// //   setLoading(true);
// //   setError('');
// //   try {
// //     const daily = await axios.get(`${process.env.REACT_APP_API_URL}/api/reports/daily`);
// //     const monthly = await axios.get(`${process.env.REACT_APP_API_URL}/api/reports/monthly`);
// //     console.log("👉 Fetching DAILY from:", daily);
// //     console.log("👉 Fetching MONTHLY from:", monthly);

// //     setDailyReport(daily.data);
// //     setMonthlyReport(monthly.data);
// //   } catch (err) {
// //     console.error('Error fetching reports:', err);
// //     setError('Failed to load reports.');
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// //   useEffect(() => {
// //     fetchReports();
// //   }, []);

// //   return (
// //     <div className="container my-5">
// //       <h2 className="text-center text-dark mb-5 ">📊 Bakery Sales Dashboard</h2>

// //       {loading ? (
// //         <div className="text-center text-white">
// //           <div className="spinner-border text-light" role="status"></div>
// //         </div>
// //       ) : (
// //         <div className="row g-4">
// //           {/* Daily Report */}
// //           <div className="col-md-6">
// //             <div className="card bg-gradient bg-dark text-light shadow-sm border-0">
// //               <div className="card-header d-flex align-items-center bg-success text-white">
// //                 <FaCalendarDay className="me-2" />
// //                 <h5 className="mb-0">Daily Sales Report</h5>
// //               </div>
// //               <div className="card-body">
// //                 {dailyReport.length > 0 ? (
// //                   <ul className="list-group list-group-flush">
// //                     {dailyReport.map((sale, idx) => (
// //                       <li key={idx} className="list-group-item bg-dark d-flex justify-content-between text-light">
// //                         <span>{sale.date}</span>
// //                         <strong>₹ {sale.total}</strong>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 ) : (
// //                   <p className="text-muted">No sales for today.</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Monthly Report */}
// //           <div className="col-md-6">
// //             <div className="card bg-gradient bg-dark text-light shadow-sm border-0">
// //               <div className="card-header d-flex align-items-center bg-primary text-white">
// //                 <FaCalendarAlt className="me-2" />
// //                 <h5 className="mb-0">Monthly Sales Report</h5>
// //               </div>
// //               <div className="card-body">
// //                 {monthlyReport.length > 0 ? (
// //                   <ul className="list-group list-group-flush">
// //                     {monthlyReport.map((sale, idx) => (
// //                       <li key={idx} className="list-group-item bg-dark d-flex justify-content-between text-light">
// //                         <span>{sale.month}</span>
// //                         <strong>₹ {sale.total}</strong>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 ) : (
// //                   <p className="text-muted">No sales this month.</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {error && <div className="alert alert-danger mt-4">{error}</div>}
// //     </div>
// //   );
// // };

// // export default Reports;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { 
//   FaCalendarDay, 
//   FaCalendarAlt, 
//   FaArrowUp, 
//   FaArrowDown, 
//   FaUsers, 
//   FaBoxes, 
//   FaFileInvoiceDollar 
// } from 'react-icons/fa';

// const Reports = () => {
//   const [dailyReport, setDailyReport] = useState([]);
//   const [monthlyReport, setMonthlyReport] = useState([]);
//   const [topProducts, setTopProducts] = useState([]);
//   const [slowProducts, setSlowProducts] = useState([]);
//   const [customerReport, setCustomerReport] = useState([]);
//   const [stockReport, setStockReport] = useState([]);
//   const [outstandingLedger, setOutstandingLedger] = useState([]);
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const API_URL = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     const fetchReports = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const endpoints = [
//           `${API_URL}/api/reports/daily`,
//           `${API_URL}/api/reports/monthly`,
//           `${API_URL}/api/reports/top-products`,
//           `${API_URL}/api/reports/slow-products`,
//           `${API_URL}/api/reports/customer-report`,
//           `${API_URL}/api/reports/stock-report`,
//           `${API_URL}/api/reports/outstanding-ledger`
//         ];

//         const results = await Promise.allSettled(
//           endpoints.map(url => axios.get(url))
//         );

//         // Helper to check and set data, or log error
//         const setDataOrLog = (result, setter, name) => {
//           if (result.status === 'fulfilled') {
//             setter(result.value.data);
//           } else {
//             console.error(`Failed to fetch ${name}:`, result.reason?.response?.data || result.reason);
//           }
//         };

//         setDataOrLog(results[0], setDailyReport, 'Daily Report');
//         setDataOrLog(results[1], setMonthlyReport, 'Monthly Report');
//         setDataOrLog(results[2], setTopProducts, 'Top Products');
//         setDataOrLog(results[3], setSlowProducts, 'Slow Products');
//         setDataOrLog(results[4], setCustomerReport, 'Customer Report');
//         setDataOrLog(results[5], setStockReport, 'Stock Report');
//         setDataOrLog(results[6], setOutstandingLedger, 'Outstanding Ledger');

//         if (results.some(r => r.status === 'rejected')) {
//           setError('Some reports failed to load. Check console for details.');
//         }

//       } catch (err) {
//         console.error('Error fetching reports:', err);
//         setError('A critical error occurred while loading reports.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, [API_URL]);

//   // Helper component for empty report
//   const NoData = ({ message }) => <p className="text-muted text-center">{message}</p>;

//   return (
//     <div className="container my-5">
//       <h2 className="text-center text-dark mb-5">📊 Bakery Sales Dashboard</h2>

//       {loading ? (
//         <div className="text-center text-white">
//           <div className="spinner-border text-light" role="status"></div>
//         </div>
//       ) : (
//         <div className="row g-4">
          
//           {/* === Row 1 === */}
//           {/* Daily Report */}
//           <div className="col-md-6">
//             <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
//               <div className="card-header d-flex align-items-center bg-success text-white">
//                 <FaCalendarDay className="me-2" />
//                 <h5 className="mb-0">Daily Sales</h5>
//               </div>
//               <div className="card-body">
//                 {dailyReport.length > 0 ? (
//                   <ul className="list-group list-group-flush">
//                     {dailyReport.map((sale, idx) => (
//                       <li key={idx} className="list-group-item bg-dark d-flex justify-content-between text-light">
//                         <span>{sale.date}</span>
//                         <strong>₹ {sale.total}</strong>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <NoData message="No sales data found." />
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Monthly Report */}
//           <div className="col-md-6">
//             <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
//               <div className="card-header d-flex align-items-center bg-primary text-white">
//                 <FaCalendarAlt className="me-2" />
//                 <h5 className="mb-0">Monthly Sales</h5>
//               </div>
//               <div className="card-body">
//                 {monthlyReport.length > 0 ? (
//                   <ul className="list-group list-group-flush">
//                     {monthlyReport.map((sale, idx) => (
//                       <li key={idx} className="list-group-item bg-dark d-flex justify-content-between text-light">
//                         <span>{sale.month}</span>
//                         <strong>₹ {sale.total}</strong>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <NoData message="No sales data found." />
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* === Row 2 === */}
//           {/* Top Products */}
//           <div className="col-md-6">
//             <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
//               <div className="card-header d-flex align-items-center bg-info text-white">
//                 <FaArrowUp className="me-2" />
//                 <h5 className="mb-0">Top 5 Products</h5>
//               </div>
//               <div className="card-body">
//                 {topProducts.length > 0 ? (
//                   <ul className="list-group list-group-flush">
//                     {topProducts.map((item) => (
//                       <li key={item._id} className="list-group-item bg-dark d-flex justify-content-between text-light">
//                         <span>{item.name}</span>
//                         <strong>{item.totalQuantity} Sold</strong>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <NoData message="No product data found." />
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Slow Products */}
//           <div className="col-md-6">
//             <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
//               <div className="card-header d-flex align-items-center bg-secondary text-white">
//                 <FaArrowDown className="me-2" />
//                 <h5 className="mb-0">Slowest 5 Products</h5>
//               </div>
//               <div className="card-body">
//                 {slowProducts.length > 0 ? (
//                   <ul className="list-group list-group-flush">
//                     {slowProducts.map((item) => (
//                       <li key={item._id} className="list-group-item bg-dark d-flex justify-content-between text-light">
//                         <span>{item.name}</span>
//                         <strong>{item.totalQuantity} Sold</strong>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <NoData message="No product data found." />
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* === Row 3 === */}
//           {/* Top Customers */}
//           <div className="col-md-6">
//             <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
//               <div className="card-header d-flex align-items-center bg-warning text-dark">
//                 <FaUsers className="me-2" />
//                 <h5 className="mb-0">Top 5 Customers</h5>
//               </div>
//               <div className="card-body" style={{ overflowX: 'auto' }}>
//                 {customerReport.length > 0 ? (
//                   <table className="table table-dark table-striped table-hover">
//                     <thead>
//                       <tr>
//                         <th>Name</th>
//                         <th>Contact</th>
//                         <th>Total Spent</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {customerReport.map((cust) => (
//                         <tr key={cust._id}>
//                           <td>{cust.name}</td>
//                           <td>{cust.contact}</td>
//                           <td><strong>₹ {cust.totalSpent}</strong></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <NoData message="No customer data found." />
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Low Stock Report */}
//           <div className="col-md-6">
//             <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
//               <div className="card-header d-flex align-items-center bg-danger text-white">
//                 <FaBoxes className="me-2" />
//                 <h5 className="mb-0">Low Stock Report</h5>
//               </div>
//               <div className="card-body" style={{ overflowX: 'auto' }}>
//                 {stockReport.length > 0 ? (
//                   <table className="table table-dark table-striped table-hover">
//                     <thead>
//                       <tr>
//                         <th>Product Name</th>
//                         <th>Stock Left</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {stockReport.map((item) => (
//                         <tr key={item._id}>
//                           <td>{item.name}</td>
//                           <td><strong>{item.stock}</strong></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <NoData message="All products are well-stocked." />
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* === Row 4 === */}
//           {/* Outstanding Ledger */}
//           <div className="col-md-12">
//             <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
//               <div className="card-header d-flex align-items-center bg-dark text-white border-bottom border-danger">
//                 <FaFileInvoiceDollar className="me-2 text-danger" />
//                 <h5 className="mb-0">Outstanding Ledger (Unpaid)</h5>
//               </div>
//               <div className="card-body" style={{ overflowX: 'auto' }}>
//                 {outstandingLedger.length > 0 ? (
//                   <table className="table table-dark table-striped table-hover">
//                     <thead>
//                       <tr>
//                         <th>Date</th>
//                         <th>Customer</th>
//                         <th>Contact</th>
//                         <th>Amount Due</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {outstandingLedger.map((item) => (
//                         <tr key={item._id}>
//                           <td>{new Date(item.createdAt).toLocaleDateString()}</td>
//                           <td>{item.customer?.name || 'N/A'}</td>
//                           <td>{item.customer?.contact || 'N/A'}</td>
//                           <td><strong>₹ {item.total?.toFixed(2) || '0.00'}</strong></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <NoData message="No outstanding payments." />
//                 )}
//               </div>
//             </div>
//           </div>

//         </div>
//       )}

//       {error && !loading && <div className="alert alert-danger mt-4">{error}</div>}
//     </div>
//   );
// };

// export default Reports;

// Reports.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaCalendarDay, FaCalendarAlt, FaArrowUp, FaArrowDown, 
  FaUsers, FaBoxes, FaFileInvoiceDollar 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ✅ 1. Import
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';

const Reports = () => {
  const [dailyReport, setDailyReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [slowProducts, setSlowProducts] = useState([]);
  const [customerReport, setCustomerReport] = useState([]);
  const [stockReport, setStockReport] = useState([]);
  const [outstandingLedger, setOutstandingLedger] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // ✅ 2. Initialize
  const API_URL = process.env.REACT_APP_API_URL;

  // ✅ 3. Helper function to get token and config
  const getAuthConfig = () => {
    const token = localStorage.getItem('vendorToken');
    if (!token) {
      toast.error('You are not logged in. Redirecting...');
      navigate('/login');
      return null;
    }
    return {
      headers: { 'Authorization': `Bearer ${token}` }
    };
  };

  // ✅ 4. Helper to handle 401 errors
  const handleAuthError = (err) => {
    if (err.response && err.response.status === 401) {
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('vendorToken');
      navigate('/login');
    } else {
      setError('Failed to load some reports. Check console.');
    }
    console.error('API Error:', err);
  };

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError('');
      
      const config = getAuthConfig(); // ✅ 5. Get config
      if (!config) {
        setLoading(false);
        return; // Stop if no token
      }

      try {
        const endpoints = [
          { url: `${API_URL}/api/reports/daily`, setter: setDailyReport, name: 'Daily Report' },
          { url: `${API_URL}/api/reports/monthly`, setter: setMonthlyReport, name: 'Monthly Report' },
          { url: `${API_URL}/api/reports/top-products`, setter: setTopProducts, name: 'Top Products' },
          { url: `${API_URL}/api/reports/slow-products`, setter: setSlowProducts, name: 'Slow Products' },
          { url: `${API_URL}/api/reports/customer-report`, setter: setCustomerReport, name: 'Customer Report' },
          { url: `${API_URL}/api/reports/stock-report`, setter: setStockReport, name: 'Stock Report' },
          { url: `${API_URL}/api/reports/outstanding-ledger`, setter: setOutstandingLedger, name: 'Outstanding Ledger' }
        ];

        // ✅ 6. Send config with every request
        const results = await Promise.allSettled(
          endpoints.map(e => axios.get(e.url, config))
        );

        let failedReports = [];

        results.forEach((result, index) => {
          const endpoint = endpoints[index];
          if (result.status === 'fulfilled') {
            endpoint.setter(result.value.data);
          } else {
            // Handle individual failed requests
            console.error(`Failed to fetch ${endpoint.name}:`, result.reason?.response?.data || result.reason);
            failedReports.push(endpoint.name);
            // Check for 401 specifically
            if (result.reason.response && result.reason.response.status === 401) {
              handleAuthError(result.reason); // Trigger redirect
            }
          }
        });

        if (failedReports.length > 0) {
          setError(`Failed to load: ${failedReports.join(', ')}.`);
        }

      } catch (err) {
        // This will catch errors if Promise.allSettled itself fails (unlikely)
        handleAuthError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [API_URL, navigate]); // Add navigate to dependency array

  // Helper component for empty report
  const NoData = ({ message }) => <p className="text-muted text-center">{message}</p>;

  return (
    <div className="container my-5">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2 className="text-center text-dark mb-5">📊 Bakery Sales Dashboard</h2>

      {loading ? (
        <div className="text-center text-white">
          <div className="spinner-border text-light" role="status"></div>
        </div>
      ) : (
        <div className="row g-4">
          
          {/* === Row 1 === */}
          {/* Daily Report */}
          <div className="col-md-6">
            <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
              <div className="card-header d-flex align-items-center bg-success text-white">
                <FaCalendarDay className="me-2" />
                <h5 className="mb-0">Daily Sales</h5>
              </div>
              <div className="card-body">
                {dailyReport.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {dailyReport.map((sale, idx) => (
                      <li key={idx} className="list-group-item bg-dark d-flex justify-content-between text-light">
                        <span>{sale.date}</span>
                        <strong>₹ {sale.total}</strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <NoData message="No sales data found." />
                )}
              </div>
            </div>
          </div>

          {/* Monthly Report */}
          <div className="col-md-6">
            <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
              <div className="card-header d-flex align-items-center bg-primary text-white">
                <FaCalendarAlt className="me-2" />
                <h5 className="mb-0">Monthly Sales</h5>
              </div>
              <div className="card-body">
                {monthlyReport.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {monthlyReport.map((sale, idx) => (
                      <li key={idx} className="list-group-item bg-dark d-flex justify-content-between text-light">
                        <span>{sale.month}</span>
                        <strong>₹ {sale.total}</strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <NoData message="No sales data found." />
                )}
              </div>
            </div>
          </div>

          {/* === Row 2 === */}
          {/* Top Products */}
          <div className="col-md-6">
            <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
              <div className="card-header d-flex align-items-center bg-info text-white">
                <FaArrowUp className="me-2" />
                <h5 className="mb-0">Top 5 Products</h5>
              </div>
              <div className="card-body">
                {topProducts.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {topProducts.map((item) => (
                      <li key={item._id} className="list-group-item bg-dark d-flex justify-content-between text-light">
                        <span>{item.name}</span>
                        <strong>{item.totalQuantity} Sold</strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <NoData message="No product data found." />
                )}
              </div>
            </div>
          </div>

          {/* Slow Products */}
          <div className="col-md-6">
            <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
              <div className="card-header d-flex align-items-center bg-secondary text-white">
                <FaArrowDown className="me-2" />
                <h5 className="mb-0">Slowest 5 Products</h5>
              </div>
              <div className="card-body">
                {slowProducts.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {slowProducts.map((item) => (
                      <li key={item._id} className="list-group-item bg-dark d-flex justify-content-between text-light">
                        <span>{item.name}</span>
                        <strong>{item.totalQuantity} Sold</strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <NoData message="No product data found." />
                )}
              </div>
            </div>
          </div>

          {/* === Row 3 === */}
          {/* Top Customers */}
          <div className="col-md-6">
            <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
              <div className="card-header d-flex align-items-center bg-warning text-dark">
                <FaUsers className="me-2" />
                <h5 className="mb-0">Top 5 Customers</h5>
              </div>
              <div className="card-body" style={{ overflowX: 'auto' }}>
                {customerReport.length > 0 ? (
                  <table className="table table-dark table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Total Spent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerReport.map((cust) => (
                        <tr key={cust._id}>
                          <td>{cust.name}</td>
                          <td>{cust.contact}</td>
                          <td><strong>₹ {cust.totalSpent}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <NoData message="No customer data found." />
                )}
              </div>
            </div>
          </div>

          {/* Low Stock Report */}
          <div className="col-md-6">
            <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
              <div className="card-header d-flex align-items-center bg-danger text-white">
                <FaBoxes className="me-2" />
                
                <h5 className="mb-0">{'Low Stock Report (<= 5)'}</h5>
              </div>
              <div className="card-body" style={{ overflowX: 'auto' }}>
                {stockReport.length > 0 ? (
                  <table className="table table-dark table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Stock Left</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockReport.map((item) => (
                        <tr key={item._id}>
                          <td>{item.name}</td>
                          <td><strong>{item.stock}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <NoData message="All products are well-stocked." />
                )}
              </div>
            </div>
          </div>

          {/* === Row 4 === */}
          {/* Outstanding Ledger */}
          <div className="col-md-12">
            <div className="card bg-gradient bg-dark text-light shadow-sm border-0 h-100">
              <div className="card-header d-flex align-items-center bg-dark text-white border-bottom border-danger">
                <FaFileInvoiceDollar className="me-2 text-danger" />
                <h5 className="mb-0">Outstanding Ledger (Unpaid)</h5>
              </div>
              <div className="card-body" style={{ overflowX: 'auto' }}>
                {outstandingLedger.length > 0 ? (
                  <table className="table table-dark table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Contact</th>
                        <th>Amount Due</th>
                      </tr>
                    </thead>
                    <tbody>
                      {outstandingLedger.map((item) => (
                        <tr key={item._id}>
                          <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                          <td>{item.customer?.name || 'N/A'}</td>
                          <td>{item.customer?.contact || 'N/A'}</td>
                          <td><strong>₹ {item.total?.toFixed(2) || '0.00'}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <NoData message="No outstanding payments." />
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {error && !loading && <div className="alert alert-danger mt-4">{error}</div>}
    </div>
  );
};

export default Reports; 