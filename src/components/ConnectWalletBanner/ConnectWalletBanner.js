import React from "react";
import "./ConnectWalletBanner.css"; // Стилі для компонента

function ConnectWallet() {
  return (
    <div className="connect-wallet">
      <div className="connect-wallet-content">
        <img
          src="https://img.icons8.com/ios/452/ethereum.png" // Можна замінити на свою картинку
          alt="Connect Wallet"
          className="wallet-icon"
        />
        <h2>Connect Your Wallet</h2>
        <p>To get started, connect your wallet and dive into the experience.</p>
      </div>
    </div>
  );
}

export default ConnectWallet;
