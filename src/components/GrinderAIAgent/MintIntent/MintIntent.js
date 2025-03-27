import React, { useEffect, useState } from 'react';
import { useContractService } from '../../../context/ContractContext';
import { ethers } from 'ethers';
import config from '../../../config';
import { Select, MenuItem, FormControl, TextField, Button } from "@mui/material";
import './MintIntent.css';


function MintIntent({ networkConfig }) {
  const { provider } = useContractService();

  const GRIND_AMOUNT_MAP = [1, 5, 20, 100];
  const ETH = '0x0000000000000000000000000000000000000000';

  const [defaultRecieverWalletAdress, setDefaultRecieverWalletAdress] = useState('');
  const [recieverWalletAdress, setRecieverWalletAdress] = useState('');
  const [price, setPrice] = useState(0.1);
  const [grindAmount, setGrindAmount] = useState(1);

  // Form State
  const [isChangedAddress, setIsChangedAddress] = useState(false);

  
  const setUserWalletAddress = async () => {
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setDefaultRecieverWalletAdress(address);
  }
  useEffect(() => {
    if (!provider) return;

    // After connect - Set user wallet address as default for handle burnTo function (recieves 3 arguments, wallet as last arg)
    setUserWalletAddress();
  }, [provider]);

  const getIntentNFTContract = async () => {
    if (!provider) {
      console.error('Provider not found');
      return null;
    }
    const signer = await provider.getSigner();
    const grethAddress = networkConfig.intentNFT;
    return new ethers.Contract(grethAddress, networkConfig.intentABI, signer);
  }
  

  useEffect(() => {
    const fetchPayment = async () => {
      const paymentAmount = await calcPayment();
      setPrice(paymentAmount);
    };
    setTimeout(fetchPayment, 500);
  }, [grindAmount])

  const calcPayment = async () => {
    if (!provider) {
      alert("MetaMask is not installed.");
      return;
    }
    try {
      const intentsNFTContract = await getIntentNFTContract();

      const paymentAmountRaw = await intentsNFTContract.calcPayment(ETH, grindAmount);
      const paymentAmount = ethers.formatUnits(paymentAmountRaw, 18);
      return paymentAmount
    } catch (error) {
      console.error("Error during approve:", error);
      return '0.0'
    }
  }

  const handleMint = async () => {
    if (!provider) {
      alert("MetaMask is not installed.");
      return;
    }
    try {
      const intentsNFTContract = await getIntentNFTContract();

      const paymentAmountRaw = await intentsNFTContract.calcPayment(ETH, grindAmount);

      const reciever = isChangedAddress ? recieverWalletAdress : defaultRecieverWalletAdress;
      
      const tx = await intentsNFTContract.mintTo(ETH, reciever, grindAmount, { value: paymentAmountRaw });
      await tx.wait();
    
    } catch (error) {
      console.error("Error during approve:", error);
    }
  };

  return (
    <div className="mint-intent-container">
      <div className="mint-intent-title">Mint Intent</div>
      <div className="mint-intent-description">Intent for grinderAI to grind all pools related to your wallet</div>

      <div className="intent-period">
        <label className="label">Intent Amount ~ ({grindAmount} times)</label>
        <FormControl fullWidth>
          {/* <InputLabel>Виберіть опцію</InputLabel> */}
          <Select
            value={grindAmount}
            sx={{
              height: "42px",
              borderRadius: "8px"
            }}
            onChange={(e) => setGrindAmount(e.target.value)}
          >
            {GRIND_AMOUNT_MAP.map((value) => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="slider-value"></div>
      </div>

      <div className="form-group">
        <label className="label">Reciever wallet (optional)
          {/* <button className="receiver-button" onClick={handleReceiverMyAddress}>My Address</button> */}
          <input value={isChangedAddress} onChange={(e) => setIsChangedAddress(e.target.checked)} type="checkbox" />
        </label>
        {isChangedAddress && <input
          type="text"
          value={recieverWalletAdress}
          onChange={(e) => setRecieverWalletAdress(e.target.value)}
          placeholder="Enter reciever address"
          className="input"
        />}
      </div>

      <div className="price-container">
        <span className="price-label">Price:</span> <span className="price-value">{price} ETH</span>
      </div>

      <button onClick={handleMint} className="mint-button">
        Mint
      </button>
    </div>
  );
}

export default MintIntent;