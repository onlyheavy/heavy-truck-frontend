import { useCategory } from '@/hooks/useContext'
import React from 'react'

const getFormattedValue = (value, unit = '') => {
    const hasValue = value !== null && value !== undefined && value !== ''
    if (!hasValue) return 'N/A'

    if (typeof value === 'number' && unit) {
        return `${value} ${unit}`.trim()
    }

    if (unit) {
        return `${value} ${unit}`.trim()
    }

    return `${value}`
}

const KeySpecs = () => {
    const { categoryData } = useCategory()
    const product = categoryData?.[0] || {}
    const keyFeature = product?.keyFeature?.[0] || {}

    const fuelType =
        keyFeature?.fuelType ||
        product?.fuelType ||
        product?.specInfo?.engine?.[0]?.fuelType ||
        ''

    const isElectric = fuelType?.toLowerCase?.().includes('electric')

    const generalSpecs = [

        {
            title: 'GVW',
            value: getFormattedValue(keyFeature?.GVW, 'kg'),
            icon: '/icons/gvw.svg',
        },
        {
            title: 'Payload',
            value: getFormattedValue(keyFeature?.payload, 'kg'),
            icon: '/icons/payload.svg',
        },
        {
            title: 'No. of Tyres',
            value: getFormattedValue(keyFeature?.noOfTyres),
            icon: '/icons/tyres.svg',
        },
    ]

    const combustionSpecs = [
        {
            title: 'Engine Displacement',
            value: getFormattedValue(keyFeature?.engineDisplacement, 'cc'),
            icon: '/icons/cc.svg',
        },
        {
            title: 'Fuel Tank',
            value: getFormattedValue(keyFeature?.fuelTankCapacity, 'L'),
            icon: '/icons/petrol.svg',
        },
        {
            title: 'Mileage',
            value: getFormattedValue(keyFeature?.mileage, 'km/l'),
            icon: '/icons/mileage.svg',
        },

    ]

    const electricSpecs = [
        {
            title: 'Motor Power',
            value: getFormattedValue(product?.specInfo?.engine?.[0]?.enginePower),
            icon: '/icons/power.svg',
        },
        {
            title: 'Charging Time',
            value: getFormattedValue(keyFeature?.chargingTime, 'Hrs'),
            icon: '/icons/charging.svg',
        },
        {
            title: 'Range',
            value: getFormattedValue(keyFeature?.range, 'km'),
            icon: '/icons/mileage.svg',
        },
    ]

    const specs = [
        ...generalSpecs,
        ...(isElectric ? electricSpecs : combustionSpecs),
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
