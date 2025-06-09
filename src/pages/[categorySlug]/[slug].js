import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CategoryProvider } from '@/hooks/useContext';
import EmiCalculator from '@/components/Truck-Landing-Page/EmiCalculator';
import Faq from '@/components/Truck-Landing-Page/FAQ';
import Fuel from '@/components/Truck-Landing-Page/fuel';
import KeySpecs from '@/components/Truck-Landing-Page/KeySpecs';
import Loan from '@/components/Truck-Landing-Page/loan';
import TruckCards from '@/components/Truck-Landing-Page/TruckCards';
import TruckFeatures from '@/components/Truck-Landing-Page/TruckFeatures';
import TruckGallery from '@/components/Truck-Landing-Page/TruckGallery';
import TruckProsAndCons from '@/components/Truck-Landing-Page/TruckProsAndCons';
import ComparisonTable from '@/components/Truck-Landing-Page/ComparisonTable';
import MainLayout from '@/layouts/MainLayout';
import React, { useRef } from 'react';
import SpecsBar from '@/components/SpecsBar';
import Image from 'next/image';

const features = [
  {
    icon: '/icons/emi.svg',
    title: 'EMI Calculator',
    description: 'Calculate your EMI payments',
  },
  {
    icon: '/icons/truck.svg',
    title: 'Used Vehicles',
    description: 'Get second-hand commercial vehicles within your budget',
  },
  {
    icon: '/icons/mil.svg',
    title: 'Mileage',
    description: 'Find vehicle Mileage in India.',
  },
  {
    icon: '/icons/loan.svg',
    title: 'Loan Offers',
    description: 'Check out Loan Offers',
  },
  {
    icon: '/icons/explore.svg',
    title: 'Explore More',
    description: 'Explore other commercial vehicles in India',
  },
];

const DynamicVehiclePage = () => {
  const router = useRouter();
  const { categorySlug, slug } = router.query;

  useEffect(() => {
    console.log('Route parameters:', { categorySlug, slug });
  }, [categorySlug, slug]);

  const truckGalleryRef = useRef(null);
  const truckFeaturesRef = useRef(null);
  const truckFuelRef = useRef(null);
  const truckEmiCaluculator = useRef(null);
  const truckBrochure = useRef(null);
  const truckLoan = useRef(null);

  // Show loading state while the route parameters are being resolved
  if (!categorySlug || !slug) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  // If the page is not yet generated, this will be displayed
  if (router.isFallback) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <CategoryProvider>
      <MainLayout>
        <div className="md:flex block gap-10">
          <div className="md:w-[80%] w-full">
            <div ref={truckGalleryRef}>
              <TruckGallery />
            </div>
            <div className="sticky top-0 z-10 bg-white">
              <SpecsBar
                truckFeaturesRef={truckFeaturesRef}
                truckGalleryRef={truckGalleryRef}
                truckFuelRef={truckFuelRef}
                truckEmiCaluculator={truckEmiCaluculator}
                truckBrochure={truckBrochure}
                truckLoan={truckLoan}
              />
            </div>
            <div ref={truckFeaturesRef}>
              <KeySpecs />
            </div>
            <div ref={truckEmiCaluculator}>
              <EmiCalculator />
            </div>
            <TruckFeatures />
            <div ref={truckBrochure}>
              <TruckProsAndCons />
            </div>
            <div ref={truckLoan}>
              <Loan />
            </div>
            <div ref={truckFuelRef}>
              <Fuel />
            </div>
            <ComparisonTable />
            <TruckCards />
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
                          <Image src={item.icon} width={28} height={28} alt="icon" className=" object-contain" />
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
        <Faq />
      </MainLayout>
    </CategoryProvider>
  );
};

export default DynamicVehiclePage;
