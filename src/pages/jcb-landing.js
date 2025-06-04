import React from 'react';
import JcbLayout from '@/layouts/JcbLayout';
import JcbTruckGallery from '@/components/Jcb-Landing-Page/JcbTruckGallery';
import JcbKeySpecs from '@/components/Jcb-Landing-Page/JcbKeySpecs';
import JcbEmiCalculator from '@/components/Jcb-Landing-Page/JcbEmiCalculator';
import JcbTruckFeatures from '@/components/Jcb-Landing-Page/JcbTruckFeatures';
import JcbProsAndCons from '@/components/Jcb-Landing-Page/JcbProsAndCons';
import JcbLoan from '@/components/Jcb-Landing-Page/JcbLoan';
import JcbFuel from '@/components/Jcb-Landing-Page/JcbFuel';
import JcbComparisonTable from '@/components/Jcb-Landing-Page/JcbComparisonTable';
import JcbTruckCards from '@/components/Jcb-Landing-Page/JcbTruckCards';
import JcbFaq from '@/components/Jcb-Landing-Page/JcbFAQ';
import Image from 'next/image';

const features = [
  {
    icon: '/icons/emi.svg',
    title: 'EMI Calculator for Tata Yodha 2.0',
    description: 'Calculate your EMI payments for purchasing Tata Yodha 2.0',
  },
  {
    icon: '/icons/truck.svg',
    title: 'Tata Used Trucks',
    description: 'Get the second-hand Tata Yodha 2.0 commercial vehicles within your budget',
  },
  {
    icon: '/icons/mil.svg',
    title: 'Tata Yodha 2.0 Mileage',
    description: 'Find Tata Yodha 2.0 Mileage in India.',
  },
  {
    icon: '/icons/loan.svg',
    title: 'Loan Offers on Tata Yodha 2.0',
    description: 'Check out Tata Yodha 2.0 Loan Offers',
  },
  {
    icon: '/icons/explore.svg',
    title: 'Explore Tata',
    description: 'Explore other Tata commercial vehicles in India',
  },
];

const JcbLandingPage = () => {
  return (
    <JcbLayout>
      <div className="md:flex block gap-10">
        <div className="md:w-[80%] w-full">
          <JcbTruckGallery />
          <JcbKeySpecs />
          <JcbEmiCalculator />
          <JcbTruckFeatures />
          <JcbProsAndCons />
          <JcbLoan />
          <JcbFuel />
          <JcbComparisonTable />
          <JcbTruckCards />
        </div>

        <div className="w-[20%] hidden md:block">
          <div className="flex flex-col gap-10">
            <div className="bg-[#D9D9D9] w-full h-[450px] rounded-md flex justify-center items-center text-4xl">
              Ads
            </div>

            <div className="">
              <div className="">
                <h2 className="font-bold text-xl my-3">Tools</h2>
                <div className=" bg-[#FFE8DE] rounded-sm overflow-hidden shadow-md">
                  {features.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-4 px-4 py-5 ${
                        index < features.length - 1 ? 'border-b-2 border-white' : ''
                      }`}
                    >
                      <div className="bg-white flex items-center justify-center w-16 h-16 rounded-md">
                        <Image width={8} height={8} src={item.icon} alt="icon" className=" object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#000000] mb-1 leading-snug">
                          {item.title}
                        </p>
                        <p className="text-sm text-[#464646] leading-tight">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#D9D9D9] w-full h-[450px] rounded-md flex justify-center items-center text-4xl">
              Ads
            </div>
          </div>
        </div>
      </div>
      <JcbFaq />
    </JcbLayout>
  );
};

export default JcbLandingPage;
