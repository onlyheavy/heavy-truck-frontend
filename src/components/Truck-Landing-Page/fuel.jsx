import { calculateMonthlyFuelUsage } from "@/utils/fuelCalculator"
import React, { useState } from 'react'
import SliderInput from "../sliderInput";

const Fuel = () => {
    const [fuelPrice, setfuelPrice] = useState(5);
    const [kiloMeter, setkiloMeter] = useState(50);
    const [mileage, setMileage] = useState(5);
    console.log(fuelPrice, kiloMeter, mileage)
    const { fuelConsumption, fuelCost } = calculateMonthlyFuelUsage(
        fuelPrice,
        kiloMeter,
        mileage
    );

    return (
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
                        onChange={setfuelPrice}
                    />
                    <SliderInput
                        label="Average KM driven per day"
                        value={kiloMeter}
                        min={50}
                        max={20000}
                        step={50}
                        onChange={setkiloMeter}
                    />
                    <SliderInput
                        label="Average mileage per litre"
                        value={mileage}
                        min={5}
                        max={100}
                        step={1}
                        onChange={setMileage}
                    />

                    <p className="pt-3 text-[16px]">The calculations provide an estimated amount, but actual figures may vary depending on local fuel prices, electricity rates, and other factors</p>
                </div>
                <div className="rounded-lg flex p-10 md:py-12 py-6 justify-between bg-[#fffcdf] md:w-[53%] w-full md:my-12 my-6">
                    <div>
                        <div className="pb-16">
                            <p className="">Fuel Consumption</p>
                            <p><span className="text-sm md:text-xl font-bold">{fuelConsumption.toFixed(0)} Liters</span> Per Month</p>
                        </div>
                        <div>
                            <p>Fuel Consumption</p>
                            <p ><span className="text-sm md:text-xl font-bold">₹{fuelCost.toFixed(0)} Liters</span> Per Month</p>
                        </div>
                    </div>
                    <div>
                        <img src="/fuel.png" alt="" className="w-36" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fuel