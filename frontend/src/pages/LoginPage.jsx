import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await api.post('/login', { email, password });

      const { token } = response.data;

      localStorage.setItem('token', token);

      alert('Login successful!');
      navigate('/');

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
        <h2>Login</h2>

        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <p className="signup-text">
        New user?{' '}
        <a href="/signup" className="signup-link">
          Sign up
        </a>
      </p>
    </main>
  );
};

export default LoginPage;
