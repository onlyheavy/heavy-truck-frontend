import React from 'react'
import { FiPhoneCall } from "react-icons/fi";
import BrochurePopup from './BrochurePopup';
import { useState } from 'react';

function TalkDelar() {
    const [showPopup, setShowPopup] = useState(false);
    return (
        <div className='flex gap-3 bg-[#FFE8DE] p-8 pb-6 rounded-md '>
            <div className='flex flex-col gap-3'>
                <h2 className='font-bold md:text-[24px] text-lg capitalize'>Talk to Dealer</h2>
                <p className='text-sm md:text-base font-normal text-gray-700 w-[80%]'>Find nearest dealer in your area with us and fulfil your dreams by buying the best
                    Truck matching your needs.</p>
                <div className="flex justify-center md:justify-start items-center">
                    <button onClick={() => setShowPopup(true)} className="bg-[#FA7436] w-fit text-white px-6 py-4 mt-3 text-sm rounded-md font-bold flex items-center gap-2">
                        <FiPhoneCall className="text-lg" />
                        <span>Connect Now</span>
                    </button>
                </div>
                {showPopup && <BrochurePopup onClose={() => setShowPopup(false)} />}
            </div>
        </div>
    )
}

export default TalkDelar



