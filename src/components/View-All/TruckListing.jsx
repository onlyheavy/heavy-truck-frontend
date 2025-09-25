import HomeCompareTruck from "@/components/Home-Landing-page/HomeCompareTruck";
import PopularTruck from "@/components/Home-Landing-page/PopularTruck";
import Faq from "@/components/Truck-Landing-Page/FAQ";
import { useState } from "react";

const filterOptions = {
    Brands: ["Ashok Leyland", "Tata", "Eicher", "Mahindra", "Volvo"],
    "Price Range": ["Under 5 Lakh", "5–10 Lakh", "10–20 Lakh", "20+ Lakh"],
    "Fuel Type": ["Diesel", "Petrol", "CNG", "Electric"],
    GVW: ["Below 5 Ton", "5–10 Ton", "10–20 Ton", "20+ Ton"],
    "Emission Norm": ["BS-IV", "BS-VI"],
    "No of Tyres": ["4", "6", "8", "10+"],
    Payload: ["<2 Ton", "2–5 Ton", "5–10 Ton", "10+ Ton"],
};

const trucks = [
    {
        name: "Ashok leyland AVTR 1922 L",
        price: "From ₹9.00 Lakh",
        img: "/images/img1.svg",
        specs: {
            engine: "1478 cc",
            mileage: "4-6 kmpl",
            gvw: "18500 kg",
            tyres: "6",
            payload: "7.5 Tons",
            fuel: "Diesel",
        },
    },
    {
        name: "Ashok leyland AVTR 1922 L",
        price: "From ₹9.00 Lakh",
        img: "/images/img1.svg",
        specs: {
            engine: "1478 cc",
            mileage: "4-6 kmpl",
            gvw: "18500 kg",
            tyres: "6",
            payload: "7.5 Tons",
            fuel: "Diesel",
        },
    },
    {
        name: "Ashok leyland AVTR 1922 L",
        price: "From ₹9.00 Lakh",
        img: "/images/img1.svg",
        specs: {
            engine: "1478 cc",
            mileage: "4-6 kmpl",
            gvw: "18500 kg",
            tyres: "6",
            payload: "7.5 Tons",
            fuel: "Diesel",
        },
    },
    {
        name: "Ashok leyland AVTR 1922 L",
        price: "From ₹9.00 Lakh",
        img: "/images/img1.svg",
        specs: {
            engine: "1478 cc",
            mileage: "4-6 kmpl",
            gvw: "18500 kg",
            tyres: "6",
            payload: "7.5 Tons",
            fuel: "Diesel",
        },
    },
];

export default function TruckListing() {
    const [filters, setFilters] = useState({});

    const handleFilterChange = (filterName, value) => {
        setFilters((prev) => ({ ...prev, [filterName]: value }));
    };

    return (
        <section className="bg-white">
            <div className=" mb-10">

                {/* Filters */}
                <div className="flex justify-evenly items-center bg-[#FFF8F4] p-5">
                    {Object.entries(filterOptions).map(([filterName, options]) => (
                        <select
                            key={filterName}
                            value={filters[filterName] || ""}
                            onChange={(e) => handleFilterChange(filterName, e.target.value)}
                            className="border  bg-white cursor-pointer px-4 rounded-sm py-2 text-sm text-gray-700"
                        >
                            <option value="">{filterName}</option>
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ))}

                    <button
                        onClick={() => setFilters({})}
                        className="text-[#FA7436] px-4 py-1 bg-white"
                    >
                        Reset All
                    </button>
                </div>

                {/* Section Heading */}
                <div className="mx-10">
                    <div className="mb-6  bg-[#FFF8F4] my-8 p-5 ">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Best Under 10 Lakh in India
                        </h2>
                        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                            Are you planning to buy a truck under ₹10 lakhs budget? If yes, then
                            we have put together a complete list of trucks under ₹10 lakhs with
                            updated specifications and variants in India. Companies like Tata,
                            Eicher, Ashok Leyland, OSM and others manufacture some of the best
                            trucks under INR 10 Lakhs. Trucks in this budget fall under the
                            small commercial vehicle category in India. The pickup and mini...
                            <span className="text-red-500 cursor-pointer"> Read More</span>
                        </p>
                    </div>

                    {/* Truck Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {trucks.map((truck, i) => (
                            <div
                                key={i}
                                className="border border-gray-300 rounded-md p-3 overflow-hidden bg-white"
                            >


                                <img src={truck?.img} alt="truck-img" />
                                {/* Details */}
                                <div className=" my-5">
                                    <h3 className="text-sm font-semibold text-[#254154]">
                                        {truck.name}
                                    </h3>
                                    <p className="text-red-500 text-sm font-medium mt-1">
                                        {truck.price}
                                    </p>
                                    <hr className="my-3" />

                                    {/* Specs */}
                                    <div className=" text-xs text-[#254154] mt-3">
                                        <div className="flex flex-col gap-5">
                                            <div className="grid grid-cols-3 gap-5">
                                                <div className="flex flex-col gap-1">
                                                    <p>Engine Disp </p>
                                                    <p className="text-black">{truck.specs.engine}</p>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <p>Mileage </p>
                                                    <p className="text-black">{truck.specs.mileage}</p>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <p>GVW</p>
                                                    <p className="text-black">{truck.specs.gvw}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="flex flex-col gap-1">
                                                    <p>No. Of Tyres </p>
                                                    <p className="text-black">{truck.specs.tyres}</p>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <p>Payload </p>
                                                    <p className="text-black">{truck.specs.payload}</p>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <p>Fuel Type</p>
                                                    <p className="text-black">{truck.specs.fuel}</p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    {/* Button */}
                                    <button className="w-full cursor-pointer mt-4 py-2 border border-red-500 text-red-500 text-sm font-medium rounded-sm hover:bg-red-50 transition">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <PopularTruck />
            <HomeCompareTruck />
            <Faq />
        </section>
    );
}
