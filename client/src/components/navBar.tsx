import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavWrap = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #313131;
  h1 {
    margin: .5rem 1rem .5rem 1.5rem;
  }
  ul {
    margin-right: 1rem;
    list-style: none;
    display: flex;
    li {
      margin-left: 2rem;
      a {
        text-decoration: none;
        color: #ffff;
      }
      
    }
  }
`;

function Nav() {
  return (
    <NavWrap>
      <h1>NASA</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        <li>
          <Link to="favorites">Favorites</Link>
        </li>
        <li>Login</li>
      </ul>
    </NavWrap>
  );
}

export default Nav;
