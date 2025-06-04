import React from 'react'

const JcbProsAndCons = () => {
    const pros = [
        'hydroformed chassis frame',
        'eco made and gear shift advisor',
        'Advanced Features Fast Mobile Charger and Sliding Window',
        'High Ground Clearance and High Payload Capacity',
        'Hydraulic Twin Pot Disc Brake',
    ]

    const cons = [
        'No Adjustable Driver Seat',
        'Basic Customization Options',
        'Basic Interior',
    ]

    const uses = [
        'Industrial Goods Transportation',
        'Fruits and Vegetables',
        'Construction Material',
    ]

    return (
        <div className='flex flex-col gap-5'>
            <div className='w-full bg-white  rounded-md p-5 border border-gray-300 my-5'>
                <div className='flex flex-col gap-3'>
                    <h2 className='font-bold text-2xl capitalize'>JCB 2DX Pros & Cons</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 '>
                    <div className='bg-[#EEFFEB] p-5 rounded-md mt-5'>
                        <div className='flex items-center gap-2 mb-5'>
                            <img src="/icons/like.svg" alt="like" />
                            <p className='font-bold text-base'>Pros</p>
                        </div>
                        {
                            pros.map((item, index) => (
                                <div key={index} className='flex items-center gap-2 my-2'>
                                    <li className='text-sm capitalize font-normal'>{item}</li>
                                </div>
                            ))
                        }
                    </div>
                    <div className='bg-[#FFFBDD] p-5 rounded-md mt-5'>
                        <div className='flex items-center gap-2 mb-5'>
                            <img src="/icons/dislike.svg" alt="like" />
                            <p className='font-bold text-base'>cons</p>
                        </div>
                        {
                            cons.map((item, index) => (
                                <div key={index} className='flex items-center gap-2 my-2'>
                                    <li className='text-sm capitalize font-normal'>{item}</li>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* brochure */}

            <div className='flex gap-3 bg-[#FFE8DE] p-5 pb-0 rounded-md'>
                <div className='flex flex-col gap-3'>
                    <h2 className='font-bold text-2xl capitalize'>Download Tata 1412 LPT Brochure</h2>
                    <p className='text-base font-normal text-gray-700 w-[80%]'>Download Tata 1412 LPT brochure online. Check out the 1412 LPT PDF brochure at Truck Junction with all features and specifications.</p>
                    <button className='bg-[#FA7436] w-fit text-white px-4 py-3 mt-3 text-xs rounded-md font-bold'>Download Brochure</button>

                </div>
                <div>
                    <img src="/images/brochure.svg" alt="brochure" />
                </div>
            </div>

           





        </div>
    )
}

export default JcbProsAndCons