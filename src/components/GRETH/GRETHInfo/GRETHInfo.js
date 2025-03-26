import React, { useState, useEffect } from 'react';
import './GRETHInfo.css';
import { useAppKitAccount } from "@reown/appkit/react";
import config from "../../../config";
import { useContractService } from '../../../context/ContractContext';
import { ethers } from 'ethers'; // ✅ імпорт ethers

const pieChartData = [
  { name: 'Category A', value: 30, color: '#FF6384' },
  { name: 'Category B', value: 50, color: '#36A2EB' },
  { name: 'Category C', value: 20, color: '#FFCE56' },
];

function PieChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  return (
    <svg width="200" height="200" viewBox="-100 -100 200 200">
      {data.map((item) => {
        const angle = (item.value / total) * 360;
        const endAngle = startAngle + angle;
        const largeArcFlag = angle > 180 ? 1 : 0;
        const x1 = Math.cos((startAngle * Math.PI) / 180) * 80;
        const y1 = Math.sin((startAngle * Math.PI) / 180) * 80;
        const x2 = Math.cos((endAngle * Math.PI) / 180) * 80;
        const y2 = Math.sin((endAngle * Math.PI) / 180) * 80;

        const pathData = `M 0 0 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

        startAngle = endAngle;

        return <path key={item.name} d={pathData} fill={item.color} />;
      })}
    </svg>
  );
}

const grethAbi = [
  "function totalGrinded() view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
];

const poolsNftAbi = [
  "function grETH() view returns (address)",
];

function GRETH() {
  const { provider } = useContractService();
  const { address: userAddress } = useAppKitAccount();

  const [grethAddress, setGrethAddress] = useState(null);
  const [totalGrinded, setTotalGrinded] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (!provider) return;

    const poolsContract = new ethers.Contract(config.arbitrum.poolsnft, poolsNftAbi, provider); // ✅
    
    async function loadGrethAddress() {
      try {
        const address = await poolsContract.grETH();
        setGrethAddress(address);
      } catch (err) {
        console.error("Failed to get grETH address", err);
      }
    }

    loadGrethAddress();
  }, [provider]);

  useEffect(() => {
    if (!provider || !grethAddress) return;

    const grethContract = new ethers.Contract(grethAddress, grethAbi, provider); // ✅

    async function loadData() {
      try {
        const [grinded, supply, userBal] = await Promise.all([
          grethContract.totalGrinded(),
          grethContract.totalSupply(),
          userAddress ? grethContract.balanceOf(userAddress) : Promise.resolve(null),
        ]);

        setTotalGrinded(ethers.formatUnits(grinded, 18));
        setTotalSupply(ethers.formatUnits(supply, 18));
        setBalance(userBal ? ethers.formatUnits(userBal, 18) : null);
      } catch (err) {
        console.error("Failed to fetch grETH data", err);
      }
    }

    loadData();
  }, [grethAddress, userAddress, provider]);

  return (
    <div className="greth-info-container">
      <div className="greth-row">
        <div className="info-card">
          <div className="card-content">
            <h2 className="card-title">GRETH Information</h2>
            <div className="info-list">
              <p>Total Grinded: {totalGrinded?.toString()}</p>
              <p>Total Supply: {totalSupply?.toString()}</p>
              <p>Your Balance: {balance?.toString() ?? "0.0"}</p>
            </div>
            <div className="chart-container">
              <PieChart data={pieChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GRETH;
