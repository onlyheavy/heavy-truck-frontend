import { useCategory } from '@/hooks/useContext'
import React from 'react'

const TruckProsAndCons = () => {
    const { categoryData } = useCategory()


    return (
        <div className='flex flex-col gap-5'>
            <div className='w-full bg-white  rounded-md md:p-5 p-3 border border-gray-300 my-5'>
                <div className='flex flex-col gap-3'>
                    <h2 className='font-bold md:text-[24px] text-[18px] capitalize'>{categoryData[0]?.productName} Pros and cons</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-3 mt-3 '>
                    <div className='bg-[#EEFFEB] p-5 rounded-md md:mt-5'>
                        <div className='flex items-center gap-2 mb-5'>
                            <img src="/icons/like.svg" alt="like" />
                            <p className='font-bold text-base'>Pros</p>
                        </div>
                        {
                            categoryData.map((prosgroup, index) => (
                                prosgroup.pros?.map((pros, index) =>
                                (
                                    <div key={index} className='flex items-center gap-2 my-2'>
                                        <li className='text-sm capitalize font-normal'>{pros}</li>
                                    </div>
                                ))

                            ))
                        }
                    </div>
                    <div className='bg-[#FFFBDD] p-5 rounded-md mt-5'>
                        <div className='flex items-center gap-2 mb-5'>
                            <img src="/icons/dislike.svg" alt="like" />
                            <p className='font-bold text-base'>Cons</p>
                        </div>
                        {
                            categoryData.map((consgroup, index) => (
                                consgroup.cons?.map((cons, index) =>
                                (
                                    <div key={index} className='flex items-center gap-2 my-2'>
                                        <li className='text-sm capitalize font-normal'>{cons}</li>
                                    </div>
                                ))

                            ))
                        }
                    </div>
                </div>
            </div>

            {/* brochure */}

            <div className='flex gap-3 bg-[#FFE8DE] p-5 pb-4 rounded-md '>
                <div className='flex flex-col gap-3'>
                    <h2 className='font-bold md:text-[24px] text-[18px] capitalize'>Download {categoryData[0]?.productName} Brochure</h2>
                    <p className='text-base font-normal text-gray-700 w-[80%]'>Download {categoryData[0]?.productName} brochure online. Check out the 1412 LPT PDF brochure at Truck Junction with all features and specifications.</p>
                    <div className="md:hidden flex justify-center items-center">
                        <img src="/images/brochure.svg" alt="brochure" />
                    </div>
                    <div className='flex justify-center md:justify-start items-center'>
                        <button className='bg-[#FA7436] w-fit text-white px-4 py-3 mt-3 text-xs rounded-md font-bold '>Download Brochure</button>
                    </div>

                </div>
                <div className="md:block hidden">
                    <img src="/images/brochure.svg" alt="brochure" />
                </div>
            </div>

            {/* uses */}

            <div className='md:my-8 my-4'>
                <h2 className='font-bold md:text-[24px] text-[18px] capitalize'>{categoryData[0]?.productName} Uses</h2>
                <div className='mt-5 grid grid-cols-2 gap-3 md:flex md:flex-wrap'>
                    {
                        categoryData.map((item, index) => (
                            item.uses.map((item, index) => (
                                <div key={index} className='flex flex-col items-center gap-2 shadow-sm rounded-md p-5 md:my-2 md:mb-6 border hover:border-orange-500 border-gray-300'>
                                    <img src="/icons/uses.svg" alt="uses" />
                                    <p className='text-sm capitalize font-normal w-28 text-center'>{item}</p>
                                </div>
                            ))
                        ))
                    }
                </div>

            </div>
        </div>
    )
}


export default TruckProsAndCons