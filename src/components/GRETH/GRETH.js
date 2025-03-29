import React, { useState } from 'react';
import {ethers} from 'ethers';
import './GRETH.css';
import GRETHBurn from './GRETHBurn/GRETHBurn';
import GRETHMint from './GRETHMint/GRETHMint';
import GRETHInfo from './GRETHInfo/GRETHInfo.js';

function GRETH({ networkConfig }) {
  // Зайва логіка. Перемикач не підключений ніде.
  return (
    <div className="greth">
      <div className='greth-container'>
        <div className="greth-forms">
            <GRETHBurn />
            <GRETHMint />
        </div>
        {/* <GRETHInfo /> */}
      </div>
    </div>
  )
}

export default GRETH;