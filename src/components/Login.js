// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css'; // Import the shared styles
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { email, password } = formData;

      // Make a POST request to your backend for user login
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      // Check if login was successful
      if (response.status === 200) {
        onLogin(response.data.user); // Pass the user data to the parent component
        navigate('/contacts'); // Redirect to the '/contacts' page
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else {
          setError('An error occurred during login. Please try again.');
          console.error('Error logging in:', error.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
        console.error('Error logging in:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="on-container">
      <div className="overlay"></div>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Email"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-label="Password"
            />
          </div>
          <div className="button-container">
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>
          Don't have an account? <Link to="/registration">Sign up here</Link>.
        </p>
      </div>
    </div>
  );
}

export default Login;
