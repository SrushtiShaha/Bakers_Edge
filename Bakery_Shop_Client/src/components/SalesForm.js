// // import React, { useState, useEffect, useRef } from 'react';
// // import html2pdf from 'html2pdf.js';
// // import axios from 'axios';
// // import Select from 'react-select';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import InvoicePreview from './InvoicePreview';

// // const SalesForm = () => {
// //   const [products, setProducts] = useState([]);
// //   const [customers, setCustomers] = useState([]);
// //   const [saleItems, setSaleItems] = useState([]);
// //   const [customerId, setCustomerId] = useState('');
// //   const [invoiceNo, setInvoiceNo] = useState('');
// //   const [totalAmount, setTotalAmount] = useState(0);
// //   const [showModal, setShowModal] = useState(false);
// //   const [savedSaleId, setSavedSaleId] = useState(null);
// //   const [newCustomerName, setNewCustomerName] = useState('');
// //   const [newCustomerAddress, setNewCustomerAddress] = useState('');
// //   const [newCustomerContact, setNewCustomerContact] = useState('');
// //   const [vendorData, setVendorData] = useState(null); // ✅ new vendor state
// //   const componentRef = useRef();

// //   const API = process.env.REACT_APP_API_URL;

// //   // 🔹 Fetch products, customers, and vendor details
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [resProducts, resCustomers] = await Promise.all([
// //           axios.get(`${API}/api/products`),
// //           axios.get(`${API}/api/customers`),
// //         ]);
// //         setProducts(resProducts.data);
// //         setCustomers(resCustomers.data);
// //       } catch (err) {
// //         console.error('Error loading data:', err);
// //       }
// //     };

// //     const fetchVendorDetails = async () => {
// //       try {
// //         const token = localStorage.getItem("vendorToken"); // ✅ use correct token key
// //         if (!token) {
// //           console.warn("Vendor token not found!");
// //           return;
// //         }

// //         const res = await axios.get(`${API}/api/admin/vendor/me`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });

// //         console.log("✅ Vendor data fetched:", res.data);
// //         setVendorData(res.data);
// //       } catch (err) {
// //         console.error("Error fetching vendor details:", err.response?.data || err);
// //         toast.error("Failed to fetch vendor details.");
// //       }
// //     };

// //     fetchData();
// //     fetchVendorDetails();
// //   }, [API]);

// //   // 🔹 Update total and invoice number dynamically
// //   useEffect(() => {
// //     if (saleItems.length > 0 || customerId) {
// //       setInvoiceNo('#' + Math.floor(100000 + Math.random() * 900000));
// //       const total = saleItems.reduce((acc, item) => {
// //         const product = products.find((p) => p._id === item.product);
// //         return acc + (product ? product.price * item.quantity : 0);
// //       }, 0);
// //       setTotalAmount(total);
// //     }
// //   }, [saleItems, customerId, products]);

// //   const addItem = (productId) => {
// //     const existing = saleItems.find((item) => item.product === productId);
// //     if (existing) {
// //       setSaleItems(
// //         saleItems.map((item) =>
// //           item.product === productId ? { ...item, quantity: item.quantity + 1 } : item
// //         )
// //       );
// //     } else {
// //       setSaleItems([...saleItems, { product: productId, quantity: 1 }]);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (
// //       (!customerId &&
// //         (!newCustomerName.trim() || !newCustomerAddress.trim() || !newCustomerContact.trim())) ||
// //       saleItems.length === 0
// //     ) {
// //       toast.warn('Please fill all required fields before saving.');
// //       return;
// //     }

// //     try {
// //       let finalCustomerId = customerId;
// //       if (!finalCustomerId && newCustomerName.trim()) {
// //         const newCustomer = await axios.post(`${API}/api/customers`, {
// //           name: newCustomerName.trim(),
// //           address: newCustomerAddress.trim(),
// //           contact: newCustomerContact.trim(),
// //         });
// //         finalCustomerId = newCustomer.data._id;
// //         setCustomerId(finalCustomerId);
// //       }

// //       const saleRes = await axios.post(`${API}/api/sales`, {
// //         customer: finalCustomerId,
// //         items: saleItems,
// //       });

// //       setSavedSaleId(saleRes.data._id);
// //       setShowModal(true);
// //     } catch (err) {
// //       console.error('Error saving sale:', err);
// //       toast.error('Failed to save sale');
// //     }
// //   };

// //   const handleAddLedger = async () => {
// //     try {
// //       await axios.post(`${API}/api/ledger`, {
// //         sale: savedSaleId,
// //         customer: customerId,
// //         total: totalAmount,
// //         products: saleItems.map((item) => item.product),
// //       });
// //       toast.success('Added to Ledger!');
// //       resetForm();
// //     } catch (err) {
// //       console.error(err);
// //       toast.error('Error adding to ledger');
// //     } finally {
// //       setShowModal(false);
// //     }
// //   };

// //   const handleMarkAsPaid = async () => {
// //     try {
// //       const ledgerRes = await axios.post(`${API}/api/ledger`, {
// //         sale: savedSaleId,
// //         customer: customerId,
// //         total: totalAmount,
// //         products: saleItems.map((item) => item.product),
// //       });
// //       await axios.patch(`${API}/api/ledger/${ledgerRes.data._id}/pay`);
// //       toast.success('Payment marked as paid');
// //       resetForm();
// //     } catch (err) {
// //       console.error(err);
// //       toast.error('Error marking as paid');
// //     } finally {
// //       setShowModal(false);
// //     }
// //   };

// //   const resetForm = () => {
// //     setSaleItems([]);
// //     setCustomerId('');
// //     setSavedSaleId(null);
// //     setTotalAmount(0);
// //     setNewCustomerName('');
// //     setNewCustomerAddress('');
// //     setNewCustomerContact('');
// //   };

// //   const handleGeneratePDF = () => {
// //     const element = componentRef.current;
// //     const opt = {
// //       margin: 0.3,
// //       filename: `Invoice_${invoiceNo}.pdf`,
// //       image: { type: 'jpeg', quality: 0.98 },
// //       html2canvas: { scale: 2 },
// //       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
// //     };
// //     html2pdf().from(element).set(opt).save();
// //   };

// //   const selectedCustomer = customerId
// //     ? customers.find((c) => c._id === customerId)
// //     : {
// //         name: newCustomerName,
// //         contact: newCustomerContact,
// //         address: newCustomerAddress,
// //       };

// //   return (
// //     <div className="container mt-4">
// //       <h2>Sales Billing</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div className="mb-3">
// //           <label className="form-label">Search or Select Customer</label>
// //           <Select
// //             options={customers.map((c) => ({
// //               value: c._id,
// //               label: `${c.name} - ${c.contact}`,
// //             }))}
// //             onChange={(option) => {
// //               setCustomerId(option ? option.value : '');
// //               setNewCustomerName('');
// //             }}
// //             placeholder="Search customer..."
// //             isClearable
// //           />
// //         </div>

// //         <div className="mb-3">
// //           <label className="form-label">Enter New Customer Name</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             placeholder="Enter customer name"
// //             value={newCustomerName}
// //             onChange={(e) => {
// //               setNewCustomerName(e.target.value);
// //               setCustomerId('');
// //             }}
// //           />
// //         </div>

// //         <div className="mb-3">
// //           <label className="form-label">Customer Contact Number</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             placeholder="Enter contact number"
// //             value={newCustomerContact}
// //             onChange={(e) => setNewCustomerContact(e.target.value)}
// //           />
// //         </div>

// //         <div className="mb-3">
// //           <label className="form-label">Customer Address</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             placeholder="Enter address"
// //             value={newCustomerAddress}
// //             onChange={(e) => setNewCustomerAddress(e.target.value)}
// //           />
// //         </div>

// //         <div className="mb-3">
// //           <label className="form-label">Search & Select Product</label>
// //           <Select
// //             options={products.map((p) => ({
// //               value: p._id,
// //               label: `${p.name} (₹${p.price})`,
// //             }))}
// //             onChange={(option) => addItem(option.value)}
// //             placeholder="Type product name..."
// //             isClearable
// //           />
// //         </div>

// //         {saleItems.length > 0 && (
// //           <div className="mb-3">
// //             <table className="table table-bordered">
// //               <thead>
// //                 <tr>
// //                   <th>Product</th>
// //                   <th>Qty</th>
// //                   <th>Rate</th>
// //                   <th>Total</th>
// //                   <th>Action</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {saleItems.map((item, index) => {
// //                   const product = products.find((p) => p._id === item.product);
// //                   if (!product) return null;
// //                   return (
// //                     <tr key={product._id}>
// //                       <td>{product.name}</td>
// //                       <td>
// //                         <input
// //                           type="number"
// //                           min="1"
// //                           value={item.quantity}
// //                           onChange={(e) => {
// //                             const newQty = parseInt(e.target.value) || 1;
// //                             const updatedItems = [...saleItems];
// //                             updatedItems[index].quantity = newQty;
// //                             setSaleItems(updatedItems);
// //                           }}
// //                           className="form-control"
// //                           style={{ width: '80px' }}
// //                         />
// //                       </td>
// //                       <td>₹{product.price}</td>
// //                       <td>₹{(product.price * item.quantity).toFixed(2)}</td>
// //                       <td>
// //                         <button
// //                           type="button"
// //                           className="btn btn-danger btn-sm"
// //                           onClick={() => {
// //                             const updatedItems = saleItems.filter((_, i) => i !== index);
// //                             setSaleItems(updatedItems);
// //                           }}
// //                         >
// //                           Remove
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         <h5 className="mt-4">Invoice Preview:</h5>
// //         <div className="mb-3 border p-3 bg-light">
// //           <InvoicePreview
// //             customer={selectedCustomer || {}}
// //             saleItems={saleItems}
// //             products={products}
// //             invoiceNo={invoiceNo}
// //             totalAmount={totalAmount}
// //             vendorData={vendorData} // ✅ pass vendor info here
// //           />
// //         </div>

// //         <div style={{ display: 'none' }}>
// //           <InvoicePreview
// //             ref={componentRef}
// //             customer={selectedCustomer || {}}
// //             saleItems={saleItems}
// //             products={products}
// //             invoiceNo={invoiceNo}
// //             totalAmount={totalAmount}
// //            vendorData={vendorData || {}} // ✅ also pass here for PDF
// //           />
// //         </div>

// //         <button type="submit" className="btn btn-success me-3">
// //           Save Sale
// //         </button>
// //         <button
// //           type="button"
// //           onClick={handleGeneratePDF}
// //           className="btn btn-secondary"
// //         >
// //           Download Invoice PDF
// //         </button>
// //       </form>

// //       {showModal && (
// //         <>
// //           <div className="modal-backdrop fade show"></div>
// //           <div
// //             className="modal fade show d-block"
// //             tabIndex="-1"
// //             role="dialog"
// //             style={{ zIndex: 1050 }}
// //           >
// //             <div className="modal-dialog modal-dialog-centered" role="document">
// //               <div className="modal-content">
// //                 <div className="modal-header">
// //                   <h5 className="modal-title">Select Ledger Option</h5>
// //                   <button
// //                     type="button"
// //                     className="btn-close"
// //                     onClick={() => setShowModal(false)}
// //                   ></button>
// //                 </div>
// //                 <div className="modal-body">
// //                   <p>How would you like to proceed with the ledger?</p>
// //                 </div>
// //                 <div className="modal-footer">
// //                   <button onClick={handleAddLedger} className="btn btn-primary">
// //                     Add Ledger
// //                   </button>
// //                   <button onClick={handleMarkAsPaid} className="btn btn-success">
// //                     Mark as Paid
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </>
// //       )}

// //       <ToastContainer position="top-center" autoClose={2000} />
// //     </div>
// //   );
// // };

// // export default SalesForm;

// import React, { useState, useEffect, useRef } from 'react';
// import html2pdf from 'html2pdf.js';
// import axios from 'axios';
// import Select from 'react-select';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import InvoicePreview from './InvoicePreview';

// const SalesForm = () => {
//   const [products, setProducts] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [saleItems, setSaleItems] = useState([]);
//   const [customerId, setCustomerId] = useState('');
//   const [invoiceNo, setInvoiceNo] = useState('');
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [savedSaleId, setSavedSaleId] = useState(null);
//   const [newCustomerName, setNewCustomerName] = useState('');
//   const [newCustomerAddress, setNewCustomerAddress] = useState('');
//   const [newCustomerContact, setNewCustomerContact] = useState('');
//   const [vendorData, setVendorData] = useState(null);
//   const componentRef = useRef();

//   const API = process.env.REACT_APP_API_URL;

//   // Fetch products, customers, vendor details
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [resProducts, resCustomers] = await Promise.all([
//           axios.get(`${API}/api/products`),
//           axios.get(`${API}/api/customers`),
//         ]);
//         setProducts(resProducts.data);
//         setCustomers(resCustomers.data);
//       } catch (err) {
//         console.error('Error loading data:', err);
//       }
//     };

//     const fetchVendorDetails = async () => {
//       try {
//         const token = localStorage.getItem("vendorToken");
//         if (!token) return;
//         const res = await axios.get(`${API}/api/admin/vendor/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setVendorData(res.data);
//       } catch (err) {
//         console.error("Error fetching vendor details:", err.response?.data || err);
//         toast.error("Failed to fetch vendor details.");
//       }
//     };

//     fetchData();
//     fetchVendorDetails();
//   }, [API]);

//   // Update invoice number & total
//   useEffect(() => {
//     if (saleItems.length > 0 || customerId) {
//       setInvoiceNo('#' + Math.floor(100000 + Math.random() * 900000));
//       const total = saleItems.reduce((acc, item) => {
//         const product = products.find((p) => p._id === item.product);
//         return acc + (product ? product.price * item.quantity : 0);
//       }, 0);
//       setTotalAmount(total);
//     }
//   }, [saleItems, customerId, products]);

//   const addItem = (productId) => {
//     const existing = saleItems.find((item) => item.product === productId);
//     if (existing) {
//       setSaleItems(
//         saleItems.map((item) =>
//           item.product === productId ? { ...item, quantity: item.quantity + 1 } : item
//         )
//       );
//     } else {
//       setSaleItems([...saleItems, { product: productId, quantity: 1 }]);
//     }
//   };

//   // ✅ Updated handleSubmit with totalAmount & formatted items
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       (!customerId &&
//         (!newCustomerName.trim() || !newCustomerAddress.trim() || !newCustomerContact.trim())) ||
//       saleItems.length === 0
//     ) {
//       toast.warn('Please fill all required fields before saving.');
//       return;
//     }

//     try {
//       let finalCustomerId = customerId;
//       if (!finalCustomerId && newCustomerName.trim()) {
//         const newCustomer = await axios.post(`${API}/api/customers`, {
//           name: newCustomerName.trim(),
//           address: newCustomerAddress.trim(),
//           contact: newCustomerContact.trim(),
//         });
//         finalCustomerId = newCustomer.data._id;
//         setCustomerId(finalCustomerId);
//       }

//       const formattedItems = saleItems.map((item) => ({
//         product: item.product,
//         quantity: item.quantity,
//       }));

//       const saleRes = await axios.post(`${API}/api/sales`, {
//         customer: finalCustomerId,
//         items: formattedItems,
//         totalAmount,
//       });

//       setSavedSaleId(saleRes.data._id);
//       setShowModal(true);
//       toast.success('Sale saved successfully!');
//     } catch (err) {
//       console.error('Error saving sale:', err);
//       toast.error('Failed to save sale');
//     }
//   };

//   const handleAddLedger = async () => {
//     try {
//       await axios.post(`${API}/api/ledger`, {
//         sale: savedSaleId,
//         customer: customerId,
//         total: totalAmount,
//         products: saleItems.map((item) => item.product),
//       });
//       toast.success('Added to Ledger!');
//       resetForm();
//     } catch (err) {
//       console.error(err);
//       toast.error('Error adding to ledger');
//     } finally {
//       setShowModal(false);
//     }
//   };

//   const handleMarkAsPaid = async () => {
//     try {
//       const ledgerRes = await axios.post(`${API}/api/ledger`, {
//         sale: savedSaleId,
//         customer: customerId,
//         total: totalAmount,
//         products: saleItems.map((item) => item.product),
//       });
//       await axios.patch(`${API}/api/ledger/${ledgerRes.data._id}/pay`);
//       toast.success('Payment marked as paid');
//       resetForm();
//     } catch (err) {
//       console.error(err);
//       toast.error('Error marking as paid');
//     } finally {
//       setShowModal(false);
//     }
//   };

//   const resetForm = () => {
//     setSaleItems([]);
//     setCustomerId('');
//     setSavedSaleId(null);
//     setTotalAmount(0);
//     setNewCustomerName('');
//     setNewCustomerAddress('');
//     setNewCustomerContact('');
//   };

//   const handleGeneratePDF = () => {
//     const element = componentRef.current;
//     const opt = {
//       margin: 0.3,
//       filename: `Invoice_${invoiceNo}.pdf`,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
//     };
//     html2pdf().from(element).set(opt).save();
//   };

//   const selectedCustomer = customerId
//     ? customers.find((c) => c._id === customerId)
//     : {
//         name: newCustomerName,
//         contact: newCustomerContact,
//         address: newCustomerAddress,
//       };

//   return (
//     <div className="container mt-4">
//       <h2>Sales Billing</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Customer Selection */}
//         <div className="mb-3">
//           <label className="form-label">Search or Select Customer</label>
//           <Select
//             options={customers.map((c) => ({
//               value: c._id,
//               label: `${c.name} - ${c.contact}`,
//             }))}
//             onChange={(option) => {
//               setCustomerId(option ? option.value : '');
//               // Clear all new customer fields when selecting an existing one
//               setNewCustomerName('');
//               setNewCustomerContact(''); // <-- Clear contact
//               setNewCustomerAddress(''); // <-- Clear address
//             }}
//             placeholder="Search customer..."
//             isClearable
//             isDisabled={!!newCustomerName.trim()} // <-- Add this line
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Enter New Customer Name</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter customer name"
//             value={newCustomerName}
//             onChange={(e) => {
//               setNewCustomerName(e.target.value);
//               setCustomerId('');
//             }}
//             disabled={!!customerId} // <-- Add this line
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Customer Contact Number</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter contact number"
//             value={newCustomerContact}
//             onChange={(e) => setNewCustomerContact(e.target.value)}
//             disabled={!!customerId} // <-- Add this line
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Customer Address</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter address"
//             value={newCustomerAddress}
//             onChange={(e) => setNewCustomerAddress(e.target.value)}
//             disabled={!!customerId} // <-- Add this line
//           />
//         </div>

//         {/* Product Selection */}
//         <div className="mb-3">
//           <label className="form-label">Search & Select Product</label>
//           <Select
//             options={products.map((p) => ({
//               value: p._id,
//               label: `${p.name} (₹${p.price})`,
//             }))}
//             onChange={(option) => addItem(option.value)}
//             placeholder="Type product name..."
//             isClearable
//           />
//         </div>

//         {/* Sale Items Table */}
//         {saleItems.length > 0 && (
//           <div className="mb-3">
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Qty</th>
//                   <th>Rate</th>
//                   <th>Total</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {saleItems.map((item, index) => {
//                   const product = products.find((p) => p._id === item.product);
//                   if (!product) return null;
//                   return (
//                     <tr key={product._id}>
//                       <td>{product.name}</td>
//                       <td>
//                         <input
//                           type="number"
//                           min="1"
//                           value={item.quantity}
//                           onChange={(e) => {
//                             const newQty = parseInt(e.target.value) || 1;
//                             const updatedItems = [...saleItems];
//                             updatedItems[index].quantity = newQty;
//                             setSaleItems(updatedItems);
//                           }}
//                           className="form-control"
//                           style={{ width: '80px' }}
//                         />
//                       </td>
//                       <td>₹{product.price}</td>
//                       <td>₹{(product.price * item.quantity).toFixed(2)}</td>
//                       <td>
//                         <button
//                           type="button"
//                           className="btn btn-danger btn-sm"
//                           onClick={() => {
//                             const updatedItems = saleItems.filter((_, i) => i !== index);
//                             setSaleItems(updatedItems);
//                           }}
//                         >
//                           Remove
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Invoice Preview */}
//         <h5 className="mt-4">Invoice Preview:</h5>
//         <div className="mb-3 border p-3 bg-light">
//           <InvoicePreview
//             customer={selectedCustomer || {}}
//             saleItems={saleItems}
//             products={products}
//             invoiceNo={invoiceNo}
//             totalAmount={totalAmount}
//             vendorData={vendorData}
//           />
//         </div>

//         <div style={{ display: 'none' }}>
//           <InvoicePreview
//             ref={componentRef}
//             customer={selectedCustomer || {}}
//             saleItems={saleItems}
//             products={products}
//             invoiceNo={invoiceNo}
//             totalAmount={totalAmount}
//             vendorData={vendorData || {}}
//           />
//         </div>

//         <button type="submit" className="btn btn-success me-3">
//           Save Sale
//         </button>
//         <button
//           type="button"
//           onClick={handleGeneratePDF}
//           className="btn btn-secondary"
//         >
//           Download Invoice PDF
//         </button>
//       </form>

//       {/* Ledger Modal */}
//       {showModal && (
//         <>
//           <div className="modal-backdrop fade show"></div>
//           <div
//             className="modal fade show d-block"
//             tabIndex="-1"
//             role="dialog"
//             style={{ zIndex: 1050 }}
//           >
//             <div className="modal-dialog modal-dialog-centered" role="document">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Select Ledger Option</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setShowModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <p>How would you like to proceed with the ledger?</p>
//                 </div>
//                 <div className="modal-footer">
//                   <button onClick={handleAddLedger} className="btn btn-primary">
//                     Add Ledger
//                   </button>
//                   <button onClick={handleMarkAsPaid} className="btn btn-success">
//                     Mark as Paid
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       <ToastContainer position="top-center" autoClose={2000} />
//     </div>
//   );
// };

// export default SalesForm;

// SalesForm.js
import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InvoicePreview from './InvoicePreview';
import { useNavigate } from 'react-router-dom'; // ✅ 1. Import

const SalesForm = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [savedSaleId, setSavedSaleId] = useState(null);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerAddress, setNewCustomerAddress] = useState('');
  const [newCustomerContact, setNewCustomerContact] = useState('');
  const [vendorData, setVendorData] = useState(null);
  const componentRef = useRef();
  const navigate = useNavigate(); // ✅ 2. Initialize

  const API = process.env.REACT_APP_API_URL;

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
      toast.error(err.response?.data?.message || err.message || 'An error occurred.');
    }
    console.error('API Error:', err);
  };

  // 🔹 Fetch products, customers, and vendor details
  useEffect(() => {
    const config = getAuthConfig();
    if (!config) return;

    const fetchData = async () => {
      try {
        const [resProducts, resCustomers] = await Promise.all([
          axios.get(`${API}/api/products`, config), // ✅ Send config
          axios.get(`${API}/api/customers`, config), // ✅ Send config
        ]);
        setProducts(resProducts.data);
        setCustomers(resCustomers.data);
      } catch (err) {
        handleAuthError(err); // ✅ Handle errors
      }
    };

    const fetchVendorDetails = async () => {
      try {
        const res = await axios.get(`${API}/api/admin/vendor/me`, config); // ✅ Send config
        setVendorData(res.data);
      } catch (err) {
        handleAuthError(err); // ✅ Handle errors
      }
    };

    fetchData();
    fetchVendorDetails();
  }, [API, navigate]); // Add navigate to dependency array

  // 🔹 Update total and invoice number
  useEffect(() => {
    if (saleItems.length > 0 || customerId) {
      setInvoiceNo('#' + Math.floor(100000 + Math.random() * 900000));
      const total = saleItems.reduce((acc, item) => {
        const product = products.find((p) => p._id === item.product);
        return acc + (product ? product.price * item.quantity : 0);
      }, 0);
      setTotalAmount(total);
    }
  }, [saleItems, customerId, products]);

  const addItem = (productId) => {
    // ... (no changes here)
    const existing = saleItems.find((item) => item.product === productId);
    if (existing) {
      setSaleItems(saleItems.map((item) =>
        item.product === productId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setSaleItems([...saleItems, { product: productId, quantity: 1 }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = getAuthConfig(); // ✅ Get config
    if (!config) return;

    // ... (your validation logic is fine)
    if ((!customerId && !newCustomerName.trim()) || saleItems.length === 0) {
      toast.warn('Please select a customer and add items.');
      return;
    }

    try {
      let finalCustomerId = customerId;
      if (!finalCustomerId && newCustomerName.trim()) {
        const newCustomer = await axios.post(`${API}/api/customers`, {
          name: newCustomerName.trim(),
          address: newCustomerAddress.trim(),
          contact: newCustomerContact.trim(),
        }, config); // ✅ Send config
        finalCustomerId = newCustomer.data._id;
        setCustomerId(finalCustomerId);
        // Add new customer to the list dynamically
        setCustomers(prev => [...prev, newCustomer.data]);
      }

      const saleData = {
        customer: finalCustomerId,
        items: saleItems,
        totalAmount: totalAmount,
        invoiceNo: invoiceNo
      };

      const saleRes = await axios.post(`${API}/api/sales`, saleData, config); // ✅ Send config
      setSavedSaleId(saleRes.data._id);
      setShowModal(true);
      toast.success('Sale saved successfully!');
    } catch (err) {
      handleAuthError(err); // ✅ Handle errors
    }
  };

  const handleAddLedger = async () => {
    const config = getAuthConfig(); // ✅ Get config
    if (!config) return;

    try {
      const ledgerData = {
        sale: savedSaleId,
        customer: customerId,
        total: totalAmount,
      };
      // We use the saleId, so the backend can link it
      await axios.post(`${API}/api/ledger`, ledgerData, config); // ✅ Send config
      toast.success('Added to Ledger!');
      resetForm();
    } catch (err) {
      handleAuthError(err); // ✅ Handle errors
    } finally {
      setShowModal(false);
    }
  };

  const handleMarkAsPaid = async () => {
    const config = getAuthConfig(); // ✅ Get config
    if (!config) return;

    try {
      const ledgerData = {
        sale: savedSaleId,
        customer: customerId,
        total: totalAmount,
      };
      const ledgerRes = await axios.post(`${API}/api/ledger`, ledgerData, config); // ✅ Send config
      
      // Now mark it as paid
      await axios.patch(`${API}/api/ledger/${ledgerRes.data._id}/pay`, {}, config); // ✅ Send config
      
      toast.success('Payment marked as paid');
      resetForm();
    } catch (err) {
      handleAuthError(err); // ✅ Handle errors
    } finally {
      setShowModal(false);
    }
  };

  const resetForm = () => {
    // ... (no changes here)
    setSaleItems([]); setCustomerId(''); setSavedSaleId(null);
    setTotalAmount(0); setNewCustomerName('');
    setNewCustomerAddress(''); setNewCustomerContact('');
  };

  const handleGeneratePDF = () => {
    // ... (no changes here)
    const element = componentRef.current;
    html2pdf().from(element).set({
      margin: 0.3, filename: `Invoice_${invoiceNo}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save();
  };

  const selectedCustomer = customerId
    ? customers.find((c) => c._id === customerId)
    : { name: newCustomerName, contact: newCustomerContact, address: newCustomerAddress };

  return (
    // ✅ Your JSX is fine. No changes needed to the returned HTML structure.
    <div className="container mt-4">
      <h2>Sales Billing</h2>
      <form onSubmit={handleSubmit}>
        {/* Customer Selection */}
        <div className="mb-3">
          <label className="form-label">Search or Select Customer</label>
          <Select
            options={customers.map((c) => ({
              value: c._id,
              label: `${c.name} - ${c.contact}`,
            }))}
            onChange={(option) => {
              setCustomerId(option ? option.value : '');
              setNewCustomerName('');
              setNewCustomerContact('');
              setNewCustomerAddress('');
            }}
            placeholder="Search customer..."
            isClearable
            isDisabled={!!newCustomerName.trim()}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Enter New Customer Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter customer name"
            value={newCustomerName}
            onChange={(e) => {
              setNewCustomerName(e.target.value);
              setCustomerId('');
            }}
            disabled={!!customerId}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Customer Contact Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter contact number"
            value={newCustomerContact}
            onChange={(e) => setNewCustomerContact(e.target.value)}
            disabled={!!customerId}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Customer Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            value={newCustomerAddress}
            onChange={(e) => setNewCustomerAddress(e.target.value)}
            disabled={!!customerId}
          />
        </div>

        {/* Product Selection */}
        <div className="mb-3">
          <label className="form-label">Search & Select Product</label>
          <Select
            options={products.map((p) => ({
              value: p._id,
              label: `${p.name} (₹${p.price})`,
            }))}
            onChange={(option) => option && addItem(option.value)}
            placeholder="Type product name..."
            value={null} // Reset select after adding
          />
        </div>

        {/* Sale Items Table */}
        {saleItems.length > 0 && (
          <div className="mb-3">
            <table className="table table-bordered">
              {/* ... (table structure is fine) ... */}
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {saleItems.map((item, index) => {
                  const product = products.find((p) => p._id === item.product);
                  if (!product) return null;
                  return (
                    <tr key={product._id + index}>
                      <td>{product.name}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQty = parseInt(e.target.value) || 1;
                            const updatedItems = [...saleItems];
                            updatedItems[index].quantity = newQty;
                            setSaleItems(updatedItems);
                          }}
                          className="form-control"
                          style={{ width: '80px' }}
                        />
                      </td>
                      <td>₹{product.price}</td>
                      <td>₹{(product.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            const updatedItems = saleItems.filter((_, i) => i !== index);
                            setSaleItems(updatedItems);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Invoice Preview */}
        <h5 className="mt-4">Invoice Preview:</h5>
        <div className="mb-3 border p-3 bg-light">
          <InvoicePreview
            customer={selectedCustomer || {}}
            saleItems={saleItems}
            products={products}
            invoiceNo={invoiceNo}
            totalAmount={totalAmount}
            vendorData={vendorData}
          />
        </div>

        {/* Hidden for PDF */}
        <div style={{ display: 'none' }}>
          <InvoicePreview
            ref={componentRef}
            customer={selectedCustomer || {}}
            saleItems={saleItems}
            products={products}
            invoiceNo={invoiceNo}
            totalAmount={totalAmount}
            vendorData={vendorData || {}}
          />
        </div>

        <button typeS="submit" className="btn btn-success me-3">
          Save Sale
        </button>
        <button
          type="button"
          onClick={handleGeneratePDF}
          className="btn btn-secondary"
        >
          Download Invoice PDF
        </button>
      </form>

      {/* Ledger Modal */}
      {showModal && (
        <>
          {/* ... (modal structure is fine) ... */}
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Select Ledger Option</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>How would you like to proceed with the ledger?</p>
                </div>
                <div className="modal-footer">
                  <button onClick={handleAddLedger} className="btn btn-primary">
                    Add Ledger
                  </button>
                  <button onClick={handleMarkAsPaid} className="btn btn-success">
                    Mark as Paid
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default SalesForm;
