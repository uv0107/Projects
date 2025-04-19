// src/components/OpenB.js
import React from 'react';
import { Link } from 'react-router-dom';
import './OpenB.css';

const OpenB = () => {
  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="university-title">
          SecureVoting
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/AdminPanel">Admin Panel</Link>
          <Link to="/Voting">Voting</Link>
          <Link to="/Results">Results</Link>
        </nav>
      </header>

      {/* Hero Content */}
      <section className="hero-section">
        <h1>Blockchain-Based Secure Voting</h1>
        <p>
          SecureVoting is a decentralized platform designed to ensure transparency, security, and trust in modern elections.
          <br /><br />
          Built on Ethereum, it prevents vote tampering, ensures voter privacy, and guarantees that every vote is counted — and only counted once.
          <br /><br />
          With real-time result visibility and tamper-proof smart contracts, it's the future of digital democracy.
        </p>
      </section>
    </div>
  );
};

export default OpenB;
