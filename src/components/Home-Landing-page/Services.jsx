import React from "react";
import Link from "next/link";

const services = [
    {
        icon: "/icons/truck1.svg",
        title: "Compare Trucks",
        desc: "Easily compare truck models by payload, mileage, price, and features.",
        path: "/compare",
    },
    {
        icon: "/icons/brochure.svg",
        title: "Download Brochure",
        desc: "Download the brochure to explore specifications and benefits before you decide.",
        path: "/brochure",
    },
    {
        icon: "/icons/fuelcost.svg",
        title: "Fuel Cost Calculator",
        desc: "Smart tool to estimate fuel expenses and optimize your budget.",
        path: "/fuel-calculator",
    },
    {
        icon: "/icons/emicalc.svg",
        title: "EMI Calculator",
        desc: "Get instant insights into your monthly installments and manage your finances with confidence.",
        path: "/emi-calculator",
    },
];

const Services = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* ✅ 2 cards on mobile, 4 on large */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group text-center border border-[#FFCFC5] p-5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:border-orange-400 relative overflow-hidden"
                        >
                            {/* Normal view */}
                            <div className="group-hover:opacity-0 transition-opacity duration-300">
                                <div className="flex items-center justify-center mx-auto mb-4">
                                    <img
                                        src={service.icon}
                                        alt={service.title}
                                        className="w-10 h-10 sm:w-12 sm:h-12"
                                    />
                                </div>
                                <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-sm">
                                    {service.desc}
                                </p>
                            </div>

                            {/* Hover view */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-xl">
                                <div className="flex items-center justify-center mx-auto mb-4">
                                    <img
                                        src={service.icon}
                                        alt={service.title}
                                        className="w-10 h-10 sm:w-12 sm:h-12"
                                    />
                                </div>
                                <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-4">
                                    {service.title}
                                </h3>
                                <Link
                                    href={service.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className="bg-orange-500 cursor-pointer text-white px-6 py-2 text-sm sm:text-base rounded-md hover:bg-orange-600 transition-colors duration-200">
                                        Open
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
