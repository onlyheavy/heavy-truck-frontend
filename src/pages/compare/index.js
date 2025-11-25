import MainLayout from '@/layouts/MainLayout'
import HomeCompareTruck from '@/components/Home-Landing-page/HomeCompareTruck'
import Faq from '@/components/Truck-Landing-Page/FAQ'
import TruckCompareSlug from '@/components/Compare-Truck/TruckCompareSlug'

export default function CompareTruckNoSlug() {
  return (
    <MainLayout>
      <TruckCompareSlug truck1Data={null} truck2Data={null} rankData={null} />
      <HomeCompareTruck />
      {/* <Faq /> */}
    </MainLayout>
  )
}