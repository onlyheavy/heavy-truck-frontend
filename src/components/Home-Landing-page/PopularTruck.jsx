
import API from '@/utils/api'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'


const PopularTruck = () => {
    const [popularTrucks, setPopularTrucks] = useState([])

    const getPopularTrucks = async () => {
        try {
            const response = await axios.get(`${API.HOST}/api/category/popular`)
            console.log('truck', response?.data?.data)
            setPopularTrucks(response?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPopularTrucks()
    }, [])


    return (
        <div>
            <section className="py-10 bg-white">
                <div className="max-w-7xl mx-auto ">
                    <div className="flex items-center justify-center mx-10 my-6">
                        <div className="w-60 border-t border-gray-300"></div>
                        <span className="mx-4 text-3xl font-bold text-gray-900">
                            Popular Trucks in India
                        </span>
                        <div className="w-60 border-t border-gray-300"></div>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-4 pt-8 scrollbar-hide">
                        {Array.isArray(popularTrucks) && popularTrucks?.length > 0 ?
                            popularTrucks.map((truck, index) => (
                                <div key={index} className="min-w-[250px] border rounded-md border-gray-300 hover:shadow-lg ">
                                    <div className="py-2 px-2">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_S3_URL}${truck?.image}`}
                                            alt={truck.productName}
                                            className="w-full h-40 object-cover border rounded-lg mb-4"
                                        />
                                        <h3 className="font-semibold text-gray-900 mb-2 text-[16px]">{truck?.productName}</h3>
                                        <p className="text-orange-500 font-bold text-sm">
                                            ₹ {truck?.minPrice} - {truck?.maxPrice} Lakhs
                                        </p>
                                        <Link
                                            href={truck.slug ? `/trucks/${truck.slug}` : "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => {
                                                if (!truck.slug) {
                                                    e.preventDefault();
                                                    alert("Missing slug");
                                                }
                                            }}
                                        >
                                            <div className='flex justify-center mt-2 pb-4'>
                                                <button
                                                    className="px-6 py-1.5 rounded-sm mt-3 cursor-pointer font-bold text-sm border text-orange-500 border-orange-500 hover:text-white hover:bg-orange-500 bg-transparent "
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )) : (<p className="text-center">No trucks found</p>)}
                    </div>
                </div>
            </section >
        </div >
    )
}

export default PopularTruck;