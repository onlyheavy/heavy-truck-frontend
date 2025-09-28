import { Button } from '@/components/ui/button'
import API from '@/utils/api'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const S3_BASE = 'https://only-heavy.s3.eu-north-1.amazonaws.com/'

const HomeCompareTruck = () => {
    const [compareTruck, setCompareTruck] = useState([])
    const router = useRouter()

    const getCompareTruckDetails = async () => {
        try {
            const response = await axios.get(`${API.HOST}/api/compare/mostPopularCompare`)
            if (response?.data?.success) {
                setCompareTruck(response?.data?.data || [])
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCompareTruckDetails()
    }, [])

    return (
        <div>
            <section className="py-10 bg-[#FDF8F4]">
                <div className="max-w-7xl mx-auto ">
                    <div className="flex items-center justify-center mx-10  mb-10">
                        <div className="w-60 border-t border-gray-300"></div>
                        <span className="mx-4 text-3xl font-bold text-gray-900">
                            Compare Truck
                        </span>
                        <div className="w-60 border-t border-gray-300"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {compareTruck?.map((item, index) => {
                            const left = item?.leftProduct
                            const right = item?.rightProduct
                            const title = `${left?.productName || ''} vs ${right?.productName || ''}`
                            const leftImg = left?.productImage ? `${S3_BASE}${left?.productImage}` : '/placeholder.svg'
                            const rightImg = right?.productImage ? `${S3_BASE}${right?.productImage}` : '/placeholder.svg'
                            return (
                                <div key={item?._id || index} className="border bg-white rounded-md border-gray-300 hover:shadow-lg ">
                                    <div className="p-3">
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <img
                                                src={leftImg}
                                                alt={left?.productName || 'Left truck'}
                                                className="w-full h-40 object-contain rounded-lg bg-transparent border border-gray-300"
                                            />
                                            <img
                                                src={rightImg}
                                                alt={right?.productName || 'Right truck'}
                                                className="w-full h-40 object-contain rounded-lg bg-transparent border border-gray-300"
                                            />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-4 text-center">{title}</h3>
                                        <div className="flex justify-center items-center gap-8 mb-4 text-sm">
                                            <span className="text-orange-500 font-bold min-w-[110px] text-center">
                                                ₹ {left?.minPrice}{left?.maxPrice ? ` – ${left?.maxPrice}` : ''} Lakh*
                                            </span>
                                            <span className="text-gray-400 font-semibold">vs</span>
                                            <span className="text-orange-500 font-bold min-w-[110px] text-center">
                                                ₹ {right?.minPrice}{right?.maxPrice ? ` – ${right?.maxPrice}` : ''} Lakh*
                                            </span>
                                        </div>
                                        <Link href={`/compare/${item?.slug || ''}`}>
                                            <div className='flex justify-center items-center'>
                                                <button
                                                    className="px-4 py-2 mt-3 cursor-pointer rounded-xs font-bold text-sm border text-orange-500 border-orange-500 hover:text-orange-500 hover:bg-orange-50 bg-transparent "
                                                >
                                                    Compare Now
                                                </button>
                                            </div>
                                        </Link>


                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Link  href={`/compare`}>
                    <div className='flex justify-center items-center my-5'>
                        <Button className='cursor-pointer bg-[#FA7436] hover:bg-[#FA7436]/90' >View All</Button>
                    </div></Link>
            </section>
        </div>
    )
}

export default HomeCompareTruck