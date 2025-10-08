import HomeCompareTruck from "@/components/Home-Landing-page/HomeCompareTruck";
import PopularTruck from "@/components/Home-Landing-page/PopularTruck";
import Faq from "@/components/Truck-Landing-Page/FAQ";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import API from "@/utils/api";

const filterOptions = {
    Brands: [
        { id: "Ashok Leyland", value: "ashok-leyland" },
        { id: "Tata", value: "tata" },
        { id: "Eicher", value: "eicher" },
        { id: "Mahindra", value: "mahindra" },
        { id: "Volvo", value: "volvo" },
    ],
    "Price Range": [
        { id: "Under 10 Lakh", value: "under-10-lakh" },
        { id: "10–20 Lakh", value: "10-20-lakh" },
        { id: "20–30 Lakh", value: "20-30-lakh" },
        { id: "30–40 Lakh", value: "30-40-lakh" },
        { id: "40–50 Lakh", value: "40-50-lakh" },
        { id: "Above 50 Lakh", value: "above-50-lakh" },
    ],
    "Fuel Type": [
        { id: "Diesel", value: "diesel" },
        { id: "Petrol", value: "petrol" },
        { id: "CNG", value: "cng" },
        { id: "Electric", value: "electric" },
        { id: "Hydrogen", value: "hydrogen" },
        { id: "LNG", value: "lng" },
    ],
    GVW: [
        { id: "Under 2.5 ton", value: "under-2.5-ton" },
        { id: "2.5-5 ton", value: "2.5-5-ton" },
        { id: "5-10 ton", value: "5-10-ton" },
        { id: "10-15 ton", value: "10-15-ton" },
        { id: "15-20 ton", value: "15-20-ton" },
        { id: "25-30 ton", value: "25-30-ton" },
        { id: "30-35 ton", value: "30-35-ton" },
        { id: "35-40 ton", value: "35-40-ton" },
        { id: "40-45 ton", value: "40-45-ton" },
        { id: "45-50 ton", value: "45-50-ton" },
        { id: "Above 50 ton", value: "above-50-ton" },
    ],
    "Emission Norm": [
        { id: "BS III", value: "bs-iii" },
        { id: "BS IV", value: "bs-iv" },
        { id: "BS VI - II", value: "bs-vi-ii" },
        { id: "BS VI", value: "bs-vi" },
        { id: "Electric", value: "electric" },
    ],
    "No of Tyres": [
        { id: "4 wheels", value: "4" },
        { id: "6 wheels", value: "6" },
        { id: "10 wheels", value: "10" },
        { id: "12 wheels", value: "12" },
        { id: "14 wheels", value: "14" },
        { id: "16 wheels", value: "16" },
        { id: "18 wheels", value: "18" },
        { id: "22 wheels", value: "22" },
    ],
    Mileage: [
        { id: "1-5 mileage", value: "1-5-mileage" },
        { id: "5-10 mileage", value: "5-10-mileage" },
        { id: "10-15 mileage", value: "10-15-mileage" },
        { id: "15-20 mileage", value: "15-20-mileage" },
        { id: "20-25 mileage", value: "20-25-mileage" },
        { id: "25-30 mileage", value: "25-30-mileage" },
        { id: "Above 30 mileage", value: "above-30-mileage" },
    ],

    Payload: [
        { id: "under 2 Ton", value: "under-2-ton" },
        { id: "2–5 Ton", value: "2-5-ton" },
        { id: "5–10 Ton", value: "5-10-ton" },
        { id: "above 10 Ton", value: "above-10-ton" },
    ],
};

// Helper to get display label from filter value
const getFilterLabel = (value) => {
    for (const options of Object.values(filterOptions)) {
        const found = options.find((opt) => opt.value === value);
        if (found) return found.id;
    }
    return value;
};

