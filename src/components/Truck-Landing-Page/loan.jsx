import React from 'react'
import { useCategory } from '@/hooks/useContext'

const Loan = () => {
    const { categoryData } = useCategory()

    return (
        <div>
            <h2 className='font-bold md:text-[24px] text-lg capitalize'>{categoryData[0]?.productName} Loan Offers</h2>
            <div className='bg-[#FFE8DE] p-5 md:grid block grid-cols-4 gap-3 mt-5 rounded-md'>

                <div className=' bg-white  rounded-md p-2 md:mb-0 mb-4'>
                    <input type="text" placeholder='Name' className=' outline-none' />
                </div>
                <div className=' bg-white  rounded-md p-2 md:mb-0 mb-4'>
                    <input type="text" placeholder='Mobile No.' className=' outline-none' />
                </div>
                <div className='flex gap-3 items-center bg-white  rounded-md p-2 md:mb-0 mb-4'>
                    <img src="/icons/location.svg" alt="location" />
                    <input type="text" placeholder='Enter Your City or District' className=' outline-none' />
                </div>
                <div className='flex justify-center items-center'>
                    <button className='bg-[#FA7436] text-white text-sm font-medium px-4 py-3 rounded-md'>Apply Loan</button>
                </div>
            </div>


        </div>
    )
}

export default Loan