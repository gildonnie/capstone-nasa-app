import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../utils/AuthContext';
import NavBar from '../components/NavBar';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileDiv = styled.div`
  min-width: 300px;
  min-height: 300px;
  border: 1px solid #00B2A7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #96B1AD;
  p {
    color: #00B2A7;
  }
  button {
  width: 100px;
  height: 40px;
  color: red;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #96B1AD;
  color: #96B1AD;
  &:hover {
    cursor: pointer;
    border: 1px solid #00B2A7;
    color: #00B2A7; 
  }
  }
`;

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
      <Container>
        <ProfileDiv>
          <h1>Profile</h1>
          {error && <p>{error}</p>}
          <p>
            Email:
            {' '}
            {currentUser.email}
          </p>
          <button type="button" onClick={handleLogout}>Logout</button>
          <button type="button" onClick={handleLogout}>Home</button>
        </ProfileDiv>
      </Container>
    </>
  );
}

export default Profile;
