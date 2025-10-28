// // // import React, { useState, useEffect, useRef } from 'react';
// // // import axios from 'axios';
// // // import JsBarcode from 'jsbarcode';
// // // import jsPDF from 'jspdf';
// // // import { Modal, Button, Spinner } from 'react-bootstrap';
// // // import { toast, ToastContainer } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import './ProductForm.css'; // For blinking expiry text

// // // axios.defaults.baseURL = "http://localhost:10000";

// // // const ProductForm = () => {
// // //   const [products, setProducts] = useState([]);
// // //   const [form, setForm] = useState({
// // //     name: '', quantity: '', price: '', weight: '', expiryDate: '', manufacturingDate: ''
// // //   });
// // //   const [editForm, setEditForm] = useState({
// // //     name: '', price: '', weight: '', manufacturingDate: '', barcode: ''
// // //   });
// // //   const [editId, setEditId] = useState(null);
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [searchQuery, setSearchQuery] = useState('');

// // //   // Ref for barcodes
// // //   const barcodeRefs = useRef({});

// // //   // --- NEW SORTING FUNCTION ---
// // //   /**
// // //    * Sorts products alphabetically by name.
// // //    */
// // //   const sortProducts = (productsList) => {
// // //     // localeCompare is a robust way to sort strings alphabetically
// // //     return [...productsList].sort((a, b) => a.name.localeCompare(b.name));
// // //   };

// // //   // Fetch products
// // //   const fetchProducts = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const cacheBuster = `_t=${new Date().getTime()}`;
// // //       const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products?${cacheBuster}`);
// // //       setProducts(sortProducts(res.data));
// // //     } catch (err) {
// // //       console.error('Error while fetching products:', err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchProducts();
// // //   }, []);

// // //   // Generate barcode whenever products change
// // //   useEffect(() => {
// // //     products.forEach(p => generateBarcode(p._id));
// // //   }, [products]);

// // //   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
// // //   const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

// // //   // Add new product/batch (NOW SORTS)
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const { name, quantity, price, expiryDate } = form;
// // //     // Validation is still here as a safeguard
// // //     if (!name.trim() || quantity <= 0 || price <= 0 || !expiryDate) {
// // //       toast.error("Please fill Name, Quantity, Price, and Expiry Date.");
// // //       return;
// // //     }

// // //     try {
// // //       const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/products`, form);
// // //       const updated = res.data;

// // //       setProducts(prev => {
// // //         const exists = prev.find(p => p._id === updated._id);
// // //         const newList = exists ? prev.map(p => (p._id === updated._id ? updated : p)) : [...prev, updated];
// // //         return sortProducts(newList);
// // //       });

// // //       toast.success(`Saved batch for ${name}`);
// // //       setForm({ name: '', quantity: '', price: '', weight: '', expiryDate: '', manufacturingDate: '' });
// // //     } catch (err) {
// // //       console.error('Error adding product:', err);
// // //       toast.error("Error saving product.");
// // //     }
// // //   };

// // //   // Edit product info
// // //   const handleEdit = (product) => {
// // //     setEditId(product._id);
// // //     setEditForm({
// // //       name: product.name,
// // //       price: product.price,
// // //       weight: product.weight || '',
// // //       manufacturingDate: product.manufacturingDate ? product.manufacturingDate.split('T')[0] : '',
// // //       barcode: product._id
// // //     });
// // //     setShowModal(true);
// // //   };

// // //   const handleSaveEdit = async () => {
// // //     const { name, price } = editForm;
// // //     if (!name.trim() || price <= 0) {
// // //       toast.error("Name and Price are required.");
// // //       return;
// // //     }

// // //     try {
// // //       const updatePayload = {
// // //         name: editForm.name,
// // //         price: editForm.price,
// // //         weight: editForm.weight,
// // //         manufacturingDate: editForm.manufacturingDate
// // //       };

// // //       await axios.put(`${process.env.REACT_APP_API_URL}/api/products/${editId}`, updatePayload);
// // //       fetchProducts(); 
// // //       setShowModal(false);
// // //       setEditId(null);
// // //       toast.success("Product updated!");
// // //     } catch (err) {
// // //       console.error('Error editing product:', err);
// // //     }
// // //   };

// // //   // Delete product
// // //   const handleDelete = async (id) => {
// // //     try {
// // //       if (window.confirm("Are you sure you want to delete this product?")) {
// // //         await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
// // //         fetchProducts();
// // //       }
// // //     } catch (err) {
// // //       console.error('Error deleting product:', err);
// // //     }
// // //   };

// // //   // Generate barcode for a product
// // //   const generateBarcode = (id) => {
// // //     if (!id) return;
// // //     const canvas = barcodeRefs.current[id];
// // //     if (canvas) {
// // //       JsBarcode(canvas, id.toString(), { format: "CODE128", displayValue: false, width: 1, height: 20, margin: 0 });
// // //     }
// // //   };

// // //   // Generate PDF with barcode and batch info
// // //   const generatePDFWithBarcodes = (product) => {
// // //     const canvas = barcodeRefs.current[product._id];
// // //     if (!canvas) return;

// // //     const pdf = new jsPDF();
// // //     const imgData = canvas.toDataURL("image/png");

// // //     pdf.setFontSize(12);
// // //     pdf.text(`Product: ${product.name}`, 10, 20);
// // //     pdf.text(`Price: ₹${product.price}`, 10, 30);

// // //     if (product.manufacturingDate)
// // //       pdf.text(`MFG Date: ${new Date(product.manufacturingDate).toLocaleDateString()}`, 10, 40);

// // //     pdf.text(`Expiry Batches:`, 10, 50);
// // //     let yPos = 60;
// // //     if (product.expiryBatches && product.expiryBatches.length > 0) {
// // //       product.expiryBatches.forEach(batch => {
// // //         if (yPos > 280) {
// // //           pdf.addPage();
// // //           yPos = 20;
// // //         }
// // //         pdf.text(`- EXP: ${new Date(batch.expiryDate).toLocaleDateString()} (Qty: ${batch.quantity})`, 15, yPos);
// // //         yPos += 10;
// // //       });
// // //     } else {
// // //       pdf.text("No expiry information.", 15, yPos);
// // //       yPos += 10;
// // //     }

// // //     pdf.addImage(imgData, "PNG", 10, yPos + 5, 100, 30);
// // //     pdf.save(`${product.name}_barcode.pdf`);
// // //   };

// // //   // Expiry alert
// // //   const getExpiryAlert = (batches = []) => {
// // //     const today = new Date(); today.setHours(0, 0, 0, 0);
// // //     const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

// // //     let expiringQty = 0;
// // //     let expiredQty = 0;

