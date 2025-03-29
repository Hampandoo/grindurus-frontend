import React, { useState } from 'react';
import {ethers} from 'ethers';
import './GrinderAIDeposit.css';
import logoUSDT from '../../../assets/images/logoUSDT.png';
import logoUSDC from '../../../assets/images/logoUSDC.png';
import logoWETH from '../../../assets/images/logoWETH.png';
import logoWBTC from '../../../assets/images/logoWBTC.png';

function GrinderAIDeposit({ networkConfig }) {

  const [selectedStrategyId, setSelectedStrategyId] = useState(0);
  const [selectedQuoteTokenId, setSelectedQuoteTokenId] = useState(0);
  const [selectedBaseTokenId, setSelectedBaseTokenId] = useState(0);
  const [quoteTokenAmount, setQuoteTokenAmount] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  const handleAutofill = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedStrategyId(1);
      setSelectedQuoteTokenId(0);
      setSelectedBaseTokenId(0);
      setQuoteTokenAmount('100');
      setIsLoading(false);
    }, 2000); // 2 seconds
  };

  const handleApprove = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const quoteTokenInfo = networkConfig.quoteTokens[selectedQuoteTokenId];

      const quoteToken = new ethers.Contract(
        quoteTokenInfo.address,
        [
          "function approve(address spender, uint256 amount) public returns (bool)",
        ],
        signer
      );
      const spenderAddress = networkConfig.poolsnft;

      const amount = ethers.parseUnits(quoteTokenAmount, quoteTokenInfo.decimals);

      const tx = await quoteToken.approve(spenderAddress, amount);

      await tx.wait();

    } catch (error) {
      alert("Failed to approve tokens.");
    }
  }

  const handleDeposit = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const poolsNFTAddress = networkConfig.poolsnft;
      const strategyId = networkConfig.strategies[selectedStrategyId].id;
      const quoteTokenInfo = networkConfig.quoteTokens[selectedQuoteTokenId];
      const baseTokenInfo = networkConfig.baseTokens[selectedBaseTokenId];

      const poolsNFT = new ethers.Contract(
        poolsNFTAddress,
        [
          "function mint(uint16 strategyId,address quoteToken,address baseToken,uint256 quoteTokenAmount)",
        ],
        signer
      );
      const quoteTokenAmountRaw = ethers.parseUnits(quoteTokenAmount, quoteTokenInfo.decimals)
      console.log(strategyId)
      console.log(quoteTokenInfo.address)
      console.log(baseTokenInfo.address)
      const tx = await poolsNFT.mint(
        strategyId,
        quoteTokenInfo.address,
        baseTokenInfo.address,
        quoteTokenAmountRaw
      );

      await tx.wait();

    } catch (error) {
      console.error("Error during approve:", error);
    }

  }
  
  const handleMaxDepositQuoteToken = async () => {}

  return (
    <div className="grinderai-deposit-container">
      <div className='grinderai-label'>
        Deposit via Grinder AI Agent
      </div>
      <div>
        <button className='grinderai-fill' onClick={handleAutofill} disabled={isLoading}>
          {isLoading && <span className="spinner"></span>}
          {isLoading ? 'Asking GrinderAI Agent...' : 'Autofill fields via Grinder AI Agent'}
        </button>
        <div>
          {/** add here loading, if button is clicked */}
        </div>
      </div>
      <div className="form-group">
        <div className="label-container">Strategy</div>
        <div className="select-with-icon">
          <select value={selectedStrategyId} onChange={(e) => setSelectedStrategyId(e.target.value)}>
            {networkConfig.strategies.map((strategy, index) => (
              <option key={index} value={index}>
                {strategy.id}) {strategy.description}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group">
        <div className="label-container">
          Quote Token
        </div>
        <div className="select-with-icon">
          <img
            src={networkConfig.quoteTokens[selectedQuoteTokenId]?.logo}
            alt={networkConfig.quoteTokens[selectedQuoteTokenId]?.symbol}
            className="token-icon"
          />
          <select
            value={selectedQuoteTokenId}
            onChange={(e) => setSelectedQuoteTokenId(e.target.value)}
          >
            {networkConfig.quoteTokens.map((tokenInfo, index) => (
              <option key={index} value={index}>
                {tokenInfo.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group">
        <div className="label-container">
          Base Token
        </div>
        <div className="select-with-icon">
        <img
          src={networkConfig.baseTokens[selectedBaseTokenId]?.logo}
          alt={networkConfig.baseTokens[selectedBaseTokenId]?.symbol}
          className="token-icon"
        />
        <select
          value={selectedBaseTokenId}
          onChange={(e) => setSelectedBaseTokenId(e.target.value)}
        >
          {networkConfig.baseTokens.map((tokenInfo, index) => (
            <option key={index} value={index}>
              {tokenInfo.symbol}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className="form-group">
        <div className="label-container">
          Deposit Quote Token
        </div>
        <div className="input-with-max">
          <img
            src={networkConfig.quoteTokens[selectedQuoteTokenId]?.logo}
            alt={networkConfig.quoteTokens[selectedQuoteTokenId]?.symbol}
            className="token-icon"
          />
          <input
            value={quoteTokenAmount}
            onChange={(e) => setQuoteTokenAmount(e.target.value)}
            placeholder="100500"
            className="input-field"
          />
          <button
            type="button"
            className="max-button"
            onClick={() => handleMaxDepositQuoteToken()}
          >
            MAX
          </button>
        </div>
      </div>
      <div className="button-group">
        <button className="approve-button" onClick={handleApprove}>
          Approve Quote Token
        </button>
        <button className="mint-button" onClick={handleDeposit}>
          Deposit
        </button>
      </div>
    </div>
  );
}

export default GrinderAIDeposit;