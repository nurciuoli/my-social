import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (email, password) => {
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Find a user where the email and password match
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      // Omit the password from the user details before setting it to state
      const { password, ...userDetails } = foundUser;
      setUser(userDetails);
    } else {
      // If no user is found, or the password does not match, throw an error
      throw new Error('Login failed');
    }
  };

  return (
    <UserContext.Provider value={{ user, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};