/* eslint-disable react/jsx-no-bind */
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../utils/AuthContext';
import NavBar from '../components/NavBar';
import Eclipse from '../images/Eclip.svg';

const Main = styled.main`
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  .image {
    margin-left: 15rem;
    text-align: end;
    margin-top: 80px;
    width: 800px;
    background-image: url(${Eclipse});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .form-container {
    margin-right: 30rem;
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

function SignUp() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const email = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.current.value !== verifyPassword.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(email.current.value, password.current.value);
      navigate('/');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
    return handleSubmit;
  }
  return (
    <main>
      <NavBar />
      <Main>
        <div className="image" />
        <div className="form-container">
          <h2>Sign Up</h2>
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
            <label htmlFor="verifyPassword">
              <input
                id="verifyPassword"
                type="password"
                name="verifyPassword"
                ref={verifyPassword}
                placeholder="Verify Password"
                required
              />
            </label>
            <Button disabled={loading} type="submit">Submit</Button>
          </Form>
          <p>
            Already registered?
            {' '}
            <Link to="/signin">Sign in</Link>
            {' '}
            instead!
          </p>
        </div>
      </Main>
    </main>
  );
}
export default SignUp;
