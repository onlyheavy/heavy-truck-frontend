import { calculateMonthlyFuelUsage } from "@/utils/fuelCalculator"
import React, { useState } from 'react'
import SliderInput from "../sliderInput";

const JcbFuel = () => {
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
            <h2 className="font-bold text-2xl pb-8">Calculate your Monthly Fuel Cost</h2>
            <div className="flex gap-16 items-center border border-gray-300 rounded-md p-10 mb-5">
                <div className="w-[48%] ">
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

                    <p className="pt-3 text-[16px]">The calculations show an estimated amount and the real numbers might vary as per local fuel prices, electricity costs and other factors</p>
                </div>
                <div className="rounded-lg flex p-10 py-12 justify-between bg-[#fffcdf] w-[53%] my-12">
                    <div>
                        <div className="pb-16">
                            <p className="">Fuel Consumption</p>
                            <p><span className="text-xl font-bold">{fuelConsumption.toFixed(0)} Liters</span> Per Month</p>
                        </div>
                        <div>
                            <p>Fuel Consumption</p>
                            <p ><span className="text-xl font-bold">₹{fuelCost.toFixed(0)} Liters</span> Per Month</p>
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

export default JcbFuel