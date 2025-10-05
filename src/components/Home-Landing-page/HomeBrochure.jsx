import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'

const HomeBrochure = () => {
    return (
        <div>
            <section className="py-12 bg-[#FFE4D7] max-w-7xl mx-auto rounded-xl">
                <div className="flex gap-10 items-center mx-10">
                    <div className='w-[90%]'>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Get the brochure now and find the perfect truck for your business.
                        </h2>
                        <p className="text-[#323232] text-base mb-6">
                            Discover detailed specifications, features, and benefits of our trucks designed to deliver performance, efficiency, and reliability for every business need.
                        </p>
                    </div>
                    <Link
                        href='/brochure'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">
                            Download Brochure
                        </Button>
                    </Link>
                </div>
            </section >
        </div >
    )
}

export default HomeBrochure