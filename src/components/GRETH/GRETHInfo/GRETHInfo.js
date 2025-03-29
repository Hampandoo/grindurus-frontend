import React, { useState, useEffect } from 'react';
import './GRETHInfo.css';
import { useContractService } from '../../../context/ContractContext';
import { ethers } from 'ethers';
import Infographic from '../Infographic';

function GRETHInfo({ networkConfig }) {
  // const { provider } = useContractService();

  // const [tokensBalance, setTokensBalance] = useState([]);

  // const getGrethInfoContract = async (tokenAddress) => {
  //   if (!provider) console.error('Provider not found')
  //   const signer = await provider.getSigner();
  //   return new ethers.Contract(tokenAddress, networkConfig.ERC20ABI, signer)
  // }

  // useEffect(() => {
  //   if (!provider) return;
  //   const fetchBalances = async () => {
  //     const results = await Promise.all(
  //       networkConfig.quoteTokens.map(async (quoteToken) => {
  //         const tokenContract = await getGrethInfoContract(quoteToken.address);
  //         const balance = await tokenContract.balanceOf(networkConfig.GRETH);
  //         return {
  //           label: quoteToken.symbol,
  //           balance: `${ethers.formatUnits(`${balance}`, quoteToken.decimals)}`
  //         };
  //       })
  //     );
  //     setTokensBalance(results);
  //   };
  
  //   fetchBalances();
  // }, [provider]);

  return (
    <div className="greth-info">
      <div className="infographic">
        <Infographic />
        <div className="greth-info-share">
          <span>Your Share: 10%</span>
        </div>
      </div>
      <div class="greth-info-statistics stat">
        <div class="stat-item">
          <div class="stat-key">Total Supply:</div>
          <div class="stat-value">5000</div>
        </div>
        <div class="stat-item">
          <div class="stat-key">Your balance:</div>
          <div class="stat-value">500</div>
        </div>
      </div>
    </div>
  );
}

export default GRETHInfo;