export default function TruckListing() {
    const router = useRouter();
    const { slug } = router.query;

    const [filters, setFilters] = useState({});
    const [trucks, setTrucks] = useState([]);
    const [loading, setLoading] = useState(false);

    // Set default filter from slug
    useEffect(() => {
        if (slug) {
            Object.entries(filterOptions).forEach(([filterName, options]) => {
                const match = options.find((opt) => opt.value === slug);
                if (match) {
                    setFilters((prev) => ({
                        ...prev,
                        [filterName]: match.value,
                    }));
                }
            });
        }
    }, [slug]);

    // Fetch trucks when filters change
    useEffect(() => {
        const fetchTrucks = async () => {
            const filter_url = Object.values(filters).filter(Boolean).join('+') || slug || "";
            setLoading(true);
            try {
                const res = await axios.post(`${API.HOST}/api/category/filterPreview/truck`, {
                    page: 1,
                    filter_url,
                    sortBy: "rating",
                    limit: 16,
                });
                setTrucks(res.data.data?.data || []);
            } catch (error) {
                setTrucks([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTrucks();
    }, [filters, slug]);

    const handleFilterChange = (filterName, value) => {
        const newFilters = { ...filters, [filterName]: value };
        setFilters(newFilters);

        // Build new filter_url for navigation
        const filter_url = Object.values(newFilters).filter(Boolean).join('+');
        router.push(`/truck/${filter_url}`);
    };

    // Get the first filter value from filters or slug
    const filter_url = Object.values(filters).filter(Boolean).join('+') || slug || "";
    // For heading, show only the first filter (main category)
    const mainFilter = filter_url.split('+')[0];
    const headingLabel = getFilterLabel(mainFilter);

    return (
        <section className="bg-white">
            <div className="mb-10">
                {/* Filters */}
                <div className="bg-[#FFF8F4] p-5 overflow-x-auto scrollbar-hide">
                    <div className="flex justify-start items-center space-x-4 min-w-max">
                        {Object.entries(filterOptions).map(([filterName, options]) => (
                            <select
                                key={filterName}
                                value={filters[filterName] || ""}
                                onChange={(e) => handleFilterChange(filterName, e.target.value)}
                                className="border bg-white cursor-pointer px-4 rounded-sm py-2 text-sm text-gray-700 flex-shrink-0"
                            >
                                <option value="">{filterName}</option>
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.id}
                                    </option>
                                ))}
                            </select>
                        ))}
                        <button
                            onClick={() => setFilters({})}
                            className="text-[#FA7436] px-4 py-1 bg-white flex-shrink-0"
                        >
                            Reset All
                        </button>
                    </div>
                </div>

                {/* Section Heading */}
                <div className="mx-4 md:mx-10">
                    <div className="mb-6 bg-[#FFF8F4] my-8 p-5 ">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Best {headingLabel} in India
                        </h2>
                        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                            Are you planning to buy a truck {headingLabel ? `(${headingLabel})` : ""} budget? If yes, then
                            we have put together a complete list of trucks {headingLabel ? `(${headingLabel})` : ""} with
                            updated specifications and variants in India. Companies like Tata,
                            Eicher, Ashok Leyland, OSM and others manufacture some of the best
                            trucks {headingLabel ? `(${headingLabel})` : ""}. Trucks in this budget fall under the
                            small commercial vehicle category in India. The pickup and mini...
                            <span className="text-red-500 cursor-pointer"> Read More</span>
                        </p>
                    </div>

                    {/* Truck Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {loading ? (
                            <p className="col-span-4 text-center">Loading...</p>
                        ) : trucks.length > 0 ? (
                            trucks.map((truck, i) => (
                                <div
                                    key={truck.id || i}
                                    className="border border-gray-300 rounded-md p-3 overflow-hidden bg-white"
                                >
                                    <img
                                        src={truck.image ? `${process.env.NEXT_PUBLIC_S3_URL}${truck.image}` : "/images/img1.svg"}
                                        alt={truck.productName}
                                        className="w-full h-32 object-cover rounded-lg mb-4"
                                    />
                                    <div className="my-5">
                                        <h3 className="text-sm font-semibold text-[#254154]">
                                            {truck.productName}
                                        </h3>
                                        <p className="text-red-500 text-sm font-medium mt-1">
                                            ₹ {truck.minPrice} – {truck.maxPrice} Lakh
                                        </p>
                                        <hr className="my-3" />
                                        <div className="text-xs text-[#254154] mt-3">
                                            <div className="flex flex-col gap-5">
                                                <div className="grid grid-cols-3 gap-5">
                                                    <div className="flex flex-col gap-1">
                                                        <p>Engine Disp</p>
                                                        <p className="text-black">{truck.keyFeature?.[0]?.engineDisplacement || "-"}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p>Mileage</p>
                                                        <p className="text-black">{truck.keyFeature?.[0]?.mileage || "-"}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p>GVW</p>
                                                        <p className="text-black">{truck.keyFeature?.[0]?.GVW || "-"}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="flex flex-col gap-1">
                                                        <p>No. Of Tyres</p>
                                                        <p className="text-black">{truck.keyFeature?.[0]?.noOfTyres || "-"}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p>Payload</p>
                                                        <p className="text-black">{truck.keyFeature?.[0]?.payload || "-"}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p>Fuel Tank</p>
                                                        <p className="text-black">{truck.keyFeature?.[0]?.fuelTankCapacity || "-"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full cursor-pointer mt-4 py-2 border border-red-500 text-red-500 text-sm font-medium rounded-sm hover:bg-red-50 transition">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-4 text-center">No trucks found</p>
                        )}
                    </div>
                </div>
            </div>
            <PopularTruck />
            <HomeCompareTruck />
            <Faq />
        </section>
    );
}
