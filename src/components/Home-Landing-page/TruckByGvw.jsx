import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'


const TruckByGvw = ({ data, onFilterChange, loading }) => {
    const [selected, setSelected] = useState("<2.5 ton")
    const options = [
        "<2.5 ton",
        "2.5-5 ton",
        "5-10 ton",
        "10-15 ton",
        "15-20 ton",
        "25-30 ton",
        "30-35 ton",
        "35-40 ton",
        "40-45 ton",
        "45-50 ton",
        ">50 ton",

    ]

    const handleFilterClick = (option) => {
        setSelected(option);
        onFilterChange(option); // Trigger API fetch in parent
    };

    return (
        <div>
            <section className="py-10 bg-[#FDF8F4]">
                <div className="max-w-7xl mx-auto ">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Truck by GVW</h2>
                    <div className="flex justify-center mb-5 gap-3">
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleFilterClick(option)}
                                className={`px-5 py-2 rounded-md border cursor-pointer transition whitespace-nowrap ${selected === option
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
                                    <Card key={index} className="min-w-[250px] border border-gray-300 hover:shadow-lg transition-shadow">
                                        <CardContent className="p-4">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_S3_URL}${truck?.image}`}
                                                alt={truck.productName}
                                                className="w-full h-24 object-cover rounded-lg mb-4"
                                            />
                                            <h3 className="font-semibold text-gray-900 mb-1">{truck.productName}</h3>
                                            <p className="text-orange-500 font-bold text-sm">
                                                ₹ {truck?.minPrice} - {truck?.maxPrice}
                                            </p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full mt-3 hover:text-orange-500 cursor-pointer text-orange-500 border-orange-500 hover:bg-orange-50 bg-transparent"
                                            >
                                                View Details
                                            </Button>
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
        </div>
    )
}

export default TruckByGvw