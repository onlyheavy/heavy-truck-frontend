import { useState } from 'react';

export default function JcbTruckCards() {
  const trucks = [
    {
      title: "ACE AX-124 Backhoe Loader",
     
      specs: {
        engineCapacity: "74 HP",
        bucketCapacity: "0.24 Cum",
        diggingDepth: "4250 mm",
        exShowRoomPrice: "₹ 23- ₹ 31 Lakh* "
      },
      img: "/images/jcb1.svg", // replace with your actual path
    },
    {
      title: "ACE AX-124 Backhoe Loader",
     
      specs: {
        engineCapacity: "74 HP",
        bucketCapacity: "0.24 Cum",
        diggingDepth: "4250 mm",
        exShowRoomPrice: "₹ 23- ₹ 31 Lakh* "
      },
      img: "/images/jcb1.svg", // replace with your actual path
    },
    {
      title: "ACE AX-124 Backhoe Loader",
     
      specs: {
        engineCapacity: "74 HP",
        bucketCapacity: "0.24 Cum",
        diggingDepth: "4250 mm",
        exShowRoomPrice: "₹ 23- ₹ 31 Lakh* "
      },
      img: "/images/jcb1.svg", // replace with your actual path
    },
  ];

  return (
    <section className="py-12 ">
      <h2 className="text-2xl font-bold text-gray-800  mb-10">
        Explore Tata Yodha 2.0 Pickup Truck Alternatives
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {trucks.map((truck, idx) => (
          <div
            key={idx}
            className="bg-white rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col p-2"
          >
            <div className="relative bg-[#FFE5D9] rounded-md ">
              <img
                src={truck.img}
                alt={truck.title}
                className="w-full p-2 h-52 object-cover transition-transform duration-300 hover:scale-95"
              />

            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{truck.title}</h3>
              <p className="text-orange-600 font-bold text-sm mb-4">{truck.price}</p>

              <div className="grid grid-cols-2 gap-3 text-center text-sm text-gray-600">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="font-medium">Engine Power</p>
                  <p>{truck.specs.engineCapacity}</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="font-medium">Bucket Capacity</p>
                  <p>{truck.specs.bucketCapacity}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Digging Depth</p>
                  <p>{truck.specs.diggingDepth}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Ex-ShowRoom Price</p>
                  <p>{truck.specs.exShowRoomPrice}</p>
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