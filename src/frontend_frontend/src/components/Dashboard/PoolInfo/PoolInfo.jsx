import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import config from '../../../config';
import './PoolInfo.css';

function PoolInfo({ poolId, networkConfig }) {

  const [poolOwner, setPoolOwner] = useState('')
  const [oracleQuoteTokenPerFeeToken, setOracleQuoteTokenPerFeeToken] = useState('')
  const [oracleQuoteTokenPerBaseToken, setOracleQuoteTokenPerBaseToken] = useState('')
  const [royaltyReceiver, setRoyaltyReceiver] = useState('')
  const [quoteToken, setQuoteToken] = useState('')
  const [baseToken, setBaseToken] = useState('')

  const [long, setLong] = useState({})
  const [hedge, setHedge] = useState({})
  const [thresholds, setThresholds] = useState({})

  useEffect(() => {
    fetchPoolData();
    fetchPositions();
    fetchThresholds();
  }, [poolId, networkConfig]);

  const fetchPoolData = async () => {
    try{ 
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const poolsnftAddress = networkConfig.poolsnft;

      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        config.poolsNFTAbi,
        signer
      );
      const ownerOf = await poolsNFT.ownerOf(poolId);
      setPoolOwner(ownerOf)
      const royaltyReceiver = await poolsNFT.royaltyReceiver(poolId)
      setRoyaltyReceiver(royaltyReceiver)

      const poolNFTInfos = await poolsNFT.getPoolNFTInfosBy([poolId])
      let poolNFTInfo = poolNFTInfos[0]
      //console.log(poolNFTInfo)

      setOracleQuoteTokenPerFeeToken(poolNFTInfo.oracleQuoteTokenPerFeeToken)
      setOracleQuoteTokenPerBaseToken(poolNFTInfo.oracleQuoteTokenPerBaseToken)
      setQuoteToken(poolNFTInfo.quoteToken)
      setBaseToken(poolNFTInfo.baseToken)

    } catch (error) {
      console.log('failed to fetch pool info data ', error)
    }
  };

  const fetchPositions = async () => {
    try{ 
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const poolsnftAddress = networkConfig.poolsnft;

      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        config.poolsNFTAbi,
        signer
      );
      const positions = await poolsNFT.getPositions(poolId);
      
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
    } catch {
      console.log('failed to fetch pool info data')
    }
  }

  const fetchThresholds = async () => {
    try{ 
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const poolsnftAddress = networkConfig.poolsnft;

      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        config.poolsNFTAbi,
        signer
      );
      const poolsNFTInfos = await poolsNFT.getPoolNFTInfosBy([poolId])
      const _thresholds = await poolsNFT.getThresholds(poolId);
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
      <div className="pool-info-content">
        <h2 className="pool-info-title">Pool Id = {poolId}</h2>
        <div className="pool-info-list">
          <p><strong>Oracle QuoteToken/FeeToken:</strong> {oracleQuoteTokenPerFeeToken}</p>
          <p><strong>Oracle QuoteToken/BaseToken:</strong> {oracleQuoteTokenPerBaseToken}</p>
          <p><strong>Pool Owner:</strong> {poolOwner}</p>
          <p><strong>Royalty Receiver:</strong> {royaltyReceiver}</p>
          <p><strong>QuoteToken:</strong> {quoteToken}</p>
          <p><strong>BaseToken:</strong> {baseToken}</p>
        </div>
      </div>
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