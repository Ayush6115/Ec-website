import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../styles/UpdateProductForm.css';
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

const UpdateProductForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const productFromState = location.state;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');


  useEffect(() => {
    if (!isAdmin()) {
      navigate('/login-admin');
      return;
    }

    if (productFromState) {
      setFormData({
        name: productFromState.name || '',
        description: productFromState.description || '',
        price: productFromState.price || '',
        imageUrl: productFromState.imageUrl || '',
      });
      setLoading(false);
    } else {
      setMessage('No product data found. Please go back and select a product.');
      setLoading(false);
    }
  }, [productFromState, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`http://localhost:5000/api/admin/update-product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Product update failed');
      }

      setMessage('Product updated successfully!');
      setTimeout(() => navigate('/admin/update-product'), 1500);
    } catch (err) {
      setMessage(err.message || 'Product update failed');
    }
  };

  if (loading) return <p>Loading product data...</p>;

  return (
    <div className="update-form-container">
      <h2>Update Product</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="update-product-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="submit-btn">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
