import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';

import Dashboard from './components/Dashboard/Dashboard.js';
import {useContractService} from "./context/ContractContext";
import {
  Route,
  Routes
} from "react-router-dom";
import PoolInfo from "./components/Dashboard/PoolInfo/PoolInfo";
import PoolInteractor from "./components/Dashboard/PoolInteractor/PoolInteractor";
import GrinderAIChat from "./components/GrinderAIAgent/GrinderAIChat/GrinderAIChat";
import ConnectWallet from "./components/ConnectWalletBanner/ConnectWalletBanner";

const RouterGuard = ({ networkConfig, isConnected, children }) => {
  if (!networkConfig || Object.keys(networkConfig).length === 0) {
    return <div>Loading network configuration...</div>;
  }

  if (!isConnected) {
    return <ConnectWallet />
  }

  return children;
};

function App() {
  const [poolId, setPoolId] = useState(-1)
  const { networkConfig, isConnected } = useContractService();

  const renderContent = () => {
    if (!networkConfig || Object.keys(networkConfig).length === 0) {
      return <div>Loading network configuration...</div>;
    }

    return (
        <Dashboard poolId={poolId} setPoolId={setPoolId} networkConfig={networkConfig} />
    );
  };

  return (
    <div className="app-container">
      <Header
        setPoolId={setPoolId}
      />
      <div className='main-container'>
        <Routes>
          <Route path="/" exact element={
            <RouterGuard networkConfig={networkConfig} isConnected={isConnected}>
              <Dashboard poolId={poolId} setPoolId={setPoolId} networkConfig={networkConfig}/>
            </RouterGuard>
          }/>

          <Route path="/pool/:poolId" element={
            <>
              <div className='main-container-left'>
                <PoolInfo/>
              </div>
              <div className='main-container-right'>
                <PoolInteractor/>
              </div>
            </>
          }/>
        </Routes>

        <GrinderAIChat />
      </div>
    </div>
  );
}

export default App;