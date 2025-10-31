import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
const isValidPhone = (phone) => /^(?:\+91)?[6-9]\d{9}$/.test(String(phone));

const ViewVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentVendor, setCurrentVendor] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [passwordFormData, setPasswordFormData] = useState({ password: "" });
  const [errors, setErrors] = useState({});

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:10000";
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchApprovedVendors();
  }, []);

  // ✅ Fetch Approved Vendors
  const fetchApprovedVendors = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/vendors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendors(res.data || []);
    } catch {
      toast.error("Could not fetch vendors!");
    }
  };

  // ✅ Download Excel or PDF
  const handleDownload = async (format) => {
    setIsLoading(true);
    const endpoint =
      format === "excel"
        ? `${API_URL}/api/admin/vendors/export/excel`
        : `${API_URL}/api/admin/vendors/export/pdf`;
    const filename =
      format === "excel" ? "approved_vendors.xlsx" : "approved_vendors.pdf";

    try {
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(`Downloaded ${format.toUpperCase()} successfully!`);
    } catch {
      toast.error(`Failed to download ${format.toUpperCase()}`);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Show Edit Modal
  const handleShowEditModal = (vendor) => {
    setCurrentVendor(vendor);
    setEditFormData({
      name: vendor.name,
      email: vendor.email,
      phone: vendor.phone,
      shopName: vendor.shopName,
      shopAddress: vendor.shopAddress,
    });
    setErrors({});
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const validateEditForm = () => {
    const newErrors = {};
    if (!editFormData.name) newErrors.name = "Name required";
    if (!isValidEmail(editFormData.email)) newErrors.email = "Invalid email";
    if (!isValidPhone(editFormData.phone))
      newErrors.phone = "Invalid phone number";
    if (!editFormData.shopName) newErrors.shopName = "Shop name required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateVendor = async () => {
    if (!validateEditForm()) return toast.error("Please fix errors first!");
    if (!window.confirm("Save changes for this vendor?")) return;
    try {
      await axios.put(
        `${API_URL}/api/admin/vendor/${currentVendor._id}`,
        editFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Vendor updated successfully!");
      fetchApprovedVendors();
      setShowEditModal(false);
    } catch {
      toast.error("Error updating vendor!");
    }
  };

  // ✅ Password Update
  const handleShowPasswordModal = (vendor) => {
    setCurrentVendor(vendor);
    setPasswordFormData({ password: "" });
    setShowPasswordModal(true);
  };

  const handleClosePasswordModal = () => setShowPasswordModal(false);
  const handlePasswordChange = (e) =>
    setPasswordFormData({ password: e.target.value });

  const handleUpdatePassword = async () => {
    if (passwordFormData.password.length < 8)
      return toast.error("Password must be at least 8 characters!");
    if (!window.confirm(`Change password for ${currentVendor.name}?`)) return;
    try {
      await axios.put(
        `${API_URL}/api/admin/vendor/${currentVendor._id}/password`,
        { password: passwordFormData.password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password updated successfully!");
      setShowPasswordModal(false);
    } catch {
      toast.error("Failed to update password!");
    }
  };

  // ✅ Delete Vendor
  const handleDelete = async (vendorId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this vendor? This action cannot be undone."
      )
    )
      return;
    try {
      await axios.delete(`${API_URL}/api/admin/vendors/${vendorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Vendor deleted successfully!");
      fetchApprovedVendors();
    } catch {
      toast.error("Error deleting vendor!");
    }
  };

  // ✅ Animation variants for modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <div className="view-vendors-container">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      <h2 className="mb-4">Manage Approved Vendors</h2>

      <div className="mb-3 d-flex justify-content-end gap-2">
        <button
          className="btn btn-success"
          onClick={() => handleDownload("excel")}
          disabled={isLoading}
        >
          <i className="fas fa-file-excel me-1"></i>
          {isLoading ? "Downloading..." : "Export Excel"}
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDownload("pdf")}
          disabled={isLoading}
        >
          <i className="fas fa-file-pdf me-1"></i>
          {isLoading ? "Downloading..." : "Export PDF"}
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Shop Name</th>
              <th>Address</th>
              <th>Aadhar</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.length ? (
              vendors.map((v) => (
                <tr key={v._id}>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.phone}</td>
                  <td>{v.shopName}</td>
                  <td>{v.shopAddress}</td>
                  <td>{v.adharNo}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowEditModal(v)}
                    >
                      ✏ Edit
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowPasswordModal(v)}
                    >
                      🔑 Password
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(v._id)}
                    >
                      🗑 Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No approved vendors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Animated Edit Vendor Modal */}
      <AnimatePresence>
        {showEditModal && currentVendor && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <Modal show onHide={handleCloseEditModal} centered backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>Edit Vendor: {currentVendor.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditFormChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditFormChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditFormChange}
                      isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Shop Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="shopName"
                      value={editFormData.shopName}
                      onChange={handleEditFormChange}
                      isInvalid={!!errors.shopName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.shopName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Shop Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="shopAddress"
                      value={editFormData.shopAddress}
                      onChange={handleEditFormChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditModal}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleUpdateVendor}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Password Modal */}
      <AnimatePresence>
        {showPasswordModal && currentVendor && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <Modal show onHide={handleClosePasswordModal} centered backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>
                  Change Password for {currentVendor.name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Min 8 characters"
                      value={passwordFormData.password}
                      onChange={handlePasswordChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClosePasswordModal}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleUpdatePassword}>
                  Update Password
                </Button>
              </Modal.Footer>
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewVendors;
