import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ThreeBackground from './components/ThreeBackground';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import GameList from './components/Games/GameList';
import UserCollection from './components/Games/UserCollection';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUsername(localStorage.getItem('username'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <ThreeBackground>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🎮 Game Library Management System
            </Link>
            <div className="nav-links">
              <Link to="/games" className="nav-link">Game Library</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/collection" className="nav-link">My Collection</Link>
                  <span className="nav-user">Welcome, {username}</span>
                  <button onClick={handleLogout} className="nav-button">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/register" className="nav-link">Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/games" /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/games" /> : <Register />
          } />
          <Route path="/games" element={
            <GameList user={isAuthenticated} />
          } />
          <Route path="/collection" element={
            isAuthenticated ? <UserCollection /> : <Navigate to="/login" />
          } />
          <Route path="/" element={<Navigate to="/games" />} />
        </Routes>
      </div>
    </ThreeBackground>
  );
}

export default App;