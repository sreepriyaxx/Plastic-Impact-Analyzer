import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import "./App.css";
import ecoImg from "./eco.png";
import PlasticDetector from './PlasticDetector';

function Home() {
  const navigate = useNavigate();

  const handleStartScanning = () => {
    navigate('/detect');
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="container">
          <h1 className="title">Plastic Impact Analyzer</h1>
          <p className="subtitle">
            Discover the world of plastic.
          </p>
          <div className="buttons">
            <button className="btn primary" onClick={handleStartScanning}>
              Start Scanning
            </button>
            <a href="#learn">
              <button className="btn secondary">Learn More</button>
            </a>
          </div>
          <div className="illustration">
            <img src={ecoImg} alt="Eco Illustration" style={{ width: "350px" }} />
          </div>
        </div>
      </header>
      <section className="how-it-works" id="learn">
        <h2>How it Works</h2>
        <p>
          Snap a picture or upload an item. Let AI detect it and give instant environmental insights!
        </p>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detect" element={<PlasticDetector />} />
      </Routes>
    </Router>
  );
}

export default App;


