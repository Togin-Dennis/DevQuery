import React from 'react';
import './Loading.css';
import DevQuotesLogo from '../assets/DevQuotesLogo.png'

function Loading() {
  return (
    <div className="loading-container">
      <img
        src={DevQuotesLogo}
        alt="Stack Overflow"
        className="loading-logo"
      />
      <div className="spinner"></div>
    </div>
  );
}

export default Loading;
