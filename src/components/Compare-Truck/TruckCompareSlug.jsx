import React, { useState, useEffect } from "react";
import Image from "next/image";
import API from "@/utils/api";
import axios from "axios";
import Head from "next/head";

const TruckCompareSlug = ({ rankData }) => {
    const [selectedTrucks, setSelectedTrucks] = useState([
        { brand: "", truck: "", truckId: "", truckData: null },
        { brand: "", truck: "", truckId: "", truckData: null },
        { brand: "", truck: "", truckId: "", truckData: null },
    ]);
    const [availableTrucks, setAvailableTrucks] = useState([[], [], []]);
    const [isEditing, setIsEditing] = useState([false, false, false]);
    const brands = ["Tata Motors", "Mahindra", "Ashok Leyland", "BharatBenz", "Eicher", "Force Motors"];

    // Fetch trucks for each brand dropdown
    useEffect(() => {
        selectedTrucks.forEach((sel, idx) => {
            if (sel.brand) {
                axios.get(`${API.HOST}/api/category/getProductName/${encodeURIComponent(sel.brand)}`)
                    .then(response => {
                        if (response?.data?.success) {
                            setAvailableTrucks(prev => {
                                const copy = [...prev];
                                copy[idx] = response.data.data;
                                return copy;
                            });
                        }
                    });
            } else {
                setAvailableTrucks(prev => {
                    const copy = [...prev];
                    copy[idx] = [];
                    return copy;
                });
            }
        });
    }, [selectedTrucks.map(sel => sel.brand).join('|')]);

    // Fetch truck data for each selected truck
    useEffect(() => {
        selectedTrucks.forEach((sel, idx) => {
            if (sel.truckId) {
                axios.get(`${API.HOST}/api/category/thirdCompare/${sel.truckId}`)
                    .then(response => {
                        setSelectedTrucks(prev => {
                            const copy = prev.map((truck, i) =>
                                i === idx
                                    ? { ...truck, truckData: response?.data?.success ? response.data.data[0] : null }
                                    : truck
                            );
                            return copy;
                        });
                    });
            } else {
                setSelectedTrucks(prev => {
                    const copy = prev.map((truck, i) =>
                        i === idx
                            ? { ...truck, truckData: null }
                            : truck
                    );
                    return copy;
                });
            }
        });
    }, [selectedTrucks.map(sel => sel.truckId).join('|')]);

    // Helper to update dropdowns
    const handleBrandChange = (idx, brand) => {
        setSelectedTrucks(prev => {
            const copy = [...prev];
            copy[idx] = { brand, truck: "", truckId: "", truckData: null };
            return copy;
        });
    };
    const handleTruckChange = (idx, truckName) => {
        const truckObj = availableTrucks[idx].find(truck => truck.productName === truckName);
        setSelectedTrucks(prev => {
            const copy = [...prev];
            copy[idx].truck = truckName;
            copy[idx].truckId = truckObj ? truckObj._id : "";
            return copy;
        });
    };

    // Label maps for each section
    const performanceLabels = {
        engineType: "Engine Type",
        engineCylinders: "Engine Cylinders",
        engineDisplacement: "Engine Displacement",
        enginePower: "Engine Power",
        engineRPM: "Engine RPM",
        torque: "Torque",
        fuelType: "Fuel Type",
        fuelTankCapacity: "Fuel Tank Capacity",
        mileage: "Mileage",
        gradeability: "Gradeability",
        emissionNorm: "Emission Norm",
        maxSpeed: "Max Speed",
        battery: "Battery"
    };

    const dimensionsLabels = {
        overallLength: "Overall Length",
        overallWidthh: "Overall Width",
        overallHeight: "Overall Height",
        wheelBase: "Wheelbase",
        groundClearance: "Ground Clearance",
        turningRadius: "Minimum Turning Radius"
    };

    const brakesLabels = {
        frontSuspension: "Front Suspension",
        rearSuspension: "Rear Suspension",
        brakeType: "Brakes Type",
        abs: "ABS",
        parkingBrakes: "Parking Brakes",
        antiRollBar: "Anti Roll Bar"
    };

    const transmissionLabels = {
        gearBox: "Gear Box",
        transmissionType: "Transmission Type",
        axleConfiguration: "Axle Configuration",
        frontAxle: "Front Axle",
        rearAxle: "Rear Axle",
        GrossVehicleWeight: "Gross Vehicle Weight",
        kerbWeight: "Kerb Weight",
        payload: "Payload"
    };

    const cabinLabels = {
        chassisType: "Chassis Type",
        cabinType: "Cabin Type",
        tiltableCabin: "Tiltable Cabin",
        bodyOption: "Body Option",
        applicationType: "Application Type",
        seatingCapacity: "Seating Capacity"
    };

    const interiorLabels = {
        ac: "AC",
        adjustableDriverSeat: "Adjustable Driver Seat",
        seatTypes: "Seat Types",
        armRest: "Arm Rest",
        tiltableSteering: "Tiltable Steering",
        adjustableSteering: "Adjustable Steering",
        driverInfoDisplay: "Driver Info Display",
        mobileChargingPoint: "Mobile Charging Point",
        seatBelts: "Seat Belts",
        hillHold: "Hill Hold",
        cruiseControl: "Cruise Control",
        navigationSystem: "Navigation System",
        telematics: "Telematics",
        steeringType: "Steering Type",
        entertainPack: "Entertainment Pack",
        emergencyStart: "Emergency Start"
    };

    const tyreLabels = {
        frontTyre: "Front Tyre",
        rearTyre: "Rear Tyre",
        numberOfTyres: "Number of Tyres",
        tubelessTyres: "Tubeless Tyre"
    };

    const safetyLabels = {
        fogLights: "Fog Light",
        emergencyExit: "Emergency Exit",
        sideWindow: "Side Window",
        luggageBoot: "Luggage Boot",
        hornack: "Hat Rack",
        firstAidKit: "First Aid Kit"
    };

    const othersLabels = {
        accessories: "Accessories",
        warranty: "Warranty"
    };

    // Helper function to render spec rows
    function renderSpecRows(section, labels) {
        const specObj = selectedTrucks.find(t => t.truckData)?.truckData?.spec?.[section]?.[0] || {};
        return Object.keys(specObj)
            .filter(key => key !== "_id")
            .map((key, index) => (
                <div key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    {/* Mobile/Tablet Layout */}
                    <div className="lg:hidden">
                        <div className="p-3 md:p-4 font-semibold text-sm md:text-base border-b border-gray-200 bg-gray-100">
                            {labels[key] || key}
                        </div>
                        <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4">
                            {selectedTrucks.map((truck, idx) => (
                                <div key={idx} className="text-start text-sm md:text-base break-words">
                                    {truck.truckData?.spec?.[section]?.[0]?.[key] !== undefined
                                        ? truck.truckData?.spec?.[section]?.[0]?.[key].toString()
                                        : "-"}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-center p-4">
                        <div className="font-semibold text-base break-words">{labels[key] || key}</div>
                        {selectedTrucks.map((truck, idx) => (
                            <div key={idx} className="text-start text-base break-words">
                                {truck.truckData?.spec?.[section]?.[0]?.[key] !== undefined
                                    ? truck.truckData?.spec?.[section]?.[0]?.[key].toString()
                                    : "-"}
                            </div>
                        ))}
                    </div>
                </div>
            ));
    }

    return (
        <>
            <Head>
                {/* <title>{rankData?.metaTitle}</title> */}
                {/* {rankData?.metaDescription && (
          <meta name="description" content={rankData?.metaDescription} />
        )} */}
                {/* <meta
          name="robots"
          content={`${rankData?.searchIndex ? 'index, follow' : 'noindex, nofollow'}, ${rankData?.imageIndex ? 'max-image-preview:large' : 'noimageindex'}`}
        /> */}
                {/* <meta name="viewport" content="width=device-width, initial-scale=1" />
        {rankData?.canonicalUrl ? (
          <link rel="canonical" href={`https://onlyheavy.com/compare/${rankData.canonicalUrl}`} />
        ) : (
          <link
            rel="canonical"
            href={`https://onlyheavy.com/compare${rankData.slug}`}
          />
        )} */}
                {/* {rankData?.metaTitle && (
          <meta property="og:title" content={rankData?.metaTitle} />
        )}
        {rankData?.metaDescription && (
          <meta property="og:description" content={rankData?.metaDescription} />
        )} */}
                {/* <meta property="og:image" content="https://only-heavy.s3.eu-north-1.amazonaws.com/favicons.png" />
        <meta
          property="og:url"
          content={
            rankData?.canonicalUrl || `https://onlyheavy.com/compare/${rankData?.slug}`
          }
        /> */}
                {/* Twitter Meta Tag */}
                {/* <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={rankData?.metaTitle}
        /> */}
                {/* <meta
          name="twitter:description"
          content={
            rankData?.metaDescription}
        /> */}
                {/* <meta name="twitter:image" content="https://only-heavy.s3.eu-north-1.amazonaws.com/favicons.png" /> */}
            </Head>
            <div className="">
                <div className="">
                    <div className="">
                        <Image
                            src="/images/truck-header.png"
                            alt="Truck Banner"
                            width={1200}
                            height={200}
                            className="w-full h-16 md:h-28 rounded-lg"
                        />
                    </div>

                    {selectedTrucks.some(t => t.truckData) && (
                        <h1 className="text-lg md:text-xl font-bold my-8 text-center capitalize">
                            {selectedTrucks
                                .filter(t => t.truckData)
                                .map(t => t.truckData.productName)
                                .join(" vs ")}
                            {" "}
                            <span className="text-orange-500">Comparison</span>
                        </h1>
                    )}

                    <div className="flex flex-col md:flex-row flex-wrap justify-center items-stretch gap-4 my-8">
                        {[0, 1, 2].map(idx => (
                            <div key={idx} className="w-full md:w-auto md:flex-1 md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-md text-center flex flex-col">
                                {selectedTrucks[idx].truckData ? (
                                    <>
                                        <div className="relative">
                                            <img
                                                src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${selectedTrucks[idx].truckData?.productImage}`}
                                                alt={selectedTrucks[idx].truckData?.productName || `Truck ${idx + 1}`}
                                                width={350}
                                                height={250}
                                                className="rounded-t-lg object-cover w-full h-36 md:h-52"
                                            />
                                            <button
                                                className="absolute top-2 right-2 px-3 py-1 text-xs md:text-sm bg-white/90 border border-orange-500 text-orange-500 cursor-pointer rounded hover:bg-white"
                                                onClick={() => setIsEditing(prev => prev.map((v, i) => i === idx ? !v : v))}
                                                aria-label={`Edit truck ${idx + 1}`}
                                            >
                                                {isEditing[idx] ? 'Close' : 'Edit'}
                                            </button>
                                        </div>
                                        <div className="p-4 flex-grow flex flex-col">
                                            <h3 className="font-semibold text-sm md:text-base capitalize">
                                                {selectedTrucks[idx].truckData?.productName}
                                            </h3>
                                            <p className="font-bold text-sm md:text-lg mt-1">
                                                ₹ {selectedTrucks[idx].truckData?.minPrice} - {selectedTrucks[idx].truckData?.maxPrice} Lakh*
                                            </p>
                                            {isEditing[idx] && (
                                                <div className="mt-4 text-left">
                                                    <select
                                                        className="w-full mb-3 p-2 border rounded bg-gray-50 text-left text-gray-700 text-sm"
                                                        value={selectedTrucks[idx].brand}
                                                        onChange={e => handleBrandChange(idx, e.target.value)}
                                                    >
                                                        <option value="">Select Brand</option>
                                                        {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                                                    </select>
                                                    <select
                                                        className="w-full p-2 border rounded bg-gray-50 text-left text-gray-700 text-sm"
                                                        value={selectedTrucks[idx].truck}
                                                        onChange={e => handleTruckChange(idx, e.target.value)}
                                                        disabled={!selectedTrucks[idx].brand}
                                                    >
                                                        <option value="">Select Truck</option>
                                                        {availableTrucks[idx]?.map(truck => (
                                                            <option key={truck._id} value={truck.productName}>{truck.productName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full p-4 flex flex-col items-center justify-center relative">
                                        <button
                                            className="absolute top-2 right-2 px-3 py-1 text-xs md:text-sm bg-white/90 border border-orange-500 text-orange-500 cursor-pointer rounded hover:bg-white"
                                            onClick={() => setIsEditing(prev => prev.map((v, i) => i === idx ? !v : v))}
                                            aria-label={`Edit truck ${idx + 1}`}
                                        >
                                            {isEditing[idx] ? 'Close' : 'Edit'}
                                        </button>
                                        <div className="bg-gray-100 rounded-full p-4 mb-4">
                                            <Image src="/icons/truck.svg" alt="truck icon" width={50} height={50} />
                                        </div>
                                        <select
                                            className="w-full mb-4 p-3 border rounded bg-gray-50 text-left text-gray-500 text-sm"
                                            value={selectedTrucks[idx].brand}
                                            onChange={e => handleBrandChange(idx, e.target.value)}
                                        >
                                            <option value="">Select Brand</option>
                                            {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                                        </select>
                                        <select
                                            className="w-full p-3 border rounded bg-gray-50 text-left text-gray-500 text-sm"
                                            value={selectedTrucks[idx].truck}
                                            onChange={e => handleTruckChange(idx, e.target.value)}
                                            disabled={!selectedTrucks[idx].brand}
                                        >
                                            <option value="">Select Truck</option>
                                            {availableTrucks[idx]?.map(truck => (
                                                <option key={truck._id} value={truck.productName}>{truck.productName}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Sticky Header */}
                    <div className="md:hidden sticky top-0 z-50 bg-gray-50 w-full border border-gray-200 rounded-md p-3 shadow-sm mb-4">
                        <div className="grid grid-cols-3 gap-2">
                            {/* Truck 1 */}
                            {selectedTrucks[0].truckData && (
                                <div className="flex flex-col items-center bg-white border rounded-lg shadow p-2">
                                    <img
                                        src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${selectedTrucks[0].truckData?.productImage}`}
                                        alt={selectedTrucks[0].truckData?.productName}
                                        className="w-12 h-8 object-contain mb-1"
                                    />
                                    <h4 className="text-xs font-semibold text-center leading-tight">
                                        {selectedTrucks[0].truckData?.productName}
                                    </h4>
                                    <p className="text-xs text-gray-600">
                                        ₹{selectedTrucks[0].truckData?.minPrice}L
                                    </p>
                                </div>
                            )}

                            {/* Truck 2 */}
                            {selectedTrucks[1].truckData && (
                                <div className="flex flex-col items-center bg-white border rounded-lg shadow p-2">
                                    <img
                                        src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${selectedTrucks[1].truckData?.productImage}`}
                                        alt={selectedTrucks[1].truckData?.productName}
                                        className="w-12 h-8 object-contain mb-1"
                                    />
                                    <h4 className="text-xs font-semibold text-center leading-tight">
                                        {selectedTrucks[1].truckData?.productName}
                                    </h4>
                                    <p className="text-xs text-gray-600">
                                        ₹{selectedTrucks[1].truckData?.minPrice}L
                                    </p>
                                </div>
                            )}

                            {/* Truck 3 - Only if selected */}
                            {selectedTrucks[2].truckData && (
                                <div className="flex flex-col items-center bg-white border rounded-lg shadow p-2">
                                    <img
                                        src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${selectedTrucks[2].truckData?.productImage}`}
                                        alt={selectedTrucks[2].truckData?.productName}
                                        className="w-12 h-8 object-contain mb-1"
                                    />
                                    <h4 className="text-xs font-semibold text-center leading-tight">
                                        {selectedTrucks[2].truckData?.productName}
                                    </h4>
                                    <p className="text-xs text-gray-600">
                                        ₹{selectedTrucks[2].truckData?.minPrice || '—'}L
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Desktop Sticky Header */}
                    <div className="hidden md:block sticky top-0 z-50 bg-gray-50 w-full border border-gray-200 rounded-md p-4 shadow-sm">
                        <div className="grid grid-cols-4 gap-5">
                            {/* Left Description */}
                            <div className="">
                                <p className="font-semibold text-sm md:text-base text-gray-800">
                                    Compare trucks helps you make an informed purchase decision.
                                </p>
                            </div>

                            {/* Truck 1 */}
                            {selectedTrucks[0].truckData && (
                                <div className="flex items-center bg-white border rounded-lg shadow p-3 w-full ">
                                    <img
                                        src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${selectedTrucks[0].truckData?.productImage}`}
                                        alt={selectedTrucks[0].truckData?.productName}
                                        className="w-16 h-12 object-contain mr-3"
                                    />
                                    <div>
                                        <h4 className="text-sm font-semibold whitespace-nowrap">
                                            {selectedTrucks[0].truckData?.productName}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            From ₹ {selectedTrucks[0].truckData?.minPrice} Lakh
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Truck 2 */}
                            {selectedTrucks[1].truckData && (
                                <div className="flex items-center bg-white border rounded-lg shadow p-3 w-full ">
                                    <img
                                        src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${selectedTrucks[1].truckData?.productImage}`}
                                        alt={selectedTrucks[1].truckData?.productName}
                                        className="w-16 h-12 object-contain mr-3"
                                    />
                                    <div>
                                        <h4 className="text-sm font-semibold whitespace-nowrap">
                                            {selectedTrucks[1].truckData?.productName}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            From ₹ {selectedTrucks[1].truckData?.minPrice} Lakh
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Truck 3 - Only if selected */}
                            {selectedTrucks[2].truckData && (
                                <div className="flex items-center bg-white border rounded-lg shadow p-3 w-full ">
                                    <img
                                        src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${selectedTrucks[2].truckData?.productImage}`}
                                        alt={selectedTrucks[2].truckData?.productName}
                                        className="w-16 h-12 object-contain mr-3"
                                    />
                                    <div>
                                        <h4 className="text-sm font-semibold whitespace-nowrap">
                                            {selectedTrucks[2].truckData?.productName}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            From ₹ {selectedTrucks[2].truckData?.minPrice || '—'} Lakh
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Only show spec sections if at least one truck is selected */}
                    {selectedTrucks.some(t => t.truckData) && (
                        <>
                            {/* Performance Section */}
                            <div className="bg-white rounded-lg shadow-md my-8">
                                <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
                                    <h2 className="text-xl font-bold mb-2 md:mb-0">Performance</h2>
                                </div>
                                <div>
                                    {renderSpecRows("engine", performanceLabels)}
                                </div>
                            </div>

                            {/* Dimensions Section */}
                            <div className="bg-white rounded-lg shadow-md my-8">
                                <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
                                    <h2 className="text-xl font-bold mb-2 md:mb-0">Dimensions</h2>
                                </div>
                                <div>
                                    {renderSpecRows("dimensions", dimensionsLabels)}
                                </div>
                            </div>

                            {/* Brakes Suspension Section */}
                            <div className="bg-white rounded-lg shadow-md my-8">
                                <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
                                    <h2 className="text-xl font-bold mb-2 md:mb-0">Brakes Suspension</h2>
                                </div>
                                <div>
                                    {renderSpecRows("brakesAndSuspension", brakesLabels)}
                                </div>
                            </div>

                            {/* Transmission & Load Section */}
                            <div className="bg-white rounded-lg shadow-md my-8">
                                <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
                                    <h2 className="text-xl font-bold mb-2 md:mb-0">Transmission & Load</h2>
                                </div>
                                <div>
                                    {renderSpecRows("transmissionLoad", transmissionLabels)}
                                </div>
                            </div>

                            {/* Cabin & Body Section */}
                            <div className="bg-white rounded-lg shadow-md my-8">
                                <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
                                    <h2 className="text-xl font-bold mb-2 md:mb-0">Cabin & Body</h2>
                                </div>
                                <div>
                                    {renderSpecRows("cabinAndBody", cabinLabels)}
                                </div>
                            </div>

                            {/* Interior Features Section */}
                            <div className="bg-white rounded-lg shadow-md my-8">
                                <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
                                    <h2 className="text-xl font-bold mb-2 md:mb-0">Interior Features</h2>
                                </div>
                                <div>
                                    {renderSpecRows("interiorFeatures", interiorLabels)}
                                </div>
                            </div>

                            {/* Tyre Section */}
                            <div className="bg-white rounded-lg shadow-md my-8">
                                <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
                                    <h2 className="text-xl font-bold mb-2 md:mb-0">Tyre</h2>
                                </div>
                                <div>
                                    {renderSpecRows("tyre", tyreLabels)}
                                </div>
                            </div>

                            {/* Safety Features Section */}
                            <div className="bg-white rounded-lg shadow-md my-8">
                                <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
                                    <h2 className="text-xl font-bold mb-2 md:mb-0">Safety Features</h2>
                                </div>
                                <div>
                                    {renderSpecRows("safety", safetyLabels)}
                                </div>
                            </div>

                            {/* Others Section */}
                            <div className="bg-white rounded-lg shadow-md my-8">
                                <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
                                    <h2 className="text-xl font-bold mb-2 md:mb-0">Others</h2>
                                </div>
                                <div>
                                    {renderSpecRows("others", othersLabels)}
                                </div>
                            </div>
                        </>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
                        {selectedTrucks[0].truckData && (
                            <div className="bg-[#E4F5E9] p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-4">{selectedTrucks[0].truckData.productName}</h3>
                                <div className='flex items-center gap-2 mb-5'>
                                    <img src="/icons/like.svg" alt="like" />
                                    <p className='font-bold text-base'>Pros</p>
                                </div>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
                                    {selectedTrucks[0].truckData.pros.map((pro, index) => <li key={index}>{pro}</li>)}
                                </ul>
                            </div>
                        )}
                        {selectedTrucks[1].truckData && (
                            <div className="bg-[#E4F5E9] p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-4">{selectedTrucks[1].truckData.productName}</h3>
                                <div className='flex items-center gap-2 mb-5'>
                                    <img src="/icons/like.svg" alt="like" />
                                    <p className='font-bold text-base'>Pros</p>
                                </div>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
                                    {selectedTrucks[1].truckData.pros.map((pro, index) => <li key={index}>{pro}</li>)}
                                </ul>
                            </div>
                        )}

                        {selectedTrucks[2].truckData ? (
                            <div className="bg-[#E4F5E9] p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-4">{selectedTrucks[2].truckData?.productName}</h3>
                                <div className='flex items-center gap-2 mb-5'>
                                    <img src="/icons/like.svg" alt="like" />
                                    <p className='font-bold text-base'>Pros</p>
                                </div>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
                                    {selectedTrucks[2].truckData?.pros.map((pro, index) => <li key={index}>{pro}</li>)}
                                </ul>
                            </div>
                        ) : ""}

                    </div>
                </div>
            </div>
        </>
    );
};

export default TruckCompareSlug;
