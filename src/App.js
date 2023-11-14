// src/App.js
import React, { useState, useEffect } from 'react'; // Import useEffect
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Registration from './components/Registration';
import Login from './components/Login';
import ContactManagement from './components/ContactManagement';
import Home from './components/Home';
import RegistrationSuccess from './components/RegistrationSuccess';
import './App.css'; // Import the App.css file for styling

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Make a request to your backend to verify the token
      // If valid, set the user in state
      axios.post('http://localhost:5000/verify-token', { token })
        .then(response => setUser(response.data.user))
        .catch(error => console.error('Error verifying token:', error));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    // Remove the token from local storage on logout
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li className='link-container'>
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li className='link-container'>
                  <Link to="/contacts">Your Dashboard</Link>
                </li>
                <li className='link-container' onClick={handleLogout}>
                  Logout
                </li>
              </>
            ) : (
              <>
                <li className='link-container'>
                  <Link to="/registration">Sign Up</Link>
                </li>
                <li className='link-container'>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route path="/contacts" element={<ContactManagement />} />
          <Route
            path="/registration-success"
            element={<RegistrationSuccess />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
