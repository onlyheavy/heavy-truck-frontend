

import React from 'react'

const JcbKeySpecs = () => {
    const specs = [
        {
            title: 'Hydraulic oil',
            value: '60 Ltr',
            icon: 'icons/power.svg'
        },
        {
            title: 'Max. lift capacity',
            value: '1490 Kg',
            icon: 'icons/gvw.svg'
        },
        {
            title: 'Loader Bucket capacity',
            value: '0.6 Cum',
            icon: 'icons/Wheelbase.svg'
        },
        {
            title: 'Max. reach at full height',
            value: '1120 mm',
            icon: 'icons/cc.svg'
        },
        {
            title: 'Max Operating Weight',
            value: '5220 Kg',
            icon: 'icons/petrol.svg'
        },
        {
            title: 'Backhoe Bucket capacity',
            value: '0.18 Cum',
            icon: 'icons/payload.svg'
        },

       
    ]
    return (
        <div className="my-10">
            <h2 className="font-bold text-2xl">Key Specs of JCB 2DX</h2>
            <div className=" flex  gap-5  mt-8 bg-white ">
                {specs.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center gap-3 p-3  cursor-pointer "
                    >
                        <div className="w-20 h-20 flex justify-center items-center bg-white border border-[#FFE8DE] shadow-md shadow-amber-600 rounded-full ">
                            <img
                                src={item?.icon}
                                alt="specs"
                                className="w-10 h-10 object-cover transition-transform duration-100  hover:scale-110"
                            />
                        </div>
                        <p className="font-normal text-[#254154] mt-2 text-sm text-center">{item?.title}</p>
                        <p className="text-sm font-bold text-black text-center">
                            {item?.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JcbKeySpecs