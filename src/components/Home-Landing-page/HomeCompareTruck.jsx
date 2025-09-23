import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import API from '@/utils/api'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const S3_BASE = 'https://only-heavy.s3.eu-north-1.amazonaws.com/'

const HomeCompareTruck = () => {
    const [compareTruck, setCompareTruck] = useState([])

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
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Compare Truck</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {compareTruck?.map((item, index) => {
                            const left = item?.leftProduct
                            const right = item?.rightProduct
                            const title = `${left?.productName || ''} vs ${right?.productName || ''}`
                            const leftImg = left?.productImage ? `${S3_BASE}${left?.productImage}` : '/placeholder.svg'
                            const rightImg = right?.productImage ? `${S3_BASE}${right?.productImage}` : '/placeholder.svg'
                            return (
                                <Card key={item?._id || index} className="border border-gray-300 hover:shadow-lg ">
                                    <CardContent className="p-6">
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <img
                                                src={leftImg}
                                                alt={left?.productName || 'Left truck'}
                                                className="w-full h-40 object-contain rounded-lg bg-white border border-gray-300"
                                            />
                                            <img
                                                src={rightImg}
                                                alt={right?.productName || 'Right truck'}
                                                className="w-full h-40 object-contain rounded-lg bg-white border border-gray-300"
                                            />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-4 text-center">{title}</h3>
                                        <div className="flex justify-between items-center mb-4 text-sm">
                                            <span className="text-orange-500 font-bold">₹ {left?.minPrice}{left?.maxPrice ? ` – ${left?.maxPrice}` : ''} Lakh*</span>
                                            <span className="text-gray-400 ">vs</span>
                                            <span className="text-orange-500 font-bold">₹ {right?.minPrice}{right?.maxPrice ? ` – ${right?.maxPrice}` : ''} Lakh*</span>
                                        </div>
                                        <Link href={`/compare/${item?.slug || ''}`}>
                                            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">Compare Now</Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
                <div className='flex justify-center items-center my-5'>
                    <Button className='cursor-pointer bg-[#FA7436] hover:bg-[#FA7436]/90'>View All</Button>
                </div>
            </section>
        </div>
    )
}

export default HomeCompareTruck