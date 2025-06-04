// 'use client';

// import React, { useEffect, useState } from 'react';
// import MainLayout from '@/layouts/MainLayout';
// import SliderInput from '@/components/sliderInput';
// import { calculateEmi } from '@/utils/emiCalculator';
// import dynamic from 'next/dynamic';

// const SemiCircleChart = dynamic(() => import('@/components/chart'), {
//   ssr: false,
// });

// const EmiCalculator = () => {
//   const initialVehiclePrice = 1000000;

//   const [vehiclePrice, setVehiclePrice] = useState(initialVehiclePrice);
//   const [downPayment, setDownPayment] = useState(initialVehiclePrice * 0.1);
//   const [tenure, setTenure] = useState(60);
//   const [interestRate, setInterestRate] = useState(12);
//   const [isDownPaymentDirty, setIsDownPaymentDirty] = useState(false); // Track if user changed it

//   // Only set default down payment when user hasn't touched it
//   useEffect(() => {
//     if (!isDownPaymentDirty) {
//       setDownPayment(vehiclePrice * 0.1);
//     }
//   }, [vehiclePrice, isDownPaymentDirty]);

//   const handleDownPaymentChange = (value) => {
//     setDownPayment(value);
//     setIsDownPaymentDirty(true); // User has manually adjusted
//   };

//   const { emi, totalPayment, interestAmount, loanAmount } = calculateEmi({
//     price: vehiclePrice,
//     downPayment,
//     tenure,
//     interestRate,
//   });

//   return (
//     <div className=''>
//       <h2 className='text-2xl font-bold my-5'>Calculate EMI on Ashok leyland AVTR 55T EV Truck</h2>
//       <div className="w-full bg-white  rounded-md p-5 border border-gray-300">
//         <div className=" mx-auto px-12 flex gap-20 justify-between items-center">
//           <div className="w-[50%]">
//             <SliderInput
//               label="Vehicle Price"
//               value={vehiclePrice}
//               min={100000}
//               max={initialVehiclePrice * 3}
//               step={1000}
//               onChange={(val) => {
//                 setVehiclePrice(val);
//                 // setIsDownPaymentDirty(false);
//               }}
//             />

//             <SliderInput
//               label="Down Payment"
//               value={downPayment}
//               min={vehiclePrice * 0.1}
//               max={vehiclePrice}
//               step={1000}
//               onChange={(val) => {
//                 setDownPayment(val);
//                 // setIsDownPaymentDirty(false);
//               }}
//             />

//             <SliderInput
//               label="Interest Rate (%)"
//               value={interestRate}
//               min={8}
//               max={25}
//               step={1}
//               onChange={setInterestRate}
//             />

//             <SliderInput
//               label="Loan Tenure (Months)"
//               value={tenure}
//               min={12}
//               max={84}
//               step={1}
//               onChange={setTenure}
//             />
//           </div>
//           <div className=" relative py-7 ">
//             <SemiCircleChart
//               vehiclePrice={loanAmount}
//               downPayment={downPayment}
//               emiAmount={emi.toFixed(0)}
//             />
//             <div className="absolute top-76 left-40">
//               <button className="p-2 px-6 text-orange-500   border hover:bg-orange-500 hover:text-white border-orange-500">
//                 Avail EMI Offer
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-end gap-12 px-7">
//           <div>
//             <p className="text-[15px]   text-gray-500 w-[80%] ">
//               <span className='font-bold'>Note:</span> EMI amount shown here is calculated based on ex-showroom price
//               with 20% down payment amount @12% rate  of interest for 60 months tenure. Users can
//               select their own values to change the EMI amount as per their budget
//             </p>
//           </div>
//           <div className=" text-gray-800 border border-gray-400 rounded w-full ">
//             <div className="flex justify-between border-b border-gray-400 p-4 ">
//               <span>Loan Amount</span>
//               <span>₹{loanAmount.toLocaleString('en-IN')}</span>
//             </div>
//             <div className="flex justify-between items-center border-b border-gray-400 p-4">
//               <span >Total Interest <br /><span className='text-orange-500 cursor-pointer'>Payment Schedule</span></span>
//               <span>₹{interestAmount.toFixed(0).toLocaleString('en-IN')}</span>
//             </div>
//             <div className="flex justify-between border-gray-400 p-4">
//               <span>Total Amount Payable</span>
//               <span>₹{totalPayment.toFixed(0).toLocaleString('en-IN')}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// EmiCalculator.getLayout = function getLayout(page) {
//   return <MainLayout>{page}</MainLayout>;
// };

// export default EmiCalculator;


import React, { useState, useMemo } from 'react';
import Slider from 'rc-slider';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useCategory } from "@/hooks/useContext";
import { useEffect } from 'react';

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

const EmiCalculator = () => {
  // const initialVehiclePrice = 1000000;

  const [vehiclePrice, setVehiclePrice] = useState(null);
  const [downPayment, setDownPayment] = useState(vehiclePrice * 0.1);
  const [tenure, setTenure] = useState(60);
  const [interestRate, setInterestRate] = useState(12);
  const { categoryData } = useCategory();
  useEffect(() => {
    if (categoryData.length > 0) {
      const validItem = categoryData.find(item => typeof item?.price === 'number' && item.price > 0);
      if (validItem) {
        setVehiclePrice(validItem.price);
      }
    }
  }, [categoryData]);


  { categoryData.map((item) => (console.log(item.price, "PRooooooo"))) }

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
      <h2 className="md:text-[24px] text-[18px] font-bold mb-5">
        Calculate EMI on {categoryData[0]?.productName}
      </h2>
      <div className='mx-auto p-5 bg-white rounded-lg border border-gray-300'>


        <div className='md:grid block grid-cols-2  gap-8'>
          {/* Sliders Section */}
          <div className="flex flex-col gap-6">
            {/* Vehicle Price Slider */}
            <div>
              <div className='flex justify-between items-center mb-3'>
                <p className=" text-sm font-bold ">Vehicle Price</p>
                {/* <input
                  type="number"
                  className="text-sm border border-gray-300 text-[#254154] outline-none w-32 px-3 py-1"
                  value={vehiclePrice} // Bind the input value to the state
                  onChange={(e) => {
                    const value = Math.min(Math.max(Number(e.target.value), 100000), 3000000); // Clamp value between min and max
                    setVehiclePrice(value); // Update the state
                  }}
                /> */}
                <input
                  type="number"
                  className="text-sm border border-gray-300 text-[#254154] outline-none w-32 px-3 py-1"
                  value={vehiclePrice || 0} // Fallback to 0 to avoid uncontrolled input
                  onChange={(e) => {
                    const value = Math.min(Math.max(Number(e.target.value), 100000), 3000000);
                    setVehiclePrice(value);
                  }}
                />
              </div>

              <Slider
                min={100000}
                max={3000000}
                step={1000}
                value={vehiclePrice || 0}
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
              <div className='md:w-[300px] md:h-[300px] mx-auto relative'>
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

        <div className='md:grid block grid-cols-2 gap-8 mt-8'>
          <div>
            <p className='text-xs md:mb-0 mb-4'><span className='font-black'>Note: </span>EMI amount shown here is calculated based on ex-showroom price with 20% down payment amount @12% rate of interest for 60 months tenure. Users can select their own values to change the EMI amount as per their budget.</p>
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

export default EmiCalculator;