import React, { useState, useEffect } from 'react';
import config from '../../../config';
import {ethers} from 'ethers';
import { Select, MenuItem, FormControl, TextField, Button } from "@mui/material";
import './MintPoolNFT.css';
import { useContractService } from '../../../context/ContractContext';


function MintPoolNFT({ networkConfig }) {
  const { provider } = useContractService();

  const [isApproved, setIsApproved] = useState(false);
  const [allowance, setAllowance] = useState(0);

  const [selectedStrategyId, setSelectedStrategyId] = useState(0);
  const [selectedQuoteTokenId, setQuoteTokenId] = useState(1);
  const [selectedBaseTokenId, setBaseTokenId] = useState(0);
  const [quoteTokenAmount, setQuoteTokenAmount] = useState('');

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
            variant={waitApproving ? 'variant' : 'contained'}
            disabled={quoteTokenAmount <= 0}
            sx={{
              borderRadius: "8px",
              fontWeight: 700,
              minWidth: "unset",
              backgroundColor: waitApproving ? "transparent" : "#f7e1fc",
              borderColor: waitApproving ? "#f7e1fc" : "transparent",
              borderWidth: waitApproving ? "2px" : "0",
              "&.Mui-disabled": {
                backgroundColor: "rgba(1,1,1,0)",
                borderStyle: "solid",
                borderColor: quoteTokenAmount <= 0 ? "rgba(51, 51, 51, 0.1)" : "transparent",
                borderWidth: quoteTokenAmount <= 0 ? "2px" : "0",
              },
              borderStyle: "solid",
              color: "#c556db",
              textTransform: "none",
              fontSize: "20px",
              lineHeight: 1,
              height: "42px"
            }}
            loading={waitApproving}
            onClick={handleApprove}
          >Approve Quote Token</Button>
        ) : (
          <Button
            className="mint-button"
            variant={waitMint ? 'variant' : 'contained'}
            disabled={quoteTokenAmount <= 0 || allowance < quoteTokenAmount}
            sx={{
              borderRadius: "8px",
              fontWeight: 700,
              minWidth: "unset",
              backgroundColor: waitMint ? "transparent" : "#c1fbba",
              borderColor: waitMint ? "#c1fbba" : "transparent",
              borderWidth: waitMint ? "2px" : "0",
              "&.Mui-disabled": {
                backgroundColor: "rgba(1,1,1,0)",
                borderStyle: "solid",
                borderColor: quoteTokenAmount <= 0 ? "rgba(51, 51, 51, 0.1)" : "transparent",
                borderWidth: quoteTokenAmount <= 0 ? "2px" : "0",
              },
              color: "#006f16",
              textTransform: "none",
              fontSize: "20px",
              lineHeight: 1,
              height: "42px"
            }}
            loading={waitMint}
            onClick={handleMint}
          >Mint Pool</Button>
        )}
      </div>
    </div>
  );
}

export default MintPoolNFT;