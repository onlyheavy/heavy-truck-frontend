'use client';
import { useCategory } from "@/hooks/useContext";
import { useState } from "react";
import { FiChevronDown, FiPhoneCall } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { categoryData } = useCategory()

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-white md:py-10 py-4 md:px-4 px-0">
      <h2 className="font-bold md:text-[24px] text-[18px] leading-[20px] text-[#000000] md:mb-10 mb-6">FAQ on {categoryData[0]?.productName}</h2>
      <div className=" mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Card */}
        {/* Left Card */}
        <div className="bg-gradient-to-b from-[#FF7A45] to-[#FF7033] md:w-[30%] w-full text-white rounded-xl md:p-6 p-2 flex flex-col items-center text-center justify-center">
          <div className="bg-white text-orange-500 rounded-full p-4 mb-4">
            <FiUser size={32} />
          </div>
          <p className="font-mona font-bold text-[22px] leading-[22px] text-white mb-2">Do you have more questions?</p>
          <p className="font-mona font-normal text-[16px] leading-[31px] text-center mb-6">
            End-to-end payments and financial management in a single solution. Meet the right platform to help realize.
          </p>
          <button className="flex items-center gap-2 bg-white  font-bold md:text-[20px] text-[18px] leading-[20px] text-[#F16737] py-[20px] md:px-14 px-6 rounded-md hover:bg-orange-100 transition">
            <FiPhoneCall className="text-lg" />
            <span>Connect Now</span>
          </button>
        </div>


        {/* Right FAQ Section */}
        <div className="md:w-[70%] w-full">
          <div className="pl-0 md:pl-6">
            {categoryData.map((faqGroup, groupIndex) =>
              faqGroup.FAQ?.map((faqs, index) => (
                <div
                  key={faqs._id}
                  className={`border rounded-md mb-5 cursor-pointer ${activeIndex === faqs._id ? "bg-[#FFD2BD] border-orange-200" : "bg-[#FFF9F5] border-[#FFD2BD]"
                    }`}
                  onClick={() => toggle(faqs._id)}
                >
                  <div className="flex justify-between items-center px-6 py-4">
                    <h3 className="font-semibold text-[18px] text-[#254154]">{faqs.question}</h3>
                    <FiChevronDown
                      className={`text-orange-500 text-xl transition-transform duration-300 ${activeIndex === faqs._id ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                  {activeIndex === faqs._id && (
                    <div className="px-6 pb-4 font-medium text-base text-black">{faqs.answer}</div>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
