import React, { useState } from 'react';
import axios from 'axios';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });

      const { token } = response.data;

      localStorage.setItem('adminToken', token);

      alert('Admin login successful!');
      window.location.href = '/admin';

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMsg('Invalid email or password.');
      } else {
        setErrorMsg('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <main className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </main>
  );
};

export default AdminLoginPage;
