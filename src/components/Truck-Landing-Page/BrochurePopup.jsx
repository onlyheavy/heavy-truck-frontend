// components/BrochurePopup.jsx
import React from "react";

const BrochurePopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full relative flex flex-col md:flex-row gap-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-[30px] font-bold"
        >
          &times;
        </button>

        {/* Left Section */}
        <div className="flex-1">
               <img
            src="/images/starvector.svg"
            alt="Truck"
            className="rounded-lg object-cover w-[20px] mb-4"
          />
          <h2 className="text-lg md:text-xl font-bold mb-4">
            Fill the form below to Download the latest brochure in PDF
          </h2>
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Enter Name"
              className="border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="tel"
              placeholder="Enter Number"
              className="border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="text"
              placeholder="Enter Your City Name"
              className="border border-gray-300 rounded-md px-4 py-2"
            />
            <button
              type="submit"
              className="bg-[#FA7436] text-white py-2 rounded-md mt-2"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 hidden md:block">
          <img
            src="/images/vehicle.webp"
            alt="Truck"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BrochurePopup;
