import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UpdateProduct.css';
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

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/login-admin');
      return;
    }

    const token = localStorage.getItem('adminToken');

    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/api/admin/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data.response || []);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [navigate]);

  const handleEditClick = (product) => {
    navigate(`/admin/update-product-form/${product._id}`, { state: product });
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="update-product-container">
      <h2>All Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
            )}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price"><b>Price:</b> ${product.price}</p>
            <button className="update-btn" onClick={() => handleEditClick(product)}>
              Update Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateProduct;
