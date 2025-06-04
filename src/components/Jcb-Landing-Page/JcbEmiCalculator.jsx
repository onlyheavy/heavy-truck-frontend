

import React, { useState, useMemo } from 'react';
import Slider from 'rc-slider';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const calculateEmi = ({ price, downPayment, tenure, interestRate }) => {
  const loanAmount = price - downPayment;
  const monthlyRate = interestRate / 12 / 100;
  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalPayment = emi * tenure;
  const interestAmount = totalPayment - loanAmount;

  return { emi, totalPayment, interestAmount, loanAmount };
};

const JcbEmiCalculator = () => {
  const initialVehiclePrice = 1000000;

  const [vehiclePrice, setVehiclePrice] = useState(initialVehiclePrice);
  const [downPayment, setDownPayment] = useState(initialVehiclePrice * 0.1);
  const [tenure, setTenure] = useState(60);
  const [interestRate, setInterestRate] = useState(12);

  const { emi, totalPayment, interestAmount, loanAmount } = useMemo(
    () =>
      calculateEmi({
        price: vehiclePrice,
        downPayment,
        tenure,
        interestRate,
      }),
    [vehiclePrice, downPayment, tenure, interestRate]
  );

  // Dynamically update chart data to show Down Payment and Loan Amount
  const chartData = useMemo(() => {
    return {
      labels: ['Down Payment', 'Loan Amount'],
      datasets: [
        {
          data: [downPayment, loanAmount],
          backgroundColor: ['#FA7436', '#FFF4EF'],
          hoverBackgroundColor: ['#FF5722', '#FFE082'],
          borderWidth: 1,
        },
      ],
    };
  }, [downPayment, loanAmount]);

  const chartOptions = {
    responsive: true,
    cutout: '60%', // Makes it a half-circle
    rotation: -90, // Start from the top
    circumference: 180, // Only show the top half
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹ ${context.raw.toLocaleString('en-IN')}`,
        },
      },
    },
  };

  return (
    <div className="w-full ">
      <h2 className="text-2xl font-bold mb-5">
        Calculate EMI on Ashok leyland AVTR 55T EV Truck
      </h2>
      <div className='mx-auto p-5 bg-white rounded-lg border border-gray-300'>


        <div className='grid grid-cols-2  gap-8'>
          {/* Sliders Section */}
          <div className="flex flex-col gap-6">
            {/* Vehicle Price Slider */}
            <div>
              <div className='flex justify-between items-center mb-3'>
                <p className=" text-sm font-bold ">Vehicle Price</p>
                <input
                  type="number"
                  className="text-sm border border-gray-300 text-[#254154] outline-none w-32 px-3 py-1"
                  value={vehiclePrice} // Bind the input value to the state
                  onChange={(e) => {
                    const value = Math.min(Math.max(Number(e.target.value), 100000), 3000000); // Clamp value between min and max
                    setVehiclePrice(value); // Update the state
                  }}
                />
              </div>

              <Slider
                min={100000}
                max={3000000}
                step={1000}
                value={vehiclePrice}
                onChange={(value) => setVehiclePrice(value)} // Update the state when slider changes

              />
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className='flex justify-between items-center mb-3'>
                <p className=" text-sm font-bold ">Down Payment</p>
                <input
                  type="number"
                  className="text-sm border border-gray-300 text-[#254154] outline-none w-32 px-3 py-1"
                  value={downPayment}
                  onChange={(e) => {
                    const value = Math.min(Math.max(Number(e.target.value), vehiclePrice * 0.1), vehiclePrice); // Clamp value
                    setDownPayment(value);
                  }}
                />
              </div>
              <Slider
                min={vehiclePrice * 0.1}
                max={vehiclePrice}
                step={1000}
                value={downPayment}
                onChange={(value) => setDownPayment(value)}
              />
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className='flex justify-between items-center mb-3'>
                <p className=" text-sm font-bold ">Interest Rate (%)</p>
                <input
                  type="number"
                  className="text-sm border border-gray-300 text-[#254154] outline-none w-32 px-3 py-1"
                  value={interestRate}
                  onChange={(e) => {
                    const value = Math.min(Math.max(Number(e.target.value), 8), 25); // Clamp value
                    setInterestRate(value);
                  }}
                />
              </div>
              <Slider
                min={8}
                max={25}
                step={0.1}
                value={interestRate}
                onChange={(value) => setInterestRate(value)}
              />
            </div>

            {/* Loan Tenure Slider */}
            <div>
              <div className='flex justify-between items-center mb-3'>
                <p className=" text-sm font-bold ">Loan Tenure (Months)</p>
                <input
                  type="number"
                  className="text-sm border border-gray-300 text-[#254154] outline-none w-32 px-3 py-1"
                  value={tenure}
                  onChange={(e) => {
                    const value = Math.min(Math.max(Number(e.target.value), 12), 84); // Clamp value
                    setTenure(value);
                  }}
                />
              </div>
              <Slider
                min={12}
                max={84}
                step={1}
                value={tenure}
                onChange={(value) => setTenure(value)}
              />
            </div>
          </div>

          {/* Half-Circle Chart Section */}
          <div className="   rounded-lg  ">
            <div className='relative'>
              <div className='w-[300px] h-[300px] mx-auto relative'>
                <Doughnut data={chartData} options={chartOptions} width={300} height={300} />

              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-sm text-gray-500 mt-8">EMI</p>
                <p className="text-2xl font-bold text-orange-500">
                  ₹{emi.toFixed(0).toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-gray-500">per month</p>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-8 mt-8'>
          <div>
            <p className='text-xs '><span className='font-black'>Note: </span>EMI amount shown here is calculated based on ex-showroom price with 20% down payment amount @12% rate of interest for 60 months tenure. Users can select their own values to change the EMI amount as per their budget.</p>
          </div>
          {/* Financial Details Table */}
          <div className=" rounded-lg">
            <table className="w-full text-left border border-gray-300 rounded-md">
              <tbody className="text-sm">
                <tr className="border-b border-gray-300">
                  <td className="p-2 text-gray-700">Principal Amount</td>
                  <td className="p-2 text-gray-700 text-right">
                    ₹{loanAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 text-gray-700">
                    Interest Amount <span className="font-semibold">({interestRate} %)</span>
                  </td>
                  <td className="p-2 text-[#FA7436] text-right">₹{interestAmount.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 text-gray-700 font-bold">Total Amount Payable</td>
                  <td className="p-2 text-gray-700 text-right font-bold">
                    ₹{totalPayment.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JcbEmiCalculator;