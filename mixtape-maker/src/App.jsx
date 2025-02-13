// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home'; 
import LogIn from './pages/LogIn'; 
import Songs from './pages/Songs';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  return (
    <Router>
      <NavBar /> {/* Navigation bar at the top of the page */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<LogIn />} /> 
            <Route path="/songs" element={<Songs />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
