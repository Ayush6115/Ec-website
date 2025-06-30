import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UpdateOrder.css';
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

const UpdateOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (orderId) => {
    navigate(`/admin/update-order-form/${orderId}`);
  };

  if (loading) return <p className="loading">Loading orders...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="update-order-container">
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Payment:</strong> {order.paymentMethod || 'N/A'}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Shipping:</strong> {order.shippingInfo?.name}, {order.shippingInfo?.address}</p>

            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.productId?.name || 'Product'} × {item.quantity} –
                  ${item.productId?.price ? (item.productId.price * item.quantity).toFixed(2) : 'N/A'}
                </li>
              ))}
            </ul>

            <p>
              <strong>Total Price:</strong> $
              {order.items.reduce((total, item) => {
                const price = item.productId?.price || 0;
                return total + price * item.quantity;
              }, 0).toFixed(2)}
            </p>

            <button onClick={() => handleUpdateClick(order._id)}>Update</button>
          </div>
        ))
      )}
    </div>
  );
};

export default UpdateOrder;
