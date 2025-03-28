import React, { useState, useEffect } from 'react';
import './GRETHInfo.css';
import { useContractService } from '../../../context/ContractContext';
import { ethers } from 'ethers';


function GRETHInfo({ networkConfig }) {
  const { provider } = useContractService();

  const [tokensBalance, setTokensBalance] = useState([]);

  const getGrethInfoContract = async (tokenAddress) => {
    if (!provider) console.error('Provider not found')
    const signer = await provider.getSigner();
    return new ethers.Contract(tokenAddress, networkConfig.ERC20ABI, signer)
  }

  useEffect(() => {
    if (!provider) return;
    const fetchBalances = async () => {
      const results = await Promise.all(
        networkConfig.quoteTokens.map(async (quoteToken) => {
          const tokenContract = await getGrethInfoContract(quoteToken.address);
          const balance = await tokenContract.balanceOf(networkConfig.GRETH);
          return {
            label: quoteToken.symbol,
            balance: `${ethers.formatUnits(`${balance}`, quoteToken.decimals)}`
          };
        })
      );
      setTokensBalance(results);
    };
  
    fetchBalances();
  }, [provider]);

  return (
    <div className="greth-info-container">
      <div className="greth-row">
        <div className="info-card">
          <div className="card-content">
            <h2 className="card-title">GRETH Information</h2>
            <div className="info-list">
              {/* TODO//: Add total suply, total grind fields */}
              {tokensBalance.map(token => (
                <div key={token.label} className="token-table-cell">
                  <div className="token-table-title">{token.label}: </div>
                  <div className="token-table-value">{token.balance}</div>
                </div>
              ))}
              {/* <p>Total Grinded: {totalGrinded?.toString()}</p>
              <p>Total Supply: {totalSupply?.toString()}</p>
              <p>Your Balance: {balance?.toString() ?? "0.0"}</p> */}
            </div>
            <div className="chart-container">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GRETHInfo;