// // //     batches.forEach(b => {
// // //       const exp = new Date(b.expiryDate); exp.setHours(0, 0, 0, 0);
// // //       if (exp.getTime() === tomorrow.getTime()) expiringQty += b.quantity;
// // //       else if (exp.getTime() < today.getTime()) expiredQty += b.quantity;
// // //     });

// // //     if (expiringQty > 0)
// // //       return <span className="expiry-alert">Expires Tomorrow! (Qty: {expiringQty})</span>;
// // //     if (expiredQty > 0)
// // //       return <span style={{ color: "red", fontWeight: "bold" }}>Expired (Qty: {expiredQty})</span>;
// // //     return null;
// // //   };

// // //   const handleSearchChange = (e) => setSearchQuery(e.target.value);
// // //   const handleClearSearch = () => setSearchQuery('');

// // //   const handleSearch = () => {
// // //     fetchProducts();
// // //   };

// // //   const filteredProducts = products.filter(p =>
// // //     p.name.toLowerCase().includes(searchQuery.toLowerCase())
// // //   );

// // //   // --- 1. ADD THIS VALIDATION LOGIC ---
// // //   // This will be true if any required field is invalid
// // //   const isFormInvalid = !form.name.trim() || 
// // //                         Number(form.quantity) <= 0 || 
// // //                         Number(form.price) <= 0 || 
// // //                         !form.expiryDate;

// // //   return (
// // //     <div className="container mt-4">
// // //       <ToastContainer position="top-center" autoClose={2000} />
// // //       <h2 className="text-center mb-4 text-primary">Add Product</h2>

// // //       {/* FORM */}
// // //       <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
// // //         <h5 className="mb-3 border-bottom pb-2 text-primary">Add New Product / Batch</h5>
// // //         <div className="row g-4">
// // //           <div className="col-md-4">
// // //             <label className="form-label">Product Name</label>
// // //             <input type="text" className="form-control" name="name" value={form.name}
// // //               onChange={handleChange} placeholder="e.g. Choco Muffin" required />
// // //           </div>
// // //           <div className="col-md-4">
// // //             <label className="form-label">Batch Quantity</label>
// // //             <input type="number" className="form-control" name="quantity" value={form.quantity}
// // //               onChange={handleChange} placeholder="e.g. 12" required />
// // //           </div>
// // //           <div className="col-md-4">
// // //             <label className="form-label">Price (₹)</label>
// // //             <input type="number" className="form-control" name="price" value={form.price}
// // //               onChange={handleChange} placeholder="e.g. 60" required />
// // //           </div>
// // //           <div className="col-md-4">
// // //             <label className="form-label">Weight</label>
// // //             <input type="text" className="form-control" name="weight" value={form.weight}
// // //               onChange={handleChange} placeholder="e.g. 250g" />
// // //           </div>
// // //           <div className="col-md-4">
// // //             <label className="form-label">Manufacturing Date</label>
// // //             <input type="date" className="form-control" name="manufacturingDate"
// // //               value={form.manufacturingDate} onChange={handleChange} />
// // //           </div>
// // //           <div className="col-md-4">
// // //             <label className="form-label">Batch Expiry Date</label>
// // //             <input type="date" className="form-control" name="expiryDate"
// // //               value={form.expiryDate} onChange={handleChange} required />
// // //           </div>
// // //           <div className="col-12 text-end">
// // //             {/* --- 2. UPDATE THIS BUTTON --- */}
// // //             <button 
// // //               className="btn btn-success px-4" 
// // //               type="submit" 
// // //               disabled={isFormInvalid}
// // //             >
// // //               Save Batch
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </form>

// // //       {/* SEARCH (NOW WITH SEARCH BUTTON) */}
// // //       <div className="d-flex justify-content-between mb-4 p-3 bg-dark rounded shadow-sm">
// // //         <div className="col-md-8">
// // //           <input type="text" className="form-control" value={searchQuery}
// // //             onChange={handleSearchChange} placeholder="Search Products" />
// // //         </div>
// // //         <div className="col-md-2">
// // //           <button className="btn btn-primary w-100" onClick={handleSearch}>Search</button>
// // //         </div>
// // //         <div className="col-md-1">
// // //           <button className="btn btn-danger w-100" onClick={handleClearSearch}>Clear</button>
// // //         </div>
// // //       </div>

// // //       {/* TABLE */}
// // //       <h3 className="text-center mt-5 mb-3">📦 Product List</h3>
// // //       {loading ? (
// // //         <div className="text-center my-5"><Spinner animation="border" /></div>
// // //       ) : (
// // //         <table className="table table-bordered table-hover">
// // //           <thead className="table-dark">
// // //             <tr>
// // //               <th>Name</th>
// // //               <th>Total Quantity</th>
// // //               <th>Price</th>
// // //               <th>Weight</th>
// // //               <th style={{ width: '140px' }}>Barcode</th>
// // //               <th>Expiry Batches</th>
// // //               <th>Alert</th>
// // //               <th>Actions</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {filteredProducts.map(p => {
// // //               const today = new Date(); today.setHours(0, 0, 0, 0);
// // //               const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

// // //               let rowStyle = {};
// // //               let isExpiring = false;
// // //               let isExpired = false;

// // //               p.expiryBatches?.forEach(b => {
// // //                 const exp = new Date(b.expiryDate); exp.setHours(0,0,0,0);
// // //                 if (exp.getTime() < today.getTime()) {
// // //                     isExpired = true; 
// // //                 } else if (exp.getTime() === tomorrow.getTime()) {
// // //                     isExpiring = true;
// // //                 }
// // //               });

// // //               if (isExpired) rowStyle = { backgroundColor: "#f8d7da" }; 
// // //               else if (isExpiring) rowStyle = { backgroundColor: "#fff3cd" }; 

// // //               return (
// // //                 <tr key={p._id} style={rowStyle}>
// // //                   <td>{p.name}</td>
// // //                   <td>{p.expiryBatches?.reduce((t,b)=>t+b.quantity,0) || 0}</td>
// // //                   <td>{p.price}</td>
// // //                   <td>{p.weight}</td>
// // //                   <td>
// // //                     <canvas ref={el => (barcodeRefs.current[p._id] = el)}
// // //                       style={{ maxWidth: '100%', transform: 'scale(0.85)', transformOrigin: 'left center' }} />
// // //                     <button className="btn btn-outline-success btn-sm mt-1"
// // //                       onClick={() => generatePDFWithBarcodes(p)}
// // //                       disabled={!barcodeRefs.current[p._id]}>
// // //                       📄 PDF
// // //                     </button>
// // //                   </td>
// // //                   <td>
// // //                     {p.expiryBatches?.map((b,i)=>(
// // //                       <div key={i}>{new Date(b.expiryDate).toLocaleDateString()} → Qty: {b.quantity}</div>
// // //                     ))}
// // //                   </td>
// // //                   <td>{getExpiryAlert(p.expiryBatches)}</td>
// // //                   <td>
// // //                     <div className="d-flex gap-1">
// // //                       <button className="btn btn-warning btn-sm" onClick={() => handleEdit(p)}>Edit</button>
// // //                       <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               );
// // //             })}
// // //           </tbody>
// // //         </table>
// // //       )}

