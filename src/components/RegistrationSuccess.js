// RegistrationSuccess.js

import React from 'react';
import './Registration.css';

function RegistrationSuccess() {
  return (
    <div className="on-container">
      <div className="overlay"></div>
      <div className="container">
        <h2>Registration Successful!</h2>
        <p>
          Thank you for registering. An email has been sent to your address. Please verify your account by clicking the link provided in the email.
        </p>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
