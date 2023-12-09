import React, { useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable';
import { useAuth } from '../providers/AuthContext';
import CardVotesChart from '../components/VotesChart';


const AdminPage = () => {
  const { updateUserAfterVote , allUsers} = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await updateUserAfterVote();
        setIsLoading(false);
      } catch (error) {
        console.error('Error updating users after vote:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   try {
  //     updateUserAfterVote();
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //   }
   
  // }, [updateUserAfterVote]);

  return (
    <div>
      <h2>Admin Page</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <UsersTable allUsers={allUsers}/>
      )}
      <CardVotesChart allUsers={allUsers} />
    </div>
  );
};

export default AdminPage;
