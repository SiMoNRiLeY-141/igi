// Profile.js
import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
};

export default Profile;
