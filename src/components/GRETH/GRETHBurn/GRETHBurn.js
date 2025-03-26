import React, { useState } from 'react';
import './GRETHBurn.css';
import { Button, FormControl, TextField, Select, MenuItem } from '@mui/material';

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

          <div className="form-group">
            <label htmlFor="token-select">Token to earn</label>
            <FormControl fullWidth>
              {/* <InputLabel>Виберіть опцію</InputLabel> */}
              <Select
                value={selectedToken}
                sx={{
                  height: "42px",
                  borderRadius: "8px"
                }}
                onChange={(e) => setSelectedToken(e.target.value)}
              >
                {[].map((tokenInfo, index) => (
                  <MenuItem key={index} value={index}>{tokenInfo?.symbol}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <p className="estimated-text">Estimated token amount: <span className="font-medium">0</span></p>
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
            onClick={handleSubmit}
          >Burn</Button>
        </form>
    </div>
  );
}

export default GRETHBurn;
