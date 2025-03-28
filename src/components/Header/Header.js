import React from 'react';
import ConnectButton from './Connect/ConnectButton';
import './Header.css';
import logoGrindURUS from '../../assets/images/logoGrindURUS.png';
import {useAppKit, useAppKitNetwork} from "@reown/appkit/react";
import {useNavigate} from "react-router-dom";

function Header({ setPoolId }) {
  const { open } = useAppKit()
  const { caipNetwork } = useAppKitNetwork()
  const navigate = useNavigate();

  const handleHeaderClick = async (view) => {
    navigate("/");
  }

  return (
    <header className="header">
      <div className="header-left">
        <img src={logoGrindURUS} alt="Logo" className="logo" onClick={() => handleHeaderClick('dashboard')}/>
        <span className="header-name">GrindURUS</span>
      </div>

      <div className="header-right">
        <button className="network-button" onClick={() => open({view: 'Networks'})}>
          <div className="icon">
            <img src={caipNetwork.assets.imageUrl} alt="Chain Icon"/>
          </div>
          <div className="network-name">{caipNetwork.name}</div>
        </button>
        <ConnectButton setPoolId={setPoolId} />
      </div>
    </header>
  );
}

export default Header;
