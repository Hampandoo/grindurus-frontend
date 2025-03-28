import React, { useEffect, useState } from 'react';
import {ethers} from 'ethers';
import config from '../../../config';
import './PoolInteractor.css';
import {useContractService} from "../../../context/ContractContext";
import {useParams} from "react-router-dom";

function PoolInteractor() {
  const { poolsNFT, networkConfig, signer } = useContractService();
  const { poolId } = useParams();

  const [activeTab, setActiveTab] = useState('interaction');

  const [inputDeposit, setInputDeposit] = useState(0);
  const [inputWithdraw, setInputWithdraw] = useState(0);
  const [royaltyPrice, setRoyaltyPrice] = useState('');
  const [royaltyPriceToShow, setRoyaltyPriceToShow] = useState('');

  const [longNumberMax, setLongNumberMax] = useState(4);
  const [hedgeNumberMax, setHedgeNumberMax] = useState(4);
  const [extraCoef, setExtraCoef] = useState('');
  const [priceVolatilityPercent, setPriceVolatilityPercent] = useState(1);

  const [selectedOpReturnPercent, setSelectedOpReturnPercent] = useState('1');
  const [inputReturnPercent, setInputReturnPercent] = useState('')
  const [returnPercentLongSell, setReturnPercentLongSell] = useState(0.5);
  const [returnPercentHedgeSell, setReturnPercentHedgeSell] = useState(0.5);
  const [returnPercentHedgeRebuy, setReturnPercentHedgeRebuy] = useState(0.5);
  
  const [selectedOpFeeCoef, setSelectedOpFeeCoef] = useState('1');
  const [inputFeeCoef, setInputFeeCoef] = useState('');
  const [feeCoefLongSell, setFeeCoefLongSell] = useState(1.0);
  const [feeCoefHedgeSell, setFeeCoefHedgeSell] = useState(1.0);
  const [feeCoefHedgeRebuy, setFeeCoefHedgeRebuy] = useState(1.0);

  const [poolOwner, setPoolOwner] = useState('')
  const [oracleQuoteTokenPerFeeToken, setOracleQuoteTokenPerFeeToken] = useState('')
  const [oracleQuoteTokenPerBaseToken, setOracleQuoteTokenPerBaseToken] = useState('')
  const [royaltyReceiver, setRoyaltyReceiver] = useState('')
  const [quoteToken, setQuoteToken] = useState('')
  const [baseToken, setBaseToken] = useState('')

  useEffect(() => {
    if (poolsNFT) {
      fetchPoolData();
    }
  }, [poolId, networkConfig, poolsNFT]);

  const fetchConfig = async () => {
    try {
      const poolInfo = await poolsNFT.getPoolNFTInfosBy([poolId]);
      console.log(poolInfo)
      
      const poolConfig = poolInfo[0].config
      const feeConfig = poolInfo[0].feeConfig

      const poolFeeConfigLongSell = feeConfig.feeCoefLongSell
      const poolFeeConfigHedgeSell = feeConfig.feeCoefHedgeSell
      const poolFeeConfigHedgeRebuy = feeConfig.feeCoefHedgeRebuy
      setFeeCoefLongSell(poolFeeConfigLongSell)
      setFeeCoefHedgeSell(poolFeeConfigHedgeSell)
      setFeeCoefHedgeRebuy(poolFeeConfigHedgeRebuy)

      const poolLongNumberMax = poolConfig.longNumberMax;
      const poolHedgeNumberMax = poolConfig.hedgeNumberMax
      const poolExtraCoef = parseFloat(poolConfig.extraCoef) / 100;
      const poolPriceVolatilityPercent = parseFloat(poolConfig.priceVolatilityPercent) / 100;
      const poolReturnPercentLongSell = poolConfig.returnPercentLongSell
      const poolReturnPercentHedgeSell = poolConfig.returnPercentHedgeSell
      const poolReturnPercentHedgeRebuy = poolConfig.returnPercentHedgeRebuy
      setLongNumberMax(poolLongNumberMax);
      setHedgeNumberMax(poolHedgeNumberMax);
      setExtraCoef(poolExtraCoef);
      setPriceVolatilityPercent(poolPriceVolatilityPercent);
      setReturnPercentLongSell(poolReturnPercentLongSell);
      setReturnPercentHedgeSell(poolReturnPercentHedgeSell);
      setReturnPercentHedgeRebuy(poolReturnPercentHedgeRebuy);
    } catch (error) {
      console.log("Failed to fetch config ", error);
    }
  }

  const fetchPoolData = async () => {
    try{
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

  const fetchRoyaltyPrice = async () => {
    try {
      const poolsnftAddress = networkConfig.poolsnft;

      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        [
          "function royaltyPrice(uint256 poolId) external view returns (uint256)",
        ],
        signer
      );
      const royaltyPriceRaw = await poolsNFT.royaltyPrice(poolId); // amount ETH
      const royaltyPriceFormatted = ethers.formatUnits(royaltyPriceRaw, 18);
      setRoyaltyPrice(royaltyPriceRaw)
      const royaltyPriceRounded = Number(royaltyPriceFormatted);
      setRoyaltyPriceToShow(royaltyPriceRounded)
    } catch {
      console.log("Failed to fetch royalty price");
    }

  }

  useEffect(() => {
    fetchRoyaltyPrice()
  }, []); // called only once

  const handleDeposit = async () => {
    try{
      const poolsnftAddress = networkConfig.poolsnft;
      
      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        [
          "function deposit(uint256 poolId,uint256 quoteTokenAmount) external returns (uint256 deposited)",
        ],
        signer
      );
      // const quoteTokenConfig = networkConfig.quoteTokens.find(
      //   (token) => token.address.toLowerCase() === quoteTokenAddress.toLowerCase()
      // );
      const quoteTokenDecimals = 18// quoteTokenConfig.decimals;
      const quoteTokenAmountRaw = ethers.parseUnits(inputDeposit, quoteTokenDecimals)
      const gasEstimate = await poolsNFT.deposit.estimateGas(poolId, quoteTokenAmountRaw)
      const gasLimit = gasEstimate * 14n / 10n
      const tx = await poolsNFT.deposit(poolId, quoteTokenAmountRaw, {gasLimit})
      await tx.wait()
    } catch (error){
      console.log("failed to deposit ", error)
    }

  }

  const handleWithdraw = async () => {
    try{
      const poolsnftAddress = networkConfig.poolsnft;

      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        [
          "function withdraw(uint256 poolId,uint256 quoteTokenAmount) external returns (uint256 deposited)",
        ],
        signer
      );
      const quoteTokenDecimals = 18;
      const quoteTokenAmountRaw = ethers.parseUnits(inputWithdraw, quoteTokenDecimals)
      const gasEstimate = await poolsNFT.deposit.estimateGas(poolId, quoteTokenAmountRaw)
      const gasLimit = gasEstimate * 14n / 10n
      const tx = await poolsNFT.withdraw(poolId, quoteTokenAmountRaw, {gasLimit})
      await tx.wait()
    } catch {
      console.log("failed to set long number max")
    }
  }

  const handleExit = async () => {
    try{
      const poolsnftAddress = networkConfig.poolsnft;

      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        [
          "function exit(uint256 poolId) external returns (uint256 quoteTokenAmount, uint256 baseTokenAmount)",
        ],
        signer
      );

      const tx = await poolsNFT.exit(poolId)
      await tx.wait()
    } catch {
      console.log("failed to set long number max")
    }
  }

  const handleBuyRoyalty = async () => {

  }

  const handleSetLongNumberMax = async () => {
    try{
      const poolsnftAddress = networkConfig.poolsnft;

      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        [
          "function pools(uint256 poolId) external view returns (address)"
        ],
        signer
      );

      const poolAddress = await poolsNFT.pools(poolId)
      const pool = new ethers.Contract(
        poolAddress,
        [
          " function setLongNumberMax(uint8 longNumberMax) external",
        ],
        signer
      );

      const tx = await pool.setLongNumberMax(longNumberMax)
      await tx.wait()
    } catch {
      console.log("failed to set long number max")
    }

  }

  const handleSetHedgeNumberMax = async () => {
    try{
      const poolsnftAddress = networkConfig.poolsnft;

      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        [
          "function pools(uint256 poolId) external view returns (address)"
        ],
        signer
      );

      const poolAddress = await poolsNFT.pools(poolId)
      const pool = new ethers.Contract(
        poolAddress,
        [
          "function setHedgeNumberMax(uint8 hedgeNumberMax) external",
        ],
        signer
      );

      const tx = await pool.setHedgeNumberMax(hedgeNumberMax)
      await tx.wait()
    } catch {
      console.log("failed to set hedge number max")
    }

  }

  const handleSetExtraCoef = async () => {
    try{
      const poolsnftAddress = networkConfig.poolsnft;

      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        [
          "function pools(uint256 poolId) external view returns (address)"
        ],
        signer
      );

      const poolAddress = await poolsNFT.pools(poolId)
      const pool = new ethers.Contract(
        poolAddress,
        [
          "function setExtraCoef(uint256 extraCoef) external",
        ],
        signer
      );

      const extraCoefRaw = extraCoef * 100
      const tx = await pool.setExtraCoef(extraCoefRaw)
      await tx.wait()
    } catch {
      console.log("failed to set extra coef")
    }

  }

  const handleSetPriceVolatilityPercent = async () => {
    try{
      const poolsnftAddress = networkConfig.poolsnft;

      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        [
          "function pools(uint256 poolId) external view returns (address)"
        ],
        signer
      );

      const poolAddress = await poolsNFT.pools(poolId)
      const pool = new ethers.Contract(
        poolAddress,
        [
          "function setPriceVolatilityPercent(uint256 priceVolatilityPercent) external",
        ],
        signer
      );

      const priceVolatilityPercentRaw = priceVolatilityPercent * 100
      const tx = await pool.setPriceVolatilityPercent(priceVolatilityPercentRaw)
      await tx.wait()
    } catch {
      console.log("failed to set long number max")
    }
  }

  const handleSetReturnPercent = async () => {
    try{
      const poolsnftAddress = networkConfig.poolsnft;

      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        [
          "function pools(uint256 poolId) external view returns (address)"
        ],
        signer
      );

      const poolAddress = await poolsNFT.pools(poolId)
      const pool = new ethers.Contract(
        poolAddress,
        [
          "function setOpReturnPercent(uint8 op, uint256 returnPercent) external",
        ],
        signer
      );
      let op = selectedOpReturnPercent;
      let returnPercent = inputReturnPercent * 100;
      console.log(op)
      console.log(returnPercent)
      const tx = await pool.setOpReturnPercent(op, returnPercent)
      await tx.wait()
    } catch {
      console.log("failed to set return percent")
    }
  }

  const handleSetFeeCoef = async () => {
    try{
      const poolsnftAddress = networkConfig.poolsnft;

      const poolsNFT = new ethers.Contract(
        poolsnftAddress,
        [
          "function pools(uint256 poolId) external view returns (address)"
        ],
        signer
      );

      const poolAddress = await poolsNFT.pools(poolId)
      const pool = new ethers.Contract(
        poolAddress,
        [
          "function setOpFeeCoef(uint8 op, uint256 _feeCoef) external",
        ],
        signer
      );
      let op = selectedOpFeeCoef;
      let feeCoef = inputFeeCoef * 100;
      const tx = await pool.setOpFeeCoef(op, feeCoef)
      await tx.wait()
    } catch {
      console.log("failed to set fee coef")
    }
  }


  return (
    <div className="pool-info-and-interactor-container">
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
  <div className="pool-interactor">
    <div className="tabs">
      <div className="tab-buttons">
        <button
          onClick={() => {
            setActiveTab('interaction')
            fetchRoyaltyPrice()
          }
          }
          className={activeTab === 'interaction' ? 'active' : ''}
        >
          Interaction
        </button>
        <button
          onClick={() => {
            setActiveTab('config')
            fetchConfig()
          }
          }
          className={activeTab === 'config' ? 'active' : ''}
        >
            Configuration
          </button>
          <div 
            className="tab-indicator"
            style={{
              left: activeTab === 'interaction' ? '0' : '50%',
            }}
          />
        </div>
      </div>

      {activeTab === 'interaction' ? (
        <div className="deposit-withdraw">
          <div className="amount-section">
            <div className='amount-section'>
              Deposit Amount
            </div>
            <div className="input-group">
              <input
                type="number"
                placeholder="Enter deposit amount"
                onChange={(e) => setInputDeposit(e.target.value)}
              />
              <button 
                onClick={() => handleDeposit()} 
                className="action-button"
              >
                Deposit
              </button>
            </div>
          </div>

          <div className="amount-section">
            <div className='amount-section'>
              Withdraw Amount
            </div>
            <div className="input-group">
              <input
                placeholder="Enter withdraw amount"
                onChange={(e) => setInputWithdraw(e.target.value)}
              />
              <button 
                onClick={() => handleWithdraw()}
                className="action-button"
              >
                Withdraw
              </button>
            </div>
          </div>

          <button 
            className="exit-button"
            onClick={() => handleExit()}
          >
            Exit
          </button>

          <div className="exit-description">
            Exit: emergency withdraw distribution of funds and ownership of strategy pool will be moved to royalty receiver.
          </div>

          <button 
            className="royalty-button"
            onClick={() => handleBuyRoyalty()}  
          >
            Buy Royalty<br/> 
            {royaltyPriceToShow} ETH
          </button>
        </div>
      ) : (
        <div className="configuration">
          <div className="config-field">
            <div>Long Number Max (Current value: {longNumberMax.toString()})</div>
            <div className="input-group">
              <input
                className="input-field"
                placeholder='Long number max example: 2'
                onChange={(e) => setLongNumberMax(e.target.value)}
              />
              <button 
                className="set-button"
                onClick={() => handleSetLongNumberMax()}  
              >
                Set
              </button>
            </div>
          </div>

          <div className="config-field">
            <div>Hedge Number Max (Current value: {hedgeNumberMax.toString()})</div>
            <div className="input-group">
              <input
                className="input-field"
                placeholder='Hedge number max example: 4'
                onChange={(e) => setHedgeNumberMax(e.target.value)}
              />
              <button 
                className="set-button"
                onClick={() => handleSetHedgeNumberMax()}  
              >
                Set
              </button>
            </div>
          </div>

          <div className="config-field">
            <div>Extra Coefficient (Current value: {extraCoef.toString()})</div>
            <div className="input-group">
              <input
                className="input-field"
                placeholder='Extra coef example: 2.00'
                onChange={(e) => setExtraCoef(parseFloat(e.target.value))}
              />
              <button 
                className="set-button"
                onClick={() => handleSetExtraCoef()}
              >
                Set
              </button>
            </div>
          </div>

          <div className="config-field">
            <div>Price Volatility Percent (Current value: {priceVolatilityPercent.toString()}%)</div>
            <div className="input-group">
              <input
                className="input-field"
                placeholder='Price volatility percent example: 1.4%'
                onChange={(e) => setPriceVolatilityPercent(parseFloat(e.target.value))}
              />
              <button 
                className="set-button"
                onClick={() => handleSetPriceVolatilityPercent()}
              >
                Set
              </button>
            </div>
          </div>

          <div className="operation-row">
            <div className="operation-select">
              <div className="operation-label">Operation</div>
              <select 
                className="input-field"
                value={selectedOpReturnPercent}
                onChange={(e) => setSelectedOpReturnPercent(e.target.value)}  
              >
                <option value="1">long sell</option>
                <option value="2">hedge sell</option>
                <option value="3">hedge buy</option>
              </select>
            </div>
            <div className="input-coef">
              <div className="field-label">Return Percent</div>
              <input
                placeholder='Return percent example: 1.0'
                className="input-field"
                onChange={(e) => setInputReturnPercent(parseFloat(e.target.value))}
              />
            </div>
            <button 
              className="set-button-coef"
              onClick={() => handleSetReturnPercent()}  
            >
              Set
            </button>
          </div>
          
          <div className="operation-row">
            <div className="operation-select">
              <div className="operation-label">Operation</div>
              <select 
                className="input-field"
                value={selectedOpFeeCoef}
                onChange={(e) => setSelectedOpFeeCoef(e.target.value)}
              >
                <option value="1">long sell</option>
                <option value="2">hedge sell</option>
                <option value="3">hedge rebuy</option>
              </select>
            </div>
            <div className="input-coef">
              <div className="field-label">Fee Coefficient</div>
              <input
                placeholder='Fee coef example: 1.0'
                className="input-field"
                onChange={(e) => setInputFeeCoef(parseFloat(e.target.value))}
              />
            </div>
            <button
              className="set-button-coef"
              onClick={() => handleSetFeeCoef()}
            >
              Set
            </button>
          </div>

        </div>
      )}
    </div>
      </div>
  );
}

export default PoolInteractor;