import React, { useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { ChevronDown } from 'lucide-react';

const ComparisonCard = ({ vehicleImage, vehicleName, price }) => (
    <div className="flex-1">
        <div className="flex flex-col items-center">
            <img
                src={vehicleImage}
                alt={vehicleName}
                className="w-full max-w-[300px] h-auto mb-4"
            />
            <h3 className="font-semibold text-[18px] text-[#254154] mb-2">{vehicleName}</h3>
            <p className="text-[16px] font-bold text-[#254154] mb-4">{price}</p>
        </div>
    </div>
);

const ComparisonSection = ({ vehicles }) => {
    const handleCompare = () => {
        // This would trigger a new comparison - you can customize this logic
        console.log('Comparing:', vehicles[0].name, 'vs', vehicles[1].name);
    };

    return (
       // Inside ComparisonSection.jsx
<div className="border border-[#E0E8ED] rounded-lg p-2 relative h-full">
  <div className="flex relative gap-2">
    {vehicles.map((vehicle, index) => (
      <ComparisonCard
        key={index}
        vehicleImage={vehicle.image}
        vehicleName={vehicle.name}
        price={vehicle.price}
      />
    ))}
    <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="w-12 h-12 rounded-full bg-[#FA7436] text-white flex items-center justify-center font-semibold text-lg">
        VS
      </div>
    </div>
  </div>

  <div className="flex justify-center mt-4">
    <button
      onClick={handleCompare}
      className="px-6 py-2 bg-white rounded text-[#FA7436] hover:bg-[#FA7436] hover:text-white border border-[#FA7436] font-semibold text-[16px] transition-colors"
    >
      Compare Now
    </button>
  </div>
</div>

    );
};


const TruckComparison = () => {
    const [vehicles, setVehicles] = useState([]);
    const [allVehicles] = useState([
        {
            image: "/images/jeep.webp",
            name: "Tata Yodha 2.0",
            price: "₹ 18 - ₹ 20 Lakh*",
        },
        {
            image: "/images/jeep.webp",
            name: "Tata Yodha 1700 BS6",
            price: "₹ 18 - ₹ 20 Lakh*",
        },
        {
            image: "/images/jeep.webp",
            name: "Ashok Leyland Bada Dost",
            price: "₹ 12 - ₹ 14 Lakh*",
        },
        {
            image: "/images/jeep.webp",
            name: "Mahindra Bolero Pickup",
            price: "₹ 10 - ₹ 12 Lakh*",
        },
        {
            image: "/images/jeep.webp",
            name: "Isuzu D-Max",
            price: "₹ 15 - ₹ 18 Lakh*",
        },
        {
            image: "/images/jeep.webp",
            name: "Force Kargo King",
            price: "₹ 9 - ₹ 11 Lakh*",
        },
    ]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedTruck, setSelectedTruck] = useState('');
    const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
    const [truckDropdownOpen, setTruckDropdownOpen] = useState(false);
    const pairedVehicles = [];
    for (let i = 0; i < allVehicles.length; i += 2) {
        pairedVehicles.push(allVehicles.slice(i, i + 2));
    }

    // Mock data for trucks
    const mockData = {
        'Tata Intra V50': {
            name: 'Tata Intra V50',
            engine: '4-cylinder 1496 cc DI',
            engineNorm: 'BS-6 Phase 2',
            power: '80 HP',
            engineCylinders: '4',
            maxTorque: '220 NM',
            maxSpeed: '80 KMPH',
            noOfTyres: '4',
            fuelTank: '35 Ltr.',
            gvw: '2980 KG',
            payloadCapacity: '1500 KG',
            kerbWeight: 'N/A',
            length: '4734 MM',
            width: '1694 MM',
            height: '2014 MM',
            wheelbase: '2600 MM',
            groundClearance: '192 MM',
            minimumTurningRadius: '6000 MM'
        },
        'Tata Intra V30': {
            name: 'Tata Intra V30',
            engine: '4 Cylinder 1496 cc DI',
            engineNorm: 'BS-6 Phase 2',
            power: '70 HP',
            engineCylinders: '4',
            maxTorque: '140 NM',
            maxSpeed: '80 KMPH',
            noOfTyres: '4',
            fuelTank: '35 Ltr.',
            gvw: '2565 KG',
            payloadCapacity: '1300 KG',
            kerbWeight: 'N/A',
            length: '4460 MM',
            width: '1693 MM',
            height: '1945 MM',
            wheelbase: '2450 MM',
            groundClearance: '175 MM',
            minimumTurningRadius: '5250 MM'
        }
    };

    const slugToName = {
        'tata-intra-v50': 'Tata Intra V50',
        'tata-intra-v30': 'Tata Intra V30'
    };

    useEffect(() => {
        // Simulate getting query params - you can replace this with actual router logic
        const v1 = 'tata-intra-v50';
        const v2 = 'tata-intra-v30';

        if (v1 && v2) {
            const name1 = slugToName[v1.toLowerCase()];
            const name2 = slugToName[v2.toLowerCase()];

            const vehicle1 = mockData[name1];
            const vehicle2 = mockData[name2];

            if (vehicle1 && vehicle2) {
                setVehicles([vehicle1, vehicle2]);
            }
        }
    }, []);

    const performanceRows = [
        { label: 'Engine', key: 'engine' },
        { label: 'Engine Norm', key: 'engineNorm' },
        { label: 'Power', key: 'power' },
        { label: 'Engine Cylinders', key: 'engineCylinders' },
        { label: 'Max Torque', key: 'maxTorque' },
        { label: 'Max Speed', key: 'maxSpeed' },
        { label: 'No. of Tyres', key: 'noOfTyres' },
        { label: 'Fuel Tank', key: 'fuelTank' },
        { label: 'GVW', key: 'gvw' },
        { label: 'Payload Capacity', key: 'payloadCapacity' },
        { label: 'Kerb Weight', key: 'kerbWeight' }
    ];

    const dimensionRows = [
        { label: 'Length', key: 'length' },
        { label: 'Width', key: 'width' },
        { label: 'Height', key: 'height' },
        { label: 'Wheelbase', key: 'wheelbase' },
        { label: 'Ground Clearance', key: 'groundClearance' },
        { label: 'Minimum Turning Radius', key: 'minimumTurningRadius' }
    ];

    if (vehicles.length !== 2) {
        return (
            <div className="max-w-screen-lg mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Compare Vehicles</h1>
                <p className="text-red-500">Invalid vehicle names or data not found.</p>
            </div>
        );
    }

    const SellingTruckCard = ({ image, name, price, onViewDetails }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="aspect-[4/3] overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-[16px] text-[#333] mb-2">{name}</h3>
      <p className="text-[14px] text-[#666] mb-4">{price}</p>
      <button
        onClick={() => onViewDetails(name)}
        className="w-full px-4 py-2 bg-white border border-[#FA7436] text-[#FA7436] rounded hover:bg-[#FA7436] hover:text-white transition-colors duration-300 font-medium text-[14px]"
      >
        View Details
      </button>
    </div>
  </div>
);

  const trucks = [
    {
      id: 1,
      image: "/images/jeep.webp",
      name: "Eicher pro 3019",
      price: "From ₹25.15 Lakh"
    },
    {
      id: 2,
      image: "/images/jeep.webp", 
      name: "Eicher Pro 2049",
      price: "From ₹ 14.06 Lakh"
    },
    {
      id: 3,
      image: "/images/jeep.webp",
      name: "Eicher Pro 3015",
      price: "From ₹25.15 Lakh"
    },
    {
      id: 4,
      image: "/images/jeep.webp",
      name: "Eicher pro 3019",
      price: "From ₹ 22.46 Lakh"
    }
  ];

  const handleViewDetails = (truckName) => {
    console.log(`Viewing details for: ${truckName}`);
    // You can add navigation logic here
    // router.push(`/truck-details/${truckName}`);
  };
  
    // Sample data
    const brands = [
      'Tata Motors',
      'Ashok Leyland', 
      'Mahindra',
      'Isuzu',
      'Force Motors'
    ];
  
    const trucksCompareVs = [
      'Tata Intra V50',
      'Tata Intra V30',
      'Tata Yodha 2.0',
      'Ashok Leyland Bada Dost',
      'Mahindra Bolero Pickup'
    ];
  
    const comparisonTrucks = [
      {
        id: 1,
        name: "Tata Intra V50 Pickup Truck",
        price: "₹ 18 - ₹ 20 Lakh*",
        image: "/images/tata-intra-v50.jpg"
      },
      {
        id: 2,
        name: "Tata Intra V30 Pickup Truck", 
        price: "₹ 18 - ₹ 20 Lakh*",
        image: "/images/tata-intra-v30.jpg"
      }
    ];
  
    const handleBrandSelect = (brand) => {
      setSelectedBrand(brand);
      setBrandDropdownOpen(false);
    };
  
    const handleTruckSelect = (truck) => {
      setSelectedTruck(truck);
      setTruckDropdownOpen(false);
    };

    return (
        <MainLayout className="max-w-screen-lg mx-auto p-4">
            <div className="max-w-full mx-auto p-4">

{/* Banner Section */}
 <div className="w-full h-32 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <img 
          src="/images/truck-header.jpg" 
          alt="Truck Header" 
          className="w-full h-full object-cover"
        />
      </div>

            {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Tata Intra V50 Pickup Truck vs Tata Intra V30 Pickup{' '}
          <span className="text-orange-500">Truck Comparison</span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Left Side - Truck Comparison Cards */}
        <div className="flex-1">
          <div className="flex items-center gap-4">
            {comparisonTrucks.map((truck, index) => (
              <React.Fragment key={truck.id}>
                {/* Truck Card */}
                <div className="flex-1">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="aspect-[4/3] bg-gray-100 relative">
                      <img
                        src={truck.image}
                        alt={truck.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-full bg-gray-200 items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                            🚛
                          </div>
                          <p className="text-gray-500 text-sm">Truck Image</p>
                        </div>
                      </div>
                      {/* Watermark */}
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                        Truck Junction
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">{truck.name}</h3>
                      <p className="text-gray-600 font-medium">{truck.price}</p>
                    </div>
                  </div>
                </div>

                {/* VS Badge */}
                {index === 0 && (
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      VS
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Side - Dropdowns */}
        <div className="w-80">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Truck Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg 
                  className="w-12 h-12 text-gray-600" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M3 17h2a3 3 0 0 0 6 0h2a3 3 0 0 0 6 0h2v-5l-3-4H3v9zM6 18.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM3 8h13l2 2.5V12H3V8z"/>
                </svg>
              </div>
            </div>

            {/* Select Brand Dropdown */}
            <div className="mb-4">
              <div className="relative">
                <button
                  onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-orange-300 focus:outline-none focus:border-orange-500"
                >
                  <span className={selectedBrand ? 'text-gray-800' : 'text-gray-500'}>
                    {selectedBrand || 'Select Brand'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${brandDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {brandDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => handleBrandSelect(brand)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Select Truck Dropdown */}
            <div className="mb-6">
              <div className="relative">
                <button
                  onClick={() => setTruckDropdownOpen(!truckDropdownOpen)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-orange-300 focus:outline-none focus:border-orange-500"
                >
                  <span className={selectedTruck ? 'text-gray-800' : 'text-gray-500'}>
                    {selectedTruck || 'Select Truck'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${truckDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {truckDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {trucksCompareVs.map((truck) => (
                      <button
                        key={truck}
                        onClick={() => handleTruckSelect(truck)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        {truck}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Compare Button */}
            <button className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Compare Now
            </button>
          </div>
        </div>
      </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#FFE8DE] border-t-2 border-[#FFE8DE]">
                                <th className="text-left p-4 font-semibold text-orange-500 border-r text-lg w-1/3">Performance</th>
                                <th className="text-center p-4 font-semibold text-orange-500 border-r text-lg w-1/3">{vehicles[0].name}</th>
                                <th className="text-center p-4 font-semibold text-orange-500 border-r text-lg w-1/3">{vehicles[1].name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {performanceRows.map((row, index) => (
                                <tr key={row.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="p-4 font-medium text-gray-700 border-r border-gray-200">
                                        {row.label}
                                    </td>
                                    <td className="p-4 text-center text-gray-600 border-r border-gray-200">
                                        {vehicles[0][row.key]}
                                    </td>
                                    <td className="p-4 text-center text-gray-600">
                                        {vehicles[1][row.key]}
                                    </td>
                                </tr>
                            ))}

                            <tr className="bg-[#FFE8DE] border-t-2 border-[#FFE8DE]">
                                <td className="p-4 font-semibold text-orange-500 border-r text-lg ">
                                    Dimensions
                                </td>
                                <td className="p-4 text-center font-semibold text-orange-800 border-r border-gray-200">
                                    {/* Empty cell for dimensions header */}
                                </td>
                                <td className="p-4 text-center font-semibold text-orange-800">
                                    {/* Empty cell for dimensions header */}
                                </td>
                            </tr>

                            {dimensionRows.map((row, index) => (
                                <tr key={row.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="p-4 font-medium text-gray-700 border-r border-gray-200">
                                        {row.label}
                                    </td>
                                    <td className="p-4 text-center text-gray-600 border-r border-gray-200">
                                        {vehicles[0][row.key]}
                                    </td>
                                    <td className="p-4 text-center text-gray-600">
                                        {vehicles[1][row.key]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Comparison Cards Section */}
                <div className="my-10 px-4">
                    <h2 className="text-2xl font-semibold mb-6">Tata Yodha 2.0 Comparison with Similar Pickup Truck</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {pairedVehicles.map((pair, index) => (
                            <div key={index} className="w-full sm:w-1/2 lg:w-[32%]">
                                <ComparisonSection vehicles={pair} />
                            </div>
                        ))}
                    </div>

                </div>

                {/* Best Cart Selling */}

                      <h2 className="text-2xl font-bold text-[#333] mb-6">Best Selling Trucks</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trucks.map((truck) => (
          <SellingTruckCard
            key={truck.id}
            image={truck.image}
            name={truck.name}
            price={truck.price}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
            </div>
        </MainLayout>
    );
};

export default TruckComparison;