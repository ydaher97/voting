import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import './nav.css';

const Nav = ({ handlePageChange }) => {
  const { user, logoutUser,updateUserAfterVote } = useAuth();
  const [isAdminPage, setIsAdminPage] = useState(false);

  const handleLogout = () => {
    logoutUser();
  };

  const setPage = () => {
    // await updateUserAfterVote();
    handlePageChange();
    setIsAdminPage(!isAdminPage); 
  };

  return (
    <div className="nav-container">
    <h2>{user.name}</h2>
    {user && (
      <div className="nav-buttons">
        <button onClick={handleLogout}>Logout</button>

        {user.isAdmin && (
          <button onClick={setPage}>
            {isAdminPage ? 'Dashboard' : 'Admin Dashboard'}
          </button>
        )}
      </div>
    )}
  </div>
  );
};

export default Nav;
