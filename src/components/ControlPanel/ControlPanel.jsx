import React from 'react';
import { useTrading } from '../contexts/TradingContext';
import './ControlPanel.scss';

const ControlPanel = () => {
  const {
    timeframe,
    setTimeframe,
    isRunning,
    setIsRunning,
    generateSignal,
    executeTrade
  } = useTrading();

  const handleGenerateSignal = () => {
    const signal = generateSignal();
    executeTrade(signal);
  };

  return (
    <div className="control-panel">
      <div className="timeframe-selector">
        <label>Timeframe:</label>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          disabled={isRunning}
        >
          <option value="5">5 Seconds</option>
          <option value="10">10 Seconds</option>
          <option value="30">30 Seconds</option>
          <option value="60">1 Minute</option>
          <option value="300">5 Minutes</option>
        </select>
      </div>
      
      <div className="action-buttons">
        <button
          onClick={handleGenerateSignal}
          disabled={isRunning}
        >
          Generate Signal
        </button>
        
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={isRunning ? 'stop' : 'start'}
        >
          {isRunning ? 'Stop Auto Trading' : 'Start Auto Trading'}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;