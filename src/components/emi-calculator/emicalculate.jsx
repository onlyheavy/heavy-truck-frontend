import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ArrowLeft } from "lucide-react";
import API from "@/utils/api";

// ------------- Brand Gallery Component ----------------
const BrandGallery = () => {
  const brands = [
    { name: "Mahindra", logo: "/trucks/mahindra.svg" },
    { name: "Tata", logo: "/trucks/tata.svg" },
    { name: "Bajaj", logo: "/trucks/bajaj.svg" },
    { name: "Ashok Leyland", logo: "/trucks/ashok-leyland.svg" },
    { name: "Force", logo: "/trucks/force.svg" },
    { name: "TVS", logo: "/trucks/tvs.svg" },
    { name: "Saarthi", logo: "/trucks/saarthi.svg" },
    { name: "Piaggio", logo: "/trucks/piaggio.svg" },
    { name: "Euler", logo: "/trucks/euler.svg" },
  ];

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Popular Brands
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="border rounded-md flex justify-center items-center p-2 hover:shadow-sm transition"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-10 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// ------------- EMI Calculator ----------------
const EmiCalculator = ({ showResults, onCalculateEmi, onBack }) => {
  const defaultTruckId = "689c9514d0a92f84b2c784d3";
  const brandOptions = [
    { id: "Tata Motors", value: "Tata Motors" },
    { id: "Mahindra", value: "Mahindra" },
    { id: "Ashok Leyland", value: "Ashok Leyland" },
    { id: "BharatBenz", value: "BharatBenz" },
    { id: "Eicher", value: "Eicher" },
    { id: "Force Motors", value: "Force Motors" },
  ];

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [models, setModels] = useState([]);
  const [selectedTruckData, setSelectedTruckData] = useState(null);
  const [vehiclePrice, setVehiclePrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(15);
  const [loanPeriod, setLoanPeriod] = useState(60);
  const [emi, setEmi] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [extraAmount, setExtraAmount] = useState(0);

  // Fetch Models by Brand
  useEffect(() => {
    const fetchTrucksByBrand = async () => {
      if (selectedBrand) {
        try {
          const res = await axios.get(
            `${API.HOST}/api/category/getProductName/${encodeURIComponent(
              selectedBrand
            )}`
          );
          if (res?.data?.success) setModels(res.data.data || []);
        } catch {
          setModels([]);
        }
      } else {
        setModels([]);
      }
    };
    fetchTrucksByBrand();
  }, [selectedBrand]);

  // Fetch Selected Truck Data
  const fetchTruckData = async () => {
    try {
      const res = await axios.get(
        `${API.HOST}/api/category/thirdCompare/${selectedModel || defaultTruckId
        }`
      );
      if (res?.data?.success) {
        const data = res.data.data[0];
        setSelectedTruckData(data);
        const price = Math.round(((data.minPrice + data.maxPrice) / 2) * 100000);
        setVehiclePrice(price);
        setDownPayment(Math.round(price / 5));
        onCalculateEmi();
      }
    } catch {
      setSelectedTruckData(null);
    }
  };

  // EMI Formula
  useEffect(() => {
    if (vehiclePrice && downPayment && interestRate && loanPeriod) {
      const loanAmount = vehiclePrice - downPayment;
      const monthlyRate = interestRate / 12 / 100;
      const emiValue =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanPeriod)) /
        (Math.pow(1 + monthlyRate, loanPeriod) - 1);
      const totalPay = emiValue * loanPeriod;
      setEmi(Math.round(emiValue));
      setPayableAmount(Math.round(totalPay));
      setExtraAmount(Math.round(totalPay - loanAmount));
    }
  }, [vehiclePrice, downPayment, interestRate, loanPeriod]);

  console.log("Reactt", selectedTruckData)

  // ---------- STEP 1: BEFORE CALCULATION ----------
  if (!showResults) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-row max-w-full">
        {/* Left Section */}
        <div className="flex flex-col w-[50%]">
          <h2 className="text-orange-500 font-bold text-xl mb-6 text-center">
            Calculate Your EMI
          </h2>

          <div className="flex flex-col space-y-8 items-center">
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedModel("");
              }}
              className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-80"
            >
              <option value="">Select Brand</option>
              {brandOptions.map((b) => (
                <option key={b.id} value={b.value}>
                  {b.id}
                </option>
              ))}
            </select>

            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedBrand}
              className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-80 disabled:opacity-50"
            >
              <option value="">Select Model</option>
              {models.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.productName}
                </option>
              ))}
            </select>

            <button
              onClick={fetchTruckData}
              className="bg-orange-500 text-white rounded-md px-6 py-2 mt-4 w-80 hover:bg-orange-600 transition"
            >
              Calculate EMI
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-orange-50 p-6 rounded-md flex flex-col  w-[50%] justify-center items-center">
          <h3 className="text-lg font-semibold mb-4">EMI</h3>
          <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm text-center">
            <div>
              <p className="font-medium text-gray-700">Ex-showroom Price</p>
              <p className="text-lg font-bold">--</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Total Loan Amount</p>
              <p className="text-lg font-bold">--</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Payable Amount</p>
              <p className="text-lg font-bold">--</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">You’ll Pay extra</p>
              <p className="text-lg font-bold">--</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- STEP 2: AFTER CALCULATION ----------
  return (
    <div className="bg-white p-4 rounded-xl border max-w-6xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      <h2 className="text-center text-xl font-semibold text-orange-500 mb-6">
        Calculate Your EMI
      </h2>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Left Side */}
        <div className="rounded-lg p-4">
          <div className="flex items-center gap-4 p-2 shadow-sm shadow-[0px_1px_6px_0px_#00000026] border rounded-[10px] border-[#E0E8ED]">
            <img
              src={
                selectedTruckData?.images?.[0] ||
                "https://cdn.bharatbenz.com/media/catalog/product/cache/7a6b6b50b4b07d7c64d48252e8cb0b5c/b/h/bharatbenz-1015r-bs6-truck.png"
              }
              alt={selectedTruckData?.productName || "Truck"}
              className="w-24 h-20 object-cover rounded-md"
            />
            <div>
              <h3 className="font-semibold text-gray-800">
                {selectedTruckData?.brandName || "BharatBenz"}
              </h3>
              <p className="text-gray-500 text-sm">
                From ₹{(vehiclePrice / 100000).toFixed(2)} Lakh
              </p>
            </div>
          </div>

          {/* Down Payment */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">
                Down Payment
              </label>
              <input
                type="number"
                className="border px-3 py-1 rounded-md w-32 text-sm"
                value={downPayment || 0}
                onChange={(e) =>
                  setDownPayment(
                    Math.min(Number(e.target.value), vehiclePrice)
                  )
                }
              />
            </div>
            <Slider
              min={100000}
              max={vehiclePrice}
              step={1000}
              value={downPayment}
              onChange={(v) => setDownPayment(v)}
            />
          </div>

          {/* Interest Rate */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">
                Bank Interest Rate (%)
              </label>
              <input
                type="number"
                className="border px-3 py-1 rounded-md w-20 text-sm"
                value={interestRate}
                onChange={(e) =>
                  setInterestRate(Math.min(Math.max(Number(e.target.value), 5), 20))
                }
              />
            </div>
            <Slider
              min={5}
              max={20}
              step={0.5}
              value={interestRate}
              onChange={(v) => setInterestRate(v)}
            />
          </div>

          {/* Loan Period */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Loan Period (Months)
            </p>
            <div className="flex flex-wrap gap-2">
              {[12, 24, 36, 48, 60, 72, 84].map((m) => (
                <button
                  key={m}
                  onClick={() => setLoanPeriod(m)}
                  className={`px-4 py-2 rounded-md border text-sm ${loanPeriod === m
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700"
                    }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-orange-50 p-6 rounded-lg flex flex-col items-center justify-center">
          <div className="flex items-center justify-between bg-[#fff9f6] p-6 rounded-lg shadow-sm w-full mb-8 border border-gray-100">
            {/* Left Section */}
            <div className="flex-1 text-center border-r border-gray-300">
              <h3 className="text-gray-700 font-semibold text-lg">EMI</h3>
            </div>

            {/* Right Section */}
            <div className="flex-1 text-center">
              <p className="text-3xl font-bold text-gray-900">₹ {emi.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Per Month</p>
            </div>
          </div>


          <div className="grid grid-cols-2 w-full gap-6 text-center text-gray-700">
            <div>
              <p className="font-semibold pb-2">Ex-showroom Price</p>
              <p>₹ {vehiclePrice.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold pb-2">Total Loan Amount</p>
              <p>₹ {(vehiclePrice - downPayment).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold pb-2">Payable Amount</p>
              <p>₹ {payableAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold pb-2">You’ll Pay extra</p>
              <p>₹ {extraAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ------------- Parent Wrapper ----------------
const CalculateEmi = () => {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="bg-white md:py-10 py-4 md:px-16 px-0 flex gap-6">
      <div className="flex-1 max-w-[70%]">
        <EmiCalculator
          showResults={showResults}
          onCalculateEmi={() => setShowResults(true)}
          onBack={() => setShowResults(false)}
        />
      </div>
      <div className="flex-1 max-w-[30%]">
        <BrandGallery />
      </div>

    </div>
  );
};

export default CalculateEmi;
