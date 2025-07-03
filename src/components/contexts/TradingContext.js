import React, { createContext, useState, useContext, useEffect } from 'react';

const TradingContext = createContext();

export const TradingProvider = ({ children }) => {
  const [state, setState] = useState({
    timeframe: '60',
    currentSignal: null,
    isRunning: false,
    tradeHistory: [],
    activeTrade: null
  });

  const { timeframe, currentSignal, isRunning, tradeHistory, activeTrade } = state;

  const generateSignal = () => {
    const signal = {
      direction: Math.random() > 0.5 ? 'BUY' : 'SELL',
      confidence: Math.floor(Math.random() * 30 + 70),
      timestamp: new Date().toISOString(),
      timeframe
    };
    
    setState(prev => ({ ...prev, currentSignal: signal }));
    return signal;
  };

  const executeTrade = (signal) => {
    const trade = {
      id: Date.now(),
      direction: signal.direction,
      openTime: new Date().toISOString(),
      timeframe,
      status: 'open',
      openPrice: Math.random() * 100 + 100 // simulated price
    };
    
    setState(prev => ({ ...prev, activeTrade: trade }));
    
    // Automatically close after timeframe duration
    setTimeout(() => {
      closeTrade(trade.id);
    }, parseInt(timeframe) * 1000);
  };

  const closeTrade = (tradeId) => {
    setState(prev => ({
      ...prev,
      tradeHistory: prev.tradeHistory.map(trade => {
        if (trade.id === tradeId && trade.status === 'open') {
          return {
            ...trade,
            status: Math.random() > 0.4 ? 'profit' : 'loss',
            closeTime: new Date().toISOString(),
            closePrice: Math.random() * 100 + 100 // simulated price
          };
        }
        return trade;
      }),
      activeTrade: null
    }));
  };

  return (
    <TradingContext.Provider value={{
      timeframe,
      setTimeframe: (newTimeframe) => setState({ ...state, timeframe: newTimeframe }),
      currentSignal,
      generateSignal,
      executeTrade,
      activeTrade,
      tradeHistory,
      isRunning,
      setIsRunning: (newIsRunning) => setState({ ...state, isRunning: newIsRunning })
    }}>
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = () => useContext(TradingContext);