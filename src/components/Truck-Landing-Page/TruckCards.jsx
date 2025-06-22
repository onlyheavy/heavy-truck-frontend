import { useState } from 'react';
import { useCategory } from "@/hooks/useContext";


export default function TruckCards() {
  const { categoryData, alterNative } = useCategory();
  // const trucks = [
  //   {
  //     title: "Ashok Leyland Bada Dost i2",
  //     price: "From ₹ 9.00 Lakh",
  //     specs: {
  //       engineCapacity: "1478 cc",
  //       maxPower: "80 HP",
  //       mileage: "13-15 KMPL",
  //       tyres: "4"
  //     },
  //     img: "/images/jeep.webp", // replace with your actual path
  //   },
  //   {
  //     title: "Ashok Leyland Bada Dost i2",
  //     price: "From ₹ 9.00 Lakh",
  //     specs: {
  //       engineCapacity: "1478 cc",
  //       maxPower: "80 HP",
  //       mileage: "13-15 KMPL",
  //       tyres: "4"
  //     },
  //     img: "/images/jeep.webp", // replace with your actual path
  //   },
  //   {
  //     title: "Ashok Leyland Bada Dost i2",
  //     price: "From ₹ 9.00 Lakh",
  //     specs: {
  //       engineCapacity: "1478 cc",
  //       maxPower: "80 HP",
  //       mileage: "13-15 KMPL",
  //       tyres: "4"
  //     },
  //     img: "/images/jeep.webp", // replace with your actual path
  //   },
  // ];

  return (
    <section className="md:py-12 py-0">
      <h2 className="md:text-[24px] text-lg font-bold text-gray-800 md:mb-10 mb-6">
        Explore {categoryData[0]?.productName} Alternatives
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4 md:px-4 px-0">
        {alterNative.map((truck, idx) => (
          <div
            key={idx}
            className="bg-white rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col p-2"
          >
            <div className="relative ">
              <img
                src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${truck.image}`}
                alt={truck.productName}
                className="w-full h-52 object-cover transition-transform duration-300 hover:scale-95"
              />
              <span className="absolute top-3 right-3 bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
                New
              </span>
            </div>

            <div className="md:p-5 p-2 flex-1 flex flex-col">
              <h3 className="text-sm lg:text-lg font-semibold text-gray-800 mb-1">{truck.productName}</h3>
              <p className="text-orange-600 font-bold text-sm mb-4">{truck.minPrice} - {truck.maxPrice}</p>

              <div className="grid grid-cols-2 gap-3 text-center text-sm text-gray-600">
                <div className="bg-orange-50 p-2 lg:p-3 rounded-lg">
                  <p className="font-medium">Engine</p>
                  <p>{truck.keyFeature[0].engineDisplacement}</p>
                </div>
                <div className="bg-orange-50 p-2 lg:p-3 rounded-lg">
                  <p className="font-medium">Power</p>
                  <p>{truck.keyFeature[0].power}</p>
                </div>
                <div className="bg-gray-50 p-2 lg:p-3 rounded-lg">
                  <p className="font-medium">Mileage</p>
                  <p>{truck.keyFeature[0].mileage}</p>
                </div>
                <div className="bg-gray-50 p-2 lg:p-3 rounded-lg">
                  <p className="font-medium">Tyres</p>
                  <p>{truck.keyFeature[0].noOfTyres}</p>
                </div>
              </div>

              <div className="mt-auto pt-5">
                <a
                  href={`https://www.onlyheavy.com/${truck.categorySlug}/${truck.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="w-full border border-orange-500 text-orange-500 hover:text-white py-1 md:py-3 rounded-md font-semibold hover:bg-orange-500 transition-all">

                    View Details

                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}