import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import '../styles/Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removingItemId, setRemovingItemId] = useState(null);
  const [updatingItemId, setUpdatingItemId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/cart');
      setCart(res.data.cart);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      setRemovingItemId(productId);
      setError('');
      const res = await api.delete('/cart/remove', {
        data: { productId },
      });
      setCart(res.data.cart);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove item');
    } finally {
      setRemovingItemId(null);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setUpdatingItemId(productId);
      setError('');
      const res = await api.patch('/cart/update', {
        productId,
        quantity: newQuantity,
      });
      setCart(res.data.cart);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update quantity');
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const totalPrice =
    cart?.items.reduce((total, item) => {
      if (!item.productId) return total;
      return total + item.productId.price * item.quantity;
    }, 0) || 0;

  if (loading) return <p className="cart-status">Loading cart...</p>;
  if (error) return <p className="cart-error">{error}</p>;
  if (!cart || cart.items.length === 0)
    return <p className="cart-status">Your cart is empty.</p>;

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      <div className="cart-items">
        {cart.items.map(({ productId, quantity }) => (
          <div className="cart-item" key={productId._id}>
            <img
              src={productId.imageUrl || 'https://via.placeholder.com/120'}
              alt={productId.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h2>{productId.name}</h2>
              <p className="cart-item-description">{productId.description || ''}</p>
              <p>Price: <strong>${productId.price.toFixed(2)}</strong></p>
              <p>
                Quantity:
                <button
                  disabled={updatingItemId === productId._id}
                  onClick={() => handleQuantityChange(productId._id, quantity - 1)}
                  className="qty-btn"
                >−</button>
                <span className="qty-value">{quantity}</span>
                <button
                  disabled={updatingItemId === productId._id}
                  onClick={() => handleQuantityChange(productId._id, quantity + 1)}
                  className="qty-btn"
                >+</button>
              </p>
              <p>Subtotal: <strong>${(productId.price * quantity).toFixed(2)}</strong></p>
            </div>
            <button
              className="cart-remove-btn"
              onClick={() => handleRemove(productId._id)}
              disabled={removingItemId === productId._id}
            >
              {removingItemId === productId._id ? 'Removing...' : 'Remove'}
            </button>
          </div>
        ))}
      </div>

      <h2 className="cart-total">Total: ${totalPrice.toFixed(2)}</h2>

      <button className="checkout-btn" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
