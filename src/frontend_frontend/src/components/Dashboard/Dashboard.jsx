import React, { useState } from 'react';
import {ethers} from 'ethers';
import './Dashboard.css';
<<<<<<< Updated upstream:src/components/Dashboard/Dashboard.js
import MintPoolNFT from './MintPoolNFT/MintPoolNFT.js';
import General from './General/General.js';
import PoolInfo from './PoolInfo/PoolInfo.js';
import PoolInteractor from './PoolInteractor/PoolInteractor.js';
import PoolsTable from './PoolsTable/PoolsTable.js';
=======
import { useEffect, useState } from "react";
import MintPoolNFT from './MintPoolNFT/MintPoolNFT.jsx';
import PoolsTable from './PoolsTable/PoolsTable.jsx';
import MintIntent from '../GrinderAIAgent/MintIntent/MintIntent';
import IntentsTable from '../GrinderAIAgent/IntentsTable/IntentsTable';
import {useContractService} from "../../context/ContractContext";
import { ethers } from 'ethers';
>>>>>>> Stashed changes:src/frontend_frontend/src/components/Dashboard/Dashboard.jsx

function Dashboard({ poolId, setPoolId, networkConfig}) {
    return (
        <>
          <div className='main-container'>
            {poolId === -1 ? (
              <>
                <div className='main-container-left'>
                  <General networkConfig={networkConfig} />
                </div>
                <div className='main-container-right'>
                  <MintPoolNFT networkConfig={networkConfig} />
                </div>
               
              </>
            ) : (
              <>
                <div className='main-container-left'>
                  <PoolInfo poolId={poolId} networkConfig={networkConfig}/>
                </div>
                <div className='main-container-right'>
                  <PoolInteractor poolId={poolId} networkConfig={networkConfig} />
                </div>
              </>
            )}
          </div>
          {poolId == -1 ? (
            <div className="pools-table-wrapper">
              <PoolsTable setPoolId={setPoolId} networkConfig={networkConfig} />
            </div>
          ) : (
            <div>
              {/* empty */}
            </div>
          )
          }
        </>
      );

}

export default Dashboard;