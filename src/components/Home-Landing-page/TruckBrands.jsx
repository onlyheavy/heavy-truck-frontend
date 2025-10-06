import { Button } from '@/components/ui/button'
import React from 'react'

const truckBrands = [
    { name: "Mahindra", logo: "/trucks/mahindra.svg" },
    { name: "Tata", logo: "/trucks/tata.svg" },
    { name: "Euler", logo: "/trucks/euler.svg" },
    { name: "Bajaj", logo: "/trucks/bajaj.svg" },
    { name: "Ashok Leyland", logo: "/trucks/ashok-leyland.svg" },
    { name: "Force", logo: "/trucks/force.svg" },
    { name: "TVS", logo: "/trucks/tvs.svg" },
    { name: "Saarthi", logo: "/trucks/saarthi.svg" },
    { name: "Piaggio", logo: "/trucks/piaggio.svg" },
]

const TruckBrands = () => {
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

                    <div className="
                        flex overflow-x-auto gap-4 px-2
                        md:grid md:grid-cols-4 lg:grid-cols-9 md:gap-5 md:px-0
                        scrollbar-hide
                    ">
                        {truckBrands.map((brand, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-32 md:w-auto text-center"
                            >
                                <div className="bg-white rounded-md p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="h-10 w-auto mx-auto mb-2" />
                                    <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{brand.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center items-center mt-10'>
                        <Button className='cursor-pointer bg-[#FA7436] hover:bg-[#FA7436]/90'>View All</Button>
                    </div>
                </div>
            </section>
           
        </div>
    )
}

export default TruckBrands