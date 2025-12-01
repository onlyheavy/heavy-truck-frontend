import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'

const HomeBrochure = () => {
  return (
    <div className='p-3 bg-white'>
      <section className="py-12 bg-[#FFE4D7] max-w-7xl mx-auto rounded-xl ">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-between px-6 md:px-10 text-center md:text-left">
          {/* Text Section */}
          <div className="w-full md:w-[70%]">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-snug">
              Get the brochure now and find the perfect truck for your business.
            </h2>
            <p className="text-[#323232] text-sm sm:text-base mb-6">
              Discover detailed specifications, features, and benefits of our trucks designed to deliver
              performance, efficiency, and reliability for every business need.
            </p>
          </div>

          {/* Button Section */}
          <div className="w-full md:w-auto">
            <Link href="/brochure" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
              >
                Download Brochure
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeBrochure
