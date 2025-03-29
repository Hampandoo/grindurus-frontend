import './Dashboard.css';
import { useEffect, useState } from "react";
import MintPoolNFT from './MintPoolNFT/MintPoolNFT.js';
import PoolsTable from './PoolsTable/PoolsTable.js';
import MintIntent from '../GrinderAIAgent/MintIntent/MintIntent';
import IntentsTable from '../GrinderAIAgent/IntentsTable/IntentsTable';
import {useContractService} from "../../context/ContractContext";
import { ethers } from 'ethers';

function Dashboard({ poolId, setPoolId, networkConfig}) {
  const [mode, setMode] = useState("pools");
  const [totalPoolsMinted, setTotalPoolsMinted] = useState(0);
  const { poolsNFT, greth, signer, isConnected, setVisiblePoolIds } = useContractService();
  const [gethMinted, setGethMinted] = useState(0);

  useEffect(() => {
    fetchTotalPoolsMinted();
    fetchGETHMinted();
  }, []);

  const fetchTotalPoolsMinted = async () => {
    try {
      const totalPools = await poolsNFT.totalPools();
      setTotalPoolsMinted(totalPools.toString());
    } catch (error) {
      console.log("Failed to fetch total pools minted");
    }
  };

  const fetchGETHMinted = async () => {
    try {

      const grethAddress = networkConfig.GRETH;
  
      const greth = new ethers.Contract(
        grethAddress,
        [
          "function totalGrinded() external view returns (uint256)",
        ],
        signer
      );
  
      const total = await greth.totalGrinded();
      setGethMinted(ethers.formatUnits(total, 18));
    } catch (error) {
      console.log("Failed to fetch GETH minted");
    }
  };

  return (
    <>
      <section className="mint-nft">
        <div className="mint-nft-container">
          <div className="mint-nft-content">
            <div class="mint-nft-statistics stat">
              <div class="stat-item stat-title">
                <div class="stat-key">Total Info</div>
              </div>
              <div class="stat-item">
                <div class="stat-key">Total Pools Minted:</div>
                <div class="stat-value">{totalPoolsMinted}</div>
              </div>
              <div class="stat-item">
                <div class="stat-key">grETH grinded:</div>
                <div class="stat-value">{gethMinted}</div>
              </div>
            </div>
            <MintIntent />
          </div>
          <MintPoolNFT networkConfig={networkConfig}/>
        </div>
      </section>
      <section className="table">
        <div className="table-container">
          <div className="table-wrapper">
            <div className="table-select">
              <button 
                onClick={() => setMode("pools")} 
                className={`table-select-button ${mode === "pools" ? "active" : ""}`}
              >
                Pools
              </button>
              <button 
                onClick={() => setMode("intents")} 
                className={`table-select-button ${mode === "intents" ? "active" : ""}`}
              >
                Intents
              </button>
            </div>
            {mode == "pools" ? 
              <PoolsTable setPoolId={setPoolId} networkConfig={networkConfig}/> :
              <IntentsTable />
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;