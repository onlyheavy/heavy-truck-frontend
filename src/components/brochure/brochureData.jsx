import API from '@/utils/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BrochureForm from './brochureForm';

const brandOptions = [
    { id: "Tata Motors", value: "Tata Motors" },
    { id: "Mahindra", value: "Mahindra" },
    { id: "Ashok Leyland", value: "Ashok Leyland" },
    { id: "BharatBenz", value: "BharatBenz" },
    { id: "Eicher", value: "Eicher" },
    { id: "Force Motors", value: "Force Motors" },
];

const BrochureData = () => {
    const defaultTruckId = "689c9514d0a92f84b2c784d3";
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [models, setModels] = useState([]);
    const [selectedTruckId, setSelectedTruckId] = useState(defaultTruckId);
    const [selectedTruckData, setSelectedTruckData] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Fetch models when brand changes
    useEffect(() => {
        const fetchTrucksByBrand = async () => {
            if (selectedBrand) {
                try {
                    const response = await axios.get(
                        `${API.HOST}/api/category/getProductName/${encodeURIComponent(selectedBrand)}`
                    );
                    if (response?.data?.success) {
                        setModels(response?.data?.data || []);
                    }
                } catch {
                    setModels([]);
                }
            } else {
                setModels([]);
            }
        };
        fetchTrucksByBrand();
    }, [selectedBrand]);

    // Update truckId when model selected
    useEffect(() => {
        if (selectedModel) {
            setSelectedTruckId(selectedModel);
        } else {
            setSelectedTruckId(defaultTruckId);
        }
    }, [selectedModel]);

    // Fetch truck data when truckId changes
    useEffect(() => {
        const fetchTruckData = async () => {
            if (selectedTruckId) {
                try {
                    const response = await axios.get(
                        `${API.HOST}/api/category/thirdCompare/${selectedTruckId}`
                    );
                    if (response?.data?.success) {
                        setSelectedTruckData(response?.data?.data[0]);
                    } else {
                        setSelectedTruckData(null);
                    }
                } catch {
                    setSelectedTruckData(null);
                }
            }
        };
        fetchTruckData();
    }, [selectedTruckId]);

    return (
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 pt-8">
            <div className="flex flex-col lg:flex-row justify-center gap-8 items-center">
                {/* LEFT SIDE - Brand + Model Selectors */}
                <div className="border p-6 rounded-lg flex flex-col items-center space-y-6 bg-white shadow-md w-full sm:w-auto">
                    <div className="border-dashed border w-28 h-28 rounded-full bg-blue-50 flex items-center justify-center">
                        <img src="/placeholder.png" alt="Truck" className="w-20 h-20 object-contain" />
                    </div>

                    <div className="flex flex-col space-y-4 w-full items-center">
                        <select
                            value={selectedBrand}
                            onChange={(e) => {
                                setSelectedBrand(e.target.value);
                                setSelectedModel("");
                            }}
                            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 w-full sm:w-80"
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
                            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 w-full sm:w-80 disabled:opacity-50"
                        >
                            <option value="">Select Truck Model</option>
                            {models.map((model) => (
                                <option key={model._id} value={model._id}>
                                    {model.productName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* RIGHT SIDE - Truck Info */}
                <div className="flex flex-col md:flex-row gap-6 border p-2 rounded-lg shadow-md w-full">
                    <img
                        src={
                            selectedTruckData?.productImage
                                ? `${process.env.NEXT_PUBLIC_S3_URL}${selectedTruckData?.productImage}`
                                : "/diesel-truck.png"
                        }
                        alt={selectedTruckData?.productName || "Truck"}
                        className="w-full md:w-80 h-64 object-cover rounded-md"
                    />
                    <div>
                        <h2 className="py-4 font-bold text-xl">
                            {selectedTruckData?.productName || "Default Truck"}
                        </h2>
                        <p className="pb-4 font-semibold text-lg">
                            {selectedTruckData?.price || "From ₹9.00 Lakh"}
                        </p>
                        <p className="pb-12 text-gray-600">
                            Get detailed truck specifications, features, and pricing in one place. Download the brochure and choose the right truck for your business.
                        </p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="border border-orange-500 bg-orange-500 p-3 px-9 text-white rounded-md hover:bg-orange-400 transition"
                        >
                            Download Brochure
                        </button>
                    </div>
                </div>
            </div>

            {/* Brochure Download Modal */}
            {showForm && <BrochureForm onClose={() => setShowForm(false)} id={selectedTruckId} />}
        </div>
    );
};

export default BrochureData;
