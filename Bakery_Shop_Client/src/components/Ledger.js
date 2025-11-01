import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";

const Ledger = () => {
  const [ledgerData, setLedgerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);
  const componentRefs = useRef({});
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  // ✅ Helper for getting token config
  const getAuthConfig = () => {
    const token = localStorage.getItem("vendorToken");
    if (!token) {
      toast.error("You are not logged in. Redirecting...");
      navigate("/login");
      return null;
    }
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // ✅ Helper to handle 401 errors
  const handleAuthError = (err) => {
    if (err.response && err.response.status === 401) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("vendorToken");
      navigate("/login");
    } else {
      toast.error(err.response?.data?.message || "An unexpected error occurred.");
    }
    console.error("API Error:", err);
  };

  // ✅ Fetch customers
  const fetchCustomers = useCallback(async () => {
    const config = getAuthConfig();
    if (!config) return;
    try {
      const res = await axios.get(`${API}/api/customers`, config);
      setCustomers(res.data);
    } catch (err) {
      handleAuthError(err);
    }
  }, [API]);

  // ✅ Fetch products
  const fetchProducts = useCallback(async () => {
    const config = getAuthConfig();
    if (!config) return;
    try {
      const res = await axios.get(`${API}/api/products`, config);
      setProducts(res.data);
    } catch (err) {
      handleAuthError(err);
    }
  }, [API]);

  // ✅ Fetch ledgers
  const fetchLedger = useCallback(async () => {
    const config = getAuthConfig();
    if (!config) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/ledger`, config);

      // Sort newest first
      const allLedgers = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // ✅ Always ensure products are arrays
      const safeLedgers = allLedgers.map((l) => ({
        ...l,
        products: Array.isArray(l.products) ? l.products : [],
      }));

      setLedgerData(safeLedgers);
      setFilteredData(groupByCustomer(safeLedgers));
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  }, [API]);

  // ✅ Group ledgers by customer
  const groupByCustomer = (data) => {
    const grouped = data.reduce((acc, entry) => {
      const custId = entry.customer?._id;
      if (!custId) return acc;

      if (!acc[custId]) {
        acc[custId] = {
          ...entry,
          total: parseFloat(entry.total),
          products: [...(entry.products || [])],
        };
      } else {
        acc[custId].total += parseFloat(entry.total);
        acc[custId].products = Array.from(
          new Set([
            ...acc[custId].products.map((p) => (typeof p === "string" ? p : p.name)),
            ...(entry.products || []).map((p) => (typeof p === "string" ? p : p.name)),
          ])
        );
      }

      return acc;
    }, {});
    return Object.values(grouped);
  };

  // ✅ Run all fetches on mount
  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchLedger();
  }, [fetchCustomers, fetchProducts, fetchLedger]);

  // ✅ Filter by customer
  const filterByCustomer = () => {
    const filtered = ledgerData.filter((entry) => {
      const matchesCustomerId = customerId
        ? entry.customer?._id === customerId
        : true;
      const matchesCustomerName = customerName
        ? entry.customer?.name
            ?.toLowerCase()
            .includes(customerName.toLowerCase())
        : true;
      return matchesCustomerId && matchesCustomerName;
    });
    setFilteredData(groupByCustomer(filtered));
    filtered.length > 0
      ? toast.info(`Found ${filtered.length} record(s)`)
      : toast.warning("No Records Found");
  };

  // ✅ Clear filters
  const handleClearFilters = () => {
    setCustomerId("");
    setCustomerName("");
    setFilteredData(groupByCustomer(ledgerData));
  };

  // ✅ Mark as paid
  const markAsPaid = async (id) => {
    const config = getAuthConfig();
    if (!config) return;
    try {
      const res = await axios.patch(`${API}/api/ledger/${id}/pay`, {}, config);
      if (res.data.message === "Ledger marked as paid") {
        toast.success("Ledger marked as paid!");
        fetchLedger();
      }
    } catch (err) {
      handleAuthError(err);
    }
  };

  // ✅ Handle partial payment
  const handlePartialPay = async (id) => {
    const config = getAuthConfig();
    if (!config) return;

    const amount = prompt("Enter partial amount to pay:");
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return toast.warning("Please enter a valid amount");
    }
    try {
      const res = await axios.patch(
        `${API}/api/ledger/${id}/partial-pay`,
        { amount: parseFloat(amount) },
        config
      );
      res.data.success
        ? toast.success("Partial payment updated")
        : toast.error(res.data.message);
      fetchLedger();
    } catch (err) {
      handleAuthError(err);
    }
  };

  // ✅ PDF download
  const handleGeneratePDF = (ledgerId) => {
    const entry = filteredData.find((e) => e._id === ledgerId);
    if (!entry) return toast.error("Entry not found");

    const pdfContent = document.createElement("div");
    pdfContent.innerHTML = `
      <div style="padding: 20px; font-family: Arial; border: 2px solid #000; width: 100%;">
        <h2 style="text-align: center; color: #2c3e50;">Customer Ledger</h2>
        <hr />
        <p><strong>Customer Name:</strong> ${entry.customer?.name || "N/A"}</p>
        <p><strong>Contact:</strong> ${entry.customer?.contact || "N/A"}</p>
        <p><strong>Address:</strong> ${entry.customer?.address || "N/A"}</p>
        <p><strong>Date:</strong> ${new Date(entry.createdAt).toLocaleString()}</p>
        <p><strong>Products:</strong> ${
          entry.products?.map((p) => (typeof p === "string" ? p : p.name)).join(", ") || "None"
        }</p>
        <p><strong>Total Pending:</strong> ₹${entry.total?.toFixed(2) || "0.00"}</p>
        <div style="margin-top: 30px; text-align: right;">
          <p>Authorized Signature __________________</p>
        </div>
      </div>
    `;

    html2pdf()
      .from(pdfContent)
      .set({
        margin: 0.3,
        filename: `ledger_${ledgerId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2>Customer Ledger</h2>

      {/* Filter Section */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label>Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter Customer Name"
          />
        </div>

        <div className="col-md-3">
          <label>Select Customer</label>
          <select
            className="form-control"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="">All Customers</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} ({c.contact})
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3 align-self-end">
          <button
            className="btn btn-primary mt-2"
            onClick={filterByCustomer}
          >
            Filter
          </button>
          <button
            className="btn btn-secondary mt-2 ms-2"
            onClick={handleClearFilters}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Ledger Display */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredData.length === 0 ? (
        <p>No pending data available.</p>
      ) : (
        filteredData.map((entry, index) => (
          <div
            key={index}
            className="card mb-3 shadow"
            ref={(el) => (componentRefs.current[entry._id] = el)}
          >
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <span>
                <strong>{entry.customer?.name || "Unknown"}</strong> |{" "}
                {entry.customer?.contact || "N/A"}
              </span>
              <div>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => markAsPaid(entry._id)}
                >
                  Mark as Paid
                </button>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => handlePartialPay(entry._id)}
                >
                  Partial Pay
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleGeneratePDF(entry._id)}
                >
                  Download PDF
                </button>
              </div>
            </div>
            <div className="card-body">
              <p>
                <strong>Address:</strong> {entry.customer?.address || "N/A"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(entry.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Products Purchased:</strong>{" "}
                {entry.products?.map((p) => (typeof p === "string" ? p : p.name)).join(", ") ||
                  "None"}
              </p>
              <p>
                <strong>Total Pending Amount:</strong> ₹
                {entry.total?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Ledger;
