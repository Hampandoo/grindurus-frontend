import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard.js';
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

function App() {
  const [poolId, setPoolId] = useState(-1)
  const { networkConfig, isConnected } = useContractService();

  return (
    <>
      <Header
        setPoolId={setPoolId}
      />
      <main className="page">
        <Routes>
          <Route path="/" exact element={
            <RouterGuard networkConfig={networkConfig} isConnected={isConnected}>
              <Dashboard poolId={poolId} setPoolId={setPoolId} networkConfig={networkConfig}/>
            </RouterGuard>
          }/>
          <Route path="/greth" element={
            <GRETH networkConfig={networkConfig}/>
          }/>
          <Route path="/pool/:poolId" element={
            <Pool />
          }/>
        </Routes>
        <GrinderAIChat />
      </main>
    </>
  );
}

export default App;