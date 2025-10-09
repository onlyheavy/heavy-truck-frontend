import React, { useState } from "react";
import axios from "axios";
import API from "@/utils/api"; // ✅ Ensure API.HOST is defined

const LoanForm = ({ onClose, id, status }) => {
    const [form, setForm] = useState({ name: "", mobileNumber: "", city: "", status: status });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${API.HOST}/api/brochure/createBrochure/${id}`,
                form
            );

            if (response.data.success === true) {
                onClose(); // close modal after success
            }
        } catch (error) {
            console.error("Error submitting brochure form:", error);
            alert("Failed to fetch brochure. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* 🔹 Background Blur Layer */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-md"
                onClick={onClose}
            ></div>

            {/* 🔹 Modal Content */}
            <div className="relative bg-white rounded-xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-6 w-[90%] max-w-3xl border border-gray-100 animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl border-2 p-1 px-2 hover:bg-gray-50 cursor-pointer rounded-full"
                >
                    ✕
                </button>

                {/* LEFT SIDE - Form */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="text-orange-500 text-2xl">⚡</div>
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold mb-4">
                        Fill the form below to download the latest brochure (PDF)
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                name="mobileNumber"
                                placeholder="Enter Number"
                                value={form.mobileNumber}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">City</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="Enter Your City Name"
                                value={form.city}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 rounded-md text-white transition cursor-pointer ${loading
                                ? "bg-orange-300"
                                : "bg-orange-500 hover:bg-orange-400"
                                }`}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>

                {/* RIGHT SIDE - Image (hidden on mobile) */}
                <div className="hidden md:flex flex-1 pt-2 justify-center items-center">
                    <img
                        src="/vehicle-road.png"
                        alt="Truck"
                        className="rounded-lg w-full h-100 object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoanForm;
