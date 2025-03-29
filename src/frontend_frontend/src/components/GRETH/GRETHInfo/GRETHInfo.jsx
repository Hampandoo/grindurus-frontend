import React, { useState } from 'react';
import './GRETHInfo.css';

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

function GRETH() {
  const [burnAmount, setBurnAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('');

  const handleMaxClick = () => {
    setBurnAmount('100'); // Предполагаем, что максимум 100
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Burn amount:', burnAmount);
    console.log('Selected token:', selectedToken);
  };

  return (
    <div className="greth-info-container">
      <div className="greth-row">
        <div className="info-card">
          <div className="card-content">
            <h2 className="card-title">GRETH Information</h2>
            <div className="info-list">
              <p>Total Grinded grETH: 1000</p>
              <p>Total Supply grETH: 5000</p>
              <p>Your Balance: 100</p>
              <p>Your Share: 2%</p>
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
