import Banner from '@/components/fuel-cost/banner'
import TruckByMileage from '@/components/Home-Landing-page/TruckByMileage'
import TruckByPrice from '@/components/Home-Landing-page/TruckByPrice'
import Faq from '@/components/fuel-cost/faq'
import LandingPageLayout from '@/layouts/LandingPageLayout'
import API from '@/utils/api'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import FuelCalculate from '@/components/fuel-cost/fuelCalculate'

const FuelCost = () => {
    const [priceData, setPriceData] = useState([]);
    const [mileageData, setMileageData] = useState([]);
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

    // 🔹 Initial load
    useEffect(() => {
      fetchData("price_range", "20-30-lakh", setPriceData);
      fetchData("mileage", "11-20-mileage", setMileageData);
    }, [fetchData]);
  
  return (
    <div className='min-h-screen bg-white'>
         <LandingPageLayout>
            <Banner/>
            <FuelCalculate/>
            <TruckByPrice
              data={priceData}
              onFilterChange={(val) => fetchData("price_range", val, setPriceData)}
              loading={loading}
            />
            <TruckByMileage
              data={mileageData}
              onFilterChange={(val) => fetchData("mileage", val, setMileageData)}
              loading={loading}
            />
            <Faq/>
        </LandingPageLayout>
    </div>
   
  )
}

export default FuelCost