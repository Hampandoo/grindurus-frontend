import React, { useEffect, useState } from 'react';
import {ethers} from 'ethers';
import './MintIntent.css';

function MintIntent({ networkConfig }) {
  const [intentPeriod, setIntentPeriod] = useState(6); // Значение по умолчанию
  const [receiver, setReceiver] = useState('');
  const [price, setPrice] = useState(0.1); // Значение цены по умолчанию

  useEffect(() => {
    const fetchPayment = async () => {
      const paymentAmount = await calcPayment();
      setPrice(paymentAmount);
    };
    setTimeout(fetchPayment, 500);
  }, [intentPeriod])

  const calcPayment = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const intentsNFTAddress = networkConfig.intentsnft;

      const intentsNFT = new ethers.Contract(
        intentsNFTAddress,
        [
          "function calcPayment(address paymentToken, uint256 period) public view returns(uint256)",
        ],
        signer
      );
      const eth = '0x0000000000000000000000000000000000000000'
      const secondsInMonth = 2_678_400

      const intentPeriodInSeconds = intentPeriod * secondsInMonth
      const paymentAmountRaw = await intentsNFT.calcPayment(eth, intentPeriodInSeconds);
      const paymentAmount = ethers.formatUnits(paymentAmountRaw, 18);
      return paymentAmount
    } catch (error) {
      console.error("Error during approve:", error);
      return '0.0'
    }
  }

  const handleMint = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const intentsNFTAddress = networkConfig.intentsnft;

      const intentsNFT = new ethers.Contract(
        intentsNFTAddress,
        [
          "function mintTo(address paymentToken, address to, uint256 period) public payable override returns (uint256 intentId)",
          "function calcPayment(address paymentToken, uint256 period) public view returns(uint256)",
        ],
        signer
      );
      const eth = '0x0000000000000000000000000000000000000000'
      const secondsInMonth = 2_678_400

      const intentPeriodInSeconds = intentPeriod * secondsInMonth
      const paymentAmountRaw = await intentsNFT.calcPayment(eth, intentPeriodInSeconds);
      
      const tx = await intentsNFT.mintTo(eth, receiver, intentPeriodInSeconds)
      await tx.wait()      
    
    } catch (error) {
      console.error("Error during approve:", error);
      
    }
  };

  const handleReceiverMyAddress = () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed.");
      return;
    }
    const fetchAddress = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return signer.address
    }
    fetchAddress().then((address) => {
      setReceiver(address)
    })
  }

  return (
    <div className="mint-intent-container">
      <div className="mint-intent-title">Mint Intent</div>
      <div className="mint-intent-description">Intent for grinderAI to grind all pools related to your wallet</div>

      <div className="intent-period">
        <label className="label">Intent Period ~ ({intentPeriod} months)</label>
        <input
          type="range"
          min="1"
          max="12"
          value={intentPeriod}
          onChange={(e) => setIntentPeriod(e.target.value)}
          className="slider"
        />
        <div className="slider-value"></div>
      </div>

      <div className="form-group">
        <label className="label">Receiver 
          <button className="receiver-button" onClick={handleReceiverMyAddress}>My Address</button>
          </label>
        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="Enter receiver address"
          className="input"
        />
      </div>

      <div className="price-container">
        <span className="price-label">Price:</span> <span className="price-value">{price} ETH</span>
      </div>

      <button onClick={handleMint} className="mint-button">
        Mint
      </button>
    </div>
  );
}

export default MintIntent;