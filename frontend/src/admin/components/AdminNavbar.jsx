import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('adminToken');
    navigate('/login-admin');
  };

  return (
    <nav className="admin-navbar">
      <h2>Admin Panel</h2>
      <ul className="admin-nav-links">
        <li><Link to="/admin/add-product">Add Product</Link></li>
        <li><Link to="/admin/update-product">Update Product</Link></li>
        <li><Link to="/admin/update-order">Update Order</Link></li>
        <li><Link to="/admin/message">Messages</Link></li>
        <li>
          <Link to="/login-admin" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
