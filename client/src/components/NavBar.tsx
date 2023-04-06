/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/ES3.png';
import { useAuth } from '../utils/AuthContext';

const NavWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  ul {
    margin-right: 6rem;
    list-style: none;
    display: flex;
    li {
      margin-left: 6rem;
      a {
        text-decoration: none;
        color: #ffff;
        border-bottom: 3px solid transparent;
        &:hover {
          border-bottom: 3px solid white;
        }
      }
      
    }
  }
`;
const LogoWrap = styled.a`
  div {
    margin-top: -1.5rem;
    margin-left: 5rem;
  }
  
`;

function Nav() {
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
    <NavWrap>
      {error && <p>{error}</p>}
      <LogoWrap className="navbar-brand" href="/">
        <div className="logo-image">
          <img src={Logo} alt="ES logo" />
        </div>
      </LogoWrap>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/rfavorites">RovFavorites</Link>
        </li>
        {currentUser?.email ? (
          <li>
            <Link onClick={handleLogout} to="">Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/signin">Login</Link>
          </li>
        )}
      </ul>
    </NavWrap>
  );
}

export default Nav;
