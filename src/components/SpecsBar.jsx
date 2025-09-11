import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import { useCategory } from '@/hooks/useContext'

const SpecsBar = ({ truckGalleryRef, truckFeaturesRef, truckFuelRef, truckEmiCaluculator, truckBrochure, truckLoan }) => {
    const [activeTab, setActiveTab] = useState('truckGalleryRef')
    const scrollContainerRef = useRef(null);
    const { categoryData } = useCategory()
    const product = categoryData?.[0] || {}

    const scrollToComponent = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            f
            console.error('Ref is undefined or not passed to Navbar.');
        }
    };

    // Optional: Scroll active tab into view on mobile
    useEffect(() => {
        // Find the active button element
        const activeButton = document.querySelector(`button[data-tab="${activeTab}"]`);
        if (activeButton && scrollContainerRef.current) {
            // Calculate the position to scroll the active button into view (centered if possible)
            const container = scrollContainerRef.current;
            const scrollLeft = activeButton.offsetLeft - (container.clientWidth / 2) + (activeButton.clientWidth / 2);
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }, [activeTab]);

    return (
        <div className='mt-5'>
            <div className='p-2 pl-0 overflow-hidden'>
                {/* Scroll container */}
                <div ref={scrollContainerRef} className="overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                    <ul className='flex gap-4 md:gap-8 min-w-max px-1'>
                        <li>
                            <button
                                data-tab="truckGalleryRef"
                                className={`cursor-pointer transition-all duration-300 whitespace-nowrap ${activeTab === 'truckGalleryRef' ? 'px-3 py-1 rounded-md border border-orange-500 text-orange-500' : 'bg-transparent px-3 py-1'}`}
                                onClick={() => {
                                    scrollToComponent(truckGalleryRef)
                                    setActiveTab('truckGalleryRef')
                                }}
                            >
                                {product?.productName}
                            </button>
                        </li>

                        <li>
                            <button
                                data-tab="truckFeaturesRef"
                                className={`cursor-pointer transition-all duration-300 whitespace-nowrap ${activeTab === 'truckFeaturesRef' ? 'px-3 py-1 rounded-md border border-orange-500 text-orange-500' : 'bg-transparent px-3 py-1'}`}
                                onClick={() => {
                                    scrollToComponent(truckFeaturesRef)
                                    setActiveTab('truckFeaturesRef')
                                }}
                            >
                                Specification
                            </button>
                        </li>

                        <li>
                            <button
                                data-tab="truckFuelRef"
                                className={`cursor-pointer transition-all duration-300 whitespace-nowrap ${activeTab === 'truckFuelRef' ? 'px-3 py-1 rounded-md border border-orange-500 text-orange-500' : 'bg-transparent px-3 py-1'}`}
                                onClick={() => {
                                    scrollToComponent(truckFuelRef)
                                    setActiveTab('truckFuelRef')
                                }}
                            >
                                Monthly Fuel Cost
                            </button>
                        </li>

                        <li>
                            <button
                                data-tab="truckEmiCaluculator"
                                className={`cursor-pointer transition-all duration-300 whitespace-nowrap ${activeTab === 'truckEmiCaluculator' ? 'px-3 py-1 rounded-md border border-orange-500 text-orange-500' : 'bg-transparent px-3 py-1'}`}
                                onClick={() => {
                                    scrollToComponent(truckEmiCaluculator)
                                    setActiveTab('truckEmiCaluculator')
                                }}
                            >
                                Calculate EMI
                            </button>
                        </li>

                        <li>
                            <button
                                data-tab="truckCompare"
                                className={`cursor-pointer transition-all duration-300 whitespace-nowrap ${activeTab === 'truckCompare' ? 'px-3 py-1 rounded-md border border-orange-500 text-orange-500' : 'bg-transparent px-3 py-1'}`}
                                onClick={() => {
                                    scrollToComponent(truckLoan)
                                    setActiveTab('truckCompare')
                                }}
                            >
                                Compare
                            </button>
                        </li>

                        <li>
                            <button
                                data-tab="truckLoan"
                                className={`cursor-pointer transition-all duration-300 whitespace-nowrap ${activeTab === 'truckLoan' ? 'px-3 py-1 rounded-md border border-orange-500 text-orange-500' : 'bg-transparent px-3 py-1'}`}
                                onClick={() => {
                                    scrollToComponent(truckLoan)
                                    setActiveTab('truckLoan')
                                }}
                            >
                                Apply Loan
                            </button>
                        </li>

                        <li>
                            <button
                                data-tab="truckBrochure"
                                className={`cursor-pointer transition-all duration-300 whitespace-nowrap ${activeTab === 'truckBrochure' ? 'px-3 py-1 rounded-md border border-orange-500 text-orange-500' : 'bg-transparent px-3 py-1'}`}
                                onClick={() => {
                                    scrollToComponent(truckBrochure)
                                    setActiveTab('truckBrochure')
                                }}
                            >
                                Brochures
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Hide scrollbar for all browsers */}
                <style jsx>{`
                    div::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
            </div>
        </div>
    )
}

export default SpecsBar