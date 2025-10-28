import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

const ExpiredProducts = () => {
  const [expiredItems, setExpiredItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExpiredProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/expired-products`);
      setExpiredItems(res.data);
    } catch (err) {
      console.error('Error fetching expired products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpiredProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-danger">Archived Expired Products</h2>
      <p className="text-center text-muted">This list shows product batches that have expired and been removed from active stock.</p>
      
      {loading ? (
        <div className="text-center my-5"><Spinner animation="border" /></div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Product Name</th>
              <th>Weight</th>
              <th>Price (per item)</th>
              <th>Expired Quantity</th>
              <th>Expired On</th>
              <th>Archived On</th>
            </tr>
          </thead>
          <tbody>
            {expiredItems.length > 0 ? (
              expiredItems.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.weight || 'N/A'}</td>
                  <td>{item.price}</td>
                  <td>{item.expiredBatch.quantity}</td>
                  <td>{new Date(item.expiredBatch.expiryDate).toLocaleDateString()}</td>
                  <td>{new Date(item.movedAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No expired products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpiredProducts;