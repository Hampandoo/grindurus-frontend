import React, { useEffect, useState } from "react";
import config from '../../../config';
import "./General.css";
import { ethers } from "ethers";

function General({ networkConfig }) {

  const [totalPools, setTotalPools] = useState('');
  const [totalDeposited, setTotalDeposited] = useState(0);

  useEffect(() => {
    fetchTotalPools();
  }, [])

  const fetchTotalPools = async() => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const poolsnftAddress = networkConfig.poolsnft;
      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        config.poolsNFTAbi,
        signer
      );
      let totalPools = await poolsNFT.totalPools()
      setTotalPools(totalPools)
    } catch (error) {
      console.log("Failed to fetch all pools", error);
    }
  }

  const fetchTotalDeposited = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const registryAddress = networkConfig.registry;

      const registry = new ethers.Contract(
        registryAddress,
        config.registryAbi,
        signer
      )
      
      const quoteTokens = await registry.getQuoteTokens()
      console.log(quoteTokens)

      const poolsnftAddress = networkConfig.poolsnft;
      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        config.poolsNFTAbi,
        signer
      );
      let totalDeposited = 0
      quoteTokens.map(async (quoteToken) => {
        let deposited = await poolsNFT.totalDeposited(quoteToken)
        totalDeposited += deposited

      })
      setTotalDeposited(totalDeposited)
    } catch (error) {
      console.log("Failed to fetch all total deposited", error);
    }
  }

  return (
    <div className="general">
      <h2>GrindURUS Pools NFTs</h2>
      <div className="statistics">
        <h3>Total Minted Pools NFTs: <span className="stat-value">{totalPools.toString()}</span></h3>
        {/* <h3>Total Deposited: <span className="stat-value">{totalDeposited}</span></h3> */}
      </div>
      {/* <div className="pool-item">
        <p>
          Buy random royalty and earn <br />
          10% from yield and trade profits
        </p>
        <span className="arrow">→</span>
        <button className="random-buy-button">Random Buy Royalty</button>
      </div>
      <div className="pool-item">
        <p>
          Execute strategy on random <br />
          pool and get grETH
        </p>
        <span className="arrow">→</span>
        <button className="random-grind-button">Random GRIND</button>
      </div> */}
    </div>
  );
}

export default General;