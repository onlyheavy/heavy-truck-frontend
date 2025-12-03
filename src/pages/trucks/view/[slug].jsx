import TruckListing from '@/components/View-All/TruckListing'
import LandingPageLayout from '@/layouts/LandingPageLayout'
import React from 'react'
import API from "@/utils/api";
import axios from "axios";

const View = ({ compareTruckData = [] }) => {
  return (
    <LandingPageLayout>
      <TruckListing compareTruckData={compareTruckData} />
    </LandingPageLayout>
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

export default View