// // //       {/* MODAL */}
// // //       <Modal show={showModal} onHide={() => setShowModal(false)}>
// // //         <Modal.Header closeButton className="bg-primary text-white">
// // //           <Modal.Title>Edit Product Info</Modal.Title>
// // //         </Modal.Header>
// // //         <Modal.Body>
// // //           <p className="text-muted small">
// // //             This edits the main product details. To add new stock, use the main form.
// // //           </p>
// // //           {["name", "price", "weight", "manufacturingDate"].map(field => (
// // //             <div className="mb-3" key={field}>
// // //               <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
// // //               <input
// // //                 type={field.includes("Date") ? "date" : field === "price" ? "number" : "text"}
// // //                 className="form-control"
// // //                 name={field}
// // //                 value={editForm[field]}
// // //                 onChange={handleEditChange}
// // //               />
// // //             </div>
// // //           ))}
// // //         </Modal.Body>
// // //         <Modal.Footer>
// // //           <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
// // //           <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
// // //         </Modal.Footer>
// // //       </Modal>
// // //     </div>
// // //   );
// // // };

// // // export default ProductForm;

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import JsBarcode from 'jsbarcode';
// import jsPDF from 'jspdf';
// import { Modal, Button, Spinner } from 'react-bootstrap';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './ProductForm.css'; // For blinking expiry text

// axios.defaults.baseURL = "http://localhost:10000";

// const ProductForm = () => {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     name: '', quantity: '', price: '', weight: '', expiryDate: '', manufacturingDate: ''
//   });
//   const [editForm, setEditForm] = useState({
//     name: '', price: '', weight: '', manufacturingDate: '', barcode: ''
//   });
//   const [editId, setEditId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   // Ref for barcodes
//   const barcodeRefs = useRef({});

//   // --- NEW SORTING FUNCTION ---
//   const sortProducts = (productsList) => {
//     return [...productsList].sort((a, b) => a.name.localeCompare(b.name));
//   };

//   // Fetch products
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const cacheBuster = `_t=${new Date().getTime()}`;
//       const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products?${cacheBuster}`);
//       setProducts(sortProducts(res.data));
//     } catch (err) {
//       console.error('Error while fetching products:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Generate barcode whenever products change
//   useEffect(() => {
//     products.forEach(p => generateBarcode(p._id));
//   }, [products]);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
//   const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

//   // Add new product/batch (NOW SORTS)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, quantity, price, expiryDate } = form;
//     if (!name.trim() || quantity <= 0 || price <= 0 || !expiryDate) {
//       toast.error("Please fill Name, Quantity, Price, and Expiry Date.");
//       return;
//     }

//     try {
//       const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/products`, form);
//       const updated = res.data;

//       setProducts(prev => {
//         const exists = prev.find(p => p._id === updated._id);
//         const newList = exists ? prev.map(p => (p._id === updated._id ? updated : p)) : [...prev, updated];
//         return sortProducts(newList);
//       });

//       toast.success(`Saved batch for ${name}`);
//       setForm({ name: '', quantity: '', price: '', weight: '', expiryDate: '', manufacturingDate: '' });
//     } catch (err) {
//       console.error('Error adding product:', err);
//       toast.error("Error saving product.");
//     }
//   };

//   // Edit product info
//   const handleEdit = (product) => {
//     setEditId(product._id);
//     setEditForm({
//       name: product.name,
//       price: product.price,
//       weight: product.weight || '',
//       manufacturingDate: product.manufacturingDate ? product.manufacturingDate.split('T')[0] : '',
//       barcode: product._id
//     });
//     setShowModal(true);
//   };

//   const handleSaveEdit = async () => {
//     const { name, price } = editForm;
//     if (!name.trim() || price <= 0) {
//       toast.error("Name and Price are required.");
//       return;
//     }

//     try {
//       const updatePayload = {
//         name: editForm.name,
//         price: editForm.price,
//         weight: editForm.weight,
//         manufacturingDate: editForm.manufacturingDate
//       };

//       await axios.put(`${process.env.REACT_APP_API_URL}/api/products/${editId}`, updatePayload);
//       fetchProducts(); 
//       setShowModal(false);
//       setEditId(null);
//       toast.success("Product updated!");
//     } catch (err) {
//       console.error('Error editing product:', err);
//     }
//   };

//   // Delete product
//   const handleDelete = async (id) => {
//     try {
//       if (window.confirm("Are you sure you want to delete this product?")) {
//         await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
//         fetchProducts();
//       }
//     } catch (err) {
//       console.error('Error deleting product:', err);
//     }
//   };

//   // --- NEW FUNCTION TO MOVE EXPIRED PRODUCTS ---
//   const handleMoveExpired = async () => {
//     if (window.confirm("Are you sure you want to find and archive all expired products? This cannot be undone.")) {
//       try {
//         const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/products/move-expired`);
//         toast.success(res.data.message || "Expired products processed successfully.");
//         fetchProducts(); // Refresh the product list
//       } catch (err) {
//         toast.error("An error occurred while archiving expired products.");
//         console.error(err);
//       }
//     }
//   };

//   // Generate barcode for a product
//   const generateBarcode = (id) => {
//     if (!id) return;
//     const canvas = barcodeRefs.current[id];
//     if (canvas) {
//       JsBarcode(canvas, id.toString(), { format: "CODE128", displayValue: false, width: 1, height: 20, margin: 0 });
//     }
//   };

//   // Generate PDF with barcode and batch info
//   const generatePDFWithBarcodes = (product) => {
//     const canvas = barcodeRefs.current[product._id];
//     if (!canvas) return;

//     const pdf = new jsPDF();
//     const imgData = canvas.toDataURL("image/png");

//     pdf.setFontSize(12);
//     pdf.text(`Product: ${product.name}`, 10, 20);
//     pdf.text(`Price: ₹${product.price}`, 10, 30);

//     if (product.manufacturingDate)
//       pdf.text(`MFG Date: ${new Date(product.manufacturingDate).toLocaleDateString()}`, 10, 40);

