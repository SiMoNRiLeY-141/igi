// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <h1>Welcome to Contacts by IGI</h1>
        <p>Where all your contacts reside</p>
      </header>

      <section className="features">
        <div className="feature">
          <h2>Feature 1</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="feature">
          <h2>Feature 2</h2>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="feature">
          <h2>Feature 3</h2>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to get started?</h2>
        <p>Join us now and experience the magic!</p>
        <Link to="/registration">
          <button>Sign Up</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
