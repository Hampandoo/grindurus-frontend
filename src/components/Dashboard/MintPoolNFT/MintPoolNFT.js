import React, { useState, useEffect } from 'react';
import config from '../../../config';
import {ethers} from 'ethers';
import { Select, MenuItem, FormControl, TextField, Button, Paper } from "@mui/material";
import './MintPoolNFT.css';
import { useContractService } from '../../../context/ContractContext';

import { selectStyles, menuProps, menuItemStyles, menuTokenItemStyles } from '../../../styles';

function MintPoolNFT({ networkConfig }) {
  const { provider } = useContractService();

  const [isApproved, setIsApproved] = useState(false);
  const [allowance, setAllowance] = useState(0);

  const [selectedStrategyId, setSelectedStrategyId] = useState(0);
  const [selectedQuoteTokenId, setQuoteTokenId] = useState(networkConfig.quoteTokens[1].symbol);
  const [selectedBaseTokenId, setBaseTokenId] = useState(networkConfig.baseTokens[0].symbol);
  const [quoteTokenAmount, setQuoteTokenAmount] = useState('');
  const [mode, setMode] = useState("manual");

  // Loading button states
  const [waitApproving, setWaitApproving] = useState(false);
  const [waitMint, setWaitMint] = useState(false);

  // Provider added as dependency for checking allowance after user connect wallet
  useEffect(() => {
    checkAllowance();
  }, [networkConfig, selectedQuoteTokenId, provider]);
  useEffect(() => {
    if (allowance > 0 && quoteTokenAmount <= allowance) {
      setIsApproved(true);
    } else if (allowance > 0) {
      setIsApproved(false);
    } else {
      setIsApproved(false);
    }
  }, [quoteTokenAmount]);

  const checkAllowance = async () => {
    try {
      if (!provider) {
        return;
      }
        const signer = await provider.getSigner();
        const userAddress = signer.getAddress();
        const spenderAddress = networkConfig.poolsnft;

        const quoteTokenInfo = networkConfig.quoteTokens[selectedQuoteTokenId];

        const quoteToken = new ethers.Contract(
            quoteTokenInfo.address,
            ["function allowance(address owner, address spender) external view returns (uint256)"],
            signer
        );

        const allowanceRaw = await quoteToken.allowance(userAddress, spenderAddress);
        const allowanceFormatted = ethers.formatUnits(allowanceRaw, quoteTokenInfo.decimals);
        setAllowance(allowanceFormatted);
    } catch (error) {
        console.error("Error checking allowance:", error);
        // alert("Failed to check token allowance.");
    }
} ;

  const handleMaxDepositQuoteToken = async () => {
    try {
      if (!provider) {
        return;
      }
      setWaitApproving(true);
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
    } finally {
      setWaitApproving(false);
    }
  }

  const handleApprove = async () => {
    try {
      if (!provider) {
        return;
      }
      setWaitApproving(true);
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
      setIsApproved(true);

    } catch (error) {
      alert("Failed to approve tokens.");
    } finally {
      setWaitApproving(false);
    }
  };

  const handleMint = async () => {
    try {
      if (!provider) {
        return;
      }
      setWaitMint(true);
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
      const tx = await poolsNFT.mint(
        strategyId,
        baseTokenInfo.address,
        quoteTokenInfo.address,
        quoteTokenAmountRaw
      );

      await tx.wait();

    } catch (error) {
      console.error("Error during approve:", error);
    } finally {
      setWaitMint(false);
    }
  };
  
  useEffect(() => {
    // Select state - change quote token if user changed base token to the same
    if (selectedQuoteTokenId === selectedBaseTokenId) {
      setQuoteTokenId(networkConfig.quoteTokens[1].symbol === selectedBaseTokenId ? networkConfig.quoteTokens[0].symbol : networkConfig.quoteTokens[1].symbol);
    }
  }, [selectedBaseTokenId])

  return (
    <div className="mint-form">
      <div className="form">
        <div className="mint-form-header">
          <h2 className="mint-form-title">Deposit</h2>
          <button className={`mint-form-autofill ${mode === "grinder" ? "active" : ""}`}>Autofill Fields</button>
        </div>
        <div className="mode-select">
          <button 
              onClick={() => setMode("manual")} 
              className={`mode-button ${mode === "manual" ? "active" : ""}`}
            >
              Manual Deposit
            </button>
            <button 
              onClick={() => setMode("grinder")} 
              className={`mode-button ${mode === "grinder" ? "active" : ""}`}
            >
              Deposit via GrinderAi
            </button>
        </div>
        <div className="form-group">
          <div className="form-label">Strategy</div>
          <div className="form-select">
          <FormControl fullWidth>
            <Select
              value={selectedStrategyId}
              sx={selectStyles} 
              MenuProps={menuProps}
              onChange={(e) => setSelectedStrategyId(e.target.value)}
            >
              {networkConfig.strategies.map((strategy, index) => (
                <MenuItem key={index} value={index} sx={menuItemStyles}>
                  {strategy.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </div>
        </div>
        <div className="form-group">
          <div className="form-label">
            Base Token
          </div>
          <div className="form-select">
          <FormControl fullWidth>
            <Select
              value={selectedBaseTokenId}
              sx={selectStyles} 
              MenuProps={menuProps}
              onChange={(e) => setBaseTokenId(e.target.value)}
            >
              {networkConfig.baseTokens.map((tokenInfo, index) => (
                <MenuItem key={index} value={tokenInfo.symbol} sx={menuTokenItemStyles}>
                  <img
                    src={networkConfig.baseTokens.find(token => token.symbol === tokenInfo.symbol)?.logo}
                    alt={networkConfig.baseTokens.find(token => token.symbol === tokenInfo.symbol)?.symbol}
                    className="token-icon"
                  />
                  {tokenInfo.symbol}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </div>
        </div>
        <div className="form-group">
          <div className="form-label">
            Quote Token
          </div>
          <div className="form-select">
            <FormControl fullWidth>
              <Select
                value={selectedQuoteTokenId}
                sx={selectStyles} 
                MenuProps={menuProps}
                onChange={(e) => setQuoteTokenId(e.target.value)}
              >
                {networkConfig.quoteTokens.filter((token) => token.symbol != selectedBaseTokenId).map((tokenInfo, index) => (
                  <MenuItem key={index} value={tokenInfo.symbol} sx={menuTokenItemStyles}>
                    <img
                      src={networkConfig.quoteTokens.find(token => token.symbol === tokenInfo.symbol)?.logo}
                      alt={networkConfig.quoteTokens.find(token => token.symbol === tokenInfo.symbol)?.symbol}
                      className="token-icon"
                    />
                    {tokenInfo.symbol}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="form-group">
          <div className="form-label">
            Quote Token Amount
          </div>
          <div className="form-input">
            <input
              value={quoteTokenAmount}
              placeholder="0"
              onChange={(e) => setQuoteTokenAmount(e.target.value)}
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
        <div className="form-buttons">
          {!isApproved ? (
            <button
              className="button approve-button"
              onClick={handleApprove}
            >Approve</button>
          ) : (
            <button
              className="button mint-button"
              onClick={handleMint}
            >Mint</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MintPoolNFT;