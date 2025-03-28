import React from 'react';
import ConnectButton from './Connect/ConnectButton';
import './Header.css';
import logo from "../../assets/logo.svg";
import logoGrindURUS from '../../assets/images/logoGrindURUS.png';
import {useAppKit, useAppKitNetwork} from "@reown/appkit/react";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

function Header({ setPoolId }) {
  const { open } = useAppKit()
  const { caipNetwork } = useAppKitNetwork()
  const navigate = useNavigate();

  const handleHeaderClick = async (view) => {
    navigate("/");
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <img src={logo} alt="GrindURUS Logo" />
			    <div>GrindURUS</div>
        </Link>
        <nav class="header-navigation">
          <ul class="header-menu menu">
            <li class="menu-item"><Link to="/dashboard" class="menu-link">Dashboard</Link></li>
            <li class="menu-item"><Link to="/greth" class="menu-link">grETH</Link></li>
            <li class="menu-item"><Link to="grinder-ai" class="menu-link">GrinderAI</Link></li>
          </ul>
        </nav>
        <div class="header-buttons">
          <button className="button network-button" onClick={() => open({view: 'Networks'})}>
            <div className="button-image">
              <img src={caipNetwork.assets.imageUrl} alt="Chain Icon"/>
            </div>
            {caipNetwork.name}
          </button>
          <ConnectButton setPoolId={setPoolId} />
        </div>
      </div>
    </header>
  );
}

export default Header;
