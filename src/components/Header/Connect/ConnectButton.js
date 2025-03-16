import styles from "./ConnectButton.module.css"
import React, {useState} from 'react';
import { useAppKitAccount, useDisconnect, useAppKit } from "@reown/appkit/react"


function shortenAddress(addressStr) {
  return addressStr.slice(0, 4) + "..." + addressStr.slice(-4);
}
function renderAccount(isConnected, address) {
  if(isConnected) {
    return shortenAddress(address)
  } else {
    return "Connect Wallet"
  }
}

export default function ConnectButton({ setView, setPoolId }) {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const { disconnect } = useDisconnect()

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    if (address == '') {
      return
    }
    setShowMenu(!showMenu);
  };
  
  const handleLogoutClick = () => {
    // setWalletAddress('');
    setShowMenu(false);
    console.log('Wallet disconnected');
  }

  const handleHeaderClick = async (view) => {
    if (view == 'dashboard') {
      setPoolId(-1)
    }
    setView(view);
  }

  const disconnectWallet = async () => {
    await disconnect()

  }


  return (
    <div
      className={styles['wallet-menu-container']}
      onMouseEnter={toggleMenu}
      onMouseLeave={toggleMenu}
    >
      <button className={styles['connect-wallet']} onClick={() => open()}>{renderAccount(isConnected, address)}</button>
      {showMenu && (
        <div className={styles['wallet-menu']}>
          <div className={styles['wallet-menu-item']} onClick={() => handleHeaderClick('profile')}>
            Profile
          </div>
          <div className={styles['wallet-menu-item']} onClick={() => disconnectWallet()}>
            Logout
          </div>
        </div>
      )}
    </div>
  )
}