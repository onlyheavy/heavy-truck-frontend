import React from 'react'

const TruckStats = () => {
  return (
    <div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div className="bg-[#FFE5d9] text-orange-500 p-4 rounded-md font-semibold flex flex-col">Today Onboarded Trucks
          <span className='text-2xl font-bold'>150</span></div>
        <div className="bg-[#FFE5d9] text-orange-500 p-4 rounded-md font-semibold flex flex-col">Verified Trucks
          <span className='text-2xl font-bold'>50</span></div>
        <div className="bg-[#FFE5d9] text-orange-500 p-4 rounded-md font-semibold flex flex-col">Total Trucks
          <span className='text-2xl font-bold'>120</span></div>
        <div className="bg-[#FFE5d9] text-orange-500 p-4 rounded-md font-semibold flex flex-col">Static Listings
          <span className='text-2xl font-bold'>100</span></div>
       
      </div>
    </div>
  )
}

export default TruckStats