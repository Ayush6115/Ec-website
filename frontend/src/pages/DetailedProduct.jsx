import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api'; 
import '../styles/DetailedProduct.css';

const DetailedProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get(`/admin/products/${id}`);
        setProduct(res.data.response);
      } catch (err) {
        setError('Failed to load product details.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {

      await api.post('/cart/add', { productId: id, quantity: 1 });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to add product to cart.';
      alert(`Error: ${msg}`);
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="detailed-product-container">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          title={product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>

        {addedToCart && <p className="added-message">Added to cart!</p>}
      </div>
    </div>
  );
};

export default DetailedProduct;
