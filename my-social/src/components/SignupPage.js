import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import './SignupPage.css'; // Ensure this CSS file has the necessary styles
import { useUser } from '../contexts/UserContext';


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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const { loginUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming you want to use the same fields in your user context
    const newUser = {
      email: user.email,
      password:user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio
    };
    console.log(newUser); // Placeholder for API call

    // Store the user data in localStorage
    localStorage.setItem('users', JSON.stringify([...JSON.parse(localStorage.getItem('users') || '[]'), newUser]));

    // Update the user context
    await loginUser(newUser.email, newUser.password);

    alert('Signup successful! (User data stored in localStorage)');
    navigate('/'); // Redirect to landing page (adjust the path as needed)
  };

  return (
    <div className="signup-page"> {/* Wrap form in a div with a class for styling */}
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
    </div>
  );
};

export default SignupPage;