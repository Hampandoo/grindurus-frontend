import React, {useEffect, useState} from 'react';
import './App.css';
import config from './config';
import Header from './components/Header/Header';
<<<<<<< Updated upstream:src/App.js
import GRETH from './components/GRETH/GRETH.js';

import PlanInfo from './components/GrinderAIAgent/GrinderAIDeposit/GrinderAIDeposit.js';
import MintIntent from './components/GrinderAIAgent/MintIntent/MintIntent.js';
import IntentsTable from './components/GrinderAIAgent/IntentsTable/IntentsTable.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import GrinderAIAgent from './components/GrinderAIAgent/GrinderAIAgent.js';
=======
import Dashboard from './components/Dashboard/Dashboard.jsx';
import GRETH from './components/GRETH/GRETH';
import {useContractService} from "./context/ContractContext";
import {
  Route,
  Routes,
} from "react-router-dom";
import GrinderAIChat from "./components/GrinderAIAgent/GrinderAIChat/GrinderAIChat";
import ConnectWallet from "./components/ConnectWalletBanner/ConnectWalletBanner";
import {Pool} from "./components/Pool/Pool";

const RouterGuard = ({ networkConfig, isConnected, children }) => {
  if (!networkConfig || Object.keys(networkConfig).length === 0) {
    return <div>Loading network configuration...</div>;
  }

  if (!isConnected) {
    return <ConnectWallet />
  }

  return children;
};
>>>>>>> Stashed changes:src/frontend_frontend/src/App.jsx

function App() {

  const [chainId, setChainId] = useState('');
  const [networkConfig, setNetworkConfig] = useState({});
  const [walletAddress, setWalletAddress] = useState('');
  const [view, setView] = useState('dashboard');
  const [poolId, setPoolId] = useState(-1)
  const [plan, setPlan] = useState(0)

  const onWalletConnect = (address, newChainId) => {
    setWalletAddress(address);
    setChainId(newChainId);
    findAndSetNetworkConfig(newChainId); 
  };

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
        onWalletConnect={onWalletConnect} 
        setView={setView} 
        setPoolId={setPoolId} 
        setChainId={setChainId} 
        findAndSetNetworkConfig={findAndSetNetworkConfig} 
      />      
      {renderContent()}
    </div>
  );
}

export default App;