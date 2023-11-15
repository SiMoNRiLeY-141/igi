// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Registration from './components/Registration';
import Login from './components/Login';
import ContactManagement from './components/ContactManagement';
import Home from './components/Home';
import RegistrationSuccess from './components/RegistrationSuccess';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://localhost:5000/verify-token', { token })
        .then(response => setUser(response.data.user))
        .catch(error => console.error('Error verifying token:', error));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Define dynamic navigation links
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/registration', label: 'Sign Up' },
    { to: '/login', label: 'Login' },
    { to: '/contacts', label: 'Your Dashboard' },
  ];

  return (
    <Router>
      <div>
        <nav>
          <div className="logo-container">
            <img src="favicon.png" alt="Logo" />
          </div>
          <ul>
            {navLinks.map((link, index) => (
              <li key={index} className='link-container'>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
            {user && (
              <li className='link-container' onClick={handleLogout}>
                Logout
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login"element={<Login onLogin={handleLogin} />}
          />
          <Route path="/contacts" element={<ContactManagement />} />
          <Route path="/registration-success" element={<RegistrationSuccess />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;