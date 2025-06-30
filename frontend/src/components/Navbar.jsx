import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate('/');
  };

  const handleLogin = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1 className="logo">Sakura E-Commerce</h1>
      </div>

      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        {menuOpen ? '✖' : '☰'}
      </button>

      {/* Desktop Nav Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login-admin">Admin</Link></li>
      </ul>

      <div className="navbar-actions">
        <button className="cart-button" onClick={() => navigate('/cart')}>🛒 Cart</button>
        <div className="profile-dropdown">
          <button
            onClick={toggleDropdown}
            className="profile-button"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            ▼
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu" role="menu">
              <li><Link to="/profile" role="menuitem">My Profile</Link></li>
              <li><Link to="/orders" role="menuitem">My Orders</Link></li>
            </ul>
          )}
        </div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-button">Logout</button>
        ) : (
          <button onClick={handleLogin} className="login-button">Login</button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/products" onClick={toggleMenu}>Products</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
          <li><Link to="/login-admin" onClick={toggleMenu}>Admin</Link></li>
          <li><Link to="/profile" onClick={toggleMenu}>My Profile</Link></li>
          <li><Link to="/orders" onClick={toggleMenu}>My Orders</Link></li>
          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="logout-button mobile-login-btn">Logout</button>
            ) : (
              <button onClick={handleLogin} className="login-button mobile-login-btn">Login</button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
