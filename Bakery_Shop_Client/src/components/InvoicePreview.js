// import React, { forwardRef } from 'react';
// import qrCodeBase64 from '../components/assets/img.jpeg';

// const InvoicePreview = forwardRef(
//   (
//     {
//       customer = {},
//       saleItems = [],
//       products = [],
//       invoiceNo = '',
//       totalAmount = 0,
//       vendorData, // ✅ may be null
//     },
//     ref
//   ) => {
//     // ✅ Always use a safe object even if vendorData is null or undefined
//     const safeVendor = vendorData && typeof vendorData === 'object' ? vendorData : {};

//     // 🔹 Calculate total
//     const total = saleItems.reduce((sum, item) => {
//       const product = products.find((p) => p._id === item.product);
//       return sum + (product?.price || 0) * item.quantity;
//     }, 0);

//     const currentDate = new Date().toLocaleDateString();

//     return (
//       <div
//         ref={ref}
//         className="invoice-print border p-4 bg-white d-flex flex-column"
//         style={{
//           width: '100%',
//           fontFamily: 'Arial',
//           color: '#000',
//           minHeight: '850px',
//         }}
//       >
//         {/* ✅ Shop Header */}
//         <div className="text-center mb-4">
//           <h3 className="mt-2">{safeVendor.shopName || 'Shop Name'}</h3>
//           <p>
//             {safeVendor.shopAddress || 'Shop Address'} | Contact:{' '}
//             {safeVendor.phone || 'N/A'}
//           </p>
//           <hr />
//         </div>

//         {/* Customer & Invoice Info */}
//         <div className="d-flex justify-content-between mb-3">
//           <div>
//             <strong>Customer:</strong> {customer.name || '-'}
//             <br />
//             <strong>Contact:</strong> {customer.contact || '-'}
//           </div>
//           <div>
//             <strong>Date:</strong> {currentDate}
//             <br />
//             <strong>Invoice No:</strong> {invoiceNo || '-'}
//           </div>
//         </div>

//         {/* Product Table */}
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Qty</th>
//               <th>Price</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {saleItems.map((item) => {
//               const product = products.find((p) => p._id === item.product);
//               if (!product) return null;
//               return (
//                 <tr key={item.product}>
//                   <td>{product.name}</td>
//                   <td>{item.quantity}</td>
//                   <td>₹{product.price.toFixed(2)}</td>
//                   <td>₹{(product.price * item.quantity).toFixed(2)}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {/* Payment QR */}
//         <div className="text-center mt-4">
//           <p><strong>Scan to Pay:</strong></p>
//           <img
//             src={qrCodeBase64}
//             alt="QR Code for Payment"
//             style={{ height: '180px' }}
//           />
//           <p className="mt-2">
//             Google Pay / PhonePe / Paytm UPI ID: 9144506006@okbizaxis
//           </p>
//         </div>

//         <div style={{ flexGrow: 1 }} />

//         {/* Total */}
//         <div className="text-end mt-3">
//           <h5>
//             <strong>Total Amount: ₹{total.toFixed(2)}</strong>
//           </h5>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-3">
//           <small>
//             Thank you for shopping with {safeVendor.shopName || 'us'}!
//           </small>
//         </div>
//       </div>
//     );
//   }
// );

// export default InvoicePreview;

import React, { forwardRef } from "react";
import defaultQR from "../components/assets/img.jpeg"; // fallback QR

const InvoicePreview = forwardRef(
  (
    {
      customer = {},
      saleItems = [],
      products = [],
      invoiceNo = "",
      totalAmount = 0,
      vendorData, // ✅ may be null
    },
    ref
  ) => {
    const safeVendor =
      vendorData && typeof vendorData === "object" ? vendorData : {};

    // 🔹 Calculate total
    const total = saleItems.reduce((sum, item) => {
      const product = products.find((p) => p._id === item.product);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    const currentDate = new Date().toLocaleDateString();

    return (
      <div
        ref={ref}
        className="invoice-print border p-4 bg-white d-flex flex-column"
        style={{
          width: "100%",
          fontFamily: "Arial",
          color: "#000",
          minHeight: "850px",
        }}
      >
        {/* ✅ Shop Header */}
        <div className="text-center mb-4">
          <h3 className="mt-2">{safeVendor.shopName || "Shop Name"}</h3>
          <p>
            {safeVendor.shopAddress || "Shop Address"} |{" "}
            <strong>Contact:</strong>{" "}
            {safeVendor.contact || safeVendor.phone || "N/A"}
          </p>
          <hr />
        </div>

        {/* Customer & Invoice Info */}
        <div className="d-flex justify-content-between mb-3">
          <div>
            <strong>Customer:</strong> {customer.name || "-"}
            <br />
            <strong>Contact:</strong> {customer.contact || "-"}
          </div>
          <div>
            <strong>Date:</strong> {currentDate}
            <br />
            <strong>Invoice No:</strong> {invoiceNo || "-"}
          </div>
        </div>

        {/* Product Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {saleItems.map((item) => {
              const product = products.find((p) => p._id === item.product);
              if (!product) return null;
              return (
                <tr key={item.product}>
                  <td>{product.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{product.price.toFixed(2)}</td>
                  <td>₹{(product.price * item.quantity).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Payment QR Section */}
        <div className="text-center mt-4">
          <p>
            <strong>Scan to Pay:</strong>
          </p>
          <img
            src={safeVendor.upiQr }
            alt="QR Code for Payment"
            style={{ height: "180px" }}
          />
          <p className="mt-2">
            <strong>UPI ID:</strong>{" "}
            {safeVendor.upiId }
          </p>
        </div>

        <div style={{ flexGrow: 1 }} />

        {/* Total */}
        <div className="text-end mt-3">
          <h5>
            <strong>Total Amount: ₹{total.toFixed(2)}</strong>
          </h5>
        </div>

        {/* Footer */}
        <div className="text-center mt-3">
          <small>
            Thank you for shopping with {safeVendor.shopName || "us"}!
          </small>
        </div>
      </div>
    );
  }
);

export default InvoicePreview;

