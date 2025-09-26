import React from 'react'

const Banner = () => {
    return (
        <>
            <div className="relative h-96 bg-[url('/fuel-banner.png')] bg-cover bg-center">
                <div className='absolute inset-0 bg-gradient-to-r from-black/90 to-white/60'>
                    <h1 className='text-white text-5xl px-20 font-bold pt-28'>Smart Fuel Cost Calculator</h1>
                    <p className='text-gray-300 text-2xl py-12 font-light px-20'>Easily estimate your monthly and yearly fuel expenses. Enter distance, <br /> mileage, and fuel price to track your costs and save smarter.</p>
                </div>
            </div>
        </>
    )
}

export default Banner