import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import NavBar from '../components/NavBar';

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
      <main>
        <h2>Sign In</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:
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
            Password:
            <input
              id="password"
              type="password"
              name="password"
              ref={password}
              placeholder="Password"
              required
            />
          </label>
          <button disabled={loading} type="submit">Log In</button>
        </form>
        <p>
          Not registered?
          {' '}
          <Link to="/signup">Sign Up</Link>
          {' '}
          instead!
        </p>
      </main>
    </>
  );
}
export default Signin;
