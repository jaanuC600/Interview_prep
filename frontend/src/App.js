import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import ResumeUploader from './components/ResumeUploader';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
              <header className="py-10 px-4 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900">
                  Welcome to Interview Prep Platform
                </h1>
                <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
                  Upload or paste your resume to get AI-generated interview questions tailored to your skills.
                </p>
              </header>

              <main className="px-4 pb-16">
                <ResumeUploader />
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
