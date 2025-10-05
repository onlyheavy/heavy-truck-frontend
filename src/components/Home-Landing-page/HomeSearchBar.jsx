import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API from '@/utils/api';


const brandOptions = [
  { id: "Tata Motors", value: "Tata Motors" },
  { id: "Mahindra", value: "Mahindra" },
  { id: "Ashok Leyland", value: "Ashok Leyland" },
  { id: "BharatBenz", value: "BharatBenz" },
  { id: "Eicher", value: "Eicher" },
  { id: "Force Motors", value: "Force Motors" },
];

const HomeSearchBar = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [models, setModels] = useState([]);
  const [selectedTruckId, setSelectedTruckId] = useState("");
  const [selectedTruckData, setSelectedTruckData] = useState(null);

  useEffect(() => {
    const fetchTrucksByBrand = async () => {
      if (selectedBrand) {
        try {
          const response = await axios.get(`${API.HOST}/api/category/getProductName/${encodeURIComponent(selectedBrand)}`);
          if (response?.data?.success) {
            setModels(response?.data?.data || []);
          }
        } catch (err) {
          setModels([]);
        }
      } else {
        setModels([]);
      }
    };
    fetchTrucksByBrand();
  }, [selectedBrand]);

  useEffect(() => {
    setSelectedTruckId(selectedModel || "");
  }, [selectedModel]);

  useEffect(() => {
    const fetchTruckData = async () => {
      if (selectedTruckId) {
        try {
          const response = await axios.get(`${API.HOST}/api/category/thirdCompare/${selectedTruckId}`);
          if (response?.data?.success) {
            setSelectedTruckData(response?.data?.data[0]);
          } else {
            setSelectedTruckData(null);
          }
        } catch (err) {
          setSelectedTruckData(null);
        }
      } else {
        setSelectedTruckData(null);
      }
    };
    fetchTruckData();
  }, [selectedTruckId]);

  const handleQuote = () => {
    if (!selectedBrand || !selectedModel) {
      alert("Please select both brand and model");
      return;
    }
    if (selectedTruckData && selectedTruckData.categorySlug && selectedTruckData.slug) {
      window.location.href = `/${selectedTruckData.categorySlug}/${selectedTruckData.slug}`;
    } else {
      alert("Truck details not found.");
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-b from-[#FFF0E5] to-[#FFF9F5] py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance bg-gradient-to-b from-[#E9C3A2] to-[#2F2717] bg-clip-text text-transparent">
                Find the Perfect Truck
                <br />
                <span>for Your Business &</span>
                <br />
                Lifestyle
              </h2>
              <p className="text-lg text-[#566479] mb-8 text-pretty">
                Easily estimate how much you’ll spend on fuel each month based on mileage, fuel price, and efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 bg-white p-5 rounded-md border border-orange-400">
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setSelectedModel(""); // reset model when brand changes
                  }}
                  className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 w-60"
                >
                  <option value="">Select Truck Brand</option>
                  {brandOptions.map((brand) => (
                    <option key={brand.value} value={brand.value}>
                      {brand.id}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedBrand}
                  className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 w-60 disabled:opacity-50"
                >
                  <option value="">Select Truck Model</option>
                  {models.map((model) => (
                    <option key={model._id} value={model._id}>
                      {model.productName}
                    </option>
                  ))}
                </select>
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleQuote}
                >
                  Get Quote
                </Button>
              </div>
            </div>
            <div className="relative w-full h-full">
              <img
                src="/images/ring.svg"
                alt="ring"
                className="absolute inset-1 w-full h-full z-0"
              />
              <img
                src="/images/home-truck.svg?height=400&width=600"
                alt="Commercial Truck"
                className="relative w-full h-auto -right-5 z-10"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSearchBar;