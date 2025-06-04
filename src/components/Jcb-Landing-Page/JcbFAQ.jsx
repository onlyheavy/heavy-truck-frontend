'use client';
import { useState } from "react";
import { FiChevronDown, FiPhoneCall } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

const faqs = [
  {
    question: "What is the price of jcb 2DX Backhoe loader in india",
    answer: "The JCB 2DX price in India starts from 18 Lakh and it goes up to 20 Lakh.",
  },
  {
    question: "What is the price of jcb 2DX Backhoe loader in india",
    answer: "The JCB 2DX price in India starts from 18 Lakh and goes up to 20 Lakh.",
  },
  {
    question: "What is the price of jcb 2DX Backhoe loader in india",
    answer: "The JCB 2DX price in India starts from 18 Lakh and goes up to 20 Lakh.",
  },
  {
    question: "What is the price of jcb 2DX Backhoe loader in india",
    answer: "The JCB 2DX price in India starts from 18 Lakh and goes up to 20 Lakh.",
  },
  {
    question: "What is the price of jcb 2DX Backhoe loader in india",
    answer: "The JCB 2DX price in India starts from 18 Lakh and goes up to 20 Lakh.",
  },
  {
    question: "What is the price of jcb 2DX Backhoe loader in india",
    answer: "The JCB 2DX price in India starts from 18 Lakh and goes up to 20 Lakh.",
  },
];

export default function JcbFaq() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-white py-10 px-4">
      <h2 className="font-bold text-[24px] leading-[20px] text-[#000000] mb-10">FAQ on JCB 2DX</h2>
      <div className=" mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Card */}
        {/* Left Card */}
        <div className="bg-gradient-to-b from-[#FF7A45] to-[#FF7033] w-[30%] text-white rounded-xl p-6  flex flex-col items-center text-center justify-center">
          <div className="bg-white text-orange-500 rounded-full p-4 mb-4">
            <FiUser size={32} />
          </div>
          <p className="font-mona font-bold text-[22px] leading-[22px] text-white mb-2">Do you have more questions?</p>
          <p className="font-mona font-normal text-[16px] leading-[31px] text-center mb-6">
            End-to-end payments and financial management in a single solution. Meet the right platform to help realize.
          </p>
          <button className="flex items-center gap-2 bg-white  font-bold text-[20px] leading-[20px] text-[#F16737] py-[20px] px-14 rounded-md hover:bg-orange-100 transition">
            <FiPhoneCall className="text-lg" />
            <span>Connect Now</span>
          </button>
        </div>


        {/* Right FAQ Section */}
        <div className="w-[70%]">
          <div className="pl-0 md:pl-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-md mb-5 cursor-pointer ${activeIndex === index
                    ? "bg-[#FFD2BD] border-orange-200"
                    : "bg-[#FFF9F5] border-[#FFD2BD]"
                  }`}
                onClick={() => toggle(index)}
              >
                <div className="flex justify-between items-center px-6 py-4">
                  <h3 className="font-semibold text-[18px] text-[#254154]">{faq.question}</h3>
                  <FiChevronDown
                    className={`text-orange-500 text-xl transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                      }`}
                  />
                </div>
                {activeIndex === index && (
                  <div className="px-6 pb-4 font-medium text-base text-black">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
