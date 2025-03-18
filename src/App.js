import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import GRETH from './components/GRETH/GRETH.js';

import Dashboard from './components/Dashboard/Dashboard.js';
import GrinderAIAgent from './components/GrinderAIAgent/GrinderAIAgent.js';
import {useContractService} from "./context/ContractContext";

function App() {
  const [view, setView] = useState('dashboard');
  const [poolId, setPoolId] = useState(-1)
  const { networkConfig } = useContractService();

  const renderContent = () => {
    if (!networkConfig || Object.keys(networkConfig).length === 0) {
      return <div>Loading network configuration...</div>;
    }
    switch (view) {
      case 'dashboard':
        return (
            <Dashboard poolId={poolId} setPoolId={setPoolId} networkConfig={networkConfig} />
        );
      case 'greth':
        return(
          <>
            <GRETH />
          </>
        )
      case 'grinder':
        return (
          <>
            <GrinderAIAgent networkConfig={networkConfig} />
          </>
        );
      case 'profile':
        return(
          <>
            <div className='profile-content'>
              adsdas
            </div>
          </>
        )
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Header
        setView={setView} 
        setPoolId={setPoolId}
      />      
      {renderContent()}
    </div>
  );
}

export default App;