import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const TruckByPrice = ({ data, onFilterChange, loading }) => {
    const [selected, setSelected] = useState("<10 lakh");
    const router = useRouter()

    const options = ["<10 lakh", "10-20 lakh", "20-30 lakh", "30-40 lakh", "40-50 lakh", ">50 lakh"];

    const handleFilterClick = (option) => {
        setSelected(option);
        onFilterChange(option);
    };

    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto ">

                <div className="flex items-center justify-center mx-10 my-6">
                    <div className="w-60 border-t border-gray-300"></div>
                    <span className="mx-4 text-3xl font-bold text-gray-900">
                        Trucks By Price range
                    </span>
                    <div className="w-60 border-t border-gray-300"></div>
                </div>


                {/* Filter Buttons */}
                <div className="flex justify-center mt-8 mb-10 gap-3">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleFilterClick(option)}
                            className={`px-5 py-2 rounded-sm border cursor-pointer transition ${selected === option
                                ? "bg-[#FFF5F2] border-orange-400 text-gray-900 font-semibold"
                                : "bg-white border-gray-200 text-gray-600 hover:border-orange-300"
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {/* Trucks Grid */}
                {loading ? (
                    <p className="text-center">Loading trucks...</p>
                ) : (
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((truck, index) => (
                                <Card key={index} className="min-w-[250px] border border-gray-300 hover:shadow-lg ">
                                    <CardContent className="p-4">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_S3_URL}${truck?.image}`}
                                            alt={truck?.productName}
                                            className="w-full h-32 object-cover rounded-lg mb-4"
                                        />
                                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                                            {truck?.productName}
                                        </h3>
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
                                            <div className='flex justify-center mt-2'>
                                                <button
                                                    className="px-4 py-1 mt-3 cursor-pointer rounded-xs font-bold text-sm border text-orange-500 border-orange-500 hover:text-orange-500 hover:bg-orange-50 bg-transparent "
                                                >
                                                    View Details
                                                </button>
                                            </div>
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
                    <Button className='cursor-pointer bg-[#FA7436] hover:bg-[#FA7436]/90' onClick={()=>router.push('/view')}>View All</Button>
                </div>
            </div>
        </section>
    );
};

export default TruckByPrice;
