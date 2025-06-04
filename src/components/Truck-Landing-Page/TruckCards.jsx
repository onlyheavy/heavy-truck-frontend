import { useState } from 'react';

export default function TruckCards() {
  const trucks = [
    {
      title: "Ashok Leyland Bada Dost i2",
      price: "From ₹ 9.00 Lakh",
      specs: {
        engineCapacity: "1478 cc",
        maxPower: "80 HP",
        mileage: "13-15 KMPL",
        tyres: "4"
      },
      img: "/images/jeep.webp", // replace with your actual path
    },
    {
      title: "Ashok Leyland Bada Dost i2",
      price: "From ₹ 9.00 Lakh",
      specs: {
        engineCapacity: "1478 cc",
        maxPower: "80 HP",
        mileage: "13-15 KMPL",
        tyres: "4"
      },
      img: "/images/jeep.webp", // replace with your actual path
    },
    {
      title: "Ashok Leyland Bada Dost i2",
      price: "From ₹ 9.00 Lakh",
      specs: {
        engineCapacity: "1478 cc",
        maxPower: "80 HP",
        mileage: "13-15 KMPL",
        tyres: "4"
      },
      img: "/images/jeep.webp", // replace with your actual path
    },
  ];

  return (
    <section className="md:py-12 py-0">
      <h2 className="md:text-[24px] text-[18px] font-bold text-gray-800 md:mb-10 mb-6">
         Explore Tata Yodha 2.0 Pickup Truck Alternatives
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4 md:px-4 px-0">
        {trucks.map((truck, idx) => (
          <div
            key={idx}
            className="bg-white rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col p-2"
          >
            <div className="relative ">
              <img
                src={truck.img}
                alt={truck.title}
                className="w-full h-52 object-cover transition-transform duration-300 hover:scale-95"
              />
              <span className="absolute top-3 right-3 bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
                New
              </span>
            </div>

            <div className="md:p-5 p-2 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{truck.title}</h3>
              <p className="text-orange-600 font-bold text-sm mb-4">{truck.price}</p>

              <div className="grid grid-cols-2 gap-3 text-center text-sm text-gray-600">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="font-medium">Engine</p>
                  <p>{truck.specs.engineCapacity}</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="font-medium">Power</p>
                  <p>{truck.specs.maxPower}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Mileage</p>
                  <p>{truck.specs.mileage}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Tyres</p>
                  <p>{truck.specs.tyres}</p>
                </div>
              </div>

              <div className="mt-auto pt-5">
                <button className="w-full border border-orange-500 text-orange-500  hover:text-white py-3 rounded-md font-semibold hover:bg-orange-500 transition-all">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}