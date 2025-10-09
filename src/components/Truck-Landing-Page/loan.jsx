import React, { useState } from "react";
import { useCategory } from "@/hooks/useContext";
import axios from "axios";
import API from "@/utils/api";

const Loan = () => {
    const { categoryData } = useCategory();

    const [form, setForm] = useState({
        name: "",
        mobileNumber: "",
        city: "",
        status: 'loan'
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post(`${API.HOST}/api/loan/createloan/${categoryData[0]?._id}`, {
                ...form,
            });

            if (res.data.success === true) {
                setMessage("✅ Loan application submitted successfully!");
                setForm({ name: "", mobileNumber: "", city: "" });
            } else {
                setMessage("⚠️ Something went wrong. Try again.");
            }
        } catch (error) {
            console.error(error);
            setMessage("❌ Error submitting loan application.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="font-bold md:text-[24px] text-lg capitalize">
                {categoryData[0]?.productName} Loan Offers
            </h2>

            <form
                onSubmit={handleSubmit}
                className="bg-[#FFE8DE] p-5 md:grid block grid-cols-4 gap-3 mt-5 rounded-md"
            >
                {/* Name */}
                <div className="bg-white rounded-md p-2 md:mb-0 mb-4 focus-within:ring-2 focus-within:ring-[#FA7436] transition-all">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="outline-none w-full"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* mobileNumber */}
                <div className="bg-white rounded-md p-2 md:mb-0 mb-4 focus-within:ring-2 focus-within:ring-[#FA7436] transition-all">
                    <input
                        type="number"
                        name="mobileNumber"
                        placeholder="Mobile No."
                        className="outline-none w-full"
                        value={form.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* City */}
                <div className="flex gap-3 items-center bg-white rounded-md p-2 md:mb-0 mb-4 focus-within:ring-2 focus-within:ring-[#FA7436] transition-all">
                    <img src="/icons/location.svg" alt="location" />
                    <input
                        type="text"
                        name="city"
                        placeholder="Enter Your City"
                        className="outline-none w-full"
                        value={form.city}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Submit */}
                <div className="flex justify-center items-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#FA7436] text-white text-sm font-medium px-4 py-3 rounded-md cursor-pointer disabled:opacity-60 hover:bg-[#e9632c] transition"
                    >
                        {loading ? "Submitting..." : "Apply Loan"}
                    </button>
                </div>
            </form>

            {message && (
                <p className="text-center mt-3 text-sm font-medium">{message}</p>
            )}
        </div>
    );
};

export default Loan;
