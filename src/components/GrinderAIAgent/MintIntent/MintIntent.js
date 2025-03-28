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
    <div className="mint-intent-container">
      <div className="mint-intent-title">Mint Intent</div>
      <div className="mint-intent-description">Intent for grinderAI to grind all pools related to your wallet</div>

      <div className="intent-period">
        <label className="label">Intent Amount ~ ({grindAmount} times)</label>
        <FormControl fullWidth>
          {/* <InputLabel>Виберіть опцію</InputLabel> */}
          <TextField
            id="burn-amount"
            value={grindAmount}
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
            onChange={(e) => setGrindAmount(e.target.value)}
          />
        </FormControl>
        {GRIND_AMOUNT_MAP.map((num) => (        <Button
          sx={{
            margin: "10px 5px",
            borderRadius: "8px",
            fontWeight: 700,
            minWidth: "unset",
            color: "white",
            backgroundColor: "black",
            border: "1px solid white",
            textTransform: "none",
            fontSize: "14px",
            lineHeight: 1,
            height: "22px",
          }}
          // loading={waitMint}
          onClick={() => addIntentAmount(num)}
        >+{num}</Button>))}
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

      <div className="price-container">
        <span className="price-label">Price:</span> <span className="price-value">{price} ETH</span>
      </div>

      <Button
        className="mint-button"
        disabled={grindAmount <= 0}
        sx={{
          borderRadius: "8px",
          fontWeight: 700,
          minWidth: "unset",
          color: "#006f16",
          backgroundColor: "#C1FBBA",
          textTransform: "none",
          fontSize: "20px",
          lineHeight: 1,
          height: "42px",
          "&.Mui-disabled": {
            backgroundColor: "rgba(1,1,1,0)",
            borderStyle: "solid",
            borderColor: grindAmount <= 0 ? "#949494 !important" : "transparent",
            borderWidth: grindAmount <= 0 ? "2px" : "0",
            color: "#949494",
          },
        }}
        // loading={waitMint}
        onClick={handleMint}
      >Mint</Button>
    </div>
  );
}

export default MintIntent;