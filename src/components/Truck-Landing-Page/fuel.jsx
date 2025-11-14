import { calculateMonthlyFuelUsage } from "@/utils/fuelCalculator"
import React, { useState } from 'react'
import SliderInput from "../sliderInput";
import { calculateMonthlyElectricUsage } from "@/utils/electricCalculator";
import { useCategory } from '@/hooks/useContext'

const Fuel = () => {
    const { categoryData } = useCategory()
    const product = categoryData?.[0] || {}
    const isElectric = product?.fuelType?.toLowerCase?.().includes('electric')
    const [fuelPrice, setfuelPrice] = useState(5);
    const [kiloMeter, setkiloMeter] = useState(50);
    const [electricPrice, setElectricPrice] = useState(7)
    const [elckiloMeter, setElckiloMeter] = useState(50)
    const [fullCharge, setFullCharge] = useState(120)
    const [batteryCapacity, setBatteryCapacity] = useState(32)
    const [mileage, setMileage] = useState(1);

    const { fuelConsumption, fuelCost } = calculateMonthlyFuelUsage(
        fuelPrice,
        kiloMeter,
        mileage
    );

    const { costPerKm, avgMonthlyRunningCost } = calculateMonthlyElectricUsage(
        electricPrice,
        elckiloMeter,
        fullCharge,
        batteryCapacity
    )

    return (
        <>
            {!isElectric && (
                <div className="mt-10">
                    <h2 className="font-bold md:text-[24px] text-[18px] md:pb-8 pb-4">Calculate your Monthly Fuel Cost</h2>
                    <div className="md:flex block gap-16 items-center border border-gray-300 rounded-md md:p-10 p-4 md:mb-5 mb-2">
                        <div className=" md:w-[48%] w-full">
                            <SliderInput
                                label="Fuel price in your city"
                                value={fuelPrice}
                                min={5}
                                max={150}
                                step={1}
                                color='bg-orange-500'
                                onChange={setfuelPrice}
                            />
                            <SliderInput
                                label="Average KM driven per day"
                                value={kiloMeter}
                                min={50}
                                max={20000}
                                step={50}
                                color='bg-orange-500'
                                onChange={setkiloMeter}
                            />
                            <SliderInput
                                label="Average mileage per litre"
                                value={mileage}
                                min={1}
                                max={100}
                                step={1}
                                color='bg-orange-500'
                                onChange={setMileage}
                            />

                            <p className="pt-3 text-[16px]">The calculations provide an estimated amount, but actual figures may vary depending on local fuel prices, electricity rates, and other factors</p>
                        </div>
                        <div className="rounded-lg flex p-10 md:py-12 py-6 justify-between bg-[#fffcdf] md:w-[53%] w-full md:my-12 my-6">
                            <div>
                                <div className="pb-12 pt-4">
                                    <p className="">Fuel Consumption</p>
                                    <p><span className="text-sm md:text-xl font-bold">{fuelConsumption.toFixed(0)} Litres</span> Per Month</p>
                                </div>
                                <div>
                                    <p>Fuel Price</p>
                                    <p ><span className="text-sm md:text-xl font-bold">₹{fuelCost.toFixed(0)}</span> Per Month</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <img src="/fuel.png" alt="" className=" w-20 md:w-36" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isElectric && (
                <div className="mt-10">
                    <h2 className="font-bold md:text-[24px] text-[18px] md:pb-8 pb-4">Calculate your Monthly Electric Cost</h2>
                    <div className="md:flex block gap-16 items-center border border-gray-300 rounded-md md:p-10 p-4 md:mb-5 mb-2">
                        <div className=" md:w-[48%] w-full">
                            <SliderInput
                                label="Electricity Price in your city per unit"
                                value={electricPrice}
                                min={2}
                                max={50}
                                step={1}
                                color='bg-orange-500'
                                onChange={setElectricPrice}
                            />
                            <SliderInput
                                label="Average KM driven per day"
                                value={elckiloMeter}
                                min={10}
                                max={1000}
                                step={10}
                                color='bg-orange-500'
                                onChange={setElckiloMeter}
                            />
                            <SliderInput
                                label="Range On Full Charge"
                                value={fullCharge}
                                min={50}
                                max={400}
                                step={5}
                                color='bg-orange-500'
                                onChange={setFullCharge}
                            />
                            <SliderInput
                                label="Battery capacity"
                                value={batteryCapacity}
                                min={20}
                                max={600}
                                step={5}
                                color='bg-orange-500'
                                onChange={setBatteryCapacity}
                            />

                            <p className="pt-3 text-[16px]">The calculations provide an estimated amount, but actual figures may vary depending on local fuel prices, electricity rates, and other factors</p>
                        </div>
                        <div className="rounded-lg flex p-10 md:py-12 py-6 justify-between bg-[#fffcdf] md:w-[53%] w-full md:my-12 my-6">
                            <div>
                                <div className="pb-12 pt-4">
                                    <p className="">EV Running Cost</p>
                                    <p><span className="text-sm md:text-xl font-bold">₹{costPerKm.toFixed(0)}</span> Per KM</p>
                                </div>
                                <div>
                                    <p>Average Running Cost</p>
                                    <p ><span className="text-sm md:text-xl font-bold">₹{avgMonthlyRunningCost.toFixed(0)}</span> Per Month</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <img src="/ev.png" alt="" className=" w-20 md:w-36" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Fuel