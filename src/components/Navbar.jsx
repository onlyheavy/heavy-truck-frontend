import React, { useState, useRef, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useRouter } from 'next/router';
import { BiMenuAltRight } from "react-icons/bi";

const Navbar = () => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [showTruckDropdown, setShowTruckDropdown] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const truckBrands = [
    'Tata', 'Ashok Leyland', 'Mahindra',
    'Eicher', 'BharatBenz', 'Force', 'Piaggio'
  ];

  const popularTrucks = {
    Tata: ['Tata Ace', 'Tata LPT 407', 'Tata Intra V10'],
    'Ashok Leyland': ['Dost+', 'Partner', 'Boss'],
    Mahindra: ['Bolero Pickup', 'Jeeto', 'Furio'],
    Eicher: ['Pro 2049', 'Pro 3015'],
    BharatBenz: ['1015R', '1217C'],
    Force: ['Kargo King', 'Traveller Pickup'],
    Piaggio: ['Ape Xtra LDX', 'Ape Auto DX']
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTruckDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='bg-[#fff9f5] overflow-visible relative'>
      {/* Desktop Navbar */}
      <div className='hidden md:flex justify-between px-12 items-center py-4'>
        <div className='flex items-center gap-12'>
          <img src="/logo.png" alt="logo" className='w-20 cursor-pointer' onClick={() => router.push('/admin/admin-landing')}/>
          <div className="relative">
            <IoSearchOutline size={32} className="absolute right-1.5 top-1 text-hlg font-bold rounded-full bg-orange-500 text-white p-2" />
            <input
              type="text"
              className="border border-[#e3dfdf] w-[600px] bg-white rounded-full pl-5 p-2 focus-visible:outline-none"
              placeholder="Search"
            />
          </div>
        </div>
        <div>
          <button onClick={() => router.push('/admin/admin-landing')} className='border cursor-pointer border-orange-500 text-sm py-2 px-4 text-white font-medium rounded-full bg-orange-500'>
            Login & Sign Up
          </button>
        </div>
      </div>

      <div className='flex md:hidden justify-between items-center px-4 py-3'>
        <img src="./logo.png" alt="logo" className='w-16 cursor-pointer'  />
        <button onClick={() => setShowMobileMenu(true)}>
          <BiMenuAltRight size={30} className='text-orange-500 cursor-pointer'/>
        </button>
      </div>

      <div className='hidden md:flex gap-3 mx-12 border-b pt-4 pb-2 border-gray-200 relative'>
        <button
          className='flex items-center gap-1 cursor-pointer relative'
          onClick={() => setShowTruckDropdown(!showTruckDropdown)}
        >
          New Truck <IoMdArrowDropdown size={23} className='text-orange-500' />
        </button>

        {showTruckDropdown && (
          <div
            ref={dropdownRef}
            className="absolute left-0 top-full shadow-md rounded-lg flex z-50"
          >
            <div className="w-48 bg-white p-4">
              <h4 className="text-sm font-semibold mb-2 text-gray-600">All Brands</h4>
              <ul>
                {truckBrands.map((brand) => (
                  <li
                    key={brand}
                    className={`cursor-pointer p-1 rounded hover:bg-orange-100 ${selectedBrand === brand ? 'font-semibold text-orange-600' : ''}`}
                    onMouseEnter={() => setSelectedBrand(brand)}
                    onClick={() => setSelectedBrand(brand)}
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            </div>

            {selectedBrand && (
              <div className="w-60 bg-white mt-4">
                <h4 className="text-sm font-semibold mb-2 text-gray-600">
                  Popular {selectedBrand} Trucks
                </h4>
                <ul>
                  {popularTrucks[selectedBrand]?.map((truck, index) => (
                    <li key={index} className="cursor-pointer p-1 hover:bg-orange-100 rounded">
                      {truck}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-40 z-40"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-700 ease-in-out ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <span className="font-semibold text-lg">Menu</span>
          <button onClick={() => setShowMobileMenu(false)}>
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="p-4 space-y-4">
          <li className="text-gray-700">New Truck</li>
          <li className="text-gray-700">Used Truck</li>
          <li className="text-gray-700">Compare</li>
          <li className="text-gray-700">Sell Truck</li>
          <li className="text-gray-700">Login & Sign Up</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
