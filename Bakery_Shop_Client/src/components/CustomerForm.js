import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CustomerForm = () => {
  const [form, setForm] = useState({ name: "", address: "", contact: "" });
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch all customers
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("vendorToken");
      if (!token) {
        toast.error("You are not logged in. Redirecting...");
        navigate("/login");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/customers`,
        config
      );
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
      if (err.response && err.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("vendorToken");
        navigate("/login");
      } else {
        toast.error("Failed to load customers data.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Add new customer
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("vendorToken");
      if (!token) {
        toast.error("You are not logged in. Please log in.");
        navigate("/login");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/customers`,
        form,
        config
      );

      toast.success("Customer added successfully!");
      setForm({ name: "", address: "", contact: "" });
      fetchCustomers();
    } catch (err) {
      console.error("Error saving customer:", err);
      if (err.response && err.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("vendorToken");
        navigate("/login");
      } else {
        toast.error("Failed to save customer.");
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="container mt-4">
      <ToastContainer position="top-center" autoClose={2000} />

      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input
            type="text"
            className="form-control"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Customer
        </button>
      </form>

      <h3>Customer List</h3>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center">
                Loading...
              </td>
            </tr>
          ) : customers.length > 0 ? (
            customers.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.address}</td>
                <td>{c.contact}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerForm;
