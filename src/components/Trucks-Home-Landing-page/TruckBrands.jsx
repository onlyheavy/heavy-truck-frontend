import { Button } from '@/components/ui/button'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router";
const truckBrands = [
    { name: "Mahindra", logo: "/trucks/mahindra.jpg", slug: "mahindra" },
    { name: "Jupiter Electric M..", logo: "/trucks/jem.jpeg", slug: "jupiter-electric-mobility" },
    { name: "Premier Motors", logo: "/trucks/premier.jpg", slug: "premier-motors" },
    { name: "Euler EV", logo: "/trucks/euler.svg", slug: "euler-ev" },
    { name: "Force Motors", logo: "/trucks/force.svg", slug: "force-motors" },
    { name: "IPL Tech Electric", logo: "/trucks/ipl-tech-electric.jpg", slug: "ipl-tech-electric" },
    { name: "E-Trio", logo: "/trucks/e-trio.png", slug: "e-trio" },
    { name: "Omega", logo: "/trucks/omega.jpg", slug: "omega" },
    { name: "Toyota", logo: "/trucks/toyota.jpg", slug: "toyota" },
    { name: "I-Board Mobility", logo: "/trucks/iboard.jpg", slug: "i-board-mobility" },
    { name: "Scania", logo: "/trucks/scania.jpg", slug: "scania" },
    { name: "Volvo", logo: "/trucks/volvo.jpg", slug: "volvo" },
    { name: "Tata Motors", logo: "/trucks/tata.svg", slug: "tata-motors" },
    { name: "Ashok Leyland", logo: "/trucks/ashok-leyland.svg", slug: "ashok-leyland" },
    { name: "Kamaz", logo: "/trucks/kamaz.jpg", slug: "kamaz" },
    { name: "Man", logo: "/trucks/man.jpg", slug: "man" },
    { name: "Triton EV", logo: "/trucks/triton-ev.jpg", slug: "triton-ev" },
    { name: "Montra Electric", logo: "/trucks/montra-electric.jpg", slug: "montra-electric" },
    { name: "Erisha E Mobility", logo: "/trucks/erisha.jpg", slug: "erisha-e-mobility" },
    { name: "Sany", logo: "/trucks/sany.jpg", slug: "sany" },
    { name: "Evage Motors", logo: "/trucks/evage-motors.jpg", slug: "evage-motors" },
    { name: "Blue Energy Mo...", logo: "/trucks/blue-energy-motors.jpg", slug: "blue-energy-motors" },
    { name: "ISUZU", logo: "/trucks/isuzu.jpg", slug: "isuzu" },
    { name: "Olectra", logo: "/trucks/olectra.jpg", slug: "olectra" },
    { name: "Propal", logo: "/trucks/propel.jpg", slug: "propal" },
    { name: "Maruti Suzuki", logo: "/trucks/maruti-suzuki.jpg", slug: "maruti-suzuki" },
    { name: "Bharat Benz", logo: "/trucks/bharat-benz.jpg", slug: "bharatbenz" },
    { name: "Eicher Motors", logo: "/trucks/eicher.jpg", slug: "eicher" },
    { name: "Switch Mobility", logo: "/trucks/switch-mobility-1.jpg", slug: "switch-mobility" },
    { name: "SML ISUZU", logo: "/trucks/sml-isuzu.jpg", slug: "sml-isuzu" },
    { name: "EKA", logo: "/trucks/eka-brand-logo.jpg", slug: "eka" },
]

const TruckBrands = () => {
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();
    const listRef = useRef(null);

    const displayedBrands = showAll ? truckBrands : truckBrands.slice(0, 9);

    const openBrand = (slug) => {
        if (!slug) return;
        window.open(`/trucks/brand/${slug}`, "_blank");
    };

    useEffect(() => {
        if (router.asPath.includes("#brand-list")) {
            setShowAll(true);
            setTimeout(() => {
                listRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 200);
        }
    }, [router.asPath]);

    return (
        <div>
            <section className="py-10 bg-[#FFF8F4]" ref={listRef} id="brand-list">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center mx-4 md:mx-10 my-6">
                        <div className="hidden md:block w-16 md:w-60 border-t border-gray-300"></div>
                        <span className="mx-2 md:mx-4 text-xl md:text-3xl font-bold text-gray-900">
                            List of Trucks Brands in India
                        </span>
                        <div className="hidden md:block w-16 md:w-60 border-t border-gray-300"></div>
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
                                className="flex-shrink-0 w-32 md:w-auto text-center cursor-pointer"
                                onClick={() => openBrand(brand.slug)}

                            >
                                <div
                                    className="
                                        bg-white rounded-md border p-4 pl-2 shadow-sm
                                        hover:shadow-md transition-shadow
                                        hover:border-blue-500
                                        
                                    "
                                >
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
