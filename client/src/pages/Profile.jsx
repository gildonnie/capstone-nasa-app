import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import NavBar from '../components/NavBar';

function Profile() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      navigate('/');
    } catch {
      setError('Failed to logout');
    }
  }

  return (
    <>
      <NavBar />
      <div>
        <h1>Profile</h1>
        {error && <p>{error}</p>}
        <p>
          Email:
          {' '}
          {currentUser.email}
        </p>
      </div>
      <div>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}

export default Profile;
