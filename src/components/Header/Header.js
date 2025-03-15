import React, {useState, useEffect} from 'react';
import config from '../../config';
import { ethers } from 'ethers';
import ConnectButton from './Connect/ConnectButton';
import './Header.css';
import logoGrindURUS from '../../assets/images/logoGrindURUS.png';
import logoArbitrum from '../../assets/images/logoArbitrum.png';
import logoPolygon from '../../assets/images/logoPolygon.png';
import logoOptimism from '../../assets/images/logoOptimism.png';
import logoBase from '../../assets/images/logoBase.png';

// import { client } from "../../client";
// import { ConnectButton } from "thirdweb/react";

function Header({ onWalletConnect, setView, setPoolId, setChainId, findAndSetNetworkConfig }) {
  const [selectedNetworkId, setSelectedNetwork] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const getNetworks = () => {
    const networks = Object.keys(config).reduce((acc, key, index) => {
      const network = config[key];
      if (network.chainId) {
        acc.push({
          name: network.name,
          chainId: network.chainId,
          logo: network.logo,
        });
      }
      return acc;
    }, []);
    return networks
  };

  useEffect(() => {
    handleConnectWallet()
  }, [onWalletConnect])

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        const chainId = getNetworks()[selectedNetworkId].chainId;
        setChainId(chainId)
        findAndSetNetworkConfig(chainId)
      } catch (error) {
        console.error('MetaMask error:', error);
      }
    } else {
      console.log('Metamask is not installed');
    }
  };

  const handleNetworkChange = async (networkId) => {
    const selectedChainId = getNetworks()[networkId].chainId;
  
    try {
      // Сначала переключите сеть
      if (window.ethereum) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: selectedChainId }],
        });
      }
  
      // После успешного переключения обновите состояние
      setSelectedNetwork(networkId);
      setChainId(selectedChainId);
      findAndSetNetworkConfig(selectedChainId);
    } catch (error) {
      console.error('Error while switching network:', error);
    }
  };

  const handleHeaderClick = async (view) => {
    if (view == 'dashboard') {
      setPoolId(-1)
    }
    setView(view);
  }

  const toggleMenu = () => {
    if (walletAddress == '') {
      return
    }
    setShowMenu(!showMenu);
  };

  const handleLogoutClick = () => {
    setWalletAddress('');
    setShowMenu(false);
    console.log('Wallet disconnected');
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
        <img
          src={getNetworks()[selectedNetworkId].logo}
          alt={getNetworks()[selectedNetworkId].name}
          className="network-logo"
        />
        <div className="network-select">
          <select onChange={(e) => handleNetworkChange(e.target.value)}>
            {getNetworks().map((network, index) => (
              <option key={index} value={index}>
                {network.name}
              </option>
            ))}
          </select>
        </div>
        <div
          className="wallet-menu-container"
          onMouseEnter={toggleMenu}
          onMouseLeave={toggleMenu}
        >
        {/* <ConnectButton client={client} /> */}
        {/* <button className="connect-wallet" onClick={handleConnectWallet}>
          {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
          </button> */}
          <ConnectButton />
          {showMenu && (
              <div className="wallet-menu">
                <div className="wallet-menu-item" onClick={() => handleHeaderClick('profile')}>
                  Profile
                </div>
                <div className="wallet-menu-item" onClick={() => handleLogoutClick()}>
                  Logout
                </div>
              </div>
            )}
        </div>
      </div>
    </header>
  );
}

export default Header;
