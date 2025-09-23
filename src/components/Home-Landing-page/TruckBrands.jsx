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
            <section className=" py-10 bg-[#FFF8F4]">
                <div className="max-w-7xl mx-auto  ">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">List of Trucks Brands in India</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-5">
                        {truckBrands.map((brand, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="h-10 w-auto mx-auto mb-2" />
                                    <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{brand.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center items-center  mt-10'>
                        <Button className='cursor-pointer bg-[#FA7436] hover:bg-[#FA7436]/90'>View All</Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TruckBrands