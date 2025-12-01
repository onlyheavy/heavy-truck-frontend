import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import HomeSearchBar from "@/components/Home-Landing-page/HomeSearchBar";
import GetInTouch from "@/components/Home-Landing-page/GetInTouch";
import Services from "@/components/Home-Landing-page/Services";
import TruckBrands from "@/components/Home-Landing-page/TruckBrands";
import PopularTruck from "@/components/Home-Landing-page/PopularTruck";
import HomeBrochure from "@/components/Home-Landing-page/HomeBrochure";
import TruckByPrice from "@/components/Home-Landing-page/TruckByPrice";
import TruckByFuel from "@/components/Home-Landing-page/TruckByFuel";
import TruckByGvw from "@/components/Home-Landing-page/TruckByGvw";
import TruckByWheels from "@/components/Home-Landing-page/TruckByWheels";
import TruckByMileage from "@/components/Home-Landing-page/TruckByMileage";
import TrucksByEmissionNorm from "@/components/Home-Landing-page/TrucksByEmissionNorm";
import HomeCompareTruck from "@/components/Home-Landing-page/HomeCompareTruck";
import LandingPageLayout from "@/layouts/LandingPageLayout";
import API from "@/utils/api";
import LatestNews from "@/components/Home-Landing-page/LatestNews";
import TruckByPayload from "@/components/Home-Landing-page/TruckByPayload";
import Head from "next/head";

export default function Home() {
  const [priceData, setPriceData] = useState([]);
  const [fuelData, setFuelData] = useState([]);
  const [gvwData, setGvwData] = useState([]);
  const [payload, setPayload] = useState([]);
  const [wheelData, setWheelData] = useState([]);
  const [mileageData, setMileageData] = useState([]);
  const [emissionData, setEmissionData] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = `${API.HOST}/api/category/filter/truck`;

  // ✅ Wrap in useCallback so it's stable and can safely go in useEffect deps
  const fetchData = useCallback(async (filterKey, filterValue, setter) => {
    try {
      setLoading(true);
      const res = await axios.post(apiUrl, {
        filter: { [filterKey]: filterValue },
        sortBy: "rating",
        limit: 6,
      });

      if (res.data?.success) {
        setter(res.data.data || []);
      } else {
        console.warn("API returned error:", res.data);
        setter([]);
      }
    } catch (err) {
      console.error(
        "Error fetching trucks:",
        err?.response?.data?.message || err.message
      );
      setter([]);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  // ✅ Now include fetchData in deps safely
  useEffect(() => {
    fetchData("price_range", "under-10-lakh", setPriceData);
    fetchData("fuelType", "diesel", setFuelData);
    fetchData("GVW", "under-2.5-ton", setGvwData);
    fetchData("payload", "under-2.5-ton-payload", setPayload);
    fetchData("wheel", 4, setWheelData);
    fetchData("mileage", "1-5-mileage", setMileageData);
    fetchData("emissionNorm", "bs-vi", setEmissionData);
  }, [fetchData]);

  return (
    <>
     <Head>
        <title>Compare Trucks in India | New Truck Price, Mileage & Payload – OnlyHeavy</title>

        <meta 
          name="description" 
          content="OnlyHeavy helps you compare truck prices, mileage, and payload across leading brands in India. Get detailed specs, images, and reviews of the latest heavy trucks and commercial vehicles." 
        />

        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="canonical" href="https://www.onlyheavy.com/" />

        {/* Open Graph Meta Tags */}
        <meta 
          property="og:title" 
          content="Compare Trucks in India | New Truck Price, Mileage & Payload – OnlyHeavy" 
        />
        <meta 
          property="og:description" 
          content="OnlyHeavy helps you compare truck prices, mileage, and payload across leading brands in India. Get detailed specs, images, and reviews of the latest heavy trucks and commercial vehicles." 
        />
        <meta 
          property="og:image" 
          content={`${process.env.NEXT_PUBLIC_S3_URL}favicons.png`} 
        />
        <meta property="og:url" content="https://onlyheavy.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta 
          name="twitter:title" 
          content="Compare Trucks in India | New Truck Price, Mileage & Payload – OnlyHeavy" 
        />
        <meta 
          name="twitter:description" 
          content="OnlyHeavy helps you compare truck prices, mileage, and payload across leading brands in India. Get detailed specs, images, and reviews of the latest heavy trucks and commercial vehicles." 
        />
        <meta 
          name="twitter:image" 
          content={`${process.env.NEXT_PUBLIC_S3_URL}favicons.png`} 
        />
      </Head>

      
      <div className="min-h-screen bg-white">
      <LandingPageLayout>
        <HomeSearchBar />
        <GetInTouch />
        <Services />
        <TruckBrands />
        <PopularTruck />
        <HomeBrochure />

        <TruckByPrice
          data={priceData || []}
          onFilterChange={(val) => fetchData("price_range", val, setPriceData)}
          loading={loading}
          style={'bg-white'}
        />
        <TruckByFuel
          data={fuelData || []}
          onFilterChange={(val) => fetchData("fuelType", val, setFuelData)}
          loading={loading}
          style={'bg-[#FDF8F4]'}
        />
        <TruckByGvw
          data={gvwData || []}
          onFilterChange={(val) => fetchData("GVW", val, setGvwData)}
          loading={loading}
          style={'bg-white'}
        />
        <TruckByPayload
          data={payload || []}
          onFilterChange={(val) => fetchData("payload", val, setPayload)}
          loading={loading}
          style={'bg-[#FDF8F4]'}
        />
        <TruckByWheels
          data={wheelData || []}
          onFilterChange={(val) => fetchData("wheel", val, setWheelData)}
          loading={loading}
          style={'bg-white'}
        />
        <TrucksByEmissionNorm
          data={emissionData || []}
          onFilterChange={(val) =>
            fetchData("emissionNorm", val, setEmissionData)
          }
          loading={loading}
          style={'bg-[#FDF8F4]'}
        />
        <TruckByMileage
          data={mileageData || []}
          onFilterChange={(val) => fetchData("mileage", val, setMileageData)}
          loading={loading}
          style={'bg-white'}
        />
        <HomeCompareTruck />
        <LatestNews />
      </LandingPageLayout>
    </div>
    </>

  );
}
