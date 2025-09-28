import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useRouter } from "next/router"

const TruckByMileage = ({ data, onFilterChange, loading }) => {
    const router = useRouter();
    const options = [
        { id: "1-5 mileage", value: "1-5-mileage" },
        { id: "5-10 mileage", value: "5-10-mileage" },
        { id: "10-15 mileage", value: "10-15-mileage" },
        { id: "15-20 mileage", value: "15-20-mileage" },
        { id: "20-25 mileage", value: "20-25-mileage" },
        { id: "25-30 mileage", value: "25-30-mileage" },
        { id: "Above 30 mileage", value: "above-30-mileage" },
    ];

    const [selected, setSelected] = useState(options[0].value);

    const handleFilterClick = (optionValue) => {
        setSelected(optionValue);
        onFilterChange(optionValue); // Trigger API fetch in parent
    };

    return (
        <div>
            <section className="pb-10 pt-3 bg-white">
                <div className="max-w-7xl mx-auto ">
                    <div className="flex items-center justify-center mx-10 my-6">
                        <div className="w-60 border-t border-gray-300"></div>
                        <span className="mx-4 text-3xl font-bold text-gray-900">
                            Trucks By Better Mileage
                        </span>
                        <div className="w-60 border-t border-gray-300"></div>
                    </div>
                    {/* Filter Buttons */}
                    <div className="flex justify-center mb-10 mt-8 gap-3">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleFilterClick(option.value)}
                                className={`px-5 py-2 rounded-sm border cursor-pointer transition ${selected === option.value
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
                                        <div className="p-3">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_S3_URL}${truck?.image}`}
                                                alt={truck?.productName}
                                                className="w-full h-32 object-cover rounded-lg mb-4"
                                            />
                                            {/* <Badge variant="secondary" className="mb-2 bg-green-100 text-green-800">
                                                {truck.mileage}
                                            </Badge> */}
                                            <h3 className="font-semibold text-gray-900 mb-2 text-sm">{truck.productName}</h3>
                                            <p className="text-orange-500 font-bold text-sm">
                                                ₹ {truck?.minPrice} - {truck?.maxPrice} Lakhs
                                            </p>
                                            <div className='flex justify-center mt-2'>
                                                <button
                                                    className="px-4 py-1 mt-3 cursor-pointer rounded-xs font-bold text-sm border text-orange-500 border-orange-500 hover:text-orange-500 hover:bg-orange-50 bg-transparent "
                                                >
                                                    View Details
                                                </button>
                                            </div>
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

export default TruckByMileage