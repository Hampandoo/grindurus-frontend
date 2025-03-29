import React, { useState } from 'react';
import {ethers} from 'ethers';
import './GRETH.css';
import GRETHBurn from './GRETHBurn/GRETHBurn';
import GRETHMint from './GRETHMint/GRETHMint';
import GRETHInfo from './GRETHInfo/GRETHInfo.js';

function GRETH({ networkConfig }) {
  const [mode, setMode] = useState("burn")
  return (
    <div className="greth">
      <div className='greth-container'>
        <h1 className="greth-title title">Exchange grETH to token</h1>
        <div className="greth-content">
          {mode == "burn" ? 
            <GRETHBurn /> : 
            <GRETHMint />
          }
          <GRETHInfo />
        </div>
      </div>
    </div>
  )
}

export default GRETH;