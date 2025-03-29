import React, { useEffect, useState } from 'react';
import './GRETHBurn.css';
import { useContractService } from '../../../context/ContractContext';
import { ethers } from 'ethers';
import config from '../../../config';
import { selectStyles, menuProps, menuItemStyles, menuTokenItemStyles } from "../../../styles";

import { Button, FormControl, TextField, Select, MenuItem, Checkbox } from '@mui/material';

// Сторінка не завантажується, якщо перезавантажити її.
function GRETHBurn() {
  const { provider } = useContractService();
  // Треба прибрати змінні що ми не використовуємо
  const { networkConfig, isConnected } = useContractService();

  const [burnAmount, setBurnAmount] = useState('');
  // Треба прибрати змінні що ми не використовуємо
  const [selectedTokenId, selectedTokenIdId] = useState(0);
  const [defaultRecieverWalletAdress, setDefaultRecieverWalletAdress] = useState('');
  // Треба прибрати змінні що ми не використовуємо
  const [recieverWalletAdress, setRecieverWalletAdress] = useState('');
  const [estimatedTokenAmount, setEstimatedTokenAmount] = useState(0);

  const [selectedBaseTokenId, setBaseTokenId] = useState(networkConfig.baseTokens[0].symbol);

  // Form state - це логіка для чекбоксів, або прибираємо її, або повертаємо чекбокси
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

  // Чому ця логіка закоментована? Змінна estimatedTokenAmount - показує кількість токенів, і має динамічно змінюватись від логіки нижче

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

      // Що це? Чому прапори є, а логіка не працює від них? Або варто використовувати дані юзера, апбо повернути логіку чекбоксів
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
    <form className="greth-burn-form form">
      <h2 className="greth-form-title">Burn and Get Tokens</h2>
      <div className="form-group">
        <div className="form-label">Burn grETH Amount</div>
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
              sx={selectStyles} 
              MenuProps={menuProps}
              onChange={(e) => setBaseTokenId(e.target.value)}
            >
              {networkConfig.baseTokens.map((tokenInfo, index) => (
                <MenuItem key={index} value={tokenInfo.symbol} sx={menuTokenItemStyles}>
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
      {/* Кнопка завжди активна, користувач не має тицяти кнопку скільки йому заманеться, якщо форма пуста, або не правильно заповнена */}
      <button
        className="submit-button"
        onClick={handleBurn}
      >Burn</button>
    </form>
  );
}

export default GRETHBurn;
