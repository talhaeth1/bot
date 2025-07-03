import React, { useEffect } from 'react';
import { useTrading } from '../contexts/TradingContext';
import './SignalDisplay.scss';

const SignalDisplay = () => {
  const { currentSignal, activeTrade, isRunning } = useTrading();

  if (!currentSignal) {
    return (
      <div className="signal-display">
        <div className="signal idle">
          <h3>No Active Signal</h3>
          <p>Click "Generate Signal" to start</p>
        </div>
      </div>
    );
  }

  return (
    <div className="signal-display">
      <div className={`signal ${currentSignal.direction.toLowerCase()}`}>
        <h3>{currentSignal.direction} SIGNAL</h3>
        <p>Timeframe: {getTimeframeLabel(currentSignal.timeframe)}</p>
        <p>Confidence: {currentSignal.confidence}%</p>
        <p>Time: {new Date(currentSignal.timestamp).toLocaleTimeString()}</p>
      </div>

      {activeTrade && (
        <div className="active-trade">
          <h4>Active Trade</h4>
          <p>Direction: {activeTrade.direction}</p>
          <p>Opened at: {new Date(activeTrade.openTime).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

function getTimeframeLabel(value) {
  const timeframes = {
    '5': '5 Seconds',
    '10': '10 Seconds',
    '30': '30 Seconds',
    '60': '1 Minute',
    '300': '5 Minutes'
  };
  return timeframes[value] || value;
}

export default SignalDisplay;