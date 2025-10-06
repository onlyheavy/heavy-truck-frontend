import Banner from "@/components/emi-calculator/banner";
import CalculateEmi from "@/components/emi-calculator/emicalculate";
import EmiCard from "@/components/emi-calculator/emi-description";
import Faq from "@/components/emi-calculator/faq";
import { Button } from "@/components/ui/button";
import EMIcal from "@/components/emi-calculator/emi-cal"

const EmiCalculator = () => {
    return (
        <>
            <Banner />
            <EmiCard />
            <CalculateEmi />
            <Faq />
            {/* <EMIcal /> */}
            
        </>

    )
}   
export default EmiCalculator