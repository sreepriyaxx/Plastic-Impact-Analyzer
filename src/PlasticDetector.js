import React, { useState } from 'react';
import axios from 'axios';
import './PlasticDetector.css'; // Import the CSS file

function PlasticDetector() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select an image.');

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert('Something went wrong with the prediction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detector-container">
      <h2 className="detector-title">Plastic Type Detector</h2>

      <form className="detector-form" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
        <button type="submit" className="detect-button">
          Upload & Detect
        </button>
      </form>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Analyzing image… 🌱</p>
        </div>
      )}

      {result && (
        <div className="result-card">
          <h3>Results</h3>
          <p><strong>Plastic Type:</strong> {result.plastic_type}</p>
          <p><strong>Impact:</strong> {result.impact}</p>
          <p><strong>Disposal Advice:</strong> {result.disposal_advice}</p>
        </div>
      )}
    </div>
  );
}

export default PlasticDetector;

