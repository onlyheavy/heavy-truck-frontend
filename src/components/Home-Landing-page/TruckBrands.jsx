import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const truckBrands = [
    { name: "Mahindra", logo: "/trucks/mahindra.jpg" },
    { name: "Jupiter Electric M..", logo: "/trucks/jem.jpeg" },
    { name: "Premier Motors", logo: "/trucks/premier.jpg" },
    { name: "Euler EV", logo: "/trucks/euler.svg" },
    { name: "Force Motors", logo: "/trucks/force.svg" },
    { name: "IPL Tech Electric", logo: "/trucks/ipl-tech-electric.jpg" },
    { name: "E-Trio", logo: "/trucks/e-trio.png" },
    { name: "Omega", logo: "/trucks/omega.jpg" },
    { name: "Toyota", logo: "/trucks/toyota.jpg" },
    { name: "I-Board Mobility", logo: "/trucks/iboard.jpg" },
    { name: "Scania", logo: "/trucks/scania.jpg" },
    { name: "Volvo", logo: "/trucks/volvo.jpg" },
    { name: "Tata", logo: "/trucks/tata.svg" },
    // { name: "Bajaj", logo: "/trucks/bajaj.svg" },
    { name: "Ashok Leyland", logo: "/trucks/ashok-leyland.svg" },
    { name: "Kamaz", logo: "/trucks/kamaz.jpg" },
    { name: "Man", logo: "/trucks/man.jpg" },
    { name: "Triton EV", logo: "/trucks/triton-ev.jpg" },
    { name: "Montra Electric", logo: "/trucks/montra-electric.jpg" },
    { name: "Erisha E Mobility", logo: "/trucks/erisha.jpg" },
    { name: "Sany", logo: "/trucks/sany.jpg" },
    { name: "Evage Motors", logo: "/trucks/evage-motors.jpg" },
    { name: "Blue Energy Mo...", logo: "/trucks/blue-energy-motors.jpg" },
    { name: "ISUZU", logo: "/trucks/isuzu.jpg" },
    { name: "Olectra", logo: "/trucks/olectra.jpg" },
    { name: "Propal", logo: "/trucks/propel.jpg" },
    { name: "Maruti Suzuki", logo: "/trucks/maruti-suzuki.jpg" },
    { name: "Bharat Benz", logo: "/trucks/bharat-benz.jpg" },
    { name: "Eicher Motors", logo: "/trucks/eicher.jpg" },
    { name: "Switch Mobility", logo: "/trucks/switch-mobility-1.jpg" },
    { name: "SML ISUZU", logo: "/trucks/sml-isuzu.jpg" },
    { name: "EKA", logo: "/trucks/eka-brand-logo.jpg" },
]

const TruckBrands = () => {
    const [showAll, setShowAll] = useState(false);

    const displayedBrands = showAll ? truckBrands : truckBrands.slice(0, 9);

    return (
        <div>
            <section className="py-10 bg-[#FFF8F4]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center mx-4 md:mx-10 my-6">
                        <div className="hidden md:block w-16 md:w-60 border-t border-orange-500"></div>
                        <span className="mx-2 md:mx-4 text-xl md:text-3xl font-bold text-gray-900">
                            List of Trucks Brands in India
                        </span>
                        <div className="hidden md:block w-16 md:w-60 border-t border-orange-500"></div>
                    </div>

                    <div
                        className="
                            flex overflow-x-auto gap-4 px-2
                            md:grid md:grid-cols-4 lg:grid-cols-9 md:gap-5 md:px-0
                            scrollbar-hide
                        "
                    >
                        {displayedBrands.map((brand, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-32 md:w-auto text-center"
                            >
                                <div className="bg-white rounded-md border p-4 pl-2 shadow-sm hover:shadow-md transition-shadow">
                                    <img
                                        src={brand.logo || "/placeholder.svg"}
                                        alt={brand.name}
                                        className="h-10 w-auto mx-auto mb-3"
                                    />
                                    <p className="text-[13px] font-medium text-gray-900 whitespace-nowrap">
                                        {brand.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-center items-center mt-10'>
                        {!showAll && (
                            <Button
                                onClick={() => setShowAll(true)}
                                className='cursor-pointer bg-[#FA7436] hover:bg-[#FA7436]/90'
                            >
                                View All
                            </Button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TruckBrands
