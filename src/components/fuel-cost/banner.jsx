import React from 'react'

const Banner = () => {
    return (
        <>

            <div className=" h-56 md:h-96 bg-[url('/fuel-banner.png')] bg-cover bg-[position:80%_center] relative">
                <div className='absolute inset-0 bg-gradient-to-r from-black/0  to-black/50 md:to-white/40'>
                    <h1 className="text-white text-[26px] md:text-4xl px-4 md:px-20 font-bold pt-12 md:pt-28">
                        Smart Fuel Cost Calculator
                    </h1>
                    <p className="text-gray-100 text-[16px] md:text-lg py-4 md:py-8 font-light px-4 md:px-20 w-full md:w-[50%]">
                        Easily estimate your monthly and yearly fuel expenses. Enter distance, mileage, and fuel price to track your costs and save smarter.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Banner