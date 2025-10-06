import React, { useState, useEffect } from "react";
import axios from "axios";
import API from '@/utils/api';
// replace with your API host constant
const API_HOST = "http://localhost:5000";



const EmiCalculator = () => {
  const brands = [
    "Tata Motors",
    "Mahindra",
    "Ashok Leyland",
    "BharatBenz",
    "Eicher",
    "Force Motors",
  ];

  const [selectedBrand, setSelectedBrand] = useState("");
  const [availableTrucks, setAvailableTrucks] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState("");
  const [selectedTruckId, setSelectedTruckId] = useState("");
  const [priceRange, setPriceRange] = useState(null);

  // EMI fields
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emiResult, setEmiResult] = useState(null);

  // fetch trucks when brand changes
  useEffect(() => {
    const fetchTrucksForBrand = async () => {
      if (selectedBrand) {
        try {
          const response = await axios.get(
            `${API_HOST}/api/category/getProductName/${encodeURIComponent(
              selectedBrand
            )}`
          );
          if (response?.data?.success) {
            setAvailableTrucks(response.data.data);
          } else {
            setAvailableTrucks([]);
          }
        } catch (err) {
          console.error("Error fetching trucks", err);
          setAvailableTrucks([]);
        }
      } else {
        setAvailableTrucks([]);
      }
    };
    fetchTrucksForBrand();
  }, [selectedBrand]);

  // update truck id + price when truck selected
  useEffect(() => {
    if (selectedTruck) {
      const truckObj = availableTrucks.find(
        (t) => t?.productName === selectedTruck
      );
      if (truckObj) {
        setSelectedTruckId(truckObj._id);
        if (truckObj.minPrice && truckObj.maxPrice) {
          setPriceRange(`${truckObj.minPrice} - ${truckObj.maxPrice}`);
          setLoanAmount(truckObj.minPrice); // default loan = min price
        }
      } else {
        setSelectedTruckId("");
        setPriceRange(null);
      }
    }
  }, [selectedTruck, availableTrucks]);

  // EMI formula
  const calculateEMI = (e) => {
    e.preventDefault();
    if (!loanAmount || !interestRate || !loanTenure) return;

    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseInt(loanTenure) * 12;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmiResult(emi.toFixed(2));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
        Calculate Your EMI
      </h2>

      <form onSubmit={calculateEMI}>
        {/* Brand Dropdown */}
        <select
          className="w-full mb-4 p-3 border rounded bg-gray-50 text-gray-700 text-sm"
          value={selectedBrand}
          onChange={(e) => {
            setSelectedBrand(e.target.value);
            setSelectedTruck("");
            setSelectedTruckId("");
            setPriceRange(null);
          }}
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Model Dropdown */}
        <select
          className="w-full mb-4 p-3 border rounded bg-gray-50 text-gray-700 text-sm"
          value={selectedTruck}
          onChange={(e) => setSelectedTruck(e.target.value)}
          disabled={!selectedBrand}
        >
          <option value="">Select Model</option>
          {availableTrucks.map((truck) => (
            <option key={truck._id} value={truck.productName}>
              {truck.productName}
            </option>
          ))}
        </select>

        {/* Price Range Display */}
        {priceRange && (
          <div className="mb-4 text-sm text-gray-600">
            Price Range: <span className="font-semibold">₹ {priceRange}</span>
          </div>
        )}

        {/* Loan Amount */}
        <input
          type="number"
          placeholder="Loan Amount"
          className="w-full mb-4 p-3 border rounded bg-gray-50 text-gray-700 text-sm"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />

        {/* Interest Rate */}
        <input
          type="number"
          placeholder="Interest Rate (%)"
          className="w-full mb-4 p-3 border rounded bg-gray-50 text-gray-700 text-sm"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />

        {/* Loan Tenure */}
        <input
          type="number"
          placeholder="Loan Tenure (years)"
          className="w-full mb-4 p-3 border rounded bg-gray-50 text-gray-700 text-sm"
          value={loanTenure}
          onChange={(e) => setLoanTenure(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Calculate EMI
        </button>
      </form>

      {/* EMI Result */}
      {emiResult && (
        <div className="mt-6 text-center text-lg font-semibold text-green-700">
          Your Monthly EMI: ₹ {emiResult}
        </div>
      )}
    </div>
  );
};


export default EmiCalculator;
