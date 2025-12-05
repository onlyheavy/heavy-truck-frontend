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

  // Mobile dropdown states
  const [showTruckDropdownMobile, setShowTruckDropdownMobile] = useState(false);
  const [showUsedDropdown, setShowUsedDropdown] = useState(false);
  // const [showElectricDropdown, setShowElectricDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);

  const truckBrands = [
    'Ashok Leyland',
    'BharatBenz',
    'Eicher',
    'Force Motors',
    'Mahindra',
    'Tata motors',
  ];

  const handleBrandClick = () => {
    router.push("/#brand-list");
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

        <div className="flex items-center gap-6">
          <button
            onClick={() => router.push('https://admin.onlyheavy.com/')}
            className="bg-orange-500 text-white px-6 py-2 rounded-md font-medium hover:bg-orange-600 transition"
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
        <button className="hover:text-orange-500">Electric Truck</button>
        <button
          className="hover:text-orange-500 cursor-pointer"
          onClick={() => router.push(`/compare/trucks`)}
        >
          Compare Trucks
        </button>
        <button
          className="hover:text-orange-500 cursor-pointer"
          onClick={() => router.push(`/trucks/fuel-calculator`)}
        >
          Fuel Cost Calculator
        </button>
        <button
          className="hover:text-orange-500 cursor-pointer"
          onClick={() => router.push(`/trucks/emi-calculator`)}
        >
          EMI Calculator
        </button>
        <button
          className="hover:text-orange-500 cursor-pointer"
          onClick={() => router.push(`/trucks/brochure`)}
        >
          Trucks Brochure
        </button>
      </div>

      {/* Dropdown Content (Desktop) */}
      {showTruckDropdown && (
        <div
          ref={dropdownRef}
          className="absolute left-10 top-[120px] shadow-md rounded-lg flex z-50 bg-white"
        >
          <div className="w-48 p-4 border-r">
            <ul>
              {truckBrands.map((brand) => (
                <li
                  key={brand}
                  className={`cursor-pointer p-1 rounded hover:bg-orange-100 ${selectedBrand === brand ? "font-semibold text-orange-600" : ""
                    }`}
                  onMouseEnter={() => setSelectedBrand(brand)}
                  onClick={() =>
                    router.push(`/trucks/brand/${brand.toLowerCase().replace(/\s+/g, '-')}`)
                  }
                >
                  {brand}
                </li>
              ))}
              <li
                className="cursor-pointer p-1 rounded hover:bg-orange-100 font-semibold"
                onClick={() => handleBrandClick()}
              >
                All Brands
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Mobile Navbar */}
      <div className="flex md:hidden justify-between items-center px-4 py-3 border-b">
        <img src="/logo.svg" alt="logo" className="w-20 cursor-pointer" />
        <button onClick={() => setShowMobileMenu(true)}>
          <BiMenuAltRight size={30} className="text-orange-500 cursor-pointer" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-500 ${showMobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <span className="font-semibold text-lg"><img src="/logo.svg" alt="" className='w-20' /></span>
          <button onClick={() => setShowMobileMenu(false)}>
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="p-4 space-y-3">

          {/* New Truck */}
          <li>
            <button
              onClick={() => setShowTruckDropdownMobile(prev => !prev)}
              className="flex justify-between w-full text-gray-800"
            >
              New Truck
              <IoMdArrowDropdown className={`${showTruckDropdownMobile ? "rotate-180" : ""} transition`} />
            </button>

            {showTruckDropdownMobile && (
              <ul className="ml-4 mt-2 space-y-2 text-gray-600">
                {truckBrands.map((brand) => (
                  <li
                    key={brand}
                    className="cursor-pointer hover:text-orange-500"
                    onClick={() =>
                      router.push(`/trucks/brand/${brand.toLowerCase().replace(/\s+/g, '-')}`)
                    }
                  >
                    {brand}
                  </li>
                ))}
                <li
                  className="font-semibold text-orange-600 cursor-pointer transition"
                  onClick={() => router.push("/#brand-list")}
                >
                  All Brands
                </li>
              </ul>
            )}
          </li>

          {/* Used Truck */}
          <li>
            <button
              onClick={() => setShowUsedDropdown(prev => !prev)}
              className="flex justify-between w-full text-gray-800"
            >
              Used Truck
              <IoMdArrowDropdown className={`${showUsedDropdown ? "rotate-180" : ""} transition`} />
            </button>

            {showUsedDropdown && (
              <ul className="ml-4 mt-2 space-y-2 text-gray-600">
                <li className="cursor-pointer hover:text-orange-500">Selling Trucks</li>
                <li className="cursor-pointer hover:text-orange-500">Buying Trucks</li>
              </ul>
            )}
          </li>

          {/* Electric Truck */}
          {/* <li> */}
          <button
            // onClick={() => setShowElectricDropdown(prev => !prev)}
            className="flex justify-between w-full text-gray-800"
          >
            Electric Truck
            {/* <IoMdArrowDropdown className={`${showElectricDropdown ? "rotate-180" : ""} transition`} /> */}
          </button>

          {/* {showElectricDropdown && (
              <ul className="ml-4 mt-2 space-y-2 text-gray-600">
                <li className="cursor-pointer hover:text-orange-500">Electric Mini Trucks</li>
                <li className="cursor-pointer hover:text-orange-500">Electric Cargo Vans</li>
                <li className="cursor-pointer hover:text-orange-500">Electric Heavy Trucks</li>
              </ul>
            )}
          </li> */}

          {/* More */}
          <li>
            <button
              onClick={() => setShowMoreDropdown(prev => !prev)}
              className="flex justify-between w-full text-gray-800"
            >
              More
              <IoMdArrowDropdown className={`${showMoreDropdown ? "rotate-180" : ""} transition`} />
            </button>

            {showMoreDropdown && (
              <ul className="ml-4 mt-2 space-y-2 text-gray-700">
                <li onClick={() => router.push(`/compare/trucks`)} className="cursor-pointer hover:text-orange-500">Compare Trucks</li>
                <li onClick={() => router.push(`/trucks/fuel-calculator`)} className="cursor-pointer hover:text-orange-500">Fuel Cost Calculator</li>
                <li onClick={() => router.push(`/trucks/emi-calculator`)} className="cursor-pointer hover:text-orange-500">EMI Calculator</li>
                <li onClick={() => router.push(`/trucks/brochure`)} className="cursor-pointer hover:text-orange-500">Trucks Brochure</li>
              </ul>
            )}
          </li>

          {/* Login */}
          <li
            onClick={() => router.push("https://admin.onlyheavy.com/")}
            className="text-gray-800 font-semibold cursor-pointer hover:text-orange-600"
          >
            Login & Sign Up
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
