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
import TalkDelar from '@/components/Truck-Landing-Page/TalkDelar';
import React, { useRef } from 'react';
import SpecsBar from '@/components/SpecsBar';
import Image from 'next/image';
import axios from 'axios';
import API from '@/utils/api';
import { CategoryProvider } from '@/hooks/useContext';

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

const TruckLandingPage = ({ categoryData, alterNative, error, categorySlug, slug }) => {
  const truckGalleryRef = useRef(null);
  const truckFeaturesRef = useRef(null);
  const truckFuelRef = useRef(null);
  const truckEmiCaluculator = useRef(null);
  const truckBrochure = useRef(null);
  const truckLoan = useRef(null);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const initialData = {
    categoryData,
    alterNative,
    error,
    categorySlug,
    slug
  };

  return (
    <CategoryProvider initialData={initialData}>
      <MainLayout>
        <div className="md:flex block gap-10">
          <div className="md:w-[80%] w-full">
            <div ref={truckGalleryRef}>
              <TruckGallery />
            </div>
            <div className='sticky top-0 z-10 bg-white'>
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
                        <TalkDelar />
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
        <Faq />
      </MainLayout>
    </CategoryProvider>
  );
};

export async function getServerSideProps(context) {
  const { categorySlug, slug } = context.params; // Changed from context.query to context.params

  if (!categorySlug || !slug) {
    return {
      props: {
        categoryData: null,
        alterNative: [],
        error: 'Missing required parameters',
        categorySlug: null,
        slug: null
      }
    };
  }

  try {
    console.log('Fetching data for:', { categorySlug, slug }); // Debug log
    const response = await axios.get(`${API.HOST}/api/category/${categorySlug}/${slug}`);

    if (response.data && response.data.data) {
      console.log('Received data:', response.data.data); // Debug log
      return {
        props: {
          categoryData: response.data.data.existData,
          alterNative: response.data.data.alternatives,
          error: null,
          categorySlug,
          slug
        }
      };
    } else {
      throw new Error('Invalid data format received from API');
    }
  } catch (error) {
    console.error('Error fetching category data:', error);
    
    if (error.response && error.response.status === 404) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        categoryData: null,
        alterNative: [],
        error: error.message || 'Failed to fetch data',
        categorySlug,
        slug
      }
    };
  }
}

export default TruckLandingPage;
