import React, { useState } from 'react';
import './GRETHBurn.css';

function GRETHBurn() {
  const [burnAmount, setBurnAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('');

  const handleMaxClick = () => {
    setBurnAmount('100'); // Предполагаем, что максимум 100
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Burn amount:', burnAmount);
    console.log('Selected token:', selectedToken);
  };

  return (
    <div className="greth-burn">
        <div className="greth-burn-title">
          You can exchange grETH to token
        </div>
        <form onSubmit={handleSubmit} className="exchange-form">
          <div className="form-group">
            <label htmlFor="burn-amount">grETH to burn</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="burn-amount"
                value={burnAmount}
                onChange={(e) => setBurnAmount(e.target.value)}
                className="input-field"
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
            <label htmlFor="token-select">Token to earn</label>
            <select
              id="token-select"
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="input-field"
            >
              <option value="">Select a token</option>
              <option value="token1">Token 1</option>
              <option value="token2">Token 2</option>
              <option value="token3">Token 3</option>
            </select>
          </div>

          <p className="estimated-text">Estimated token amount: <span className="font-medium">0</span></p>

          <button type="submit" className="submit-button">
            Burn
          </button>
        </form>
    </div>
  );
}

export default GRETHBurn;