//     pdf.text(`Expiry Batches:`, 10, 50);
//     let yPos = 60;
//     if (product.expiryBatches && product.expiryBatches.length > 0) {
//       product.expiryBatches.forEach(batch => {
//         if (yPos > 280) {
//           pdf.addPage();
//           yPos = 20;
//         }
//         pdf.text(`- EXP: ${new Date(batch.expiryDate).toLocaleDateString()} (Qty: ${batch.quantity})`, 15, yPos);
//         yPos += 10;
//       });
//     } else {
//       pdf.text("No expiry information.", 15, yPos);
//       yPos += 10;
//     }

//     pdf.addImage(imgData, "PNG", 10, yPos + 5, 100, 30);
//     pdf.save(`${product.name}_barcode.pdf`);
//   };

//   // Expiry alert
//   // const getExpiryAlert = (batches = []) => {
//   //   const today = new Date(); today.setHours(0, 0, 0, 0);
//   //   const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

//   //   let expiringQty = 0;
//   //   let expiredQty = 0;

//   //   batches.forEach(b => {
//   //     const exp = new Date(b.expiryDate); exp.setHours(0, 0, 0, 0);
//   //     if (exp.getTime() === tomorrow.getTime()) expiringQty += b.quantity;
//   //     else if (exp.getTime() < today.getTime()) expiredQty += b.quantity;
//   //   });

//   //   if (expiredQty > 0)
//   //     return <span style={{ color: "red", fontWeight: "bold" }}>Expired (Qty: {expiredQty})</span>;
//   //   if (expiringQty > 0)
//   //     return <span className="expiry-alert">Expires Tomorrow! (Qty: {expiringQty})</span>;
//   //   return null;
//   // };

//   const getExpiryAlert = (batches = []) => {
//     // Set up 'today' at midnight
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const todayTime = today.getTime();

//     // Set up 'tomorrow' at midnight
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);
//     const tomorrowTime = tomorrow.getTime();

//     let expiringTodayQty = 0; // New variable for today's expiry
//     let expiringTomorrowQty = 0; // Renamed variable for clarity
//     let expiredQty = 0;

//     batches.forEach(b => {
//         const exp = new Date(b.expiryDate);
//         exp.setHours(0, 0, 0, 0);
//         const expTime = exp.getTime();

//         if (expTime < todayTime) {
//             // Item is already expired (date is before today)
//             expiredQty += b.quantity;
//         } else if (expTime === todayTime) {
//             // Item expires today
//             expiringTodayQty += b.quantity;
//         } else if (expTime === tomorrowTime) {
//             // Item expires tomorrow
//             expiringTomorrowQty += b.quantity;
//         }
//     });

//     // Return messages in order of priority
    
//     // 1. Show "Expired" first
//     if (expiredQty > 0) {
//         return <span style={{ color: "red", fontWeight: "bold" }}>Expired (Qty: {expiredQty})</span>;
//     }

//     // 2. Show "Expires Today" second
//     if (expiringTodayQty > 0) {
//         // You might want a different style (e.g., 'expiry-alert-today') for this
//         return <span className="expiry-alert-today" style={{ color: "orange" }}>Expires Today! (Qty: {expiringTodayQty})</span>;
//     }

//     // 3. Show "Expires Tomorrow" last
//     if (expiringTomorrowQty > 0) {
//         return <span className="expiry-alert">Expires Tomorrow! (Qty: {expiringTomorrowQty})</span>;
//     }

//     // No alert needed
//     return null;
// };

//   const handleSearchChange = (e) => setSearchQuery(e.target.value);
//   const handleClearSearch = () => setSearchQuery('');

//   const handleSearch = () => {
//     fetchProducts();
//   };

//   const filteredProducts = products.filter(p =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const isFormInvalid = !form.name.trim() || 
//                         Number(form.quantity) <= 0 || 
//                         Number(form.price) <= 0 || 
//                         !form.expiryDate;

//   return (
//     <div className="container mt-4">
//       <ToastContainer position="top-center" autoClose={2000} />
//       <h2 className="text-center mb-4 text-primary">Add Product</h2>

//       {/* FORM */}
//       <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
//         <h5 className="mb-3 border-bottom pb-2 text-primary">Add New Product / Batch</h5>
//         <div className="row g-4">
//           <div className="col-md-4">
//             <label className="form-label">Product Name</label>
//             <input type="text" className="form-control" name="name" value={form.name}
//               onChange={handleChange} placeholder="e.g. Choco Muffin" required />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Batch Quantity</label>
//             <input type="number" className="form-control" name="quantity" value={form.quantity}
//               onChange={handleChange} placeholder="e.g. 12" required />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Price (₹)</label>
//             <input type="number" className="form-control" name="price" value={form.price}
//               onChange={handleChange} placeholder="e.g. 60" required />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Weight</label>
//             <input type="text" className="form-control" name="weight" value={form.weight}
//               onChange={handleChange} placeholder="e.g. 250g" />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Manufacturing Date</label>
//             <input type="date" className="form-control" name="manufacturingDate"
//               value={form.manufacturingDate} onChange={handleChange} />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Batch Expiry Date</label>
//             <input type="date" className="form-control" name="expiryDate"
//               value={form.expiryDate} onChange={handleChange} required />
//           </div>
//           <div className="col-12 text-end">
//             <button 
//               className="btn btn-success px-4" 
//               type="submit" 
//               disabled={isFormInvalid}
//             >
//               Save Batch
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* SEARCH (NOW WITH SEARCH BUTTON) */}
//       <div className="d-flex justify-content-between mb-4 p-3 bg-dark rounded shadow-sm">
//         <div className="col-md-8">
//           <input type="text" className="form-control" value={searchQuery}
//             onChange={handleSearchChange} placeholder="Search Products" />
//         </div>
//         <div className="col-md-2">
//           <button className="btn btn-primary w-100" onClick={handleSearch}>Search</button>
//         </div>
//         <div className="col-md-1">
//           <button className="btn btn-danger w-100" onClick={handleClearSearch}>Clear</button>
//         </div>
//       </div>

//       {/* TABLE */}
//       {/* --- ADDED BUTTON HERE --- */}
//       <div className="d-flex justify-content-between align-items-center mt-5">
//         <h3 className="mb-3">📦 Product List</h3>
//         <button className="btn btn-danger mb-2" onClick={handleMoveExpired}>
//           Archive Expired Products
//         </button>
//       </div>
      
