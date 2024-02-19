import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useUser(); // Removed setUser, it's not used here
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    console.log('...handling submit')
    e.preventDefault();
    try {
      await loginUser(email, password);
      console.log('Login successful'); // Check if this logs on successful login
      navigate('/home'); // Navigate to the homepage after login
    } catch (error) {
      // Handle login error (e.g., show an error message to the user)
      console.error('Login failed:', error);
      // Here you might want to update the UI to inform the user that login has failed
    }
  };

  return (
    <div className="login-page">
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          className="form-input"
          required
        />
        <button type="submit" className="form-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;