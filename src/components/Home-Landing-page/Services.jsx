import React from "react"

const services = [
    {
        icon: "/icons/truck1.svg",
        title: "Compare Trucks",
        desc: "Easily compare truck models by payload, mileage, price, and features.",
    },
    {
        icon: "/icons/brochure.svg",
        title: "Download Brochure",
        desc: "Download the brochure to explore specifications and benefits before you decide.",
    },
    {
        icon: "/icons/fuelcost.svg",
        title: "Fuel Cost Calculator",
        desc: "Smart tool to estimate fuel expenses and optimize your budget.",
    },
    {
        icon: "/icons/emicalc.svg",
        title: "EMI Calculator",
        desc: "Get instant insights into your monthly installments and manage your finances with confidence.",
    },
]

const Services = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="text-center border border-[#FFCFC5] p-5 rounded-md"
                        >
                            <div className="flex items-center justify-center mx-auto mb-4">
                                <img src={service.icon} alt={service.title} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
