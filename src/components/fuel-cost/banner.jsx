import React from 'react'

const Banner = () => {
    return (
        <>
            <div className="relative h-96 bg-[url('/fuel-banner.png')] bg-cover bg-center">
                <div className='absolute inset-0 bg-gradient-to-r from-black/90 to-white/60'>
                    <h1 className='text-white md:text-5xl text-3xl md:px-20 px-3 font-bold pt-28'>Smart Fuel Cost Calculator</h1>
                    <p className='md:text-gray-300 text-white md:text-2xl text-xl md:py-12 py-6 font-light md:px-20 px-3 md:w-[65%] w-full'>Easily estimate your monthly and yearly fuel expenses. Enter distance, mileage, and fuel price to track your costs and save smarter.</p>
                </div>
            </div>
        </>
    )
}

export default Banner