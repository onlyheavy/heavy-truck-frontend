import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import API from "@/utils/api";
import axios from "axios";
import { useRouter } from "next/router";

const TruckCompare = () => {
  const [truck1Data, setTruck1Data] = useState(null);
  const [truck2Data, setTruck2Data] = useState(null);
  const [performanceSpecs, setPerformanceSpecs] = useState([]);
  const [dimensionSpecs, setDimensionSpecs] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedTruck, setSelectedTruck] = useState("");
  const [selectedTruckId, setSelectedTruckId] = useState("");
  const [selectedTruckData, setSelectedTruckData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trucksByBrand, setTrucksByBrand] = useState({
    Tata: ["Tata Ace", "Tata Intra", "Tata Yodha"],
    Mahindra: ["Mahindra Jeeto", "Mahindra Bolero", "Mahindra Supro"],
    "Ashok Leyland": [], // Will be fetched from API
    Eicher: ["Eicher Pro 2049", "Eicher Pro 2059XP", "Eicher Pro 3015"],
  });

  const brands = ["Tata", "Mahindra", "Ashok Leyland", "Eicher"];
  const [availableTrucks, setAvailableTrucks] = useState([]);

  const router = useRouter();
  const { slug } = router.query;

  console.log('slug:', slug);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API.HOST}/api/category/truck/mahindra-jeeto`);
        const apiResponse = response.data;

        if (apiResponse.success) {
          const truck1 = apiResponse.data.existData[0];
          const truck2 = apiResponse.data.alternatives[1];

          setTruck1Data(truck1);
          setTruck2Data(truck2);


          const truck2Performance = {
            engine: "4 Cylinder, 1496 cc DI",
            norm: "BS-6 Phase 2",
            power: "70 HP",
            cylinders: "4",
            torque: "140 NM",
            speed: "80 KMPH",
            tyres: "4",
            tank: "35 Ltr.",
            gvw: "2565 KG",
            payload: "1300 KG",
            kerb: "N/A",
          };

          const truck2Dimensions = {
            length: "4460 MM",
            width: "1692 MM",
            height: "1945 MM",
            wheelbase: "2450 MM",
            clearance: "175 MM",
            radius: "5250 MM",
          };

          setPerformanceSpecs([
            { label: "Engine", truck1: truck1.specInfo.engine[0]?.engineDisplacement, truck2: truck2Performance.engine },
            { label: "Engine Norm", truck1: truck1.specInfo.engine[0]?.emissionNorm, truck2: truck2Performance.norm },
            { label: "Power", truck1: truck1.specInfo.engine[0]?.enginePower, truck2: truck2Performance.power },
            { label: "Engine Cylinders", truck1: truck1.specInfo.engine[0]?.engineCylinders, truck2: truck2Performance.cylinders },
            { label: "Max Torque", truck1: truck1.specInfo.engine[0]?.torque, truck2: truck2Performance.torque },
            { label: "Max Speed", truck1: truck1.specInfo.engine[0]?.maxSpeed, truck2: truck2Performance.speed },
            { label: "No. of Tyres", truck1: truck1.specInfo.tyre[0]?.numberOfTyres, truck2: truck2Performance.tyres },
            { label: "Fuel Tank", truck1: truck1.specInfo.engine[0]?.fuelTankCapacity, truck2: truck2Performance.tank },
            { label: "GVW", truck1: truck1.specInfo.transmissionLoad[0]?.GrossVehicleWeight, truck2: truck2Performance.gvw },
            { label: "Payload Capacity", truck1: truck1.specInfo.transmissionLoad[0]?.payload, truck2: truck2Performance.payload },
            { label: "Kerb Weight", truck1: truck1.specInfo.transmissionLoad[0]?.kerbWeight, truck2: truck2Performance.kerb },
          ]);

          setDimensionSpecs([
            { label: "Length", truck1: truck1.specInfo.dimensions[0]?.overallLength, truck2: truck2Dimensions.length },
            { label: "Width", truck1: truck1.specInfo.dimensions[0]?.overallWidthh, truck2: truck2Dimensions.width },
            { label: "Height", truck1: truck1.specInfo.dimensions[0]?.overallHeight, truck2: truck2Dimensions.height },
            { label: "Wheelbase", truck1: truck1.specInfo.dimensions[0]?.wheelBase, truck2: truck2Dimensions.wheelbase },
            { label: "Ground Clearance", truck1: truck1.specInfo.dimensions[0]?.groundClearance, truck2: truck2Dimensions.clearance },
            { label: "Minimum Turning Radius", truck1: truck1.specInfo.dimensions[0]?.turningRadius, truck2: truck2Dimensions.radius },
          ]);
        } else {
          setError(new Error(apiResponse.message || 'API request failed'));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch trucks when a brand is selected
    const fetchTrucksByBrand = async () => {
      if (selectedBrand) {
        try {
          const response = await axios.get(`${API.HOST}/api/category/getProductName/${encodeURIComponent(selectedBrand)}`);
          if (response.data.success) {
            const trucks = response.data.data.map(item => item.productName);
            setTrucksByBrand(prev => ({ ...prev, [selectedBrand]: trucks }));
          }
        } catch (err) {
          // Optionally handle error
        }
      }
    };
    fetchTrucksByBrand();
  }, [selectedBrand]);

  useEffect(() => {
    // Fetch trucks for the selected brand
    const fetchTrucksForBrand = async () => {
      if (selectedBrand) {
        try {
          const response = await axios.get(`${API.HOST}/api/category/getProductName/${encodeURIComponent(selectedBrand)}`);
          if (response.data.success) {
            // Store the full truck objects
            setAvailableTrucks(response.data.data);
          } else {
            setAvailableTrucks([]);
          }
        } catch (err) {
          setAvailableTrucks([]);
        }
      } else {
        setAvailableTrucks([]);
      }
    };
    fetchTrucksForBrand();
  }, [selectedBrand]);

  useEffect(() => {
    // Fetch truck data when selectedTruckId changes
    const fetchTruckData = async () => {
      if (selectedTruckId) {
        try {
          const response = await axios.get(`${API.HOST}/api/category/getData/${selectedTruckId}`);
          if (response.data.success) {
            setSelectedTruckData(response.data.data);
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

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="">
      <div className="">
        <div className="">
          <Image
            src="/images/truck-header.png"
            alt="Truck Banner"
            width={1200}
            height={200}
            className="w-full h-28 rounded-lg"
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold my-8 text-center">
          {truck1Data?.productName} vs {truck2Data?.productName}{" "}
          <span className="text-orange-500">Comparison</span>
        </h1>

        <div className="flex flex-wrap justify-center items-stretch gap-4 my-8">
          <div className="w-full md:w-auto md:flex-1 md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-md text-center flex flex-col">
            <div className="relative">
              <Image
                src="/images/demo1.jpg"
                alt={truck1Data?.productName || "Truck 1"}
                width={350}
                height={320}
                className="rounded-t-lg object-cover w-full"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-semibold text-base">
                {truck1Data?.productName}
              </h3>
              <p className="font-bold text-lg mt-1">
                ₹ {truck1Data?.minPrice} - {truck1Data?.maxPrice} Lakh*
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="p-3 rounded-full bg-white border-2 border-orange-500 text-orange-500 font-bold text-xl">
              VS
            </div>
          </div>

          <div className="w-full md:w-auto md:flex-1 md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-md text-center flex flex-col">
            <div className="relative">
              <Image
                src="/images/demo4.jpg"
                alt={truck2Data?.productName || "Truck 2"}
                width={350}
                height={320}
                className="rounded-t-lg object-cover w-full"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-semibold text-base">
                {truck2Data?.productName}
              </h3>
              <p className="font-bold text-lg mt-1">
                ₹ {truck2Data?.minPrice} - {truck2Data?.maxPrice} Lakh*
              </p>
            </div>
          </div>

          <div className="hidden xl:flex items-center">
            <div className="p-3 rounded-full bg-white border-2 border-orange-500 text-orange-500 font-bold text-xl">
              VS
            </div>
          </div>

          <div className="w-full md:w-auto md:flex-1 md:max-w-sm bg-white border-2 border-dashed border-gray-300 rounded-lg text-center p-4 flex flex-col items-center justify-center">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <Image
                src="/icons/truck.svg"
                alt="truck icon"
                width={50}
                height={50}
              />
            </div>
            <select
              className="w-full mb-4 p-3 border rounded bg-gray-50 text-left text-gray-500"
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedTruck('');
              }}
            >
              <option value="">Select Brand</option>
              {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
            </select>
            <select
              className="w-full p-3 border rounded bg-gray-50 text-left text-gray-500"
              value={selectedTruck}
              onChange={e => {
                setSelectedTruck(e.target.value);
                // Find the selected truck object
                const truckObj = availableTrucks.find(truck => truck.productName === e.target.value);
                if (truckObj) {
                  setSelectedTruckId(truckObj._id);
                } else {
                  setSelectedTruckId("");
                }
              }}
              disabled={!selectedBrand}
            >
              <option value="">Select Truck</option>
              {availableTrucks.map(truck => <option key={truck._id} value={truck.productName}>{truck.productName}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md my-8">
          <div className="bg-[#FFE8DE] p-4 rounded-t-lg grid grid-cols-4 text-[#FA7436]">
            <h2 className="text-xl font-bold ">
              Performance
            </h2>
            <div className="font-semibold text-start">{truck1Data?.productName}</div>
            <div className="font-semibold text-start">{truck2Data?.productName}</div>
            <div className="font-semibold text-start"></div>
          </div>
          <div>
            {performanceSpecs.map((spec, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 gap-4 items-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
              >
                <div className="p-4 font-semibold">{spec.label}</div>
                <div className="p-4 text-start">{spec.truck1}</div>
                <div className="p-4 text-start">{spec.truck2}</div>
                <div className="p-4 text-start">-</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md my-8">
          <div className="bg-[#FFE8DE] p-4 rounded-t-lg grid grid-cols-4 text-[#FA7436]">
            <h2 className="text-xl font-bold t">Dimensions</h2>
            <div className="font-semibold text-start">{truck1Data?.productName}</div>
            <div className="font-semibold text-start">{truck2Data?.productName}</div>
            <div className="font-semibold text-start"></div>
          </div>
          <div>
            {dimensionSpecs.map((spec, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 gap-4 items-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
              >
                <div className="p-4 font-semibold">{spec.label}</div>
                <div className="p-4 text-start">{spec.truck1}</div>
                <div className="p-4 text-start">{spec.truck2}</div>
                <div className="p-4 text-start">-</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
          {truck1Data && (
            <div className="bg-[#E4F5E9] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">{truck1Data.productName}</h3>
              <div className='flex items-center gap-2 mb-5'>
                <img src="/icons/like.svg" alt="like" />
                <p className='font-bold text-base'>Pros</p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
                {truck1Data.pros.map((pro, index) => <li key={index}>{pro}</li>)}
              </ul>
            </div>
          )}
          {truck2Data && (
            <div className="bg-[#E4F5E9] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">{truck2Data.productName}</h3>
              <div className='flex items-center gap-2 mb-5'>
                <img src="/icons/like.svg" alt="like" />
                <p className='font-bold text-base'>Pros</p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
                {/* Placeholder pros for truck 2 */}
                <li>Easier Handling</li>
                <li>Smart Compact Pickup</li>
                <li>Higher Revenue</li>
                <li>Low Maintenance Cost</li>
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TruckCompare;
