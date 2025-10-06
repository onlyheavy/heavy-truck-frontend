import React from 'react'

const Banner = () => {
    return (
        <>
            <div className="relative h-96 bg-[url('/fuel-banner.png')] bg-cover bg-center">
                <div className='absolute inset-0 bg-gradient-to-r from-black/90 to-white/60'>
                    <h1 className='text-white text-5xl px-20 font-bold pt-28'>Calculate Your Monthly Payments</h1>
                    <p className='text-gray-300 text-2xl py-12 font-light px-20 w-[65%]'>Quickly calculate monthly installments, compare options, and manage your finances better with our easy-to-use EMI tool.</p>
                </div>
            </div>
        </>
    )
}

export default Banner