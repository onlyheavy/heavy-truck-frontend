import React, { useState, useRef, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useRouter } from 'next/router';
import { BiMenuAltRight } from "react-icons/bi";

const BackHoeNavbar = () => {
  const router = useRouter();
  const backhoeDropdownRef = useRef(null);
  const excavatorDropdownRef = useRef(null);
  const telehandlerDropdownRef = useRef(null);
  const [showBackhoeDropdown, setShowBackhoeDropdown] = useState(false);
  const [showExcavatorDropdown, setShowExcavatorDropdown] = useState(false);
  const [showTelehandlerDropdown, setShowTelehandlerDropdown] = useState(false);
  const [selectedBackhoeBrand, setSelectedBackhoeBrand] = useState(null);
  const [selectedExcavatorBrand, setSelectedExcavatorBrand] = useState(null);
  const [selectedTelehandlerBrand, setSelectedTelehandlerBrand] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const backhoeBrands = [
    'JCB', 'Caterpillar', 'Komatsu',
    'Volvo', 'Case', 'Hyundai', 'Kobelco'
  ];

  const popularBackhoes = {
    JCB: ['JCB 3DX', 'JCB 4DX', 'JCB 5DX', 'JCB 3DX Super'],
    Caterpillar: ['Cat 416F', 'Cat 420F', 'Cat 430F', 'Cat 432F'],
    Komatsu: ['WB93R-5', 'WB97R-5', 'WB140R-5', 'WB156R-5'],
    Volvo: ['EC140E', 'EC210E', 'EC240E', 'EC300E'],
    Case: ['580N', '590SN', '695ST', '770N'],
    Hyundai: ['R140LC-9S', 'R210LC-9S', 'R250LC-9S'],
    Kobelco: ['SK140LC', 'SK210LC', 'SK250LC', 'SK350LC']
  };

  const excavatorBrands = [
    'JCB', 'Caterpillar', 'Komatsu',
    'Volvo', 'Hitachi', 'Liebherr', 'Doosan'
  ];

  const popularExcavators = {
    JCB: ['JCB 220LC', 'JCB 225LC', 'JCB 240LC', 'JCB 260LC'],
    Caterpillar: ['Cat 320', 'Cat 325', 'Cat 330', 'Cat 336'],
    Komatsu: ['PC200-8', 'PC220-8', 'PC300-8', 'PC350-8'],
    Volvo: ['EC200D', 'EC210D', 'EC240D', 'EC290D'],
    Hitachi: ['ZX200-5A', 'ZX210LC-5A', 'ZX240LC-5A'],
    Liebherr: ['R 914', 'R 924', 'R 934', 'R 944'],
    Doosan: ['DX140LC-5', 'DX180LC-5', 'DX225LC-5']
  };

  const telehandlerBrands = [
    'JCB', 'Manitou', 'Genie',
    'Skyjack', 'Merlo', 'JLG', 'Haulotte'
  ];

  const popularTelehandlers = {
    JCB: ['JCB 540-170', 'JCB 540-200', 'JCB 541-70'],
    Manitou: ['MT 1335', 'MT 1440', 'MT 1740'],
    Genie: ['GTH-1056', 'GTH-1255', 'GTH-2046'],
    Skyjack: ['SJ9250 RT', 'SJ10500 RT', 'SJ12500 RT'],
    Merlo: ['P38.7', 'P40.7', 'P45.7'],
    JLG: ['G12-55A', 'G15-55A', 'G20-55A'],
    Haulotte: ['HA16 RT', 'HA20 RT', 'HA25 RT']
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (backhoeDropdownRef.current && !backhoeDropdownRef.current.contains(event.target)) {
        setShowBackhoeDropdown(false);
      }
      if (excavatorDropdownRef.current && !excavatorDropdownRef.current.contains(event.target)) {
        setShowExcavatorDropdown(false);
      }
      if (telehandlerDropdownRef.current && !telehandlerDropdownRef.current.contains(event.target)) {
        setShowTelehandlerDropdown(false);
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
          onClick={() => {
            setShowBackhoeDropdown(!showBackhoeDropdown);
            setShowExcavatorDropdown(false);
            setShowTelehandlerDropdown(false);
          }}
        >
          Backhoe Loader <IoMdArrowDropdown size={18} className="ml-1" />
        </button>
        <button
          className="flex items-center hover:text-orange-500"
          onClick={() => {
            setShowExcavatorDropdown(!showExcavatorDropdown);
            setShowBackhoeDropdown(false);
            setShowTelehandlerDropdown(false);
          }}
        >
          Excavator <IoMdArrowDropdown size={18} className="ml-1" />
        </button>
        <button
          className="flex items-center hover:text-orange-500"
          onClick={() => {
            setShowTelehandlerDropdown(!showTelehandlerDropdown);
            setShowBackhoeDropdown(false);
            setShowExcavatorDropdown(false);
          }}
        >
          Telehandler <IoMdArrowDropdown size={18} className="ml-1" />
        </button>
        <button className="hover:text-orange-500 cursor-pointer" onClick={() => router.push(`/compare`)}>Fuel Cost Calculator</button>
        <button className="hover:text-orange-500 cursor-pointer" onClick={() => router.push(`/emi-calculator`)}>EMI Calculator</button>
        <button className="hover:text-orange-500">Electric Backhoe</button>
      </div>

      {/* Backhoe Loader Dropdown Content */}
      {showBackhoeDropdown && (
        <div
          ref={backhoeDropdownRef}
          className="absolute left-10 top-[120px] shadow-md rounded-lg flex z-50 bg-white"
        >
          <div className="w-48 p-4 border-r">
            <h4 className="text-sm font-semibold mb-2 text-gray-600">All Brands</h4>
            <ul>
              {backhoeBrands.map((brand) => (
                <li
                  key={brand}
                  className={`cursor-pointer p-1 rounded text-black hover:bg-orange-100 ${selectedBackhoeBrand === brand ? "font-semibold text-orange-600" : ""
                    }`}
                  onMouseEnter={() => setSelectedBackhoeBrand(brand)}
                  onClick={() => setSelectedBackhoeBrand(brand)}
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>

          {selectedBackhoeBrand && (
            <div className="w-60 p-4">
              <h4 className="text-sm font-semibold mb-2 text-gray-600">
                Popular {selectedBackhoeBrand} Backhoe Loaders
              </h4>
              <ul>
                {popularBackhoes[selectedBackhoeBrand]?.map((backhoe, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-1 text-black hover:bg-orange-100 rounded"
                  >
                    {backhoe}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Excavator Dropdown Content */}
      {showExcavatorDropdown && (
        <div
          ref={excavatorDropdownRef}
          className="absolute left-10 top-[120px] shadow-md rounded-lg flex z-50 bg-white"
        >
          <div className="w-48 p-4 border-r">
            <h4 className="text-sm font-semibold mb-2 text-gray-600">All Brands</h4>
            <ul>
              {excavatorBrands.map((brand) => (
                <li
                  key={brand}
                  className={`cursor-pointer p-1 rounded text-black hover:bg-orange-100 ${selectedExcavatorBrand === brand ? "font-semibold text-orange-600" : ""
                    }`}
                  onMouseEnter={() => setSelectedExcavatorBrand(brand)}
                  onClick={() => setSelectedExcavatorBrand(brand)}
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>

          {selectedExcavatorBrand && (
            <div className="w-60 p-4">
              <h4 className="text-sm font-semibold mb-2 text-gray-600">
                Popular {selectedExcavatorBrand} Excavators
              </h4>
              <ul>
                {popularExcavators[selectedExcavatorBrand]?.map((excavator, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-1 text-black hover:bg-orange-100 rounded"
                  >
                    {excavator}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Telehandler Dropdown Content */}
      {showTelehandlerDropdown && (
        <div
          ref={telehandlerDropdownRef}
          className="absolute left-10 top-[120px] shadow-md rounded-lg flex z-50 bg-white"
        >
          <div className="w-48 p-4 border-r">
            <h4 className="text-sm font-semibold mb-2 text-gray-600">All Brands</h4>
            <ul>
              {telehandlerBrands.map((brand) => (
                <li
                  key={brand}
                  className={`cursor-pointer p-1 rounded text-black hover:bg-orange-100 ${selectedTelehandlerBrand === brand ? "font-semibold text-orange-600" : ""
                    }`}
                  onMouseEnter={() => setSelectedTelehandlerBrand(brand)}
                  onClick={() => setSelectedTelehandlerBrand(brand)}
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>

          {selectedTelehandlerBrand && (
            <div className="w-60 p-4">
              <h4 className="text-sm font-semibold mb-2 text-gray-600">
                Popular {selectedTelehandlerBrand} Telehandlers
              </h4>
              <ul>
                {popularTelehandlers[selectedTelehandlerBrand]?.map((telehandler, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-1 text-black hover:bg-orange-100 rounded"
                  >
                    {telehandler}
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
          <li className="text-gray-700">Backhoe Loader</li>
          <li className="text-gray-700">Excavator</li>
          <li className="text-gray-700">Telehandler</li>
          <li className="text-gray-700">Fuel Cost Calculator</li>
          <li className="text-gray-700">EMI Calculator</li>
          <li className="text-gray-700">Electric Backhoe</li>
          <li className="text-gray-700">Login & Sign Up</li>
        </ul>
      </div>
    </div>
  );
};

export default BackHoeNavbar;
