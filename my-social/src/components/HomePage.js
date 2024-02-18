import React from 'react';
import { useUser } from '../contexts/UserContext';

const HomePage = () => {
  const { user } = useUser();

  if (!user) return <div>Please log in.</div>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>{user.bio}</p>
      {/* Display more user information here */}
    </div>
  );
};

export default HomePage;