import React, { useState, useEffect } from "react";

const loaderStyles = `
  .page-loader {
    position: fixed;
    inset: 0;
    background: #0b140b;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    transition: opacity 0.6s ease, visibility 0.6s ease;
  }

  .page-loader.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  /* Blockchain Node Animation */
  .chain-container {
    position: relative;
    width: 120px;
    height: 120px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Connecting Hexagon / Shield */
  .chain-shield {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px dashed rgba(74, 222, 128, 0.3);
    border-radius: 12px;
    transform: rotate(45deg);
    animation: pulseBorder 2.5s linear infinite;
  }

  @keyframes pulseBorder {
    0%   { border-color: rgba(74, 222, 128, 0.2); transform: rotate(45deg) scale(0.95); }
    50%  { border-color: rgba(74, 222, 128, 0.8); transform: rotate(45deg) scale(1.05); }
    100% { border-color: rgba(74, 222, 128, 0.2); transform: rotate(45deg) scale(0.95); }
  }

  /* The Central Node (Leaf) */
  .chain-core {
    position: relative;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #16a34a, #22c55e);
    border-radius: 50% 0 50% 50%; /* Leaf shape */
    transform: rotate(-45deg);
    box-shadow: 0 0 25px rgba(34, 197, 94, 0.5);
    z-index: 2;
    animation: coreBreath 2s ease-in-out infinite alternate;
    overflow: hidden;
  }

  @keyframes coreBreath {
    from { box-shadow: 0 0 15px rgba(34, 197, 94, 0.4); }
    to   { box-shadow: 0 0 35px rgba(34, 197, 94, 0.8); }
  }

  /* Nodes (Data endpoints) */
  .node {
    position: absolute;
    width: 12px;
    height: 12px;
    background: #a7f3d0;
    border-radius: 50%;
    box-shadow: 0 0 10px #6ee7b7;
    z-index: 3;
    animation: nodeBlink 1.5s infinite alternate;
  }

  .node-1 { top: -6px; left: -6px; animation-delay: 0.1s; }
  .node-2 { top: -6px; right: -6px; animation-delay: 0.4s; }
  .node-3 { bottom: -6px; right: -6px; animation-delay: 0.7s; }
  .node-4 { bottom: -6px; left: -6px; animation-delay: 1.0s; }

  @keyframes nodeBlink {
    0%   { transform: scale(0.8); opacity: 0.5; }
    100% { transform: scale(1.3); opacity: 1; }
  }

  /* Data Packets flowing along border */
  .packet {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 8px #fff;
    offset-path: path('M12,12 L108,12 L108,108 L12,108 Z'); /* Square path matching border */
    animation: transmit 3s linear infinite;
  }

  .packet-2 {
    animation-delay: -1.5s;
  }

  @keyframes transmit {
    0%   { offset-distance: 0%; }
    100% { offset-distance: 100%; }
  }

  /* Scanner Line across the object */
  .shield-scanner {
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #34d399;
    box-shadow: 0 0 8px #059669;
    z-index: 4;
    animation: scanVertical 2s ease-in-out infinite;
  }

  @keyframes scanVertical {
    0%   { top: -10px; opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 130px; opacity: 0; }
  }

  /* Text & Bars */
  .loader-text {
    color: #4ade80;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 16px;
    font-family: 'DM Mono', monospace;
  }

  .loader-dots::after {
    content: '';
    animation: dotCycle 1.5s steps(4, end) infinite;
  }

  @keyframes dotCycle {
    0%   { content: ''; }
    25%  { content: '.'; }
    50%  { content: '..'; }
    75%  { content: '...'; }
    100% { content: ''; }
  }

  .loader-bar {
    width: 220px;
    height: 2px;
    background: rgba(74, 222, 128, 0.15);
    border-radius: 2px;
    overflow: hidden;
  }

  .loader-fill {
    height: 100%;
    background: linear-gradient(90deg, #059669, #34d399);
    animation: fillBar 2.2s cubic-bezier(0.1, 0.7, 0.1, 1) forwards;
  }

  @keyframes fillBar {
    0%   { width: 0%; }
    20%  { width: 30%; }
    50%  { width: 45%; }
    80%  { width: 85%; }
    100% { width: 100%; }
  }
`;

const HerbalLoader = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      <style>{loaderStyles}</style>
      <div className={`page-loader ${!visible ? "hidden" : ""}`}>
        <div className="chain-container">
          {/* Outer rotating shield / boundary */}
          <div className="chain-shield">
            <div className="node node-1"></div>
            <div className="node node-2"></div>
            <div className="node node-3"></div>
            <div className="node node-4"></div>
            {/* Packet uses SMIL path internally, so we use a simpler trick for square path */}
            {/* We will just rely on the nodes pulsing for the network effect to avoid complex SVG paths in pure HTML/CSS */}
          </div>

          {/* Central Leaf core */}
          <div className="chain-core">
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
              {/* Main Vein */}
              <path d="M 12 88 L 95 5" stroke="rgba(0,0,0,0.4)" strokeWidth="4" strokeLinecap="round" />

              {/* Right Veins (+X direction) */}
              <path d="M 30 70 L 60 70" stroke="rgba(0,0,0,0.35)" strokeWidth="3" strokeLinecap="round" />
              <path d="M 50 50 L 75 50" stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 70 30 L 85 30" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round" />

              {/* Left Veins (-Y direction) */}
              <path d="M 30 70 L 30 40" stroke="rgba(0,0,0,0.35)" strokeWidth="3" strokeLinecap="round" />
              <path d="M 50 50 L 50 25" stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 70 30 L 70 15" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Laser scanning the product to trace it */}
          <div className="shield-scanner"></div>
        </div>

        <p className="loader-text">
          Authenticating on Ledger<span className="loader-dots"></span>
        </p>

        <div className="loader-bar">
          <div className="loader-fill"></div>
        </div>
      </div>
    </>
  );
};

export default HerbalLoader;