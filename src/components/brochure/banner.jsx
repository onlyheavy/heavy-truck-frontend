import React from 'react'

const Banner = () => {
    return (
        <>
            <div className=" h-56 md:h-96 bg-[url('/brochure-banner.svg')] bg-cover bg-[position:70%_center] relative">
                <div className='absolute inset-0 bg-gradient-to-r from-black/50 md:from-black/10 to-black/50 md:to-black/10'>
                    <h1 className="text-white text-[26px] md:text-4xl px-4 md:px-20 font-bold pt-16 md:pt-28">
                        Download Brochures Instantly
                    </h1>
                    <p className="text-gray-200 text-[16px] md:text-xl py-4 md:py-8 font-light px-4 md:px-20 w-full md:w-[50%]">
                        Find specs, features, and pricing in one place. Compare top models to choose the right truck for your business.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Banner
