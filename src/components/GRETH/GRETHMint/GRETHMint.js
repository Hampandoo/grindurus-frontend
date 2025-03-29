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
    <form className="greth-mint-form form">
      <div className="greth-mint-title">
        Mint grETH
      </div>
      <div className="form-group">
        <div className="form-label">grETH to mint (ETH)</div>
        <div className="form-input">
          <input
            value={mintAmount}
            variant="outlined"
            placeholder="0"
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
        </div>
      </div>

      <div className="form-group">
        <div htmlFor="form-label">
        <Checkbox
          checked={isChangedAddress}
          onChange={(e) => setIsChangedAddress(e.target.checked)}
          sx={{
            padding: "0",
            paddingRight: "10px",
            color: 'white',
            '&.Mui-checked': {
              color: 'white',
              padding: "0",
              paddingRight: "10px"
            },
          }}
        />
          Reciever wallet (optional)
        </div>
      </div>
      {isChangedAddress && 
        <div className="form-group">
          <div className="form-input">
            <input
              value={recieverWalletAdress}
              placeholder="0x..."
              onChange={(e) => setRecieverWalletAdress(e.target.value)}
            />
          </div>
      </div>
      }
      {/* <p className="estimated-text">Estimated token amount: <span className="font-medium">{`${estimatedTokenAmount}`}</span></p> */}
      <button
        className="mint-greth-button button"
        onClick={handleMint}
      >Mint</button>
    </form>
  );
}

export default GRETHMint;
