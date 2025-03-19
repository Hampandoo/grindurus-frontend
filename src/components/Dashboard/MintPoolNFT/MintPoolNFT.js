import React, { useState, useEffect } from 'react';
import config from '../../../config';
import {ethers} from 'ethers';
import { Select, MenuItem, FormControl, TextField, Button } from "@mui/material";
import './MintPoolNFT.css';
import { useContractService } from '../../../context/ContractContext';


function MintPoolNFT({ networkConfig }) {
  const { signer } = useContractService();

  const [isApproved, setIsApproved] = useState(false);

  const [selectedStrategyId, setSelectedStrategyId] = useState(0);
  const [selectedQuoteTokenId, setQuoteTokenId] = useState(0);
  const [selectedBaseTokenId, setBaseTokenId] = useState(0);
  const [quoteTokenAmount, setQuoteTokenAmount] = useState('');

  useEffect(() => {

  }, [networkConfig]);

  const handleMaxDepositQuoteToken = async () => {
    try {
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

      setIsApproved(true);

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
        <FormControl fullWidth>
          {/* <InputLabel>Виберіть опцію</InputLabel> */}
          <Select
            value={selectedStrategyId}
            sx={{
              height: "42px",
              borderRadius: "8px"
            }}
            onChange={(e) => setSelectedStrategyId(e.target.value)}
          >
            {networkConfig.strategies.map((strategy, index) => (
              <MenuItem key={index} value={index}>{strategy.description}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
          <FormControl fullWidth>
            {/* <InputLabel>Виберіть опцію</InputLabel> */}
            <Select
              value={selectedQuoteTokenId}
              sx={{
                height: "42px",
                borderRadius: "8px"
              }}
              onChange={(e) => setQuoteTokenId(e.target.value)}
            >
              {networkConfig.quoteTokens.map((tokenInfo, index) => (
                <MenuItem key={index} value={index}>{tokenInfo.symbol}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
        <FormControl fullWidth>
          {/* <InputLabel>Виберіть опцію</InputLabel> */}
          <Select
            value={selectedBaseTokenId}
            sx={{
              height: "42px",
              borderRadius: "8px"
            }}
            onChange={(e) => setBaseTokenId(e.target.value)}
          >
            {networkConfig.baseTokens.map((tokenInfo, index) => (
              <MenuItem key={index} value={index}>{tokenInfo.symbol}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
            className="token-icon token-last-icon"
          />
          <FormControl fullWidth>
            <TextField
              value={quoteTokenAmount}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                    height: "42px",
                    borderRadius: "8px"
                  },
              }}
              placeholder="0"
              onChange={(e) => setQuoteTokenAmount(e.target.value)}
            />
          </FormControl>
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
        {!isApproved ? (
          <Button
            className="approve-button"
            variant="contained"
            disabled={quoteTokenAmount <= 0}
            sx={{
              borderRadius: "8px",
              fontWeight: 700,
              minWidth: "unset",
              backgroundColor: "#f7e1fc",
              color: "#c556db",
              textTransform: "none",
              fontSize: "20px",
              lineHeight: 1,
              height: "42px"
            }}
            onClick={handleApprove}
          >Approve Quote Token</Button>
        ) : (
          <Button
            className="mint-button"
            variant="contained"
            disabled={quoteTokenAmount <= 0}
            sx={{
              borderRadius: "8px",
              fontWeight: 700,
              minWidth: "unset",
              backgroundColor: "#c1fbba",
              color: "#006f16",
              textTransform: "none",
              fontSize: "20px",
              lineHeight: 1,
              height: "42px"
            }}
            onClick={handleMint}
          >Mint Pool</Button>
        )}
      </div>
    </div>
  );
}

export default MintPoolNFT;