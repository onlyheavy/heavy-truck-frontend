import React, { useState } from 'react'
import SliderInput from '../sliderInput'
import { calculateMonthlyFuelUsage } from '@/utils/fuelCalculator';

const FuelCalculate = () => {
    const [fuelPrice, setfuelPrice] = useState(5);
    const [kiloMeter, setkiloMeter] = useState(50);
    const [mileage, setMileage] = useState(1);
    const { fuelConsumption, fuelCost } = calculateMonthlyFuelUsage(
        fuelPrice,
        kiloMeter,
        mileage
    );
    return (
        <>
            <div className='px-28 '>
                <div className="flex items-center justify-center mx-10 my-10">
                    <div className="w-60 border-t border-gray-300"></div>
                    <span className="mx-4 text-3xl font-bold text-gray-900">
                        Calculate your Monthly Fuel Cost
                    </span>
                    <div className="w-60 border-t border-gray-300"></div>
                </div>
                <div className=''>
                    <div className='flex gap-5'>
                        {/* diesel */}
                        <div className='p-4 border-2  rounded-lg'>
                            <div className='flex justify-between '>
                                <div className='flex gap-4'>
                                    <img src="/diesel-truck.png" alt="" className='w-56 h-40' />
                                    <div>
                                        <h3 className='text-lg font-semibold md:w-[75%] w-full  '>Calculate Fuel Costs – Save More on Every Mile</h3>
                                        <p className='text-blue-800 font-semibold pt-3'>Diesel or CNG</p>
                                    </div>
                                </div>
                                <img src="/fuel.png" alt="" className='w-16 h-20' />
                            </div>
                            <div className='pt-10 pl-2 flex gap-4 justify-between'>
                                <div className=" md:w-[60%] w-full">
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
                                <div className='bg-[#f5fdff] md:w-[40%] w-full h-60 p-4'>
                                    <div className="pb-8 ">
                                        <p className="pb-1">Fuel Consumption</p>
                                        <p><span className="text-sm md:text-lg font-bold">{fuelConsumption.toFixed(0)} Litres</span><span className='pl-5 text-sm text-blue-700'>Per Month</span></p>
                                    </div>
                                    <div>
                                        <p>Fuel Price</p>
                                        <p ><span className="text-sm md:text-lg font-bold">₹{fuelCost.toFixed(0)}</span><span className='pl-5 text-sm text-red-500'>Per Month</span> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ev */}
                        <div className='p-4 border-2  rounded-lg'>
                            <div className='flex justify-between '>
                                <div className='flex gap-4'>
                                    <img src="/electric-truck.svg" alt="" className='w-56 h-40' />
                                    <div>
                                        <h3 className='text-lg font-semibold md:w-[75%] w-full  '>Calculate Fuel Costs – Save More on Every Mile</h3>
                                        <p className='text-red-300 font-semibold pt-3'>Electric</p>
                                    </div>
                                </div>
                                <img src="/electric.png" alt="" className='w-16 h-20' />
                            </div>
                            <div className='pt-10 pl-2 flex gap-4 justify-between'>
                                <div className=" md:w-[60%] w-full">
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

                                    <SliderInput
                                        label="Battery capacity"
                                        value={mileage}
                                        min={1}
                                        max={100}
                                        step={1}
                                        color='bg-blue-700'
                                        onChange={setMileage}
                                    />

                                </div>
                                <div className='bg-[#fff9f6] md:w-[40%] w-full h-60 p-4'>
                                    <div className="pb-8 ">
                                        <p className="pb-1">Fuel Consumption</p>
                                        <p><span className="text-sm md:text-lg font-bold">{fuelConsumption.toFixed(0)} Litres</span><span className='pl-5 text-sm text-blue-700'>Per KM</span></p>
                                    </div>
                                    <div>
                                        <p>Fuel Price</p>
                                        <p ><span className="text-sm md:text-lg font-bold">₹{fuelCost.toFixed(0)}</span><span className='pl-5 text-sm text-red-500'>Per Month</span> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FuelCalculate