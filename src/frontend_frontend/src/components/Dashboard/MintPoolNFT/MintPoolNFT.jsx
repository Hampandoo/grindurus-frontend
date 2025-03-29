import React, { useState, useEffect } from 'react';
import config from '../../../config';
import {ethers} from 'ethers';
import './MintPoolNFT.css';
import logoUSDT from '../../../assets/images/logoUSDT.png';
import logoUSDC from '../../../assets/images/logoUSDC.png';
import logoWETH from '../../../assets/images/logoWETH.png';
import logoWBTC from '../../../assets/images/logoWETH.png';


function MintPoolNFT({ networkConfig }) {

  const [lookOnchain, setLookOnchain] = useState(false);
  const [strategies, setStrategies] = useState([]);
  const [quoteTokens, setQuoteTokens] = useState([]);
  const [baseTokens, setBaseTokens] = useState([]);
  const [strategyDescriptions, setStrategyDescriptions] = useState([]);

  const [selectedStrategyId, setSelectedStrategyId] = useState(0);
  const [selectedQuoteTokenId, setQuoteTokenId] = useState(0);
  const [selectedBaseTokenId, setBaseTokenId] = useState(0);
  const [quoteTokenAmount, setQuoteTokenAmount] = useState('');


  useEffect(() => {

  }, [networkConfig]);

  const fetchRegistryData = async () => {
    
    if (!lookOnchain) {
      return;
    }
    if (!window.ethereum) {
      alert('MetaMask is not installed.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Адрес реестра из config
      const registryAddress = networkConfig.registry;

      // ABI интерфейса IRegistry
      const registryABI = [
        'function getStrategyIds() external view returns (uint256, uint16[] memory)',
        'function getStrategiesDescriptions(uint16[] memory strategyIds) external view returns (string[] memory)',
        'function getQuoteTokens() external view returns (uint256, address[] memory)',
        'function getBaseTokens() external view returns (uint256, address[] memory)'
      ];

      const registryContract = new ethers.Contract(registryAddress, registryABI, signer);

      const [strategyCount, strategyIds] = await registryContract.getStrategyIds();
      console.log(strategyIds)
      const strategyIdsArray = Array.from(Object.values(strategyIds)).filter((id) => typeof id === 'bigint');
      const strategyDescriptions = await registryContract.getStrategiesDescriptions(strategyIdsArray);

      const [quoteTokenCount, quoteTokens] = await registryContract.getQuoteTokens();
      const [baseTokenCount, baseTokens] = await registryContract.getBaseTokens();

      setStrategies(strategyIds.map((id, index) => ({ id: id.toString(), description: strategyDescriptions[index] })));
      setQuoteTokens(quoteTokens.map((address) => ({ address, symbol: `Token ${address}` })));
      setBaseTokens(baseTokens.map((address) => ({ address, symbol: `Token ${address}` })));
    } catch (error) {
      console.error('Failed to fetch data from the registry contract:', error);
      alert('Failed to fetch data from the contract.');
    }
  };

  const handleMaxDepositQuoteToken = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const quoteTokenInfo = networkConfig.quoteTokens[selectedQuoteTokenId];
      const quoteToken = new ethers.Contract(
        quoteTokenInfo.address,
        [
          "function balanceOf(address) external view returns (uint256)",
        ],
        signer
      );
      const balanceRaw = await quoteToken.balanceOf(signer.address) 
      const balance = ethers.formatUnits(balanceRaw, quoteTokenInfo.decimals)
      setQuoteTokenAmount(balance)
    } catch {
      alert("Failed to fetch balance");
    }
  }

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

  };

  const handleMint = async () => {
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
  };

  return (
    <div className="mint-nft-pool">
      <div className='mint-nft-label'>Mint Pool NFT</div>
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
            onChange={(e) => setQuoteTokenId(e.target.value)}
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
          onChange={(e) => setBaseTokenId(e.target.value)}
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
        <button className="mint-button" onClick={handleMint}>
          Mint Pool
        </button>
      </div>
    </div>
  );
}

export default MintPoolNFT;