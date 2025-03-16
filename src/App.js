import React, {useEffect, useState} from 'react';
import './App.css';
import config from './config';
import Header from './components/Header/Header';
import GRETH from './components/GRETH/GRETH.js';

import Dashboard from './components/Dashboard/Dashboard.js';
import GrinderAIAgent from './components/GrinderAIAgent/GrinderAIAgent.js';
import {useAppKitNetwork} from "@reown/appkit/react";
import {convertDecimalToHex} from "./components/utils/numbers";

function App() {
  const [networkConfig, setNetworkConfig] = useState({});
  const [view, setView] = useState('dashboard');
  const [poolId, setPoolId] = useState(-1)
  const { chainId} = useAppKitNetwork();

  useEffect(() => {
    findAndSetNetworkConfig(convertDecimalToHex(chainId));
  }, [chainId]);

  const findAndSetNetworkConfig = (updatedChainId) => {
    const chainToUse = updatedChainId || chainId;
    const networkKey = Object.keys(config).find(
      (key) => config[key].chainId && config[key].chainId.toLowerCase() === chainToUse.toLowerCase()
    );
    setNetworkConfig(config[networkKey] || {});
  };

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