import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/MyOrderPage.css'; 

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await api.get('/admin/orders');
        setOrders(response.data.orders || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="loading">Loading your orders...</p>;
  if (error) return <p className="error">{error}</p>;
  if (orders.length === 0) return <p className="no-orders">You have no orders yet.</p>;

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {orders.map((order) => {
        const totalPrice = order.items.reduce((acc, { productId, quantity }) => {
          const price = productId?.price || 0;
          return acc + price * quantity;
        }, 0);

        return (
          <div className="order-card" key={order._id}>
            <h2>Order ID: {order._id}</h2>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>

            <h3>Shipping Info:</h3>
            <p>Name: {order.shippingInfo?.name || 'N/A'}</p>
            <p>Phone: {order.shippingInfo?.phone || 'N/A'}</p>
            <p>Address: {order.shippingInfo?.address || 'N/A'}</p>

            <h3>Items:</h3>
            <ul className="items-list">
              {order.items.map(({ productId, quantity }, index) => (
                <li className="item" key={productId?._id || index}>
                  <img
                    src={productId?.imageUrl || 'https://via.placeholder.com/60'}
                    alt={productId?.name || 'Product image'}
                    className="item-image"
                  />
                  <div className="item-details">
                    <strong>{productId?.name || 'Unknown Product'}</strong>
                    <p>Quantity: {quantity}</p>
                    <p>Price: ${typeof productId?.price === 'number' ? productId.price.toFixed(2) : 'N/A'}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrderPage;
