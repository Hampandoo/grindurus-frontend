import React, { useEffect, useState } from 'react';
import './GRETHMint.css';
import { useContractService } from '../../../context/ContractContext';
import { ethers } from 'ethers';
import config from '../../../config';

import { Button, FormControl, TextField, Checkbox } from '@mui/material';

function GRETHMint({ networkConfig }) {
  const { provider } = useContractService();

  const [mintAmount, setMintAmount] = useState('');
  const [selectedTokenId, selectedTokenIdId] = useState(0);
  const [defaultRecieverWalletAdress, setDefaultRecieverWalletAdress] = useState('');
  const [recieverWalletAdress, setRecieverWalletAdress] = useState('');
  const [estimatedTokenAmount, setEstimatedTokenAmount] = useState(0);

  // Form state
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

    // After connect - Set user wallet address as default for handle mintTo function (recieves 3 arguments, wallet as last arg)
    setUserWalletAddress();
  }, [provider]);

  const handleMint = async (e) => {
    e.preventDefault();
    try {
      // Prevent sending empty field
      if (!mintAmount || mintAmount < 0) return;

      // Get reciever, if flag true - get address from input, else from user wallet
      const reciever = isChangedAddress ? recieverWalletAdress : defaultRecieverWalletAdress;
      // Create contract
      const grETHContract = await getGrethContract();
      // 
      await grETHContract.mintTo(reciever, { value: ethers.parseUnits(mintAmount, 18) }).then(resp => console.log(resp))

    } catch (error) {
      console.error("Mint failed:", error);
    }
  };
  

  const handleMaxClick = () => {
    setMintAmount('100'); // Предполагаем, что максимум 100
  };

  return (
    <div className="greth-burn">
        <div className="greth-burn-title">
          You can exchange grETH to token
        </div>
        <form className="exchange-form">
          <div className="form-group">
            <label htmlFor="burn-amount">grETH to mint (ETH)</label>
            <div className="input-wrapper">
              <FormControl fullWidth>
                <TextField
                  id="burn-amount"
                  value={mintAmount}
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
                  placeholder="0 ETH"
                  className="input-field"
                  onChange={(e) => setMintAmount(e.target.value)}
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

          {/* <p className="estimated-text">Estimated token amount: <span className="font-medium">{`${estimatedTokenAmount}`}</span></p> */}
          <Button
            className="submit-button"
            disabled={mintAmount <= 0}
            sx={{
              borderRadius: "8px",
              fontWeight: 700,
              minWidth: "unset",
              "&.Mui-disabled": {
                backgroundColor: "rgba(1,1,1,0)",
                borderStyle: "solid",
                borderColor: mintAmount <= 0 ? "#949494 !important" : "transparent",
                borderWidth: mintAmount <= 0 ? "2px" : "0",
                color: "#949494",
              },
              color: "#006f16",
              backgroundColor: "#C1FBBA",
              textTransform: "none",
              fontSize: "20px",
              lineHeight: 1,
              height: "42px"
            }}
            // loading={waitMint}
            onClick={handleMint}
          >Mint</Button>
        </form>
    </div>
  );
}

export default GRETHMint;
