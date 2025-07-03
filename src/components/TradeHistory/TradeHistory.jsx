import React from 'react';
import { useTrading } from '../contexts/TradingContext';
import './TradeHistory.scss';

const TradeHistory = React.memo(() => {
  const { tradeHistory } = useTrading();

  return (
    <div className="trade-history">
      <h3>Trade History</h3>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Direction</th>
            <th>Timeframe</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {tradeHistory.length === 0 ? (
            <tr>
              <td colSpan={4}>No trades yet</td>
            </tr>
          ) : (
            tradeHistory.map((trade) => (
              <tr key={trade.id} className={trade.status}>
                <td>{new Date(trade.openTime).toLocaleTimeString()}</td>
                <td>{trade.direction}</td>
                <td>{getTimeframeLabel(trade.timeframe)}</td>
                <td>{trade.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

function getTimeframeLabel(value) {
  const timeframes = {
    '5': '5s',
    '10': '10s',
    '30': '30s',
    '60': '1m',
    '300': '5m'
  };
  return timeframes[value] || value;
}

export default TradeHistory;