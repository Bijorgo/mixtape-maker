// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home'; 
import LogIn from './pages/LogIn'; 
import Songs from './pages/Songs';
import ErrorPage from './pages/ErrorPage';
import MixtapeDisplay from "./components/MixtapeDisplay";
import MixtapeContents from "./components/MixtapeContents";
import { useState, useEffect } from 'react';

export default function App() {
  const [mixtapes, setMixtapes] = useState([]);
  const [error, setError] = useState(null);

    // Fetch mixtapes when the app starts
    useEffect(() => {
        fetch("/mixtapes")
            .then((response) => response.json())
            .then((data) => {
              if (data.error) {
                setError(data.error); // Show the error message
              } else {
                setMixtapes(data.mixtapes); // Set the mixtapes data
              }
            })
            .catch((err) => {
              setError("Failed to load mixtapes");
            });
    }, []);

  return (
    <Router>
      <NavBar /> {/* Navigation bar at the top of the page */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mixtapes/:id" element={<MixtapeContents />} />
          <Route path="/login" element={<LogIn />} /> 
          <Route path="/songs" element={<Songs />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};


