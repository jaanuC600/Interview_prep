import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="text-center p-8"><h1>Welcome to Interview Prep Platform</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
