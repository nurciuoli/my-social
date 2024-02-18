import React, { useState } from 'react';
import './SignupPage.css'; // Import the stylesheet

const SignupPage = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    bio: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user); // You'd replace this with an API call in a real app
    localStorage.setItem('users', JSON.stringify([...JSON.parse(localStorage.getItem('users') || '[]'), user]));
    alert('Signup successful! (User data stored in localStorage)');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <textarea name="bio" placeholder="Bio" onChange={handleChange}></textarea>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
      <button type="submit">Confirm</button>
    </form>
  );
};

export default SignupPage;