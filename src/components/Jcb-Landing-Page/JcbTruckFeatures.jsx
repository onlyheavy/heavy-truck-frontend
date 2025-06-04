// import React from 'react'

// const TruckFeatures = () => {
//     const features = [
//         {
//             title:'Engine',
//             value:'2000 KG'
//         },
//         {
//             title:'fuel type',
//             value:'diesel'
//         },
//         {
//             title:'no of tyres',
//             value:'4'
//         },
//         {
//             title:'fuel tank ',
//             value:'52 Ltr'
//         },
//         {
//             title:'GVW',
//             value:'2000 KG'
//         },
//         {
//             title:'seat belts',
//             value:'yes'
//         },
//         {
//             title:'max torque',
//             value:'250'
//         },
//         {
//             title:'max speed',
//             value:'80'
//         },
//         {
//             title:'payload capacity',
//             value:'2000 KG'
//         },
//         {
//             title:'air condition',
//             value:'yes'
//         },
//     ]
//     return (
//         <div className='mt-10 flex flex-col gap-3'>
//             <div className='w-full bg-white  rounded-md p-5 border border-gray-300 my-5'>
//                 <div className='flex flex-col gap-3'>
//                     <h2 className='font-bold text-2xl'>About Tata Yodha 2.0 Pickup Truck</h2>
//                     <p className='text-base '>Tata Intra V70 is a pickup truck manufactured by Tata, which is known for its best-in-class vehicles. It belongs to the pickup truck category of commercial vehicles. Therefore, the Tata Intra V70 offers exceptional performance, durability and versatility. Tata Intra V70 is best for easy carrying of different materials, including milk cans, cement bags, food grains, marble granites, fruits, and vegetable crates. If you are looking for a rugged, tough, and efficient transport solution for your business, the Tata Intra V70 is an ideal choice. This SCV is best suited for intercity and intracity operations. <span className='text-orange-500 font-bold cursor-pointer'>Read More</span></p>
//                 </div>
//             </div>


//             <div className='w-full bg-white  rounded-md p-5 border border-gray-300 my-5'>
//                 <div className='flex flex-col gap-3'>
//                     <h2 className='font-bold text-2xl'>Tata Yodha 2.0 Features</h2>
//                     <div className='grid grid-cols-4 gap-3 mt-3 '>
//                         {
//                             features.map((feature, index) => (
//                                 <div key={index} className='flex gap-3 border cursor-pointer hover:bg-orange-600 hover:text-white duration-300 transition-all  rounded-md border-orange-500 p-3'>
//                                     <p className='text-sm  font-bold capitalize'>{feature.title} </p>
//                                     <p className='text-sm capitalize    '> <span className='mr-3'>-</span> {feature.value}</p>
//                                 </div>
//                             ))
//                         }
//                     </div>
//                     <p className='text-[#FA7436] font-semibold text-xs cursor-pointer'>View all tata yodha 2.0 spec &rarr;</p>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default TruckFeatures

import React from 'react';

const JcbTruckFeatures = () => {
    const features = [
        { title: 'Engine', value: '2000 KG' },
        { title: 'Fuel Type', value: 'Diesel' },
        { title: 'No of Tyres', value: '4' },
        { title: 'Fuel Tank', value: '52 Ltr' },
        { title: 'GVW', value: '2000 KG' },
        { title: 'Seat Belts', value: 'Yes' },
        { title: 'Max Torque', value: '250 Nm' },
        { title: 'Max Speed', value: '80 KM/H' },
        { title: 'Payload Capacity', value: '2000 KG' },
        { title: 'Air Condition', value: 'Yes' },
    ];

    return (
        <div className="mt-12 mb-10">
            {/* About Section */}
            <div className="w-full bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
                <h2 className="font-bold text-3xl text-gray-800 mb-4">
                    About JCB 2DX Backhoe Loader Overview
                </h2>
                <p className="text-gray-600 leading-relaxed text-base">
                    JCB 2DX is designed with segment best specification, which helps in providing better work efficiency. The Backhoe Loader model from JCB is one the best Construction machines in heavy loading work. The 2DX Backhoe Loader is well-known for its adaptability and performance, having established itself as an effective machine on construction projects. It can accomplish a wide range of tasks with ease and effectiveness. Its engine design prioritizes fuel efficiency without compromising power, ensuring peak productivity. Simultaneously, it reduces operational costs.
                    <span className="text-orange-600 font-semibold ml-2 cursor-pointer hover:underline">
                        Read More
                    </span>
                </p>
            </div>

            {/* Features Section */}
            <div className="w-full bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="font-bold text-3xl text-gray-800 mb-6">
                    JCB 2DX Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-orange-50 border border-orange-400 text-orange-700 rounded-lg px-4 py-3 hover:bg-orange-600 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                            <p className="font-medium capitalize text-sm">{feature.title}</p>
                            <span className="text-sm font-semibold">{feature.value}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-5 text-right">
                    <button className="text-sm font-semibold text-orange-600 hover:underline">
                        View all Tata Yodha 2.0 specs →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JcbTruckFeatures;


