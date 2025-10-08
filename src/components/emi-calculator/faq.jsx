'use client';
import { useState } from "react";
import { FiChevronDown, FiPhoneCall, FiUser } from "react-icons/fi";

export default function Faq() {
    const [activeIndex, setActiveIndex] = useState(null);

    // ✅ Static FAQ data
    const faqData = [
        {
            _id: 1,
            question: "What is the mileage of this truck?",
            answer: "The mileage depends on road conditions, load, and driving style. On average, it offers 6-8 kmpl."
        },
        {
            _id: 2,
            question: "Does it come with a warranty?",
            answer: "Yes, the truck comes with a 3-year / 300,000 km standard warranty."
        },
        {
            _id: 3,
            question: "Is financing available?",
            answer: "Yes, we offer financing options through multiple banks and NBFCs with flexible EMI plans."
        },
        {
            _id: 4,
            question: "Where can I get spare parts?",
            answer: "Spare parts are available across all authorized dealerships and service centers nationwide."
        }
    ];

    const toggle = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="bg-white md:py-10 py-4 md:px-24 px-0 pt-10">
            <div className="flex items-center justify-center mb-10 mx-10">
                <div className="w-60 hidden md:block border-t border-gray-300"></div>
                <span className="mx-4 text-xl md:text-3xl font-bold text-gray-900">
                    FAQ on EMI Calculator
                </span>
                <div className="w-60 hidden md:block border-t border-gray-300"></div>
            </div>
            <div className="mx-auto flex flex-col px-5 md:flex-row gap-6">


                <div
                    className="md:w-[30%] w-full text-white rounded-xl p-2 md:p-6  flex flex-col items-center text-center justify-center"
                    style={{
                        background: `url('/faq-bg.svg') center/cover no-repeat`
                    }}
                >
                    <div className="bg-white text-orange-500 rounded-full p-4 mb-4">
                        <FiUser size={32} />
                    </div>
                    <p className="font-mona font-bold text-lg lg:text-[22px] leading-[22px] text-white mb-2">Do you have more questions?</p>
                    <p className="font-mona font-normal text-sm lg:text-[16px] leading-[31px] text-center mb-6">
                        End-to-end payments and financial management in a single solution. Meet the right platform to help realize.
                    </p>
                    <button className="flex items-center gap-2 bg-white  font-bold md:text-[20px] text-[18px] leading-[20px] text-[#F16737] py-2 md:py-3 md:px-14 px-6 rounded-md hover:bg-orange-100 transition">
                        <FiPhoneCall className="text-lg" />
                        <span>Connect Now</span>
                    </button>
                </div>

                {/* Right FAQ Section */}
                <div className="md:w-[70%] w-full">
                    <div className="pl-0 md:pl-6">
                        {faqData.map((faqs) => (
                            <div
                                key={faqs._id}
                                className={`border rounded-md mb-5 cursor-pointer ${activeIndex === faqs._id ? "bg-[#FFD2BD] border-orange-200" : "bg-[#FFF9F5] border-[#FFD2BD]"}`}
                                onClick={() => toggle(faqs._id)}
                            >
                                <div className="flex justify-between items-center px-6 py-4">
                                    <h3 className="font-semibold text-sm text-[#254154]">{faqs.question}</h3>
                                    <FiChevronDown
                                        className={`text-orange-500 text-xl transition-transform duration-300 ${activeIndex === faqs._id ? "rotate-180" : ""}`}
                                    />
                                </div>
                                {activeIndex === faqs._id && (
                                    <div className="px-6 pb-4 font-medium text-base text-black">{faqs.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
