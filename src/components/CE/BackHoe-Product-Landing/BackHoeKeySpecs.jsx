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

const BackHoeKeySpecs = () => {
    const { categoryData } = useCategory()
    const product = categoryData?.[0] || {}
    const keyFeature = product?.keyFeature?.[0] || {}

    const specs = [
        {
            title: 'Max. reach at full height',
            value: getFormattedValue(keyFeature?.maxReachFullHeight, 'm'),
            icon: '/icons/backhoe/fullheight.svg',
        },
        {
            title: 'Max Operating Weight',
            value: getFormattedValue(keyFeature?.maxOperatingWeight, 'kg'),
            icon: '/icons/backhoe/operation-weight.svg',
        },
        {
            title: 'Loader Bucket capacity',
            value: getFormattedValue(keyFeature?.loaderBucketCapacity, 'Cum'),
            icon: '/icons/backhoe/loader-bucket-capacity.svg',
        },
        {
            title: 'Backhoe Bucket capacity',
            value: getFormattedValue(keyFeature?.backhoeBucketCapacity, 'Cum'),
            icon: '/icons/backhoe/backhoe-bucket.svg',
        },
        {
            title: 'Max Dig Depth',
            value: getFormattedValue(keyFeature?.maxDiggingDepth, 'mm'),
            icon: '/icons/backhoe/max-lift-capacity.svg',
        },
        {
            title: 'Max. lift capacity',
            value: getFormattedValue(keyFeature?.maxLiftCapacity, 'kg'),
            icon: '/icons/backhoe/max-lift-capacity.svg',
        },
    ]



    return (
        <div className="md:my-10 my-4">
            <h2 className="font-bold md:text-[24px] text-lg">
                Key Specs of {product?.productName || 'the Truck'}
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5 md:mt-8 mt-4">
                {specs.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-between gap-3 w-full bg-white p-4 rounded-md border border-amber-500 hover:shadow-orange-700 hover:shadow-md transition-all duration-300"
                    >
                        <div className="w-12 h-12 flex items-center justify-center">
                            <img
                                src={item?.icon}
                                alt={item?.title}
                                className="w-10 h-12 object-contain transition-transform duration-300 hover:scale-110"
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

export default BackHoeKeySpecs
