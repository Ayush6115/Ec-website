import React, { useEffect, useState } from 'react';
import '../styles/UpdateOrderForm.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isAdmin = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.role === 'admin';
  } catch {
    return false;
  }
};

const UpdateOrderForm = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/login-admin');
      return;
    }
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('http://localhost:5000/api/admin/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data.orders || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to update status');
      }

      fetchOrders();
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="update-order-container">
      <h2>Manage Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Shipping Details</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              const totalPrice = order.total ?? order.items.reduce((sum, item) => {
                const price = item.productId?.price || 0;
                return sum + price * item.quantity;
              }, 0);

              const shipping = order.shippingInfo || {};
              const shippingDetails = `${shipping.name || 'N/A'}, ${shipping.address || 'No address'}`;

              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{shippingDetails}</td> 
                  <td>{order.items.map(item => item.productId?.name || 'Product').join(', ')}</td>
                  <td>${totalPrice.toFixed(2)}</td>
                  <td>{order.status}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UpdateOrderForm;
