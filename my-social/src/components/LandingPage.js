import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="text-box">
        <div className="icon">🌐</div> {/* Placeholder icon */}
        <h1>Welcome</h1>
        <div className="buttons">
          {/* Update the buttons to use Link for navigation */}
          <Link to="/login" className="button">Login</Link>
          <Link to="/signup" className="button">Signup</Link>
        </div>
      </div>
      <footer className="footer">
        MySocial
      </footer>
    </div>
  );
};

export default LandingPage;