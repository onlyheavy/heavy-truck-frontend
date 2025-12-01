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
    <div className="bg-white border-b border-gray-200 relative">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between px-10 items-center py-4">
        {/* Logo + Search */}
        <div className="flex items-center gap-12">
          <img
            src="/logo.svg"
            alt="logo"
            className="w-28 cursor-pointer"
            onClick={() => router.push('/')}
          />

          {/* Search Bar */}
          <div className="relative w-[600px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-12 text-gray-700 focus:outline-none"
            />
            <IoSearchOutline
              size={22}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Language Dropdown (static for now) */}
          {/* <button className="flex items-center text-gray-600 hover:text-gray-800">
            English <IoMdArrowDropdown size={20} className="ml-1" />
          </button> */}

          {/* Login Button */}
          <button
            onClick={() => router.push('https://admin.onlyheavy.com/')}
            className="bg-orange-500 text-white px-6 py-2 cursor-pointer rounded-md font-medium hover:bg-orange-600 transition"
          >
            Login & Sign Up
          </button>
        </div>
      </div>

      {/* Desktop Bottom Nav */}
      <div className="hidden md:flex gap-8 px-10 py-2 text-gray-700 text-sm border-t">
        <button
          className="flex items-center hover:text-orange-500"
          onClick={() => setShowTruckDropdown(!showTruckDropdown)}
        >
          New Truck <IoMdArrowDropdown size={18} className="ml-1" />
        </button>
        <button className="flex items-center hover:text-orange-500">
          Used Truck <IoMdArrowDropdown size={18} className="ml-1" />
        </button>
        <button className="hover:text-orange-500 cursor-pointer" onClick={() => router.push(`/compare`)}>Fuel Cost Calculator</button>
        <button className="hover:text-orange-500 cursor-pointer" onClick={() => router.push(`/emi-calculator`)}>EMI Calculator</button>
        <button className="hover:text-orange-500">Electric Truck</button>
      </div>

      {/* Dropdown Content */}
      {showTruckDropdown && (
        <div
          ref={dropdownRef}
          className="absolute left-10 top-[120px] shadow-md rounded-lg flex z-50 bg-white"
        >
          <div className="w-48 p-4 border-r">
            <h4 className="text-sm font-semibold mb-2 text-gray-600">All Brands</h4>
            <ul>
              {truckBrands.map((brand) => (
                <li
                  key={brand}
                  className={`cursor-pointer p-1 rounded text-black hover:bg-orange-100 ${selectedBrand === brand ? "font-semibold text-orange-600" : ""
                    }`}
                  onMouseEnter={() => setSelectedBrand(brand)}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>

          {selectedBrand && (
            <div className="w-60 p-4">
              <h4 className="text-sm font-semibold mb-2 text-gray-600">
                Popular {selectedBrand} Trucks
              </h4>
              <ul>
                {popularTrucks[selectedBrand]?.map((truck, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-1 text-black hover:bg-orange-100 rounded"
                  >
                    {truck}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Mobile Topbar */}
      <div className="flex md:hidden justify-between items-center px-4 py-3 border-b">
        <img src="/logo.svg" alt="logo" className="w-20 cursor-pointer" />
        <button onClick={() => setShowMobileMenu(true)}>
          <BiMenuAltRight size={30} className="text-orange-500 cursor-pointer" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-40 z-40"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-500 ease-in-out ${showMobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <span className="font-semibold text-lg">Menu</span>
          <button onClick={() => setShowMobileMenu(false)}>
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="p-4 space-y-4">
          <li className="text-gray-700">New Truck</li>
          <li className="text-gray-700">Used Truck</li>
          <li className="text-gray-700">Fuel Cost Calculator</li>
          <li className="text-gray-700">EMI Calculator</li>
          <li className="text-gray-700">Electric Truck</li>
          <li className="text-gray-700">Login & Sign Up</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
