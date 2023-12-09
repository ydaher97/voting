
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storeduser = localStorage.getItem('user');
    return storeduser ? JSON.parse(storeduser) : null;
  });
  const [allUsers, setAllUsers] = useState([])
  const [shouldFetchUsers, setShouldFetchUsers] = useState(true);
  // useEffect(() => {})
  const fetchAllUsers = async () => {
    try {
      const response = await fetch('https://6571bb42d61ba6fcc013635d.mockapi.io/users');
      const users = await response.json();
      console.log(users)

      setAllUsers(users);
      setShouldFetchUsers(false); 

    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };



  const updateUserAfterVote = async () => {
    try {
      //await fetchAllUsers(); 

      const updatedUserResponse = await fetch(`https://6571bb42d61ba6fcc013635d.mockapi.io/users/${user.id}`);
      const updatedUser = await updatedUserResponse.json();
      console.log(updatedUser)
      setUser(updatedUser); 
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setShouldFetchUsers(true);

    } catch (error) {
      console.error('Error updating user after vote:', error);
    }
  };


  useEffect(() => {
    if (shouldFetchUsers) {
      fetchAllUsers(); 
    }
  }, [shouldFetchUsers]);


  const loginUser = async (email, password) => {
    try {
      const response = await fetch('https://6571bb42d61ba6fcc013635d.mockapi.io/users');
      const users = await response.json();
      

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user')
  };

  return (
    <AuthContext.Provider value={{ user,allUsers, loginUser, logoutUser,updateUserAfterVote }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
