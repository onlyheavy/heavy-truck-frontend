import React from 'react'

const Banner = () => {
    return (
        <>
            <div className=" h-60 md:h-96 bg-[url('/brochure-banner.svg')] bg-cover bg-[position:70%_center]">
                <div>
                    <h1 className="text-white text-2xl md:text-4xl px-4 md:px-20 font-bold pt-20 md:pt-28">
                        Download Brochures Instantly
                    </h1>
                    <p className="text-gray-200 text-sm md:text-xl py-4 md:py-8 font-light px-4 md:px-20 w-full md:w-[50%]">
                        Find specs, features, and pricing in one place. Compare top models to choose the right truck for your business.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Banner
