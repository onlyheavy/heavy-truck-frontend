import Banner from "@/components/emi-calculator/banner";
import CalculateEmi from "@/components/emi-calculator/emicalculate";
import EmiCard from "@/components/emi-calculator/emi-description";
import Faq from "@/components/emi-calculator/faq";
import { Button } from "@/components/ui/button";
import EMIcal from "@/components/emi-calculator/emi-cal"
import LandingPageLayout from "@/layouts/LandingPageLayout";

const EmiCalculator = () => {
    return (
        <>
            <div className="min-h-screen text-black bg-white">
                <LandingPageLayout>
                    <Banner />
                    <EmiCard />
                    <CalculateEmi />
                    {/* <Faq /> */}

                </LandingPageLayout>
            </div>

            
        </>

    )
}   
export default EmiCalculator