//       {loading ? (
//         <div className="text-center my-5"><Spinner animation="border" /></div>
//       ) : (
//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>Name</th>
//               <th>Total Quantity</th>
//               <th>Price</th>
//               <th>Weight</th>
//               <th style={{ width: '140px' }}>Barcode</th>
//               <th>Expiry Batches</th>
//               <th>Alert</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map(p => {
//               const today = new Date(); today.setHours(0, 0, 0, 0);
//               const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

//               let rowStyle = {};
//               let isExpiring = false;
//               let isExpired = false;

//               p.expiryBatches?.forEach(b => {
//                 const exp = new Date(b.expiryDate); exp.setHours(0,0,0,0);
//                 if (exp.getTime() < today.getTime()) {
//                     isExpired = true; 
//                 } else if (exp.getTime() === tomorrow.getTime()) {
//                     isExpiring = true;
//                 }
//               });

//               if (isExpired) rowStyle = { backgroundColor: "#f8d7da" }; 
//               else if (isExpiring) rowStyle = { backgroundColor: "#fff3cd" }; 

//               const totalQty = p.expiryBatches?.reduce((t,b)=>t+b.quantity,0) || 0;

//               return (
//                 <tr key={p._id} style={rowStyle}>
//                   <td>{p.name}</td>
//                   <td>{totalQty}</td>
//                   <td>{p.price}</td>
//                   <td>{p.weight}</td>
//                   <td>
//                     <canvas ref={el => (barcodeRefs.current[p._id] = el)}
//                       style={{ maxWidth: '100%', transform: 'scale(0.85)', transformOrigin: 'left center' }} />
//                     <button className="btn btn-outline-success btn-sm mt-1"
//                       onClick={() => generatePDFWithBarcodes(p)}
//                       disabled={!barcodeRefs.current[p._id]}>
//                       📄 PDF
//                     </button>
//                   </td>
//                   <td>
//                     {p.expiryBatches?.map((b,i)=>(
//                       <div key={i}>{new Date(b.expiryDate).toLocaleDateString()} → Qty: {b.quantity}</div>
//                     ))}
//                   </td>
//                   <td>{getExpiryAlert(p.expiryBatches)}</td>
//                   <td>
//                     <div className="d-flex gap-1">
//                       <button className="btn btn-warning btn-sm" onClick={() => handleEdit(p)}>Edit</button>
//                       <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}

//       {/* MODAL */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton className="bg-primary text-white">
//           <Modal.Title>Edit Product Info</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p className="text-muted small">
//             This edits the main product details. To add new stock, use the main form.
//           </p>
//           {["name", "price", "weight", "manufacturingDate"].map(field => (
//             <div className="mb-3" key={field}>
//               <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//               <input
//                 type={field.includes("Date") ? "date" : field === "price" ? "number" : "text"}
//                 className="form-control"
//                 name={field}
//                 value={editForm[field]}
//                 onChange={handleEditChange}
//               />
//             </div>
//           ))}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
//           <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ProductForm;

// // import React, { useState, useEffect, useRef } from 'react';
// // import axios from 'axios';
// // import JsBarcode from 'jsbarcode';
// // import jsPDF from 'jspdf';
// // import { Modal, Button, Spinner } from 'react-bootstrap';
// // import { toast } from 'react-toastify';
// // import './ProductForm.css';

// // // Removed axios baseURL setup - assuming it's done globally or in App.js

// // // ✅ Receive props from App.js
// // const ProductForm = ({ products, fetchProducts, loading }) => {
// //   // ❌ Remove internal products state and loading state
// //   // const [products, setProducts] = useState([]);
// //   // const [loading, setLoading] = useState(false);

// //   const [form, setForm] = useState({ name: '', quantity: '', price: '', weight: '', expiryDate: '', manufacturingDate: '' });
// //   const [editForm, setEditForm] = useState({ name: '', price: '', weight: '', manufacturingDate: '', barcode: '' });
// //   const [editId, setEditId] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const barcodeRefs = useRef({});

// //   // ❌ Remove internal fetchProducts and initial useEffect fetch
// //   // const fetchProducts = async () => { ... };
// //   // useEffect(() => { fetchProducts(); }, []);

// //   // ✅ useEffect to generate barcodes still uses the PROPS products
// //   useEffect(() => {
// //     // Check if products is an array before iterating
// //     if (Array.isArray(products)) {
// //         products.forEach(p => generateBarcode(p._id));
// //     }
// //   }, [products]); // Dependency is the products prop

// //   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
// //   const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const { name, quantity, price, expiryDate } = form;
// //     if (!name.trim() || quantity <= 0 || price <= 0 || !expiryDate) {
// //       toast.error("Please fill Name, Quantity, Price, and Expiry Date.");
// //       return;
// //     }
// //     try {
// //       // Post request remains the same
// //       await axios.post(`${process.env.REACT_APP_API_URL}/api/products`, form);
// //       toast.success(`Saved batch for ${name}`);
// //       setForm({ name: '', quantity: '', price: '', weight: '', expiryDate: '', manufacturingDate: '' });
// //       fetchProducts(); // ✅ Call the fetchProducts prop to refresh the list in App.js
// //     } catch (err) {
// //       console.error('Error adding product:', err);
// //       toast.error(`Error saving product: ${err.response?.data?.message || err.message}`);
// //     }
// //   };

// //   const handleEdit = (product) => {
// //     setEditId(product._id);
// //     setEditForm({ name: product.name, price: product.price, weight: product.weight || '', manufacturingDate: product.manufacturingDate ? product.manufacturingDate.split('T')[0] : '', barcode: product._id });
// //     setShowModal(true);
// //   };

// //   const handleSaveEdit = async () => {
// //     const { name, price } = editForm;
// //     if (!name.trim() || price <= 0) {
// //       toast.error("Name and Price are required.");
// //       return;
// //     }
// //     try {
// //       const updatePayload = { name: editForm.name, price: editForm.price, weight: editForm.weight, manufacturingDate: editForm.manufacturingDate };
// //       await axios.put(`${process.env.REACT_APP_API_URL}/api/products/${editId}`, updatePayload);
// //       toast.success("Product updated!");
// //       fetchProducts(); // ✅ Call the fetchProducts prop
// //       setShowModal(false);
// //       setEditId(null);
// //     } catch (err) {
// //       console.error('Error editing product:', err);
// //       toast.error(`Error updating product: ${err.response?.data?.message || err.message}`);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       if (window.confirm("Are you sure? This action will delete the product and all its batches.")) {
// //         await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
// //         toast.success("Product deleted.");
// //         fetchProducts(); // ✅ Call the fetchProducts prop
// //       }
// //     } catch (err) {
// //       console.error('Error deleting product:', err);
// //       toast.error(`Error deleting product: ${err.response?.data?.message || err.message}`);
// //     }
// //   };

