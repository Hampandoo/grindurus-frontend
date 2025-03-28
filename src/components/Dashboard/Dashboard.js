import './Dashboard.css';
import MintPoolNFT from './MintPoolNFT/MintPoolNFT.js';
import PoolsTable from './PoolsTable/PoolsTable.js';

function Dashboard({ poolId, setPoolId, networkConfig}) {
  return (
    <>
      <section className="mint-nft">
        <div className="mint-nft-container">
          <div className="mint-nft-content">
            <h1 class="mint-nft-title title">Mint Pool NFT</h1>
            <div class="mint-nft-statistics stat">
              <div class="stat-item">
                <div class="stat-key">Total Pools Minted:</div>
                <div class="stat-value">1234</div>
              </div>
              <div class="stat-item">
                <div class="stat-key">GrETH Minted:</div>
                <div class="stat-value">135</div>
              </div>
              <div class="stat-item">
                <div class="stat-key">TVL:</div>
                <div class="stat-value">1,831,190$</div>
              </div>
            </div>
            <div class="mint-nft-text">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto sapiente praesentium rerum vitae odit non quo minus, mollitia ea consectetur. Est ullam commodi totam eos illum, consequatur pariatur debitis ad?</p>
            </div>
          </div>
          <MintPoolNFT networkConfig={networkConfig}/>
        </div>
      </section>
      <section className="pools-table">
        <div className="pools-table-container">
          <PoolsTable setPoolId={setPoolId} networkConfig={networkConfig}/>
        </div>
      </section>
    </>
  );
}

export default Dashboard;