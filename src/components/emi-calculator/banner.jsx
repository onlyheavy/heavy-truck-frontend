import React from 'react'

const Banner = () => {
    return (
        <>
            <div className=" h-52 md:h-96 bg-[url('/emiCalculator.png')] bg-cover bg-[position:80%_center] relative">
                <div className='absolute inset-0 bg-gradient-to-r from-black/20 to-black/20'>
                    <h1 className="text-white text-2xl md:text-4xl px-4 md:px-20 font-bold pt-10 md:pt-28">
                        Calculate Your Monthly Payments
                    </h1>
                    <p className="text-gray-200 text-sm md:text-xl py-4 md:py-8 font-light px-4 md:px-20 w-full md:w-[50%]">
                        Quickly calculate monthly installments, compare options, and manage your finances better with our easy-to-use EMI tool.
                    </p>
                </div>
            </div>
        </>

    )
}

export default Banner