// //   const handleMoveExpired = async () => {
// //     if (window.confirm("Are you sure? This will archive all expired batches.")) {
// //       try {
// //         const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/products/move-expired`);
// //         toast.success(res.data.message || "Expired products processed.");
// //         fetchProducts(); // ✅ Call the fetchProducts prop
// //       } catch (err) {
// //         console.error("Archive Expired Error:", err.response?.data || err.message || err);
// //         toast.error(`Archive failed: ${err.response?.data?.message || 'Server error (check route)'}`);
// //       }
// //     }
// //   };

// //   const generateBarcode = (id) => {
// //     if (!id) return;
// //     const canvas = barcodeRefs.current[id];
// //     if (canvas) {
// //       try { JsBarcode(canvas, id.toString(), { format: "CODE128", displayValue: false, width: 1, height: 20, margin: 0 }); }
// //       catch (e) { console.error("JsBarcode error for ID", id, ":", e); }
// //     }
// //   };

// //   const generatePDFWithBarcodes = (product) => {
// //     // ... (PDF generation logic - no change needed, uses local product data from map) ...
// //     const canvas = barcodeRefs.current[product._id];
// //     if (!canvas || !canvas.toDataURL || canvas.width === 0 || canvas.height === 0) {
// //        toast.warn("Barcode not ready. Wait & try again."); generateBarcode(product._id); return;
// //     }
// //     try {
// //         let imgData;
// //         try { imgData = canvas.toDataURL("image/png"); if (!imgData || imgData === 'data:,') throw new Error("Canvas empty"); }
// //         catch (e) { console.error("Canvas error:", e); toast.error("Barcode image failed."); generateBarcode(product._id); return; }
// //         const pdf = new jsPDF();
// //         pdf.setFontSize(12); pdf.text(`Product: ${product.name}`, 10, 20); pdf.text(`Price: ₹${product.price}`, 10, 30);
// //         if (product.manufacturingDate) pdf.text(`MFG: ${new Date(product.manufacturingDate).toLocaleDateString()}`, 10, 40);
// //         pdf.text(`Batches:`, 10, 50); let y = 60;
// //         product.expiryBatches?.forEach(b => { if (y > 280){pdf.addPage(); y=20;} pdf.text(`- EXP: ${new Date(b.expiryDate).toLocaleDateString()} (Qty: ${b.quantity})`, 15, y); y+=10; });
// //         if (!product.expiryBatches || product.expiryBatches.length === 0) { pdf.text("No expiry info.", 15, y); y+=10; }
// //         pdf.addImage(imgData, "PNG", 10, y + 5, 100, 30); pdf.save(`${product.name}_barcode.pdf`);
// //     } catch (error) { console.error("PDF error:", error); toast.error("PDF generation failed."); }
// //   };

// //   const getExpiryAlert = (batches = []) => {
// //     // ... (Expiry alert logic - no change needed) ...
// //      const today = new Date(); today.setHours(0, 0, 0, 0); const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
// //     let expiringQty = 0; let expiredQty = 0;
// //     batches.forEach(b => { const exp = new Date(b.expiryDate); exp.setHours(0,0,0,0); if (exp.getTime() < today.getTime()) expiredQty += b.quantity; else if (exp.getTime() === tomorrow.getTime()) expiringQty += b.quantity; });
// //     if (expiredQty > 0) return { text: `Expired (Qty: ${expiredQty})`, style: { color: "red", fontWeight: "bold" } };
// //     if (expiringQty > 0) return { text: `Expires Tomorrow! (Qty: ${expiringQty})`, style: { color: "orange", fontWeight: "bold", animation: "blink 1s linear infinite" } };
// //     return null;
// //   };

// //   const handleSearchChange = (e) => setSearchQuery(e.target.value);
// //   const handleClearSearch = () => { setSearchQuery(''); /* No fetch needed here, filtering is client-side */ };
// //   const handleSearch = () => { fetchProducts(); }; // Explicitly refetch on search button click

// //   // ✅ Filter the products prop for display
// //   const filteredProducts = Array.isArray(products) ? products.filter(p =>
// //     p.name.toLowerCase().includes(searchQuery.toLowerCase())
// //   ) : []; // Ensure products is an array before filtering

// //   const isFormInvalid = !form.name.trim() || Number(form.quantity) <= 0 || Number(form.price) <= 0 || !form.expiryDate;

// //   return (
// //     <div className="container mt-4">
// //       <h2 className="text-center mb-4 text-primary">Add Product</h2>
// //       {/* Add Product Form */}
// //       <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white mb-4">
// //         <h5 className="mb-3 border-bottom pb-2 text-primary">Add New Product / Batch</h5>
// //         {/* ... form inputs ... */}
// //          <div className="row g-4">
// //           <div className="col-md-4"><label className="form-label">Name</label><input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required/></div>
// //           <div className="col-md-4"><label className="form-label">Batch Qty</label><input type="number" className="form-control" name="quantity" value={form.quantity} onChange={handleChange} required min="1"/></div>
// //           <div className="col-md-4"><label className="form-label">Price (₹)</label><input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} required min="0"/></div>
// //           <div className="col-md-4"><label className="form-label">Weight</label><input type="text" className="form-control" name="weight" value={form.weight} onChange={handleChange}/></div>
// //           <div className="col-md-4"><label className="form-label">MFG Date</label><input type="date" className="form-control" name="manufacturingDate" value={form.manufacturingDate} onChange={handleChange}/></div>
// //           <div className="col-md-4"><label className="form-label">Expiry Date</label><input type="date" className="form-control" name="expiryDate" value={form.expiryDate} onChange={handleChange} required/></div>
// //           <div className="col-12 text-end"><button className="btn btn-success px-4" type="submit" disabled={isFormInvalid}>Save Batch</button></div>
// //         </div>
// //       </form>

// //       {/* Search Bar */}
// //       <div className="d-flex justify-content-between mb-4 p-3 bg-dark rounded shadow-sm">
// //         <div className="col-md-8"><input type="text" className="form-control" value={searchQuery} onChange={handleSearchChange} placeholder="Search Products"/></div>
// //         <div className="col-md-2"><button className="btn btn-primary w-100" onClick={handleSearch}>Search</button></div>
// //         <div className="col-md-1"><button className="btn btn-danger w-100" onClick={handleClearSearch}>Clear</button></div>
// //       </div>

