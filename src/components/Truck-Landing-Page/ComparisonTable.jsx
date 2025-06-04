import { useState, useEffect, useRef } from 'react';

const ComparisonCard = ({ vehicleImage, vehicleName, price }) => (
  <div className="flex-1">
    <div className="flex flex-col items-center">
      <img
        src={vehicleImage}
        alt={vehicleName}
        className="w-full max-w-[300px] h-auto mb-4"
      />
      <h3 className="font-semibold text-[18px] text-[#254154] mb-2">{vehicleName}</h3>
      <p className="text-[16px] font-bold text-[#254154] mb-4">{price}</p>
    </div>
  </div>
);

const ComparisonSection = () => (

  <div className="w-full max-w-2xl mx-auto overflow-hidden my-5 ">

    <div className="">
      <div className="border border-[#E0E8ED] rounded-lg p-2 relative">
        <div className="flex relative gap-2">
          <ComparisonCard
            vehicleImage="/images/jeep.webp"
            vehicleName="Tata Yodha 2.0"
            price="₹ 18 - ₹ 20 Lakh*"
          />

          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-12 h-12 rounded-full bg-[#FA7436] text-white flex items-center justify-center font-semibold text-lg">
              VS
            </div>
          </div>

          <ComparisonCard
            vehicleImage="/images/jeep.webp"
            vehicleName="Tata Yodha 1700 BS6"
            price="₹ 18 - ₹ 20 Lakh*"
          />
        </div>

        <div className="flex justify-center mt-4">
          <button className="px-12 py-3 bg-white rounded text-[#FA7436] hover:bg-[#FA7436] hover:text-white border border-[#FA7436] font-semibold text-[16px] transition-colors">
            Compare Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ComparisonTable = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-10">Tata Yodha 2.0 Specs & Features</h2>
      <div className='flex flex-col md:flex-row gap-5'>
        <ComparisonSection />
        <ComparisonSection />
      </div>
    </div>

  );
};

export default ComparisonTable;