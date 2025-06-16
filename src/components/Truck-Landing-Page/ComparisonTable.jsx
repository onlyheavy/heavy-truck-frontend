import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';



const ComparisonCard = ({ vehicleImage, vehicleName, price }) => (
  <div className="flex-1">
    <div className="flex flex-col items-center">
      <img
        src={vehicleImage}
        alt={vehicleName}
        className="w-full max-w-[300px] h-auto mb-4"
      />
      <h3 className="font-semibold text-sm text-[#254154] mb-2">{vehicleName}</h3>
      <p className="text-sm font-bold text-[#254154] mb-4">{price}</p>
    </div>
  </div>
);

const ComparisonSection = ({ vehicles }) => {
  const router = useRouter();

  const handleCompare = () => {
    const query = new URLSearchParams({
      v1: vehicles[0].name,
      v2: vehicles[1].name,
    }).toString();

    router.push(`/CompareTruck?${query}`);
  };

  return (
    <div className="border border-[#E0E8ED] rounded-lg p-2 relative w-full max-w-md">
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
          <div className="md:w-12 md:h-12 w-10 h-10 rounded-full bg-[#FA7436] text-white flex items-center justify-center font-semibold text-sm md:text-lg">
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


const ComparisonTable = () => {
  const allVehicles = [
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
  ];

  // Group into pairs
  const pairedVehicles = [];
  for (let i = 0; i < allVehicles.length; i += 2) {
    pairedVehicles.push(allVehicles.slice(i, i + 2));
  }

  return (
    <div className="my-10 ">
      <h2 className="text-lg md:text-2xl font-semibold mb-6 ">Compare Top Pickups</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {pairedVehicles.map((pair, index) => (
          <ComparisonSection key={index} vehicles={pair} />
        ))}
      </div>
    </div>
  );
};

export default ComparisonTable;