import EmiCalculator from '@/components/Truck-Product-Landing-Page/EmiCalculator';
import Faq from '@/components/Truck-Product-Landing-Page/FAQ';
import Fuel from '@/components/Truck-Product-Landing-Page/fuel';
import KeySpecs from '@/components/Truck-Product-Landing-Page/KeySpecs';
import Loan from '@/components/Truck-Product-Landing-Page/loan';
import TruckCards from '@/components/Truck-Product-Landing-Page/TruckCards';
import TruckFeatures from '@/components/Truck-Product-Landing-Page/TruckFeatures';
import TruckGallery from '@/components/Truck-Product-Landing-Page/TruckGallery';
import TruckProsAndCons from '@/components/Truck-Product-Landing-Page/TruckProsAndCons';
import ComparisonTable from '@/components/Truck-Product-Landing-Page/ComparisonTable';
import MainLayout from '@/layouts/MainLayout';
import TalkDelar from '@/components/Truck-Product-Landing-Page/TalkDelar';
import React, { useRef } from 'react';
import SpecsBar from '@/components/SpecsBar';
import Image from 'next/image';
import axios from 'axios';
import API from '@/utils/api';
import { CategoryProvider } from '@/hooks/useContext';
import Head from 'next/head';
import BackHoeLayout from '@/layouts/BackHoeLayout';
import BackHoeFeatures from '@/components/CE/BackHoe-Product-Landing/BackHoeFeatures';
import BackHoeKeySpecs from '@/components/CE/BackHoe-Product-Landing/BackHoeKeySpecs';
import BackHoeGallery from '@/components/CE/BackHoe-Product-Landing/BackHoeGallery';


const features = [
  {
    icon: '/icons/emi.svg',
    title: 'EMI Calculator for Tata Yodha 2.0',
    
  },
  {
    icon: '/icons/truck.svg',
    title: 'Tata Used Trucks',
  },
  {
    icon: '/icons/mil.svg',
    title: 'Tata Yodha 2.0 Mileage',
  },
  
  {
    icon: '/icons/explore.svg',
    title: 'Explore Tata',
  },
];

const BackHoeLandingPage = ({ categoryData, alterNative, error, slug }) => {
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
    slug
  };
  console.log('wfgg', categoryData[0])
  return (
   <>
  <Head>
  <title>{categoryData[0]?.metaTitle || categoryData[0]?.productName}</title>

  {categoryData[0]?.metaDescriptions && (
    <meta name="description" content={categoryData[0].metaDescriptions} />
  )}

  <meta
    name="robots"
    content={`${categoryData[0]?.searchIndex ? 'index, follow' : 'noindex, nofollow'}, ${
      categoryData[0]?.imageIndex ? 'max-image-preview:large' : 'noimageindex'
    }`}
  />

  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {/* Canonical */}
  <link
    rel="canonical"
    href={
      categoryData[0]?.canonicalUrl ||
      `https://onlyheavy.com/${categoryData[0]?.categorySlug}/${categoryData[0]?.slug}`
    }
  />

  {/* Open Graph */}
  <meta property="og:title" content={categoryData[0]?.metaTitle || categoryData[0]?.productName} />
  <meta
    property="og:description"
    content={categoryData[0]?.metaDescriptions}
  />
  <meta
    property="og:image"
    content={
      categoryData[0]?.imageUrl ||
      `${process.env.NEXT_PUBLIC_S3_URL}favicons.png`
    }
  />
  <meta
    property="og:url"
    content={
      categoryData[0]?.canonicalUrl ||
      `https://www.onlyheavy.com/${categoryData[0]?.categorySlug}/${categoryData[0]?.slug}`
    }
  />
  <meta property="og:type" content="article" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={categoryData[0]?.metaTitle} />
  <meta name="twitter:description" content={categoryData[0]?.metaDescriptions} />
  <meta
    name="twitter:image"
    content={
      `${process.env.NEXT_PUBLIC_S3_URL}${categoryData[0]?.productImage[0]}`
    }
  />
</Head>

     <CategoryProvider initialData={initialData}>
      <BackHoeLayout>
        <div className="md:flex text-black block gap-10">
          <div className="md:w-[80%] w-full">
            <div ref={truckGalleryRef}>
              <BackHoeGallery />
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
              <BackHoeKeySpecs />
            </div>
            <div ref={truckEmiCaluculator}>
              <EmiCalculator />
            </div>
            <BackHoeFeatures />
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
            <div className="flex flex-col gap-10 md:sticky md:top-10 md:h-fit md:self-start">
             
              
          <Image src="/images/ads.svg" alt='ads image' className="object-contain" width={270} height={100}/>
              <div>
  {/* <div>
    <h2 className="font-bold text-xl my-3">Tools</h2>
    <div className="bg-[#FFE8DE] rounded-sm overflow-hidden">
      {features.map((item, index) => (
        <div
          key={index}
          className={`flex items-center space-x-4 px-4 py-5 ${
            index < features.length - 1 ? 'border-b-2 border-white' : ''
          }`}
        >
          <div className="bg-white flex items-center justify-center w-14 h-14 rounded-md shrink-0">
            <Image
              src={item.icon}
              alt={item.title}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-[#000000] mb-1 leading-snug">
              {item.title}
            </p>
            <p className="text-sm text-[#464646] leading-tight">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div> */}
</div>


<div className='sticky top-10 self-start h-fit'>
<Image src="/images/ads.svg" alt='ads image' className="object-contain" width={270} height={100}/>

</div>

            </div>
          </div>
        </div>
        <Faq />
      </BackHoeLayout>
    </CategoryProvider>
   </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params; // Changed from context.query to context.params

  if (!slug) {
    return {
      props: {
        categoryData: null,
        alterNative: [],
        error: 'Missing required parameters',
        slug: null
      }
    };
  }

  try {
    console.log('Fetching data for:', { slug }); // Debug log
    const response = await axios.get(`${API.HOST}/api/ceCategory/construction-equipment/${slug}`);

    if (response.data && response.data.data) {
      console.log('Received data:', response.data.data); // Debug log
      return {
        props: {
          categoryData: response.data.data.existData,
          alterNative: response.data.data.alternatives,
          error: null,
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
        slug
      }
    };
  }
}

export default BackHoeLandingPage;