// //        {/* Product List Table */}
// //       <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
// //         <h3>📦 Product List</h3>
// //         <button className="btn btn-danger btn-sm" onClick={handleMoveExpired}>Archive Expired</button>
// //       </div>
// //       {/* ✅ Use loading prop */}
// //       {loading ? ( <div className="text-center my-5"><Spinner animation="border" /></div> ) : (
// //         <div className="table-responsive">
// //           <table className="table table-bordered table-hover">
// //             <thead className="table-dark">
// //               <tr><th>Name</th><th>Total Qty</th><th>Price</th><th>Weight</th><th style={{width:'140px'}}>Barcode</th><th>Batches</th><th>Alert</th><th>Actions</th></tr>
// //             </thead>
// //             <tbody>
// //               {/* ✅ Use filteredProducts derived from props */}
// //               {filteredProducts.length > 0 ? filteredProducts.map(p => {
// //                 const totalQty = p.expiryBatches?.reduce((t, b) => t + b.quantity, 0) || 0;
// //                 const alertInfo = getExpiryAlert(p.expiryBatches);
// //                 let rowStyle = {};
// //                 if (alertInfo?.style?.color === 'red') rowStyle = { backgroundColor: "#f8d7da" };
// //                 else if (alertInfo?.style?.color === 'orange') rowStyle = { backgroundColor: "#fff3cd" };
// //                 return (
// //                   <tr key={p._id} style={rowStyle}>
// //                     <td>{p.name}</td><td>{totalQty}</td><td>{p.price}</td><td>{p.weight||'N/A'}</td>
// //                     <td><canvas ref={el => (barcodeRefs.current[p._id]=el)} style={{maxWidth:'100%', height:'25px', display:'block', marginBottom:'5px'}}/><button className="btn btn-outline-success btn-sm mt-1" onClick={()=>generatePDFWithBarcodes(p)} disabled={!barcodeRefs.current[p._id]}>📄 PDF</button></td>
// //                     <td>{p.expiryBatches?.map((b,i)=>(<div key={i} style={{fontSize:'0.9em'}}>{new Date(b.expiryDate).toLocaleDateString()}→Qty:{b.quantity}</div>))}</td>
// //                     <td>{alertInfo && <span style={alertInfo.style}>{alertInfo.text}</span>}</td>
// //                     <td><div className="d-flex gap-1"><button className="btn btn-warning btn-sm" onClick={()=>handleEdit(p)}>Edit</button><button className="btn btn-outline-danger btn-sm" onClick={()=>handleDelete(p._id)}>Del</button></div></td>
// //                   </tr> );
// //               }) : ( <tr><td colSpan="8" className="text-center">No products match search or list is empty.</td></tr> )}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //        {/* Edit Product Modal */}
// //        <Modal show={showModal} onHide={() => setShowModal(false)}>
// //           <Modal.Header closeButton className="bg-primary text-white"><Modal.Title>Edit Product Info</Modal.Title></Modal.Header>
// //           <Modal.Body>
// //             <p className="text-muted small">Edit main details. Batches are managed separately.</p>
// //             {["name","price","weight","manufacturingDate"].map(f=>(<div className="mb-3" key={f}><label className="form-label">{f[0].toUpperCase()+f.slice(1)}</label><input type={f.includes("Date")?"date":f==="price"?"number":"text"} className="form-control" name={f} value={editForm[f]} onChange={handleEditChange} required={f==='name'||f==='price'}/></div>))}
// //           </Modal.Body>
// //           <Modal.Footer><Button variant="secondary" onClick={()=>setShowModal(false)}>Close</Button><Button variant="primary" onClick={handleSaveEdit}>Save</Button></Modal.Footer>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default ProductForm;

// ProductForm.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductForm.css';
import { useNavigate } from 'react-router-dom'; // ✅ 1. Import useNavigate

