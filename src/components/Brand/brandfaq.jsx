'use client';

import { useParams } from "next/navigation";
import { useState } from "react";
import { FiChevronDown, FiUser } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { brands } from "./brand";

export default function BrandFaq() {
  const params = useParams();
  const slug = params?.truckname || params?.slug || "";

  // find brand by slug
  const brand = brands.find((b) => b.slug === slug);

  const [activeIndex, setActiveIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  if (!brand) {
    return <p>No FAQ available for this brand.</p>;
  }

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-white md:py-10 py-4 md:px-4 px-0 pt-10">
      <h2 className="font-bold md:text-[24px] text-[18px] leading-[20px] text-[#000000] md:mb-10 mb-6">
        FAQs on {brand.title}
      </h2>

      <div className="mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Left Side */}
        <div
          className="md:w-[30%] w-full text-white rounded-xl md:p-6 p-2 flex flex-col items-center text-center justify-center"
          style={{
            background: `url('/faq-bg.svg') center/cover no-repeat`,
          }}
        >
          <div className="bg-white text-orange-500 rounded-full p-4 mb-4">
            <FiUser size={32} />
          </div>
          <p className="font-bold text-lg lg:text-[22px] text-white mb-2">
            Do you have more questions?
          </p>
          <p className="text-sm lg:text-[16px] text-center mb-6">
            Contact our support team for more details.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 cursor-pointer bg-white font-bold md:text-[20px] text-[18px] text-[#F16737] py-2 md:py-3 md:px-14 px-6 rounded-md hover:bg-orange-100 transition"
          >
            <FiPhoneCall className="text-lg" />
            <span>Connect Now</span>
          </button>
        </div>

        {/* Right Side FAQ */}
        <div className="md:w-[70%] w-full">
          <div className="pl-0 md:pl-6">
            {brand.faq?.length > 0 ? (
              brand.faq.map((item, index) => (
                <div
                  key={index}
                  className={`border rounded-md mb-5 cursor-pointer ${
                    activeIndex === index
                      ? "bg-[#FFD2BD] border-orange-200"
                      : "bg-[#FFF9F5] border-[#FFD2BD]"
                  }`}
                  onClick={() => toggle(index)}
                >
                  <div className="flex justify-between items-center px-6 py-4">
                    <h3 className="font-semibold text-sm text-[#254154]">
                      {item.question}
                    </h3>
                    <FiChevronDown
                      className={`text-orange-500 text-xl transition-transform duration-300 ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {activeIndex === index && (
                    <div className="px-6 pb-4 text-base">{item.answer}</div>
                  )}
                </div>
              ))
            ) : (
              <p>No FAQs available for this brand.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
