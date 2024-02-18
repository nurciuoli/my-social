import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  // Define handleChange here
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a login success and set user information
    setUser({ email, name: "John Doe", bio: "This is a bio." });
    navigate('/home');  // Navigate to the homepage after login
  };

  return (
    <div className="login-page">
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email} // Add value attribute
          onChange={handleChange} // Ensure handleChange is called on change
          className="form-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password} // Add value attribute
          onChange={handleChange} // Ensure handleChange is called on change
          className="form-input"
          required
        />
        <button type="submit" className="form-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;