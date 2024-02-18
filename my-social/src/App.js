import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update this line
import { UserProvider } from './contexts/UserContext';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes> {/* Change this line */}
            <Route path="/" element={<LandingPage />} /> {/* Update this line */}
            <Route path="/signup" element={<SignupPage />} /> {/* Update this line */}
            <Route path="/login" element={<LoginPage />} /> {/* Update this line */}
            <Route path="/home" element={<HomePage />} /> {/* Update this line */}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;