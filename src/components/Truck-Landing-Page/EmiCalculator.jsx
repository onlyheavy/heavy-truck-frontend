import React, { useState, useMemo, useEffect } from 'react';
import Slider from 'rc-slider';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useCategory } from "@/hooks/useContext";
import LoanForm from '../brochure/loanForm';

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
  const { categoryData } = useCategory();

  const [vehiclePrice, setVehiclePrice] = useState(
    Math.round(categoryData[0].minPrice * 100000 - 100000)
  );
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(60);
  const [interestRate, setInterestRate] = useState(12);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("");

  const handleClick = (type) => {
    setStatus(type);
    setShowForm(true);
  };

  useEffect(() => {
    if (categoryData.length > 0) {
      const validItem = categoryData.find(
        (item) => typeof item?.maxPrice === "number" && item.maxPrice > 0
      );
      if (validItem) {
        setVehiclePrice(
          Math.round(categoryData[0].minPrice * 100000)
        );
      }
    }
  }, [categoryData]);

  useEffect(() => {
    if (vehiclePrice) {
      setDownPayment(Math.round(vehiclePrice / 5));
    }
  }, [vehiclePrice]);

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

  // Chart data
  const chartData = useMemo(() => {
    return {
      labels: ["Down Payment", "Loan Amount"],
      datasets: [
        {
          data: [downPayment, loanAmount],
          backgroundColor: ["#FA7436", "#FFF4EF"],
          hoverBackgroundColor: ["#FF5722", "#FFE082"],
          borderWidth: 1,
        },
      ],
    };
  }, [downPayment, loanAmount]);

  const chartOptions = {
    responsive: true,
    cutout: "60%",
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹ ${Math.round(context.raw).toLocaleString("en-IN")}`,
        },
      },
    },
  };

  return (
    <div className="w-full ">
      <h2 className="md:text-[24px] text-[18px] font-bold mb-5">
        Calculate EMI on {categoryData[0]?.productName}
      </h2>
      <div className="mx-auto p-5 bg-white rounded-lg border border-gray-300">
        <div className="md:grid block grid-cols-2 gap-8">
          {/* Sliders Section */}
          <div className="flex flex-col gap-6">
            {/* Vehicle Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-bold">Vehicle Price</p>
                <input
                  type="number"
                  className="text-sm border border-gray-300 text-[#254154] outline-none w-32 px-3 py-1"
                  value={vehiclePrice || 0}
                  onChange={(e) => {
                    const raw = Number(e.target.value);
                    const value = Math.min(
                      Math.max(
                        Math.round(raw / 1000) * 1000,
                        categoryData[0].minPrice * 100000 - 100000
                      ),
                      categoryData[0].minPrice * 200000
                    );
                    setVehiclePrice(value);
                  }}
                />
              </div>
              {vehiclePrice + 1 < categoryData[0].minPrice * 100000 && (
                <p className="text-red-400 text-[12px] text-end pb-2">
                  Ex-showroom price can not be less than down payment
                </p>
              )}
              <Slider
                min={categoryData[0].minPrice * 100000 - 100000}
                max={categoryData[0].minPrice * 200000}
                step={1000}
                value={vehiclePrice || 0}
                onChange={(value) =>
                  setVehiclePrice(Math.round(value / 1000) * 1000)
                }
              />
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-bold">Down Payment</p>
                <input
                  type="number"
                  className="text-sm border border-gray-300 text-[#254154] outline-none w-32 px-3 py-1"
                  value={downPayment}
                  onChange={(e) => {
                    const raw = Number(e.target.value);
                    const value = Math.min(
                      Math.max(
                        Math.round(raw / 1000) * 1000,
                        vehiclePrice ? Math.round(vehiclePrice / 5) : 0
                      ),
                      vehiclePrice || 0
                    );
                    setDownPayment(value);
                  }}
                />
              </div>
              <Slider
                min={vehiclePrice ? Math.round(vehiclePrice / 5) : 0}
                max={vehiclePrice || 0}
                step={1000}
                value={downPayment}
                onChange={(value) =>
                  setDownPayment(Math.round(value / 1000) * 1000)
                }
              />
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-bold">Interest Rate (%)</p>
                <input
                  type="number"
                  className="text-sm border border-gray-300 text-[#254154] outline-none w-32 px-3 py-1"
                  value={interestRate}
                  onChange={(e) => {
                    const value = Math.min(Math.max(Number(e.target.value), 8), 25);
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
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-bold">Loan Tenure (Months)</p>
                <input
                  type="number"
                  className="text-sm border border-gray-300 text-[#254154] outline-none w-32 px-3 py-1"
                  value={tenure}
                  onChange={(e) => {
                    const value = Math.min(Math.max(Number(e.target.value), 12), 84);
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
          <div className="rounded-lg">
            <div className="relative">
              <div className="md:w-[300px] md:h-[300px] mx-auto relative">
                <Doughnut
                  data={chartData}
                  options={chartOptions}
                  width={300}
                  height={300}
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-sm text-gray-500 mt-8">EMI</p>
                <p className="text-2xl font-bold text-orange-500">
                  ₹{Math.round(emi).toLocaleString("en-IN")}
                </p>
                <p className="text-sm text-gray-500">per month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="md:grid block grid-cols-2 gap-8 mt-8">
          <div className=''>
            <p className="text-xs md:mb-0 mb-4">
              <span className="font-black">Note: </span>
              The EMI amount shown is based on the ex-showroom price, with a 20% down
              payment, a 12% interest rate, and a 60-months tenure. You can adjust
              these values to calculate an EMI that fits your budget.
            </p>
            <div className='text-center py-5 hidden md:block'>
              <button className='w-[70%] border text-white bg-[#FA7436] rounded-sm py-1 hover:bg-orange-600 cursor-pointer border-[#FA7436]' onClick={() => handleClick("EMI")} >
                Apply Loan
              </button>
              {showForm && <LoanForm onClose={() => setShowForm(false)} id={categoryData[0]?._id} status={status} />}
            </div>

          </div>
          <div className="rounded-lg">
            <table className="w-full text-left border border-gray-300 rounded-md">
              <tbody className="text-sm ">
                <tr className="border-b border-gray-300">
                  <td className="p-2 text-gray-700">Principal Amount</td>
                  <td className="p-2 text-gray-700 text-right">
                    ₹{Math.round(loanAmount).toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 text-gray-700">
                    Interest Amount <span className="font-semibold">({interestRate} %)</span>
                  </td>
                  <td className="p-2 text-[#FA7436] text-right">
                    ₹{Math.round(interestAmount).toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 text-gray-700 font-bold">Total Amount Payable</td>
                  <td className="p-2 text-gray-700 text-right font-bold">
                    ₹{Math.round(totalPayment).toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='text-center pt-5 block md:hidden'>
              <button className='w-[70%] border text-white bg-[#FA7436] rounded-sm py-1 hover:bg-orange-600 cursor-pointer border-[#FA7436]' onClick={() => handleClick("EMI")} >
                Apply Loan
              </button>
              {showForm && <LoanForm onClose={() => setShowForm(false)} id={categoryData[0]?._id} status={status} />}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default EmiCalculator;
