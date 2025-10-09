import Banner from '@/components/brochure/banner'
import TruckByPrice from '@/components/Home-Landing-page/TruckByPrice'
import Faq from '@/components/brochure/faq'
import LandingPageLayout from '@/layouts/LandingPageLayout'
import API from '@/utils/api'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import TruckByGvw from '@/components/Home-Landing-page/TruckByGvw'
import Card from '@/components/brochure/card'
import BrochureData from '@/components/brochure/brochureData'

const Brochure = () => {
    const [priceData, setPriceData] = useState([]);
     const [gvwData, setGvwData] = useState([]);
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
      fetchData("GVW", "5-10-ton", setGvwData);
    }, [fetchData]);
  
  return (
    <div className='min-h-screen bg-white'>
         <LandingPageLayout>
            <Banner/>
            <Card/>
            <BrochureData/>
            <TruckByPrice
              data={priceData}
              onFilterChange={(val) => fetchData("price_range", val, setPriceData)}
              loading={loading}
            />
            <TruckByGvw
                data={gvwData || []}
                onFilterChange={(val) => fetchData("GVW", val, setGvwData)}
                loading={loading}
            />
            <Faq/>
        </LandingPageLayout>
    </div>
   
  )
}

export default Brochure