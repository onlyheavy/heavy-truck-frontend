import { useEffect, useState } from "react";
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

export default function Home() {
  const [priceData, setPriceData] = useState([]);
  const [fuelData, setFuelData] = useState([]);
  const [gvwData, setGvwData] = useState([]);
  const [wheelData, setWheelData] = useState([]);
  const [mileageData, setMileageData] = useState([]);
  const [emissionData, setEmissionData] = useState([]);

  const [loading, setLoading] = useState(false);

  const apiUrl = `${API.HOST}/api/category/filter/truck`;

  // 🔹 Generic API fetcher
 // Generic API fetcher
const fetchData = async (filterKey, filterValue, setter) => {
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
      setter([]); // set empty array if API failed
    }
  } catch (err) {
    console.error("Error fetching trucks:", err?.response?.data?.message || err.message);
    setter([]); // fallback
  } finally {
    setLoading(false);
  }
};


  // 🔹 Initial load
  useEffect(() => {
    fetchData("price_range", "20-30 lakh", setPriceData);
    fetchData("fuelType", "Diesel", setFuelData);
    fetchData("GVW", "5-10 ton", setGvwData);
    fetchData("wheel", 4, setWheelData);
    fetchData("mileage", "11-20 mileage", setMileageData);
    fetchData("emissionNorm", "BS VI", setEmissionData);
  }, []);

  return (
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
        />
        <TruckByFuel
          data={fuelData || []}
          onFilterChange={(val) => fetchData("fuelType", val, setFuelData)}
          loading={loading}
        />
        <TruckByGvw
          data={gvwData || []}
          onFilterChange={(val) => fetchData("GVW", val, setGvwData)}
          loading={loading}
        />
        <TruckByWheels
          data={wheelData || []}
          onFilterChange={(val) => fetchData("wheel", val, setWheelData)}
          loading={loading}
        />
        
        <TrucksByEmissionNorm
          data={emissionData || []}
          onFilterChange={(val) =>
            fetchData("emissionNorm", val, setEmissionData)
          }
          loading={loading}
        />
        <TruckByMileage
          data={mileageData || []}
          onFilterChange={(val) => fetchData("mileage", val, setMileageData)}
          loading={loading}
        />

        <HomeCompareTruck />
        <LatestNews />
      </LandingPageLayout>
    </div>
  );
}
