import React, { useState } from 'react';
import {ethers} from 'ethers';
import './GRETH.css';
import GRETHBurn from './GRETHBurn/GRETHBurn';
<<<<<<< Updated upstream:src/components/GRETH/GRETH.js
import GRETHInfo from './GRETHInfo/GRETHInfo.js';
=======
import GRETHMint from './GRETHMint/GRETHMint';
>>>>>>> Stashed changes:src/frontend_frontend/src/components/GRETH/GRETH.jsx

function GRETH() {
    return (
        <>
          <div className='greth-container'>
            <div className='greth-container-left'>
              <GRETHInfo />
            </div>
            <div className='greth-container-right'>
              <GRETHBurn />
            </div>
          </div>
        </>
    )
}

export default GRETH;