import React, { useState } from 'react';
import axios from 'axios';

const ResumeUploader = ({ onProfileGenerated }) => {
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      setResumeText(event.target.result);
      setLoading(false);
    };
    reader.onerror = () => {
      setError('Failed to read file');
      setLoading(false);
    };
    reader.readAsText(file);
  };

  // Handle text input
  const handleTextInput = (e) => {
    setResumeText(e.target.value);
  };

  // Analyze resume
  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      setError('Please paste or upload your resume');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/api/resume/analyze`, {
        resumeText: resumeText.trim(),
      });

      if (response.data.success) {
        setProfile(response.data.data.profile);
        onProfileGenerated?.(response.data.data.profile);
      } else {
        setError('Failed to analyze resume');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error analyzing resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🎯 Personalized Interview Prep
        </h2>
        <p className="text-gray-600">
          Upload your resume to get AI-generated interview questions tailored to your skills
        </p>
      </div>

      {/* File Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Upload Resume (TXT, PDF, or DOCX)
        </label>
        <div className="relative">
          <input
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-lg cursor-pointer"
          />
          {fileName && <p className="text-sm text-green-600 mt-2">📄 Loaded: {fileName}</p>}
        </div>
      </div>

      {/* Text Input Section */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Or Paste Your Resume</label>
        <textarea
          value={resumeText}
          onChange={handleTextInput}
          placeholder="Paste your resume here..."
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-2">{resumeText.length} characters</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          ❌ {error}
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={analyzeResume}
        disabled={loading || !resumeText.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors mb-6"
      >
        {loading ? '🔄 Analyzing...' : '✨ Analyze Resume'}
      </button>

      {/* Profile Display */}
      {profile && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Your Profile</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Experience Level</p>
              <p className="text-lg font-bold text-blue-600">{profile.experienceLevel || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Primary Domains</p>
              <p className="text-lg font-bold text-green-600">
                {profile.domains?.join(', ') || 'N/A'}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 font-semibold mb-2">Technical Skills</p>
            <div className="flex flex-wrap gap-2">
              {profile.technicalSkills?.map((skill, idx) => (
                <span key={idx} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 font-semibold mb-2">Soft Skills</p>
            <div className="flex flex-wrap gap-2">
              {profile.softSkills?.map((skill, idx) => (
                <span key={idx} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;

