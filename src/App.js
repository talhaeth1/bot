import logo from './logo.svg';
import './App.css';
 
import ControlPanel from './components/ControlPanel/ControlPanel'
import SignalDisplay from './components/SignalDisplay/SignalDisplay';
import TradeHistory from './components/TradeHistory/TradeHistory';
import { TradingProvider } from './components/contexts/TradingContext';

function App() {
  return (
    <TradingProvider>
      <div className="app-container">
        <h1>Bot</h1>
        <div className="dashboard">
          
          <ControlPanel/>
          <SignalDisplay />
          <TradeHistory />
        </div>
      </div>
    </TradingProvider>
  );
}

export default App;
