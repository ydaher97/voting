import React from 'react'
import { useAuth } from '../providers/AuthContext';


const Nav = ({handlePageChange}) => {
    const { user, logoutUser } = useAuth();
    const handleLogout = () => {
        logoutUser();
      };

      const setPage = () =>{
        handlePageChange()
      }
  return (
    <div>
    <h2>Nav</h2>
    {user && (
      <button onClick={handleLogout}>Logout</button>
    )}
    {user && user.isAdmin &&  (
        <button onClick={setPage}>Admin Dashboard</button>
    )}
  </div>
  )
}

export default Nav