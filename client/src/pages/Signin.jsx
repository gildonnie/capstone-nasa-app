/* eslint-disable react/jsx-no-bind */
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../utils/AuthContext';
import NavBar from '../components/NavBar';
import Moon from '../images/moon.jpg';

const Main = styled.main`
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  .image {
    width: 100vh;
    height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${Moon});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    border-radius: 30px;
    padding: .85rem;
    margin: 1rem;
    width: 17rem;
  }
`;

const Button = styled.button`
  width: 150px;
  height: 35px;
  color: red;
  margin: .5rem;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #00B2A7;
  color: #00B2A7;
  &:hover {
    cursor: pointer;
    border: 1px solid #96B1AD;
    color: #96B1AD;
  }
  a {
    text-decoration: none;
    color: white;
  }
`;

function Signin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const email = useRef();
  const password = useRef();
  const { signin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signin(email?.current?.value, password?.current?.value);
      navigate('/profile');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
    return handleSubmit;
  }
  return (
    <>
      <NavBar />
      <Main>
        <div className="image" />
        <div>
          <h2>Sign In</h2>
          {error && <p>{error}</p>}
          <Form onSubmit={handleSubmit}>
            <label htmlFor="email">
              <input
                id="email"
                type="email"
                name="email"
                ref={email}
                placeholder="Email"
                required
              />
            </label>
            <label htmlFor="password">
              <input
                id="password"
                type="password"
                name="password"
                ref={password}
                placeholder="Password"
                required
              />
            </label>
            <Button disabled={loading} type="submit">Log In</Button>
          </Form>
          <p>
            Not registered?
            {' '}
            <Link to="/signup">Sign Up</Link>
            {' '}
            instead!
          </p>
        </div>
      </Main>
    </>
  );
}
export default Signin;
