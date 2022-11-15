import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import NavBar from '../components/NavBar';

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
      navigate('/profile');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
    return handleSubmit;
  }
  return (
    <main>
      <NavBar />
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            name="email"
            ref={email}
            placeholder="user@domain.com"
            required
            // onChange={handleInputChange}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            name="password"
            ref={password}
            placeholder="S3cr3tPW!"
            required
            // onChange={handleInputChange}
          />
        </label>
        <label htmlFor="verifyPassword">
          Verify Password:
          <input
            id="verifyPassword"
            type="password"
            name="verifyPassword"
            ref={verifyPassword}
            placeholder="S3cr3tPW!"
            required
            // onChange={handleInputChange}
          />
        </label>
        <button disabled={loading} type="submit">Submit</button>
      </form>
      <p>
        Already registered?
        {' '}
        <Link to="/signin">Sign in</Link>
        {' '}
        instead!
      </p>
    </main>
  );
}
export default SignUp;
