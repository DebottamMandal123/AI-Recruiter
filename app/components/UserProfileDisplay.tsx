"use client";

import React, { useContext } from 'react';
import { UserDetailContext } from '@/context/UserDetailContext';

const UserProfileDisplay: React.FC = () => {
  // Use the useContext hook to access the context
  const context = useContext(UserDetailContext);

  // It's good practice to check if the context exists,
  // especially if the component might be rendered outside the provider
  if (!context) {
    return <div>Loading user data...</div>; // Or handle the absence of context appropriately
  }

  // Destructure the user object from the context
  const { user } = context;

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <p>User Email: {user.email}</p>
      ) : (
        <p>No user logged in.</p>
      )}
    </div>
  );
};

export default UserProfileDisplay;
