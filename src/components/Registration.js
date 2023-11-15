// Registration.js

import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /\d/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordRequirements({
      minLength,
      uppercase,
      lowercase,
      number,
      specialChar,
    });
  };

  const isRequirementMet = (requirement) => (requirement ? 'valid' : 'invalid');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password } = formData;

      if (Object.values(passwordRequirements).every((requirement) => requirement)) {
        const response = await axios.post('http://localhost:5000/register', {
          name,
          email,
          password,
        });

        console.log('User registered:', response.data.user);
        setRegistrationSuccess(true);
        navigate('/registration-success');
      } else {
        setError('Password requirements not met.');
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

if (registrationSuccess) {
  return null; // You can return null or any other component since the redirect is handled by history.push
}


  return (
    <div className="on-container">
      <div className="overlay"></div>
      <div className="container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              required
            />
          </div>

          {isPasswordFocused && (
            <ul className="password-requirements">
              <li className={isRequirementMet(passwordRequirements.minLength)}>
                Minimum 8 characters
              </li>
              <li className={isRequirementMet(passwordRequirements.uppercase)}>
                At least one uppercase letter
              </li>
              <li className={isRequirementMet(passwordRequirements.lowercase)}>
                At least one lowercase letter
              </li>
              <li className={isRequirementMet(passwordRequirements.number)}>
                At least one number
              </li>
              <li className={isRequirementMet(passwordRequirements.specialChar)}>
                At least one special character
              </li>
            </ul>
          )}

          <div className="button-container">
            <button type="submit">Get on Board</button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>
            Already have an account? <Link to="/login">Log in here</Link>.
          </p>
      </div>
    </div>
  );
}

export default Registration;
