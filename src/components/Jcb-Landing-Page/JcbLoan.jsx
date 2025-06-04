import React from 'react'

const JcbLoan = () => {
    return (
        <div className='mt-8'>
            <h2 className='font-bold text-2xl capitalize'>JCB 2DXLoan Offers</h2>
            <div className='bg-[#FFE8DE] p-5 grid grid-cols-4 gap-3 mt-5 rounded-md'>

                <div className=' bg-white  rounded-md p-2'>
                    <input type="text" placeholder='Name' className=' outline-none' />
                </div>
                <div className=' bg-white  rounded-md p-2'>
                    <input type="text" placeholder='Mobile No.' className=' outline-none' />
                </div>
                <div className='flex gap-3 items-center bg-white  rounded-md p-2'>
                    <img src="/icons/location.svg" alt="location" />
                    <input type="text" placeholder='Enter Your City or District' className=' outline-none' />
                </div>
                <button className='bg-[#FA7436] text-white text-sm font-medium px-4 py-2 rounded-md'>Apply Loan</button>
            </div>


        </div>
    )
}

export default JcbLoan