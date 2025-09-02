import { useCategory } from '@/hooks/useContext'
import React from 'react'

const KeySpecs = () => {
    const { categoryData } = useCategory()
    const product = categoryData?.[0] || {}

    console.log(categoryData, 'product')

    const specs = [
        // {
        //     title: 'Power',
        //     value: `${product?.keyFeature?.[0]?.power} RPM` || 'N/A',
        //     icon: '/icons/power.svg',
        // },
        {
            title: 'GVW',
            value: `${product?.keyFeature?.[0]?.GVW} kg` || 'N/A',
            icon: '/icons/gvw.svg',
        },
        // {
        //     title: 'Wheelbase',
        //     value: `${product?.keyFeature?.[0]?.wheelBase} mm` || 'N/A',
        //     icon: '/icons/Wheelbase.svg',
        // },
        {
            title: 'Payload',
            value: `${product?.keyFeature?.[0]?.payload} kg` || 'N/A',
            icon: '/icons/payload.svg',
        },
        {
            title: 'Engine',
            value: `${product?.keyFeature?.[0]?.engineDisplacement} cc` || 'N/A',
            icon: '/icons/cc.svg',
        },
        {
            title: 'Fuel Tank',
            value: `${product?.keyFeature?.[0]?.fuelTankCapacity} L` || 'N/A',
            icon: '/icons/petrol.svg',
        },
        {
            title: 'No. of Tyres',
            value: product?.keyFeature?.[0]?.noOfTyres || 'N/A',
            icon: '/icons/tyres.svg',
        },
        {
            title: 'Mileage',
            value: `${product?.keyFeature?.[0]?.mileage} km/l` || 'N/A',
            icon: '/icons/mileage.svg',
        },
    ]



    return (
        <div className="md:my-10 my-4">
            <h2 className="font-bold md:text-[24px] text-lg">
                Key Specs of {product?.productName || 'the Truck'}
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-5 md:mt-8 mt-4">
                {specs.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-between gap-3 w-full bg-white p-4 rounded-md border border-amber-500 cursor-pointer hover:shadow-orange-700 hover:shadow-md transition-all duration-300"
                    >
                        <div className="w-12 h-12 flex items-center justify-center">
                            <img
                                src={item?.icon}
                                alt={item?.title}
                                className="w-10 h-10 object-contain transition-transform duration-300 hover:scale-110"
                            />
                        </div>
                        <div className="text-center space-y-1">
                            <p className="font-semibold text-sm text-gray-800 md:line-clamp-1 ">
                                {item?.title}
                            </p>
                            <p className="text-xs font-medium text-[#254154] line-clamp-1">
                                {item?.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default KeySpecs
