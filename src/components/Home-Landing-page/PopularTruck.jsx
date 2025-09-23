import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import API from '@/utils/api'
import axios from 'axios'
import { useEffect, useState } from 'react'



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
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto ">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Popular Trucks in India</h2>
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {Array.isArray(popularTrucks) && popularTrucks?.length > 0 ?
                            popularTrucks.map((truck, index) => (
                                <Card key={index} className="min-w-[250px] border border-gray-300 hover:shadow-lg ">
                                    <CardContent className="p-4">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_S3_URL}${truck?.image}`}
                                            alt={truck.productName}
                                            className="w-full h-40 object-cover rounded-lg mb-4"
                                        />
                                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">{truck?.productName}</h3>
                                        <p className="text-orange-500 font-bold text-sm">
                                            ₹ {truck?.minPrice} - {truck?.maxPrice}
                                        </p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full mt-3 cursor-pointer text-orange-500 border-orange-500 hover:text-orange-500 hover:bg-orange-50 bg-transparent"
                                        >
                                            View Details
                                        </Button>
                                    </CardContent>
                                </Card>
                            )) : (<p className="text-center">No trucks found</p>)}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PopularTruck;