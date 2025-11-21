import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useRouter } from "next/router"
import Link from 'next/link'

const TrucksByEmissionNorm = ({ data, onFilterChange, loading }) => {
    const router = useRouter();
    const options = [
        { id: "BS III", value: "bs-iii" },
        { id: "BS IV", value: "bs-iv" },
        { id: "BS VI - II", value: "bs-vi-ii" },
        { id: "BS VI", value: "bs-vi" },
        { id: "Electric", value: "electric" },
    ];

    const [selected, setSelected] = useState(options[0].value);

    const handleFilterClick = (optionValue) => {
        setSelected(optionValue);
        onFilterChange(optionValue); // Trigger API fetch in parent
    };

    return (
        <div>
            <section className="pb-10 pt-3 bg-[#FDF8F4]">
                <div className="max-w-7xl mx-auto ">
                    <div className="flex items-center justify-center mx-10 my-6">
                        <div className="hidden md:block w-60 border-t border-gray-300"></div>
                        <span className="mx-4 text-xl md:text-3xl font-bold text-gray-900">
                            Trucks By Emission Norm
                        </span>
                        <div className="hidden md:block w-60 border-t border-gray-300"></div>
                    </div>
                    {/* Filter Buttons */}
                    <div className="flex md:justify-center overflow-x-auto md:overflow-x-visible gap-3 px-3 scrollbar-hide mx-3 md:mx-0 mt-8 mb-10">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleFilterClick(option.value)}
                                className={`flex-shrink-0 px-3 py-1 text-sm rounded-sm border cursor-pointer transition ${selected === option.value
                                    ? "bg-[#FFF5F2] border-orange-400 text-gray-900 font-semibold"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-orange-300"
                                    }`}
                            >
                                {option.id}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <p className="text-center">Loading trucks...</p>
                    ) : (
                        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide p-3">
                            {Array.isArray(data) && data.length > 0 ? (
                                data.map((truck, index) => (
                                    <div key={index} className="min-w-[255px] bg-white rounded-md border border-gray-300 hover:shadow-lg">
                                        <div className="p-2">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_S3_URL}${truck?.image}`}
                                                alt={truck?.productName}
                                                className="w-full h-40 border object-cover rounded-lg mb-4"
                                            />
                                            <h3 className="font-semibold text-gray-500 mb-2 text-sm">
                                                {truck?.productName}
                                            </h3>
                                            <p className="text-black font-bold text-sm">
                                                ₹ {truck?.minPrice} - {truck?.maxPrice} Lakhs
                                            </p>
                                            <Link
                                                href={truck.slug ? `/trucks/${truck.slug}` : "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => {
                                                    if (!truck.slug) {
                                                        e.preventDefault();
                                                        alert("Missing slug");
                                                    }
                                                }}
                                            >
                                                <div className='flex justify-center mt-2 pb-4'>
                                                    <button
                                                        className="px-6 py-1.5 rounded-sm mt-3 cursor-pointer font-bold text-sm border text-orange-500 border-orange-500 hover:text-white hover:bg-orange-500 bg-transparent "
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">No trucks found</p>
                            )}
                        </div>
                    )}
                    <div className='flex justify-center items-center my-5'>
                        <Button
                            className='cursor-pointer bg-[#FA7436] hover:bg-[#FA7436]/90'
                            onClick={() => router.push(`/truck/${selected}`)}
                        >
                            View All
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default TrucksByEmissionNorm