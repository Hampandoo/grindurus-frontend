import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import config from '../../../config';
import './PoolInfo.css';
import {useContractService} from "../../../context/ContractContext";
import {useParams} from "react-router-dom";

function PoolInfo() {
  const { poolsNFT } = useContractService();
  const { poolId } = useParams();
  const [long, setLong] = useState({})
  const [hedge, setHedge] = useState({})
  const [thresholds, setThresholds] = useState({})

  useEffect(() => {
    if (!poolsNFT) {
      return;
    }
    fetchPositions();
    fetchThresholds();
  }, [poolId, poolsNFT]);

  const fetchPositions = async () => {
    try{
      console.log('p', poolId)
      const poolsNFTInfos = await poolsNFT.getPoolNFTInfosBy([poolId])
      const positions = poolsNFTInfos[0].positions;

      const long = {
        number: positions[0][0].toString(),
        numberMax: positions[0][1].toString(),
        priceMin: ethers.formatUnits(positions[0][2], 8),
        liquidity: ethers.formatUnits(positions[0][3], 6),
        qty: ethers.formatUnits(positions[0][4], 18),
        price: ethers.formatUnits(positions[0][5],8),
        feeQty: ethers.formatUnits(positions[0][6],18),
        feePrice: ethers.formatUnits(positions[0][7], 8),
      }
      const hedge = {
          number: positions[1][0].toString(),
          numberMax: positions[1][1].toString(),
          priceMin: ethers.formatUnits(positions[1][2], 8),
          liquidity: ethers.formatUnits(positions[1][3], 6),
          qty: ethers.formatUnits(positions[1][4], 18),
          price: ethers.formatUnits(positions[1][5], 8),
          feeQty: ethers.formatUnits(positions[1][6], 18),
          feePrice: ethers.formatUnits(positions[1][7], 8)
      }
      setLong(long)
      setHedge(hedge)
    } catch (err) {
      console.log('failed to fetch pool info data', err)
    }
  }

  const fetchThresholds = async () => {
    try{
      const poolsNFTInfos = await poolsNFT.getPoolNFTInfosBy([poolId])
      const _thresholds = poolsNFTInfos[0].thresholds;
      console.log(_thresholds)
      const thresholds = {
        longBuyPriceMin: ethers.formatUnits(_thresholds[0], 8),
        longSellQuoteTokenAmountThreshold: ethers.formatUnits(_thresholds[1], 6),
        longSellSwapPriceThreshold: ethers.formatUnits(_thresholds[2],8),
        hedgeSellInitPriceThresholdHigh: ethers.formatUnits(_thresholds[3], 8),
        hedgeSellInitPriceThresholdLow: ethers.formatUnits(_thresholds[4], 8),
        hedgeSellLiquidity: ethers.formatUnits(_thresholds[5], 6),
        hedgeSellQuoteTokenAmountThreshold: ethers.formatUnits(_thresholds[6], 6),
        hedgeSellTargetPrice: ethers.formatUnits(_thresholds[7], 8),
        hedgeSellSwapPriceThreshold: ethers.formatUnits(_thresholds[8], 8),
        hedgeRebuyBaseTokenAmountThreshold: ethers.formatUnits(_thresholds[9], 18),
        hedgeRebuySwapPriceThreshold: ethers.formatUnits(_thresholds[10], 8),
      }
      setThresholds(thresholds)
    } catch (error){
      console.log('failed to fetch pool info data: ', error)
    }
  }

  return (
    <div className="pool-info-container">
      <div className='pool-positions'>
        <table className="positions-table">
            <thead>
              <tr>
                <th>Param</th>
                <th>Long Position</th>
                <th>Hedge Position</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(long).map((key, index) => (
                <tr key={index}>
                  <td>{key}</td>
                  <td>{long[key]}</td>
                  <td>{hedge[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      <div className='pool-thresholds'>
        <table className="thresholds-table">
            <thead>
              <tr>
                <th>Param</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(thresholds).map((key, index) => (
                <tr key={index}>
                  <td>{key}</td>
                  <td>{thresholds[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default PoolInfo;