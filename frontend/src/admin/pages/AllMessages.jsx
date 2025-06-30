import React, { useEffect, useState } from 'react';
import '../styles/AllMessages.css';
import { useNavigate } from 'react-router-dom';
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

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/login-admin');
      return;
    }

    const token = localStorage.getItem('adminToken');

    async function fetchMessages() {
      try {
        const response = await fetch('http://localhost:5000/api/admin/message', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Failed to fetch messages');
        }

        const data = await response.json();
        setMessages(data.response || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`http://localhost:5000/api/admin/message/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to delete message');
      }

      setMessages(prev => prev.filter(msg => msg._id !== id));
    } catch (err) {
      alert(err.message || 'Failed to delete message');
    }
  };

  if (loading) return <p className="loading">Loading messages...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (messages.length === 0) return <p className="no-message">No messages found.</p>;

  return (
    <div className="all-messages-container">
      <h2>All Messages</h2>
      <ul className="message-list">
        {messages.map(msg => (
          <li key={msg._id} className="message-item">
            <div className="message-content">
              <p><strong>From:</strong> {msg.name || 'Unknown'}</p>
              <p><strong>Email:</strong> {msg.email || 'N/A'}</p>
              <p><strong>Message:</strong> {msg.message || '-'}</p>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(msg._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllMessages;
