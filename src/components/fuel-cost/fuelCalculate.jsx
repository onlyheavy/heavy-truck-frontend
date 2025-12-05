import React, { useState, useEffect } from 'react'
import SliderInput from '@/components/sliderInput'
import { calculateMonthlyFuelUsage } from '@/utils/fuelCalculator'
import { calculateMonthlyElectricUsage } from '@/utils/electricCalculator'

/** Custom hook to detect mobile */
const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpoint)
        }

        // Initial check
        handleResize()

        // Listen for window resize
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [breakpoint])

    return isMobile
}

const FuelCalculate = () => {
    const [fuelPrice, setfuelPrice] = useState(5)
    const [kiloMeter, setkiloMeter] = useState(50)
    const [mileage, setMileage] = useState(1)
    const [electricPrice, setElectricPrice] = useState(7)
    const [elckiloMeter, setElckiloMeter] = useState(50)
    const [fullCharge, setFullCharge] = useState(120)
    const [batteryCapacity, setBatteryCapacity] = useState(32)
    const [isDiesel, setIsDiesel] = useState(true)

    const isMobile = useIsMobile()

    const { fuelConsumption, fuelCost } = calculateMonthlyFuelUsage(
        fuelPrice,
        kiloMeter,
        mileage
    )

    const { costPerKm, avgMonthlyRunningCost } = calculateMonthlyElectricUsage(
        electricPrice,
        elckiloMeter,
        fullCharge,
        batteryCapacity
    )

    return (
        <div className='px-4 md:px-28'>
            {/* Header */}
            <div className="flex items-center justify-center mx-4 md:mx-10 my-10">
                <div className="hidden md:block w-60 border-t border-gray-300"></div>
                <span className="mx-4 text-xl md:text-3xl font-bold text-gray-900 text-center">
                    Calculate your Monthly Fuel Cost
                </span>
                <div className="hidden md:block w-60 border-t border-gray-300"></div>
            </div>

            {/* Mobile Toggle (hidden on desktop) */}
            {isMobile && (
                <div className='text-center pb-6'>
                    <button
                        className={`p-3 px-6 rounded-sm mr-4 cursor-pointer ${isDiesel
                            ? "bg-blue-800 border-blue-800 hover:bg-blue-700 text-white"
                            : "bg-[#eff2ff] border-[#eff2ff] text-black"}`}
                        onClick={() => setIsDiesel(true)}
                    >
                        Diesel
                    </button>
                    <button
                        className={`p-3 px-6 rounded-sm cursor-pointer ${!isDiesel
                            ? "bg-blue-800 border-blue-800 text-white hover:bg-blue-700"
                            : "bg-[#eff2ff] border-[#eff2ff] hover:bg-blue-200 text-black"}`}
                        onClick={() => setIsDiesel(false)}
                    >
                        Electric
                    </button>
                </div>
            )}

            {/* Desktop: show both, Mobile: show one */}
            <div className='flex flex-col lg:flex-row gap-5'>
                {/* Diesel card */}
                {(!isMobile || isDiesel) && (
                    <div className='p-4 border-2 rounded-lg w-full'>
                        <div className='flex justify-between '>
                            <div className='md:flex block gap-4'>
                                <img src="/diesel-truck.png" alt="" className='w-64 md:w-68 h-36 md:h-40' />
                                <div>
                                    <h3 className='text-base md:text-lg font-semibold md:w-[75%] w-full'>
                                        Calculate Fuel Costs – Save More on Every Mile
                                    </h3>
                                    <p className='text-blue-800 font-semibold pt-3'>Diesel or CNG</p>
                                </div>
                            </div>
                            <img src="/fuel.png" alt="" className='w-12 md:w-16 h-16 md:h-20 mt-4 md:mt-0' />
                        </div>

                        <div className='pt-10 pl-2 flex flex-col md:flex-row gap-4 justify-between'>
                            <div className="md:w-[60%] w-full">
                                <SliderInput
                                    label="Fuel price in your city"
                                    value={fuelPrice}
                                    min={5}
                                    max={150}
                                    step={1}
                                    color='bg-blue-700'
                                    onChange={setfuelPrice}
                                />
                                <SliderInput
                                    label="Average KM driven per day"
                                    value={kiloMeter}
                                    min={50}
                                    max={20000}
                                    step={50}
                                    color='bg-blue-700'
                                    onChange={setkiloMeter}
                                />
                                <SliderInput
                                    label="Average mileage per litre"
                                    value={mileage}
                                    min={1}
                                    max={100}
                                    step={1}
                                    color='bg-blue-700'
                                    onChange={setMileage}
                                />
                            </div>
                            <div className='bg-[#f5fdff] md:w-[40%] w-full h-52 md:h-60 p-4'>
                                <div className="pb-6 md:pb-8">
                                    <p className="pb-1">Fuel Consumption</p>
                                    <p>
                                        <span className="text-base md:text-lg font-bold">
                                            {fuelConsumption.toFixed(0)} Litres
                                        </span>
                                        <span className='pl-3 md:pl-5 text-sm text-blue-700'>Per Month</span>
                                    </p>
                                </div>
                                <div>
                                    <p>Fuel Price</p>
                                    <p>
                                        <span className="text-base md:text-lg font-bold">
                                            ₹{fuelCost.toFixed(0)}
                                        </span>
                                        <span className='pl-3 md:pl-5 text-sm text-red-500'>Per Month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Electric card */}
                {(!isMobile || !isDiesel) && (
                    <div className='p-4 border-2 rounded-lg w-full'>
                        <div className='flex justify-between '>
                            <div className='md:flex block gap-4'>
                                <img src="/electric-truck.png" alt="" className='w-64 md:w-68 h-36 md:h-40' />
                                <div>
                                    <h3 className='text-base md:text-lg font-semibold md:w-[75%] w-full'>
                                        Calculate Fuel Costs – Save More on Every Mile
                                    </h3>
                                    <p className='text-red-300 font-semibold pt-3'>Electric</p>
                                </div>
                            </div>
                            <img src="/ev.png" alt="" className='w-12 md:w-16 h-16 md:h-20 mt-4 md:mt-0' />
                        </div>

                        <div className='pt-10 pl-2 flex flex-col md:flex-row gap-4 justify-between'>
                            <div className="md:w-[60%] w-full">
                                <SliderInput
                                    label="Electricity Price in your city per unit"
                                    value={'electricPrice'}
                                    min={2}
                                    max={50}
                                    step={1}
                                    color='bg-blue-700'
                                    onChange={setElectricPrice}
                                />
                                <SliderInput
                                    label="Average KM driven per day"
                                    value={elckiloMeter}
                                    min={10}
                                    max={1000}
                                    step={10}
                                    color='bg-blue-700'
                                    onChange={setElckiloMeter}
                                />
                                <SliderInput
                                    label="Range On Full Charge"
                                    value={fullCharge}
                                    min={50}
                                    max={400}
                                    step={5}
                                    color='bg-blue-700'
                                    onChange={setFullCharge}
                                />
                                <SliderInput
                                    label="Battery capacity"
                                    value={batteryCapacity}
                                    min={20}
                                    max={600}
                                    step={5}
                                    color='bg-blue-700'
                                    onChange={setBatteryCapacity}
                                />
                            </div>
                            <div className='bg-[#fff9f6] md:w-[40%] w-full h-52 md:h-60 p-4'>
                                <div className="pb-6 md:pb-8">
                                    <p className="pb-1">EV Running Cost</p>
                                    <p>
                                        <span className="text-base md:text-lg font-bold">₹{costPerKm}</span>
                                        <span className='pl-3 md:pl-5 text-sm text-blue-700'>Per KM</span>
                                    </p>
                                </div>
                                <div>
                                    <p>Average Running Cost</p>
                                    <p>
                                        <span className="text-base md:text-lg font-bold">₹{avgMonthlyRunningCost}</span>
                                        <span className='pl-3 md:pl-5 text-sm text-red-500'>Per Month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FuelCalculate
