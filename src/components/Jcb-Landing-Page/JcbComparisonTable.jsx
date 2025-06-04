import { useState, useEffect, useRef } from 'react';

const JcbComparisonTable = () => {
  const specs = [
    {
      category: "Engine",
      specs: [
        { name: "Ex-Showroom Price", jcb2dx: "₹ 10.00 Lakh - ₹ 10.40 Lakh", aceAx124: "₹ 10.00 Lakh - ₹ 10.40 Lakh", jcb3dxPlus: "₹ 10.00 Lakh - ₹ 10.40 Lakh" },
        { name: "Mileage", jcb2dx: "12-13 KMPL", aceAx124: "12-13 KMPL", jcb3dxPlus: "12-13 KMPL" },
        { name: "GVW", jcb2dx: "3840 KG", aceAx124: "3840 KG", jcb3dxPlus: "3840 KG" },
        { name: "Power", jcb2dx: "100 HP", aceAx124: "100 HP", jcb3dxPlus: "100 HP" },
      ]
    },

  ];

  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto  overflow-hidden mt-16 mb-8">
      {/* Sticky Header */}
      <div ref={headerRef} className="sticky top-0  z-10 ">
        <h1 className="font-bold text-[24px] leading-[20px] text-[#000000] mb-10">Compare JCB 2DX with Similar Backhoe Loaders</h1>

        <div className="flex justify-center gap-4 px-4pb-4">
          {/* First Card */}
          <div className="w-1/3 rounded-lg border border-[#E0E8ED] p-2">
            <div className="flex flex-col items-start">
              <div className='bg-[#FFE5D9] w-full rounded-md'>
                <img src="/images/jcb1.svg" alt="JCB 2DX" className="mb-2 rounded" />
              </div>
              <h3 className="font-semibold text-[14px] text-[#254154] mt-4">JCB 2DX</h3>
              <p className="text-base font-bold text-[16px] leading-[20px] mt-4 my-1">₹ 18 - ₹ 20 Lakh*</p>
              <button className="px-8 py-3 bg-[#FFFFFF] m-auto mt-4 rounded text-[#FA7436] hover:bg-[#FA7436] hover:text-[#FFFFFF] border border-[#FA7436] font-bold text-[14px] leading-[20px] transition">
                Contact Now
              </button>
            </div>
          </div>

          {/* Second Card */}
          <div className="w-1/3 rounded-lg border border-[#E0E8ED] p-2">
            <div className="flex flex-col items-start">
              <div className='bg-[#FFE5D9] w-full rounded-md'>
                <img src="/images/jcb1.svg" alt="ACE AX-124" className="mb-2 rounded" />
              </div>
              <h3 className="font-semibold text-[14px] text-[#254154] mt-4">ACE AX-124</h3>
              <p className="text-base font-bold text-[16px] leading-[20px] mt-4 my-1">₹ 18 - ₹ 20 Lakh*</p>
              <button className="px-8 py-3 bg-[#FFFFFF] m-auto mt-4 rounded text-[#FA7436] hover:bg-[#FA7436] hover:text-[#FFFFFF] border border-[#FA7436] font-bold text-[14px] leading-[20px] transition">
                Contact Now
              </button>
            </div>
          </div>

          {/* Third Card - No button */}
          <div className="w-1/3 rounded-lg">
            <div className='bg-[#E6E6E6] w-full h-full flex flex-col gap-5 justify-center items-center rounded-md'>
              <img src="/images/JCB_Infra.png" alt="ACE AX-124" className="mb-2 rounded" />
              <p className='font-semibold text-2xl'>Compare</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Table with hidden scrollbar */}
      <div className="w-full overflow-y-auto scrollbar-hide border border-[#E0E8ED]  border-b-0 rounded-[6px] max-h-[75vh] mt-16">
        {specs.map((categoryGroup, idx) => (
          <div key={idx} className="">
            <div className="grid grid-cols-4 bg-[#FFE8DE] font-bold text-[16px] leading-[22px] text-center">
              <div className="p-3 text-left"></div>
              <div className="p-3">Tata Yodha 2.0</div>
              <div className="p-3">Tata Yodha 1700 BS6</div>
              <div className="p-3">Tata Yodha 1700 BS6</div>
            </div>

            {categoryGroup.specs.map((spec, i) => (
              <div key={i} className={`grid grid-cols-4 text-sm text-gray-700 text-center border-t border-dashed border-gray-300 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="p-3 text-left font-medium text-[14px] leading-[22px] ">{spec.name}</div>
                <div className="p-3 font-medium text-[14px] text-[#254154] leading-[22px] text-center">{spec.jcb2dx}</div>
                <div className="p-3 font-medium text-[14px] text-[#254154] leading-[22px] text-center">{spec.aceAx124}</div>
                <div className="p-3 font-medium text-[14px] text-[#254154] leading-[22px] text-center">{spec.jcb3dxPlus}</div>
              </div>
            ))}
          </div>
        ))}
      </div>


      {/* talk to dealer */}

      <div className='bg-[#FFE8DE] rounded-md p-5 h-[200px] mt-8 flex flex-col justify-between '>
        <h2 className='text-2xl font-bold'>Talk to Dealer</h2>
        <p className='text-sm font-normal w-[450px]'>Find nearest dealer in your area with us and fulfil your dreams by buying the best
          Truck matching your needs.</p>
        <button className='bg-[#FA7436] px-3 py-1 rounded-md text-white w-fit cursor-pointer'>Connect Now</button>

      </div>




    </div>
  );
};

export default JcbComparisonTable;
