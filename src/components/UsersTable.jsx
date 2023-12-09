import React from 'react';
import { useAuth } from '../providers/AuthContext';
import './usersTable.css';

const UsersTable = ({ allUsers }) => {
 
  
  return (
    <div className='table-div'>
    <table className="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Is Voting</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.isVoting ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default UsersTable;