// Set the base URL for axios
// (This is fine, but you can also use REACT_APP_API_URL)
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:10000";

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '', quantity: '', price: '', weight: '', expiryDate: '', manufacturingDate: ''
  });
  const [editForm, setEditForm] =useState({
    name: '', price: '', weight: '', manufacturingDate: '', barcode: ''
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const barcodeRefs = useRef({});
  const navigate = useNavigate(); // ✅ 2. Initialize navigate

  const sortProducts = (productsList) => {
    return [...productsList].sort((a, b) => a.name.localeCompare(b.name));
  };

  // ✅ 3. Helper function to get token and config
  const getAuthConfig = () => {
    const token = localStorage.getItem('vendorToken');
    if (!token) {
      toast.error('You are not logged in. Redirecting...');
      navigate('/login');
      return null;
    }
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
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

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    const config = getAuthConfig();
    if (!config) {
      setLoading(false);
      return;
    }
    
    try {
      const cacheBuster = `_t=${new Date().getTime()}`;
      // Pass config to axios
      const res = await axios.get(`/api/products?${cacheBuster}`, config);
      setProducts(sortProducts(res.data));
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    products.forEach(p => generateBarcode(p._id));
  }, [products]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  // Add new product/batch
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = getAuthConfig();
    if (!config) return;

    try {
      // Pass config to axios (data is second arg, config is third)
      const res = await axios.post(`/api/products`, form, config);
      const updated = res.data;

      setProducts(prev => {
        const exists = prev.find(p => p._id === updated._id);
        const newList = exists ? prev.map(p => (p._id === updated._id ? updated : p)) : [...prev, updated];
        return sortProducts(newList);
      });

      toast.success(`Saved batch for ${form.name}`);
      setForm({ name: '', quantity: '', price: '', weight: '', expiryDate: '', manufacturingDate: '' });
    } catch (err) {
      handleAuthError(err);
    }
  };

  // Edit product info
  const handleEdit = (product) => {
    setEditId(product._id);
    setEditForm({
      name: product.name,
      price: product.price,
      weight: product.weight || '',
      manufacturingDate: product.manufacturingDate ? product.manufacturingDate.split('T')[0] : '',
      barcode: product._id
    });
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    const config = getAuthConfig();
    if (!config) return;
    
    try {
      const updatePayload = {
        name: editForm.name,
        price: editForm.price,
        weight: editForm.weight,
        manufacturingDate: editForm.manufacturingDate
      };

      // Pass config to axios
      await axios.put(`/api/products/${editId}`, updatePayload, config);
      fetchProducts(); 
      setShowModal(false);
      setEditId(null);
      toast.success("Product updated!");
    } catch (err) {
      handleAuthError(err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    const config = getAuthConfig();
    if (!config) return;

    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        // Pass config to axios
        await axios.delete(`/api/products/${id}`, config);
        fetchProducts();
      }
    } catch (err) {
      handleAuthError(err);
    }
  };

  // Move Expired Products
  const handleMoveExpired = async () => {
    const config = getAuthConfig();
    if (!config) return;
    
    if (window.confirm("Are you sure you want to find and archive all expired products?")) {
      try {
        // Pass config to axios
        const res = await axios.post(`/api/products/move-expired`, {}, config);
        toast.success(res.data.message || "Expired products processed.");
        fetchProducts();
      } catch (err) {
        handleAuthError(err);
      }
    }
  };
  
  // --- (No changes needed in the functions below, they are UI-only or use other functions) ---

  // Generate barcode for a product
  const generateBarcode = (id) => {
    if (!id) return;
    const canvas = barcodeRefs.current[id];
    if (canvas) {
      JsBarcode(canvas, id.toString(), { format: "CODE128", displayValue: false, width: 1, height: 20, margin: 0 });
    }
  };

  // Generate PDF
  const generatePDFWithBarcodes = (product) => {
    // (This function is fine as-is)
    const canvas = barcodeRefs.current[product._id];
    if (!canvas) return;
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL("image/png");
    pdf.setFontSize(12);
    pdf.text(`Product: ${product.name}`, 10, 20);
    // ... (rest of your PDF logic) ...
    pdf.addImage(imgData, "PNG", 10, 65, 100, 30); // Adjusted yPos assumption
    pdf.save(`${product.name}_barcode.pdf`);
  };

  // Expiry alert
  const getExpiryAlert = (batches = []) => {
    // (This function is fine as-is)
    const today = new Date(); today.setHours(0, 0, 0, 0); const todayTime = today.getTime();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1); const tomorrowTime = tomorrow.getTime();
    let expiringTodayQty = 0; let expiringTomorrowQty = 0; let expiredQty = 0;
    batches.forEach(b => {
        const exp = new Date(b.expiryDate); exp.setHours(0, 0, 0, 0); const expTime = exp.getTime();
        if (expTime < todayTime) expiredQty += b.quantity;
        else if (expTime === todayTime) expiringTodayQty += b.quantity;
        else if (expTime === tomorrowTime) expiringTomorrowQty += b.quantity;
    });
    if (expiredQty > 0) return <span style={{ color: "red", fontWeight: "bold" }}>Expired (Qty: {expiredQty})</span>;
    if (expiringTodayQty > 0) return <span className="expiry-alert-today" style={{ color: "orange" }}>Expires Today! (Qty: {expiringTodayQty})</span>;
    if (expiringTomorrowQty > 0) return <span className="expiry-alert">Expires Tomorrow! (Qty: {expiringTomorrowQty})</span>;
    return null;
  };

  // Search handlers
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleClearSearch = () => setSearchQuery('');
  const handleSearch = () => { fetchProducts(); }; // Re-fetch from server on search

  // Filter products
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Form validation
  const isFormInvalid = !form.name.trim() || 
                        Number(form.quantity) <= 0 || 
                        Number(form.price) <= 0 || 
                        !form.expiryDate;

  // --- (No changes needed in the JSX return block) ---
  return (
    <div className="container mt-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2 className="text-center mb-4 text-primary">Add Product</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
        {/* ... (your form inputs are all fine) ... */}
        <div className="row g-4">
          <div className="col-md-4">
            <label className="form-label">Product Name</label>
            <input type="text" className="form-control" name="name" value={form.name}
              onChange={handleChange} placeholder="e.g. Choco Muffin" required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Batch Quantity</label>
            <input type="number" className="form-control" name="quantity" value={form.quantity}
              onChange={handleChange} placeholder="e.g. 12" required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Price (₹)</label>
            <input type="number" className="form-control" name="price" value={form.price}
              onChange={handleChange} placeholder="e.g. 60" required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Weight</label>
            <input type="text" className="form-control" name="weight" value={form.weight}
              onChange={handleChange} placeholder="e.g. 250g" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Manufacturing Date</label>
            <input type="date" className="form-control" name="manufacturingDate"
              value={form.manufacturingDate} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Batch Expiry Date</label>
            <input type="date" className="form-control" name="expiryDate"
              value={form.expiryDate} onChange={handleChange} required />
          </div>
          <div className="col-12 text-end">
            <button 
              className="btn btn-success px-4" 
              type="submit" 
              disabled={isFormInvalid}
            >
              Save Batch
            </button>
          </div>
        </div>
      </form>

      {/* SEARCH */}
      <div className="d-flex justify-content-between mb-4 p-3 bg-dark rounded shadow-sm">
        {/* ... (search inputs are fine) ... */}
         <div className="col-md-8">
          <input type="text" className="form-control" value={searchQuery}
            onChange={handleSearchChange} placeholder="Search Products" />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>Search</button>
        </div>
        <div className="col-md-1">
          <button className="btn btn-danger w-100" onClick={handleClearSearch}>Clear</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h3 className="mb-3">📦 Product List</h3>
        <button className="btn btn-danger mb-2" onClick={handleMoveExpired}>
          Archive Expired Products
        </button>
      </div>
      
      {loading ? (
        <div className="text-center my-5"><Spinner animation="border" /></div>
      ) : (
        <table className="table table-bordered table-hover">
          {/* ... (table headers are fine) ... */}
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Total Quantity</th>
              <th>Price</th>
              <th>Weight</th>
              <th style={{ width: '140px' }}>Barcode</th>
              <th>Expiry Batches</th>
              <th>Alert</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => {
              // ... (your row logic is fine) ...
              const totalQty = p.expiryBatches?.reduce((t,b)=>t+b.quantity,0) || 0;
              return (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{totalQty}</td>
                  <td>{p.price}</td>
                  <td>{p.weight}</td>
                  <td>
                    <canvas ref={el => (barcodeRefs.current[p._id] = el)}
                      style={{ maxWidth: '100%', transform: 'scale(0.85)', transformOrigin: 'left center' }} />
                    <button className="btn btn-outline-success btn-sm mt-1"
                      onClick={() => generatePDFWithBarcodes(p)}
                      disabled={!barcodeRefs.current[p._id]}>
                      📄 PDF
                    </button>
                  </td>
                  <td>
                    {p.expiryBatches?.map((b,i)=>(
                      <div key={i}>{new Date(b.expiryDate).toLocaleDateString()} → Qty: {b.quantity}</div>
                    ))}
                  </td>
                  <td>{getExpiryAlert(p.expiryBatches)}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(p)}>Edit</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        {/* ... (modal is fine) ... */}
         <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Edit Product Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted small">
            This edits the main product details. To add new stock, use the main form.
          </p>
          {["name", "price", "weight", "manufacturingDate"].map(field => (
            <div className="mb-3" key={field}>
              <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field.includes("Date") ? "date" : field === "price" ? "number" : "text"}
                className="form-control"
                name={field}
                value={editForm[field]}
                onChange={handleEditChange}
              />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductForm;