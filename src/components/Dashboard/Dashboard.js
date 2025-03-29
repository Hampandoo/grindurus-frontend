import './Dashboard.css';
import { useState } from "react";
import MintPoolNFT from './MintPoolNFT/MintPoolNFT.js';
import PoolsTable from './PoolsTable/PoolsTable.js';
import MintIntent from '../GrinderAIAgent/MintIntent/MintIntent';
import IntentsTable from '../GrinderAIAgent/IntentsTable/IntentsTable';

function Dashboard({ poolId, setPoolId, networkConfig}) {
  const [mode, setMode] = useState("pools");

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
                <div class="stat-value">1234</div>
              </div>
              <div class="stat-item">
                <div class="stat-key">GrETH Minted:</div>
                <div class="stat-value">135</div>
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