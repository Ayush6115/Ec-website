import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState({ name: false, phone: false });
  const [editedUser, setEditedUser] = useState({ name: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile');
        setUser(res.data.user);
        setEditedUser({
          name: res.data.user.name,
          phone: res.data.user.phone,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleCancelClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    setEditedUser((prev) => ({
      ...prev,
      [field]: user[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await api.put('/update-profile', editedUser);
      setUser(res.data.updatedUser);
      setIsEditing({ name: false, phone: false });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <h2>You are not logged in.</h2>
        <button onClick={() => navigate('/login')} className="login-redirect-btn">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <div className="profile-field">
          <strong>Name:</strong>
          {isEditing.name ? (
            <>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
              />
              <button className="cancel-button" onClick={() => handleCancelClick('name')}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>{user.name}</span>
              <button onClick={() => handleEditClick('name')}>✏️</button>
            </>
          )}
        </div>

        <div className="profile-field">
          <strong>Phone:</strong>
          {isEditing.phone ? (
            <>
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
              />
              <button className="cancel-button" onClick={() => handleCancelClick('phone')}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>{user.phone}</span>
              <button onClick={() => handleEditClick('phone')}>✏️</button>
            </>
          )}
        </div>

        <div className="profile-field">
          <strong>Email:</strong> <span>{user.email}</span>
        </div>

        {(isEditing.name || isEditing.phone) && (
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
