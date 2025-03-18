import React from 'react';
import ConnectButton from './Connect/ConnectButton';
import './Header.css';
import logoGrindURUS from '../../assets/images/logoGrindURUS.png';
import {useAppKit, useAppKitNetwork} from "@reown/appkit/react";

function Header({ setView, setPoolId }) {
  const { open } = useAppKit()
  const { caipNetwork } = useAppKitNetwork()

  const handleHeaderClick = async (view) => {
    if (view == 'dashboard') {
      setPoolId(-1)
    }
    setView(view);
  }

  return (
    <header className="header">
      <div className="header-left">
        <img src={logoGrindURUS} alt="Logo" className="logo" onClick={() => handleHeaderClick('dashboard')}/>
        <button className="dashboard-button" onClick={() => handleHeaderClick('dashboard')}>Dashboard</button>
        <button className="dashboard-button grEth-button" onClick={() => handleHeaderClick('greth')}>grETH</button>
        <button className="dashboard-button grEth-button" onClick={() => handleHeaderClick('grinder')}>Grinder AI Agent</button>
      </div>

      <div className="header-right">
        <button className="network-button" onClick={() => open({view: 'Networks'})}>
          <div className="icon">
            <img src={caipNetwork.assets.imageUrl} alt="Chain Icon"/>
          </div>
          <div className="network-name">{caipNetwork.name}</div>
        </button>
        <ConnectButton setView={setView} setPoolId={setPoolId} />
      </div>
    </header>
  );
}

export default Header;
