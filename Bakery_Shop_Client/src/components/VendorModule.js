// src/components/VendorModule.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorModule = ({ token }) => {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({ name: '', email: '', password: '', businessName: '' });
  const [editingVendor, setEditingVendor] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/vendors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendors(res.data);
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  const handleAddVendor = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/vendors`, newVendor, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewVendor({ name: '', email: '', password: '', businessName: '' });
      fetchVendors();
    } catch (err) {
      console.error('Error adding vendor:', err);
    }
  };

  const handleDeleteVendor = async (id) => {
    if (!window.confirm('Delete this vendor?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/vendors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVendors();
    } catch (err) {
      console.error('Error deleting vendor:', err);
    }
  };

  const handleUpdateVendor = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/admin/vendors/${editingVendor._id}`, editingVendor, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingVendor(null);
      fetchVendors();
    } catch (err) {
      console.error('Error updating vendor:', err);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Vendor Management</h3>

      {/* Add Vendor */}
      <div className="card p-3 mb-4">
        <h5>Add New Vendor</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Name" value={newVendor.name}
              onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="email" className="form-control" placeholder="Email" value={newVendor.email}
              onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="password" className="form-control" placeholder="Password" value={newVendor.password}
              onChange={(e) => setNewVendor({ ...newVendor, password: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Business Name" value={newVendor.businessName}
              onChange={(e) => setNewVendor({ ...newVendor, businessName: e.target.value })} />
          </div>
          <div className="col-md-12">
            <button className="btn btn-success mt-2" onClick={handleAddVendor}>Add Vendor</button>
          </div>
        </div>
      </div>

      {/* Vendor List */}
      <div className="card p-3">
        <h5>All Vendors</h5>
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Business</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor._id}>
                <td>{vendor.name}</td>
                <td>{vendor.email}</td>
                <td>{vendor.businessName}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingVendor(vendor)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteVendor(vendor._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Vendor */}
      {editingVendor && (
        <div className="card p-3 mt-4">
          <h5>Edit Vendor</h5>
          <div className="row g-2">
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Name" value={editingVendor.name}
                onChange={(e) => setEditingVendor({ ...editingVendor, name: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input type="email" className="form-control" placeholder="Email" value={editingVendor.email}
                onChange={(e) => setEditingVendor({ ...editingVendor, email: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Business Name" value={editingVendor.businessName}
                onChange={(e) => setEditingVendor({ ...editingVendor, businessName: e.target.value })} />
            </div>
            <div className="col-md-3">
              <button className="btn btn-primary mt-2" onClick={handleUpdateVendor}>Update Vendor</button>
              <button className="btn btn-secondary mt-2 ms-2" onClick={() => setEditingVendor(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorModule;
