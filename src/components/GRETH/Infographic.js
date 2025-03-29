import React, { useEffect, useRef } from "react";

const PieChart = ({ data, size = 200, radius = 80 }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svgNS = "http://www.w3.org/2000/svg";
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "-100 -100 200 200");
    
    data.forEach(item => {
      const angle = (item.value / total) * 360;
      const endAngle = startAngle + angle;
      const largeArcFlag = angle > 180 ? 1 : 0;

      const x1 = Math.cos((startAngle * Math.PI) / 180) * radius;
      const y1 = Math.sin((startAngle * Math.PI) / 180) * radius;
      const x2 = Math.cos((endAngle * Math.PI) / 180) * radius;
      const y2 = Math.sin((endAngle * Math.PI) / 180) * radius;

      const pathData = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", pathData);
      path.setAttribute("fill", item.color);
      path.setAttribute("stroke", "#FFFFFF");
      path.setAttribute("stroke-width", "1");
      svg.appendChild(path);

      startAngle = endAngle;
    });

    if (svgRef.current) {
      svgRef.current.innerHTML = "";
      svgRef.current.appendChild(svg);
    }
  }, [data, size, radius]);

  return <div className="chart" ref={svgRef} />;
};

const Infographic = () => {
  const pieData = [
    { name: "Main", value: 90, color: "#53118F" },
    { name: "Other", value: 10, color: "#933DC9" }
  ];

  return (
    <PieChart data={pieData} />
  );
};

export default Infographic;