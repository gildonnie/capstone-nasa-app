import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../images/ES3.png';

const NavWrap = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
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
  return (
    <NavWrap>
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
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </NavWrap>
  );
}

export default Nav;
