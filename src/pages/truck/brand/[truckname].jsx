import { useRouter } from "next/router";
import PopularTruck from "@/components/Home-Landing-page/PopularTruck";
import { useEffect, useState, useCallback } from "react";
import TruckByPrice from "@/components/Home-Landing-page/TruckByPrice";
import axios from "axios";
import API from "@/utils/api";
import TruckByFuel from "@/components/Home-Landing-page/TruckByFuel";
import TruckByGvw from "@/components/Home-Landing-page/TruckByGvw";
import TruckByWheels from "@/components/Home-Landing-page/TruckByWheels";
import TrucksByEmissionNorm from "@/components/Home-Landing-page/TrucksByEmissionNorm";
import TruckByMileage from "@/components/Home-Landing-page/TruckByMileage";
import LandingPageLayout from "@/layouts/LandingPageLayout";
import Faq from "@/components/Truck-Landing-Page/FAQ";
import { brands } from "@/components/Brand/brand";
import BrandFaq from "@/components/Brand/brandfaq";



export default function BrandPage() {
  const router = useRouter();
  const { truckname } = router.query;

  const brand = brands.find((item) => item.slug === truckname);

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
  const fetchData = useCallback(
    async (filterKey, filterValue, setter,) => {
      try {
        setLoading(true);
        const filter = `${filterValue}+${brand.slug}`;
        console.log('filter', filter);
        const res = await axios.post(apiUrl, {
          filter: { [filterKey]: filter },
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
    },
    [apiUrl, brand?.slug]
  );

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

  if (!brand) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Brand not found</h2>
      </div>
    );
  }

  return (
    <LandingPageLayout>
      <div className="w-full py-18 px-12 bg-[linear-gradient(330.25deg,#FEFEFD_51.3%,#FFFAF8_55.83%,#FFEDE4_73.67%,#FFD6C3_92.87%,#FFBD9E_111.48%,#FA7436_123.86%)] ">
        {/* Circle Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-[92px] h-[92px] bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden">
            <img
              src={brand.image}
              alt={brand.title}
              className="w-[60px] h-[60px] object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-4">
          {brand.title} Trucks in India
        </h1>

        {/* Description */}
        <p class="text-base font-medium leading-[1.8] tracking-[0.8px] text-center text-[#254154]">
          {brand.description}
        </p>
      </div>
      <PopularTruck brandSlug={brand.slug} />
      <TruckByPrice
        data={priceData || []}
        onFilterChange={(val) => fetchData("price_range", val, setPriceData)}
        loading={loading}
        style={'bg-[#FDF8F4]'}
      />

      <TruckByFuel
        data={fuelData || []}
        onFilterChange={(val) => fetchData("fuelType", val, setFuelData)}
        loading={loading}
        style={'bg-white'}
      />

      <TruckByGvw
        data={gvwData || []}
        onFilterChange={(val) => fetchData("GVW", val, setGvwData)}
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
      <BrandFaq />
    </LandingPageLayout>
  );
}
