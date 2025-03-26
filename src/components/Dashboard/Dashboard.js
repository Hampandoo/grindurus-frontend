import React, { useState } from 'react';
import {ethers} from 'ethers';
import './Dashboard.css';
import MintPoolNFT from './MintPoolNFT/MintPoolNFT.js';
import General from './General/General.js';
import PoolInfo from './PoolInfo/PoolInfo.js';
import PoolInteractor from './PoolInteractor/PoolInteractor.js';
import PoolsTable from './PoolsTable/PoolsTable.js';
import { Tabs, Tab, Box, Typography } from "@mui/material";
import GRETHBurn from '../GRETH/GRETHBurn/GRETHBurn.js';
import GRETHInfo from '../GRETH/GRETHInfo/GRETHInfo.js';
import GrinderAIAgent from '../GrinderAIAgent/GrinderAIAgent.js';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box p={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Dashboard({ poolId, setPoolId, networkConfig}) {
    const [mainTab, setMainTab] = useState(0);
    const [formTab, setFormTab] = useState(0);

    const handleChangeMainTab = (_event, newValue) => {
      setMainTab(newValue);
    };
    const handleChangeFormTab = (_event, newValue) => {
      setFormTab(newValue);
    };
    return (
        <>
          <div className='main-container'>
            {poolId === -1 ? (
              <>
              <Box
                className="main-container-tab"
                sx={{
                  width: '100%',
                  "& .MuiBox-root": {
                    display: 'flex',
                  }
                }}
              >
                <Tabs value={mainTab} onChange={handleChangeMainTab} centered>
                  <Tab label="Pool" />
                  <Tab label="Grinder AI" />
                </Tabs  >
                <TabPanel value={mainTab} index={0}>
                  <div className='main-container-left'>
                    <GRETHInfo />
                    {/* <General networkConfig={networkConfig} /> */}
                  </div>
                  <div className='main-container-right'>
                    <Box 
                      sx={{ 
                        width: '100%', 
                        maxWidth: "534px", 
                      }}
                      className="main-container-tab"
                    >
                      <Tabs value={formTab} onChange={handleChangeFormTab} centered>
                        <Tab label="Mint Pool" />
                        <Tab label="Burn" />
                      </Tabs  >
              
                      <TabPanel value={formTab} index={0}>
                        <MintPoolNFT networkConfig={networkConfig} />
                      </TabPanel>
                      <TabPanel value={formTab} index={1}>
                        <GRETHBurn />
                      </TabPanel>
                    </Box>
                  </div>
                </TabPanel>
                <TabPanel value={mainTab} index={1}>
                  <GrinderAIAgent networkConfig={networkConfig} />
                </TabPanel>
              </Box>
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