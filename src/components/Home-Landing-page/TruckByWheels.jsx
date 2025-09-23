import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import React, { useState } from 'react'



const TruckByWheels = ({ data, onFilterChange, loading }) => {
    const [selected, setSelected] = useState("4 wheels")
    const options = [
        "4 wheels",
        "6 wheels",
        "10 wheels",
        "12 wheels",
        "14 wheels",
        "16 wheels",
        "18 wheels",
        "22 wheels",

    ]

    const handleFilterClick = (option) => {
        setSelected(option);
        onFilterChange(option); // Trigger API fetch in parent
    };

    return (

        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto ">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Truck By Wheels</h2>
                {/* Filter Buttons */}
                <div className="flex justify-center mb-5 gap-3">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleFilterClick(option)}
                            className={`px-5 py-2 rounded-md border cursor-pointer transition ${selected === option
                                ? "bg-[#FFF5F2] border-orange-400 text-gray-900 font-semibold"
                                : "bg-white border-gray-200 text-gray-600 hover:border-orange-300"
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {loading ? (
                    <p className="text-center">Loading trucks...</p>
                ) : (
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((truck, index) => (
                                <Card key={index} className="min-w-[250px] border border-gray-300 hover:shadow-lg ">
                                    <CardContent className="p-4 ">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_S3_URL}${truck?.image}`}
                                            alt={truck?.productName}
                                            className="w-full h-32 object-cover rounded-lg mb-4"
                                        />
                                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">{truck.productName}</h3>
                                        <p className="text-orange-500 font-bold text-sm">
                                            ₹ {truck?.minPrice} - {truck?.maxPrice}
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
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full mt-3 hover:text-orange-500 cursor-pointer text-orange-500 border-orange-500 hover:bg-orange-50 bg-transparent"
                                            >
                                                View Details
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center">No trucks found</p>
                        )}
                    </div>
                )}
                <div className='flex justify-center items-center my-5'>
                    <Button className='cursor-pointer bg-[#FA7436] hover:bg-[#FA7436]/90'>View All</Button>
                </div>
            </div>
        </section>

    )
}

export default TruckByWheels