import React, { useEffect, useState } from 'react';
import { useContractService } from '../../../context/ContractContext';
import { ethers } from 'ethers';
import config from '../../../config';
import { Select, MenuItem, FormControl, TextField, Button, Checkbox } from "@mui/material";
import './MintIntent.css';


function MintIntent({ networkConfig }) {
  const { provider } = useContractService();

  const GRIND_AMOUNT_MAP = [1, 5, 10, 20, 50, 75, 100];
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

  function addIntentAmount(num) {
    setGrindAmount(Number(grindAmount) + Number(num));
  }

  return (
    <div className="intent-form form">
      <h2 className="mint-intent-title">Intent NFT</h2>
      <div className="mint-intent-description">
        <p>Holds grinds amoutn for auto grinding with GrinderAI</p>
      </div>
      <div className="form-group">
        <div className="form-label">Grinds Amount ~ ({grindAmount} times)</div>
        <div className="form-input intent-amount-input">
          <input
            value={grindAmount}
            placeholder="0"
            onChange={(e) => setGrindAmount(e.target.value)}
          />
        </div>
        <div className="intent-amount-buttons">
          {GRIND_AMOUNT_MAP.map((num) => (
          <button className="intent-amount-button"
            onClick={() => addIntentAmount(num)}
          >+{num}</button>))}
        </div>
      </div>
      <div className="form-group">
        <div className="form-label">
        <Checkbox
          checked={isChangedAddress}
          onChange={(e) => setIsChangedAddress(e.target.checked)}
          sx={{
            padding: "0",
            color: 'white',
            paddingRight: "10px",
            '&.Mui-checked': {
              padding: "0",
              color: 'white',
              paddingRight: "10px"
            },
          }}
        />
          Reciever wallet (optional)
        </div>
        {isChangedAddress && <div className="form-input">
          <input
            value={recieverWalletAdress}
            placeholder="0x..."
            onChange={(e) => setRecieverWalletAdress(e.target.value)}
          />
        </div>}
      </div>
      <div className="form-label">
        <span className="price-label">Price:</span> <span className="price-value">{price} ETH</span>
      </div>
      <button
        className="mint-intent-button"
        onClick={handleMint}
      >Mint</button>
    </div>
  );
}

export default MintIntent;