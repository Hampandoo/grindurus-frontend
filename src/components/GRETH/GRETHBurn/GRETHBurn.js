import React, { useEffect, useState } from 'react';
import './GRETHBurn.css';
import { useContractService } from '../../../context/ContractContext';
import { ethers } from 'ethers';
import config from '../../../config';

import { Button, FormControl, TextField, Select, MenuItem } from '@mui/material';

function GRETHBurn({ networkConfig }) {
  const { provider } = useContractService();

  const [burnAmount, setBurnAmount] = useState('');
  const [selectedTokenId, selectedTokenIdId] = useState(0);
  const [defaultRecieverWalletAdress, setDefaultRecieverWalletAdress] = useState('');
  const [recieverWalletAdress, setRecieverWalletAdress] = useState('');
  const [estimatedTokenAmount, setEstimatedTokenAmount] = useState(0);

  // Form state
  const [isChangedToken, setIsChangedToken] = useState(false);
  const [isChangedAddress, setIsChangedAddress] = useState(false);

  const setUserWalletAddress = async () => {
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setDefaultRecieverWalletAdress(address);
  }
  const getGrethContract = async () => {
    if (!provider) console.error('Provider not found')
    const signer = await provider.getSigner();
    const grethAddress = networkConfig.GRETH;
    return new ethers.Contract(grethAddress, networkConfig.grethABI, signer);
  }

  useEffect(() => {
    if (!provider) return;

    // After connect - Set user wallet address as default for handle burnTo function (recieves 3 arguments, wallet as last arg)
    setUserWalletAddress();
  }, [provider]);

  useEffect(() => {
    getGrethContract()
      .then((resp) => {
        if (!resp) return;
        // TODO//: Input value can't be more than user balance of grETH - grethToken.balansOf(userAddress)
        resp.calcShare(ethers.parseUnits(`${burnAmount}` || "0", 18), networkConfig.quoteTokens[selectedTokenId].address)
          .then((resp) => {
            setEstimatedTokenAmount(ethers.formatUnits(resp, networkConfig.quoteTokens[selectedTokenId].decimals));
          })
          .catch(e => {
            console.dir(e);
          })
      })
    
  }, [burnAmount, selectedTokenId]);

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
    <div className="greth-burn">
        <div className="greth-burn-title">
          You can exchange grETH to token
        </div>
        <form className="exchange-form">
          <div className="form-group">
            <label htmlFor="burn-amount">grETH to burn</label>
            <div className="input-wrapper">
              <FormControl fullWidth>
                <TextField
                  id="burn-amount"
                  value={burnAmount}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                        height: "42px",
                        borderRadius: "8px"
                      },
                  }}
                  placeholder="0"
                  className="input-field"
                  onChange={(e) => setBurnAmount(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleMaxClick}
                  className="max-button"
                >
                  Max
                </button>
              </FormControl>
            </div>
          </div>

          <input value={isChangedToken} onChange={(e) => setIsChangedToken(e.target.checked)} type="checkbox" />
          {isChangedToken && <div className="form-group">
            <label htmlFor="token-select">Token to earn (optional)</label>
            <div className="form-group-w-icon">
              <img
                src={networkConfig.quoteTokens[selectedTokenId]?.logo}
                alt={networkConfig.quoteTokens[selectedTokenId]?.symbol}
                className="token-icon"
              />
              <FormControl fullWidth>
                {/* <InputLabel>Виберіть опцію</InputLabel> */}
                <Select
                  value={selectedTokenId}
                  sx={{
                    height: "42px",
                    borderRadius: "8px"
                  }}
                  onChange={(e) => selectedTokenIdId(e.target.value)}
                >
                  {networkConfig.baseTokens.map((tokenInfo, index) => (
                    <MenuItem key={index} value={index}>{tokenInfo.symbol}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>}

          <input value={isChangedAddress} onChange={(e) => setIsChangedAddress(e.target.checked)} type="checkbox" />
          {isChangedAddress && <div className="form-group">
            <label htmlFor="token-select">Reciever wallet (optional)</label>
            <FormControl fullWidth>
              <TextField
                id="burn-amount"
                value={recieverWalletAdress}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                      height: "42px",
                      borderRadius: "8px"
                    },
                }}
                placeholder="0x..."
                className="input-field"
                onChange={(e) => setRecieverWalletAdress(e.target.value)}
              />
            </FormControl>
          </div>}

          <p className="estimated-text">Estimated token amount: <span className="font-medium">{`${estimatedTokenAmount}`}</span></p>
          <Button
            className="submit-button"
            // variant={waitMint ? 'variant' : 'contained'}
            // disabled={quoteTokenAmount <= 0 || allowance < quoteTokenAmount}
            sx={{
              borderRadius: "8px",
              fontWeight: 700,
              minWidth: "unset",
              // backgroundColor: waitMint ? "transparent" : "#c1fbba",
              // borderColor: waitMint ? "#c1fbba" : "transparent",
              // borderWidth: waitMint ? "2px" : "0",
              "&.Mui-disabled": {
                backgroundColor: "rgba(1,1,1,0)",
                borderStyle: "solid",
                // borderColor: quoteTokenAmount <= 0 ? "rgba(51, 51, 51, 0.1)" : "transparent",
                // borderWidth: quoteTokenAmount <= 0 ? "2px" : "0",
              },
              color: "#006f16",
              textTransform: "none",
              fontSize: "20px",
              lineHeight: 1,
              height: "42px"
            }}
            // loading={waitMint}
            onClick={handleBurn}
          >Burn</Button>
        </form>
    </div>
  );
}

export default GRETHBurn;
