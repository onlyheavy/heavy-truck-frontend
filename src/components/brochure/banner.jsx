import React from 'react'

const Banner = () => {
    return (
        <>
            <div className=" h-96 bg-[url('/brochure-banner.svg')] bg-cover bg-center">
                <div className=''>
                    <h1 className='text-white text-4xl px-20 font-bold pt-28'>Download Brochures Instantly</h1>
                    <p className='text-gray-300 text-xl py-8 font-light px-20 w-[50%]'>Find specs, features, and pricing in one place. Compare top models to choose the right truck for your business.</p>
                </div>
            </div>
        </>
    )
}

export default Banner