import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from "next/router"

const TruckByWheels = ({ data, onFilterChange, loading }) => {
    const router = useRouter();
    const options = [
        { id: "4 wheels", value: "4" },
        { id: "6 wheels", value: "6" },
        { id: "10 wheels", value: "10" },
        { id: "12 wheels", value: "12" },
        { id: "14 wheels", value: "14" },
        { id: "16 wheels", value: "16" },
        { id: "18 wheels", value: "18" },
        { id: "22 wheels", value: "22" },
    ];

    const [selected, setSelected] = useState(options[0].value);

    const handleFilterClick = (optionValue) => {
        setSelected(optionValue);
        onFilterChange(optionValue); // Trigger API fetch in parent
    };

    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto ">
                <div className="flex items-center justify-center mx-10 my-6">
                    <div className="w-60 border-t border-gray-300"></div>
                    <span className="mx-4 text-3xl font-bold text-gray-900">
                        Truck By Wheels
                    </span>
                    <div className="w-60 border-t border-gray-300"></div>
                </div>
                {/* Filter Buttons */}
                <div className="flex justify-center mb-10 mt-8 gap-3">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleFilterClick(option.value)}
                            className={`px-5 py-2 rounded-md border cursor-pointer transition ${selected === option.value
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
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((truck, index) => (
                                <div key={index} className="min-w-[250px] rounded-md border border-gray-300 hover:shadow-lg ">
                                    <div className="p-3 ">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_S3_URL}${truck?.image}`}
                                            alt={truck?.productName}
                                            className="w-full h-32 object-cover rounded-lg mb-4"
                                        />
                                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">{truck.productName}</h3>
                                        <p className="text-orange-500 font-bold text-sm">
                                            ₹ {truck?.minPrice} - {truck?.maxPrice} Lakhs
                                        </p>
                                        <Link
                                            href={truck.slug ? `/truck/${truck.slug}` : "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => {
                                                if (!truck.slug) {
                                                    e.preventDefault();
                                                    alert("Missing slug");
                                                }
                                            }}
                                        >
                                            <div className='flex justify-center mt-2'>
                                                <button
                                                    className="px-4 py-1 mt-3 cursor-pointer rounded-xs font-bold text-sm border text-orange-500 border-orange-500 hover:text-orange-500 hover:bg-orange-50 bg-transparent "
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
    )
}

export default TruckByWheels