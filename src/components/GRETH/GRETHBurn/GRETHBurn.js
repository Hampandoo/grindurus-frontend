import React, { useEffect, useState } from 'react';
import './GRETHBurn.css';
import { useContractService } from '../../../context/ContractContext';
import { ethers } from 'ethers';
import config from '../../../config';

import { Button, FormControl, TextField, Select, MenuItem, Checkbox } from '@mui/material';

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
          Exchange grETH to Token
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
                        borderRadius: "8px",
                        color: "white",
                        backgroundColor: "black",
                        border: "1px solid white",
                        '& .MuiSelect-icon': {
                          color: 'white',
                        }
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

          <div className="form-group-1">
          <label htmlFor="token-select">
          <Checkbox
              checked={isChangedToken}
              onChange={(e) => setIsChangedToken(e.target.checked)}
              sx={{
                color: 'white',
                '&.Mui-checked': {
                  color: 'white',
                },
              }}
            />
            Token to earn (optional)
          </label>
            {isChangedToken && <div className="form-group-w-icon">
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
                    borderRadius: "8px",
                    color: "white",
                    backgroundColor: "black",
                    border: "1px solid white",
                    '& .MuiSelect-icon': {
                      color: 'white',
                    }
                  }}
                  onChange={(e) => selectedTokenIdId(e.target.value)}
                >
                  {networkConfig.baseTokens.map((tokenInfo, index) => (
                    <MenuItem key={index} value={index}>{tokenInfo.symbol}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div> }
          </div>

          <div className="form-group-1">
            <label htmlFor="token-select">
            <Checkbox
              checked={isChangedAddress}
              onChange={(e) => setIsChangedAddress(e.target.checked)}
              sx={{
                color: 'white',
                '&.Mui-checked': {
                  color: 'white',
                },
              }}
            />
              Reciever wallet (optional)
            </label>
            {isChangedAddress && <FormControl fullWidth>
              <TextField
                id="burn-amount"
                value={recieverWalletAdress}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "42px",
                    borderRadius: "8px",
                    color: "white",
                    backgroundColor: "black",
                    border: "1px solid white",
                    '& .MuiSelect-icon': {
                      color: 'white',
                    }
                  },
              }}
                placeholder="0x..."
                className="input-field"
                onChange={(e) => setRecieverWalletAdress(e.target.value)}
              />
            </FormControl>}
          </div>

          <p className="estimated-text">Estimated token amount: <span className="font-medium">{`${estimatedTokenAmount}`}</span></p>
          <Button
            className="submit-button"
            disabled={burnAmount <= 0}
            // variant={waitMint ? 'variant' : 'contained'}
            // disabled={quoteTokenAmount <= 0 || allowance < quoteTokenAmount}
            sx={{
              borderRadius: "8px",
              fontWeight: 700,
              minWidth: "unset",
              backgroundColor: "#f7e1fc",
              borderColor: "transparent",
              borderWidth: "0",
              borderStyle: "solid",
              color: "#c556db",
              textTransform: "none",
              fontSize: "20px",
              lineHeight: 1,
              height: "42px",
              "&.Mui-disabled": {
                backgroundColor: "rgba(1,1,1,0)",
                borderStyle: "solid",
                borderColor: burnAmount <= 0 ? "#949494 !important" : "transparent",
                borderWidth: burnAmount <= 0 ? "2px" : "0",
                color: "#949494",
              },
            }}
            // loading={waitMint}
            onClick={handleBurn}
          >Burn</Button>
        </form>
    </div>
  );
}

export default GRETHBurn;
