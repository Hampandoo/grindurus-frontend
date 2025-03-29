import React, { useEffect, useState } from 'react';
import './GRETHBurn.css';
import { useContractService } from '../../../context/ContractContext';
import { ethers } from 'ethers';
import config from '../../../config';

import { Button, FormControl, TextField, Select, MenuItem, Checkbox } from '@mui/material';

function GRETHBurn() {
  const { provider } = useContractService();
  const { networkConfig, isConnected } = useContractService();

  const [burnAmount, setBurnAmount] = useState('');
  const [selectedTokenId, selectedTokenIdId] = useState(0);
  const [defaultRecieverWalletAdress, setDefaultRecieverWalletAdress] = useState('');
  const [recieverWalletAdress, setRecieverWalletAdress] = useState('');
  const [estimatedTokenAmount, setEstimatedTokenAmount] = useState(0);

  const [selectedBaseTokenId, setBaseTokenId] = useState(networkConfig.baseTokens[0].symbol);

  // Form state
  const [isChangedToken, setIsChangedToken] = useState(false);
  const [isChangedAddress, setIsChangedAddress] = useState(false);

  const setUserWalletAddress = async () => {
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setDefaultRecieverWalletAdress(address);
  }
  const getGrethContract = async () => {
    if (!provider) {
      console.error('Provider not found')
      return
    }
    const signer = await provider.getSigner();
    const grethAddress = networkConfig.GRETH;
    return new ethers.Contract(grethAddress, networkConfig.grethABI, signer);
  }

  useEffect(() => {
    if (!provider) return;

    // After connect - Set user wallet address as default for handle burnTo function (recieves 3 arguments, wallet as last arg)
    setUserWalletAddress();
  }, [provider]);

  // useEffect(() => {
  //   getGrethContract()
  //     .then((resp) => {
  //       if (!resp) return;
  //       // TODO//: Input value can't be more than user balance of grETH - grethToken.balansOf(userAddress)
  //       resp.calcShare(ethers.parseUnits(`${burnAmount}` || "0", 18), networkConfig.quoteTokens[selectedTokenId].address)
  //         .then((resp) => {
  //           setEstimatedTokenAmount(ethers.formatUnits(resp, networkConfig.quoteTokens[selectedTokenId].decimals));
  //         })
  //         .catch(e => {
  //           console.dir(e);
  //         })
  //     })
    
  // }, [burnAmount, selectedTokenId]);

  const handleBurn = async (e) => {
    e.preventDefault();
    try {
      // Prevent sending empty field
      if (!burnAmount || burnAmount < 0) return;

      // Get reciever, if flag true - get address from input, else from user wallet
      const reciever = isChangedAddress ? recieverWalletAdress : defaultRecieverWalletAdress;
      // Get token, if flag true - from select, else WETH is a default token
      const token = isChangedToken ? networkConfig.quoteTokens[selectedTokenId].address : networkConfig.quoteTokens[0].address;
      // Create contract
      const grETHContract = await getGrethContract();
      // 
      await grETHContract.burnTo(ethers.parseUnits(burnAmount, 18), token, reciever).then(resp => console.log(resp))

    } catch (error) {
      console.error("Burn failed:", error);
    }
  };
  

  const handleMaxClick = () => {
    // TODO:// Use user wallet balance as max value
    setBurnAmount('100'); // Предполагаем, что максимум 100
  };

  return (
    <form className="burn-form form">
      <div className="form-group">
        <label className="form-label">Burn grETH Amount</label>
        <div className="form-input">
          <input
            value={burnAmount}
            variant="outlined"
            placeholder="0"
            onChange={(e) => setBurnAmount(e.target.value)}
          />
          <button
            type="button"
            onClick={handleMaxClick}
            className="max-button"
          >
            Max
          </button>
          </div>
      </div>

      <div className="form-group">
        <div className="form-label">Receive Token</div>
        <FormControl fullWidth>
          <Select
            value={selectedBaseTokenId}
            sx={{
              width: "100%",
              display: "flex",
              gap: "30px",
              justifyContent: "flex-start",
              fontFamily: "Noto Sans Mono",
              fontSize: "20px",
              fontWeight: "800",
              alignItems: "center",
              borderRadius: "8px",
              color: "white",
              backgroundColor: "black",
              border: "1px solid white",
              '& .MuiSelect-icon': {
                color: 'white',
              }, 
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '& .MuiSelect-select': {
                padding: '15px',
                color: 'white', 
              },
            }} MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                sx: {
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid white"
                },
              },
            }}
            onChange={(e) => setBaseTokenId(e.target.value)}
          >
            {networkConfig.baseTokens.map((tokenInfo, index) => (
              <MenuItem key={index} value={tokenInfo.symbol} sx={{
                display: "flex",
                alignItems: "center",
                color: "white",
                fontFamily: "Noto Sans Mono",
                fontSize: "20px",
                fontWeight: "800",
                backgroundColor: "#1a1a1a",
                padding: "15px",
                ":not(:last-child)": {
                  borderBottom: "1px solid white"
                }
              }}>
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

      <p className="form-label">Estimated token amount: {`${estimatedTokenAmount}`}</p>
      <button
        className="submit-button"
        onClick={handleBurn}
      >Burn</button>
    </form>
  );
}

export default GRETHBurn;
