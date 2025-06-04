'use client';

import React, { useMemo } from 'react';
import ApexCharts from 'react-apexcharts';

const SemiCircleChart = ({ vehiclePrice, downPayment, emiAmount }) => {
  // const loanAmount = vehiclePrice - downPayment;
  const series = useMemo(() => [downPayment, vehiclePrice], [downPayment, vehiclePrice]);

  const chartKey = useMemo(() => series.join('-'), [series]);

  const options = {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: false,
            },
            value: {
              show: false,
            },
            total: {
              show: true,
              label: 'EMI',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#333',
              formatter: () => `₹${emiAmount}`,
            },
          },
        },
      },
    },
    labels: ['Down Payment', 'Loan Payment'],
    colors: ['#F28C28', '#FBCEB1'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      labels: {
        colors: ['#333'],
      },
    },
    tooltip: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 450,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <div className="w-[480px] h-[400px]  mx-auto relative flex justify-center">
      <ApexCharts
        key={chartKey} // ✅ Forces re-render when data changes
        options={options}
        series={series}
        type="donut"
        width="480"
      />
      <div className="absolute top-[42%] transform -translate-y-[10%] text-center">
        <div className="text-lg font-bold text-gray-800">EMI</div>
        <div className="text-xl font-extrabold text-black">₹{emiAmount}</div>
        <div className="text-sm text-gray-600">Per Month</div>
      </div>
    </div>
  );
};

export default SemiCircleChart;
