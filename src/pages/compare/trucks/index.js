import MainLayout from '@/layouts/MainLayout'
import HomeCompareTruck from '@/components/Trucks-Home-Landing-page/HomeCompareTruck'
import Faq from '@/components/Truck-Product-Landing-Page/FAQ'
import TruckCompareSlug from '@/components/Compare-Truck/TruckCompareSlug'
import API from "@/utils/api";
import axios from "axios";

export default function CompareTruckNoSlug({ compareTruckData = [] }) {
  return (
    <MainLayout>
      <TruckCompareSlug truck1Data={null} truck2Data={null} rankData={null} />
      <HomeCompareTruck compareTruck={compareTruckData} />
      {/* <Faq /> */}
    </MainLayout>
  )
}

export async function getServerSideProps() {
  try {
    const response = await axios.get(`${API.HOST}/api/compare/mostPopularCompare`);
    if (response?.data?.success) {
      return {
        props: {
          compareTruckData: response.data.data || []
        }
      };
    }
    return {
      props: {
        compareTruckData: []
      }
    };
  } catch (error) {
    console.error('Error fetching compare truck data:', error);
    return {
      props: {
        compareTruckData: []
      }
    };
  }
}