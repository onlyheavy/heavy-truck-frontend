import TruckCompare from '@/components/Compare-Truck/TruckCompare'
import MainLayout from '@/layouts/MainLayout'
import React from 'react'
import API from "@/utils/api";
import axios from "axios";
import HomeCompareTruck from '@/components/Home-Landing-page/HomeCompareTruck';
import Faq from '@/components/Truck-Landing-Page/FAQ';

const CompareTruck = ({ truck1Data, truck2Data, rankData, slug }) => {
  return (
    <MainLayout>
        <TruckCompare 
          truck1Data={truck1Data}
          truck2Data={truck2Data}
          rankData={rankData}
          slug={slug}
        />
        <HomeCompareTruck />
        <Faq />
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  try {
    const response = await axios.get(`${API.HOST}/api/compare/${slug}`);
    const apiResponse = response.data;

    if (apiResponse.success) {
      const truck1 = apiResponse?.data?.left;
      const truck2 = apiResponse?.data?.right;
      const datas = apiResponse?.data?.existData;

      return {
        props: {
          truck1Data: truck1,
          truck2Data: truck2,
          rankData: datas,
          slug: slug
        },
      };
    } else {
      return {
        props: {
          truck1Data: null,
          truck2Data: null,
          rankData: null,
          slug: slug
        },
      };
    }
  } catch (error) {
    console.error('Error fetching compare data:', error);
    return {
      props: {
        truck1Data: null,
        truck2Data: null,
        rankData: null,
        slug: slug
      },
    };
  }
}

export default CompareTruck