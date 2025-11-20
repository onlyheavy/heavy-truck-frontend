import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import API from "@/utils/api";
import axios from "axios";
import Head from "next/head";

const TruckCompare = ({ truck1Data, truck2Data, rankData }) => {
  const [performanceSpecs, setPerformanceSpecs] = useState([]);
  const [dimensionSpecs, setDimensionSpecs] = useState([]);
  const [brakesSuspensionSpec, setBrakesSuspensionSpec] = useState([]);
  const [transmissionLoadSpec, setTransmissionLoadSpec] = useState([]);
  const [cabinAndBodySpec, setCabinAndBodySpec] = useState([]);
  const [interiorFeaturesSpec, setInteriorFeaturesSpec] = useState([]);
  const [tyreSpec, setTyreSpec] = useState([]);
  const [safetyFeaturesSpec, setSafetyFeaturesSpec] = useState([]);
  const [othersSpec, setOthersSpec] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedTruck, setSelectedTruck] = useState("");
  const [selectedTruckId, setSelectedTruckId] = useState("");
  const [selectedTruckData, setSelectedTruckData] = useState(null);
  const [isEditingThird, setIsEditingThird] = useState(false);
  const [isEditingFirst, setIsEditingFirst] = useState(false);
  const [isEditingSecond, setIsEditingSecond] = useState(false);

  // Truck 1 override states
  const [selectedBrand1, setSelectedBrand1] = useState("");
  const [availableTrucks1, setAvailableTrucks1] = useState([]);
  const [selectedTruckName1, setSelectedTruckName1] = useState("");
  const [selectedTruckId1, setSelectedTruckId1] = useState("");
  const [selectedTruckData1, setSelectedTruckData1] = useState(null);

  // Truck 2 override states
  const [selectedBrand2, setSelectedBrand2] = useState("");
  const [availableTrucks2, setAvailableTrucks2] = useState([]);
  const [selectedTruckName2, setSelectedTruckName2] = useState("");
  const [selectedTruckId2, setSelectedTruckId2] = useState("");
  const [selectedTruckData2, setSelectedTruckData2] = useState(null);
  const [trucksByBrand, setTrucksByBrand] = useState({
    Tata: ["Tata Ace", "Tata Intra", "Tata Yodha"],
    Mahindra: ["Mahindra Jeeto", "Mahindra Bolero", "Mahindra Supro"],
    "Ashok Leyland": [], // Will be fetched from API
    Eicher: ["Eicher Pro 2049", "Eicher Pro 2059XP", "Eicher Pro 3015"],
  });

  const brands = [
    "Ashok Leyland",
    "BharatBenz",
    "Blue Energy Motors",
    "E-Trio",
    "Eicher",
    "EKA",
    "Erisha E Mobility",
    "Euler EV",
    "Evage Motors",
    "Force Motors",
    "I-Board Mobility",
    "IPL Tech Electric",
    "ISUZU",
    "Jupiter Electric Mobility",
    "Kamaz",
    "Mahindra",
    "Man",
    "Maruti Suzuki",
    "Montra Electric",
    "Omega",
    "Premier Motors",
    "Propal",
    "Sany",
    "Scania",
    "SML ISUZU",
    "Switch Mobility",
    "Tata Motors",
    "Toyota",
    "Triton EV",
    "Volvo"
  ];
  const [availableTrucks, setAvailableTrucks] = useState([]);

  useEffect(() => {
    if (!truck1Data || !truck2Data) return;

    const t1 = selectedTruckData1 || truck1Data;
    const t2 = selectedTruckData2 || truck2Data;
    const truck3 = selectedTruckData;

    // Helper function to format values with fallback to "-"
    const formatValue = (value, unit = '') => {
      if (value === null || value === undefined || value === '' || value === 'undefined') {
        return '-';
      }
      return unit ? `${value} ${unit}`.trim() : `${value}`.trim();
    };

    setPerformanceSpecs([
      { label: "Engine Type", truck1: `${t1?.spec?.engine[0]?.engineType} `, truck2: `${t2?.spec?.engine[0]?.engineType} `, truck3: truck3 ? truck3?.spec?.engine[0]?.engineType : null },
      { label: "Engine Cylinders", truck1: t1?.spec?.engine[0]?.engineCylinders, truck2: t2?.spec?.engine[0]?.engineCylinders, truck3: truck3 ? truck3?.spec?.engine[0]?.engineCylinders : null },
      { label: "Engine Displacement", truck1: `${t1?.spec?.engine[0]?.engineDisplacement} cc`, truck2: `${t2?.spec?.engine[0]?.engineDisplacement} cc`, truck3: truck3 ? `${truck3?.spec?.engine[0]?.engineDisplacement} cc` : null },
      { label: "Engine Power", truck1: `${t1?.spec?.engine[0]?.enginePower} HP`, truck2: `${t2?.spec?.engine[0]?.enginePower} HP`, truck3: truck3 ? `${truck3?.spec?.engine[0]?.enginePower} HP` : null },
      { label: "Engine RPM", truck1: `${t1?.spec?.engine[0]?.engineRPM} RPM`, truck2: `${t2?.spec?.engine[0]?.engineRPM} RPM`, truck3: truck3 ? `${truck3?.spec?.engine[0]?.engineRPM} RPM` : null },
      { label: "Torque", truck1: `${t1?.spec?.engine[0]?.torque} Nm`, truck2: `${t2?.spec?.engine[0]?.torque} Nm`, truck3: truck3 ? `${truck3?.spec?.engine[0]?.torque} Nm` : null },
      { label: "Fuel Type", truck1: `${t1?.spec?.engine[0]?.fuelType}`, truck2: `${t2?.spec?.engine[0]?.fuelType}`, truck3: truck3 ? `${truck3?.spec?.engine[0]?.fuelType}` : null },
      { label: "Fuel Tank Capacity", truck1: `${t1?.spec?.engine[0]?.fuelTankCapacity} litres`, truck2: `${t2?.spec?.engine[0]?.fuelTankCapacity} litres`, truck3: truck3 ? `${truck3?.spec?.engine[0]?.fuelTankCapacity} litres` : null },
      { label: "Mileage", truck1: `${t1?.spec?.engine[0]?.mileage} km/l`, truck2: `${t2?.spec?.engine[0]?.mileage} km/l`, truck3: truck3 ? `${truck3?.spec?.engine[0]?.mileage} km/l` : null },
      { label: "Gradeability", truck1: `${t1?.spec?.engine[0]?.gradeability} %`, truck2: `${t2?.spec?.engine[0]?.gradeability} %`, truck3: truck3 ? `${truck3?.spec?.engine[0]?.gradeability} %` : null },
      { label: "Emission Norm", truck1: `${t1?.spec?.engine[0]?.emissionNorm} `, truck2: `${t2?.spec?.engine[0]?.emissionNorm} `, truck3: truck3 ? `${truck3?.spec?.engine[0]?.emissionNorm} ` : null },
      { label: "Max Speed", truck1: `${t1?.spec?.engine[0]?.maxSpeed} km/h`, truck2: `${t2?.spec?.engine[0]?.maxSpeed} km/h`, truck3: truck3 ? `${truck3?.spec?.engine[0]?.maxSpeed} km/h` : null },
      { label: "Battery", truck1: `${t1?.spec?.engine[0]?.battery} `, truck2: `${t2?.spec?.engine[0]?.battery} `, truck3: truck3 ? `${truck3?.spec?.engine[0]?.battery} ` : null },
      { label: "Charging Time", truck1: formatValue(t1?.spec?.engine[0]?.chargingTime, 'Hrs'), truck2: formatValue(t2?.spec?.engine[0]?.chargingTime, 'Hrs'), truck3: truck3 ? formatValue(truck3?.spec?.engine[0]?.chargingTime, 'Hrs') : null },
      { label: "Range", truck1: formatValue(t1?.spec?.engine[0]?.range, 'km'), truck2: formatValue(t2?.spec?.engine[0]?.range, 'km'), truck3: truck3 ? formatValue(truck3?.spec?.engine[0]?.range, 'km') : null },
    ]);

    setDimensionSpecs([
      { label: "Over All Length", truck1: `${t1?.spec?.dimensions[0]?.overallLength} mm `, truck2: `${t2?.spec?.dimensions[0]?.overallLength} mm`, truck3: truck3 ? `${truck3?.spec?.dimensions[0]?.overallLength} mm` : "-" },
      { label: "Over All Width", truck1: `${t1?.spec?.dimensions[0]?.overallWidthh} mm`, truck2: `${t2?.spec?.dimensions[0]?.overallWidthh} mm`, truck3: truck3 ? `${truck3?.spec?.dimensions[0]?.overallWidthh} mm` : "-" },
      { label: "Over All Height", truck1: `${t1?.spec?.dimensions[0]?.overallHeight} mm`, truck2: `${t2?.spec?.dimensions[0]?.overallHeight} mm`, truck3: truck3 ? `${truck3?.spec?.dimensions[0]?.overallHeight} mm` : "-" },
      { label: "Wheelbase", truck1: `${t1?.spec?.dimensions[0]?.wheelBase} mm`, truck2: `${t2?.spec?.dimensions[0]?.wheelBase} mm`, truck3: truck3 ? `${truck3?.spec?.dimensions[0]?.wheelBase} mm` : "-" },
      { label: "Ground Clearance", truck1: `${t1?.spec?.dimensions[0]?.groundClearance} mm`, truck2: `${t2?.spec?.dimensions[0]?.groundClearance} mm`, truck3: truck3 ? `${truck3?.spec?.dimensions[0]?.groundClearance} mm` : "-" },
      { label: "Minimum Turning Radius", truck1: `${t1?.spec?.dimensions[0]?.turningRadius} m`, truck2: `${t2?.spec?.dimensions[0]?.turningRadius} m`, truck3: truck3 ? `${truck3?.spec?.dimensions[0]?.turningRadius} m` : "-" },
    ]);

    setBrakesSuspensionSpec([
      { label: "Front Suspension", truck1: `${t1?.spec?.brakesAndSuspension[0]?.frontSuspension} `, truck2: `${t2?.spec?.brakesAndSuspension[0]?.frontSuspension} `, truck3: truck3 ? `${truck3?.spec?.brakesAndSuspension[0]?.frontSuspension} ` : "-" },
      { label: "Rear Suspension", truck1: `${t1?.spec?.brakesAndSuspension[0]?.rearSuspension} `, truck2: `${t2?.spec?.brakesAndSuspension[0]?.rearSuspension} `, truck3: truck3 ? `${truck3?.spec?.brakesAndSuspension[0]?.rearSuspension} ` : "-" },
      { label: "Brakes Type", truck1: `${t1?.spec?.brakesAndSuspension[0]?.brakeType} `, truck2: `${t2?.spec?.brakesAndSuspension[0]?.brakeType} `, truck3: truck3 ? `${truck3?.spec?.brakesAndSuspension[0]?.brakeType} ` : "-" },
      { label: "ABS", truck1: t1?.spec?.brakesAndSuspension[0]?.abs === 'true' ? 'Yes' : 'No', truck2: t2?.spec?.brakesAndSuspension[0]?.abs === 'true' ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.brakesAndSuspension[0]?.abs === 'true' ? 'Yes' : 'No' : "-" },
      { label: "Parking Brakes", truck1: t1?.spec?.brakesAndSuspension[0]?.parkingBrakes === 'true' ? 'Yes' : 'No', truck2: t2?.spec?.brakesAndSuspension[0]?.parkingBrakes === 'true' ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.brakesAndSuspension[0]?.parkingBrakes === 'true' ? 'Yes' : 'No' : "-" },
      {
        label: "Anti Roll Bar", truck1: t1?.spec?.brakesAndSuspension[0]?.antiRollBar === 'true' ? 'Yes' : 'No', truck2: t2?.spec?.brakesAndSuspension[0]?.antiRollBar === 'true' ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.brakesAndSuspension[0]?.antiRollBar === 'true' ? 'Yes' : 'No' : "-"
      },
    ]);

    setTransmissionLoadSpec([
      { label: "Gear box", truck1: `${t1?.spec?.transmissionLoad[0]?.gearBox}  `, truck2: `${t2?.spec?.transmissionLoad[0]?.gearBox} `, truck3: truck3 ? `${truck3?.spec?.transmissionLoad[0]?.gearBox} ` : "-" },
      { label: "Transmission Type", truck1: `${t1?.spec?.transmissionLoad[0]?.transmissionType} `, truck2: `${t2?.spec?.transmissionLoad[0]?.transmissionType} `, truck3: truck3 ? `${truck3?.spec?.transmissionLoad[0]?.transmissionType} ` : "-" },
      { label: "Axle Configuration", truck1: `${t1?.spec?.transmissionLoad[0]?.axleConfiguration} `, truck2: `${t2?.spec?.transmissionLoad[0]?.axleConfiguration} `, truck3: truck3 ? `${truck3?.spec?.transmissionLoad[0]?.axleConfiguration} ` : "-" },
      { label: "Front Axle", truck1: `${t1?.spec?.transmissionLoad[0]?.frontAxle} `, truck2: `${t2?.spec?.transmissionLoad[0]?.frontAxle} `, truck3: truck3 ? `${truck3?.spec?.transmissionLoad[0]?.frontAxle} ` : "-" },
      { label: "Gross Vehicle Weight", truck1: `${t1?.spec?.transmissionLoad[0]?.GrossVehicleWeight} kg `, truck2: `${t2?.spec?.transmissionLoad[0]?.GrossVehicleWeight} kg `, truck3: truck3 ? `${truck3?.spec?.transmissionLoad[0]?.GrossVehicleWeight} kg ` : "-" },
      { label: "Kerb Weight", truck1: `${t1?.spec?.transmissionLoad[0]?.kerbWeight} kg `, truck2: `${t2?.spec?.transmissionLoad[0]?.kerbWeight} kg `, truck3: truck3 ? `${truck3?.spec?.transmissionLoad[0]?.kerbWeight} kg ` : "-" },
      { label: "Payload", truck1: `${t1?.spec?.transmissionLoad[0]?.payload} kg `, truck2: `${t2?.spec?.transmissionLoad[0]?.payload} kg `, truck3: truck3 ? `${truck3?.spec?.transmissionLoad[0]?.payload} kg ` : "-" },
    ]);

    setCabinAndBodySpec([
      { label: "Chassis Type", truck1: `${t1?.spec?.cabinAndBody[0]?.chassisType || "-"}`, truck2: `${t2?.spec?.cabinAndBody[0]?.chassisType || "-"}`, truck3: truck3 ? `${truck3?.spec?.cabinAndBody[0]?.chassisType || "-"}` : "-" },
      { label: "Cabin Type", truck1: `${t1?.spec?.cabinAndBody[0]?.cabinType || "-"}`, truck2: `${t2?.spec?.cabinAndBody[0]?.cabinType || "-"}`, truck3: truck3 ? `${truck3?.spec?.cabinAndBody[0]?.cabinType || "-"}` : "-" },
      { label: "Tiltable Cabin", truck1: t1?.spec?.cabinAndBody[0]?.tiltableCabin === 'true' ? 'Yes' : 'No', truck2: t2?.spec?.cabinAndBody[0]?.tiltableCabin === 'true' ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.cabinAndBody[0]?.tiltableCabin === 'true' ? 'Yes' : 'No' : "-" },
      { label: "Body Option", truck1: `${t1?.spec?.cabinAndBody[0]?.bodyOption || "-"}`, truck2: `${t2?.spec?.cabinAndBody[0]?.bodyOption || "-"}`, truck3: truck3 ? `${truck3?.spec?.cabinAndBody[0]?.bodyOption || "-"}` : "-" },
      { label: "Application Type", truck1: `${t1?.spec?.cabinAndBody[0]?.applicationType || "-"}`, truck2: `${t2?.spec?.cabinAndBody[0]?.applicationType || "-"}`, truck3: truck3 ? `${truck3?.spec?.cabinAndBody[0]?.applicationType || "-"}` : "-" },
      { label: "Seating Capacity", truck1: `${t1?.spec?.cabinAndBody[0]?.seatingCapacity || "-"}`, truck2: `${t2?.spec?.cabinAndBody[0]?.seatingCapacity || "-"}`, truck3: truck3 ? `${truck3?.spec?.cabinAndBody[0]?.seatingCapacity || "-"}` : "-" }
    ]);

    setInteriorFeaturesSpec([
      { label: "AC", truck1: t1?.spec?.interiorFeatures[0]?.ac ? 'Yes' : 'No', truck2: t2?.spec?.interiorFeatures[0]?.ac ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.interiorFeatures[0]?.ac ? 'Yes' : 'No' : "-" },
      { label: "Adjustable Driver Seat", truck1: t1?.spec?.interiorFeatures[0]?.adjustableDriverSeat ? 'Yes' : 'No', truck2: t2?.spec?.interiorFeatures[0]?.adjustableDriverSeat ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.interiorFeatures[0]?.adjustableDriverSeat ? 'Yes' : 'No' : "-" },
      { label: "Seat Types", truck1: `${t1?.spec?.interiorFeatures[0]?.seatTypes} `, truck2: `${t2?.spec?.interiorFeatures[0]?.seatTypes} `, truck3: truck3 ? `${truck3?.spec?.interiorFeatures[0]?.seatTypes} ` : "-" },
      { label: "Arm Rest", truck1: t1?.spec?.interiorFeatures[0]?.armRest ? 'Yes' : 'No', truck2: t2?.spec?.interiorFeatures[0]?.armRest ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.interiorFeatures[0]?.armRest ? 'Yes' : 'No' : "-" },
      { label: "Tiltable Steering", truck1: t1?.spec?.interiorFeatures[0]?.tiltableSteering ? 'Yes' : 'No', truck2: t2?.spec?.interiorFeatures[0]?.tiltableSteering ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.interiorFeatures[0]?.tiltableSteering ? 'Yes' : 'No' : "-" },
      { label: "Adjustable Steering", truck1: t1?.spec?.interiorFeatures[0]?.adjustableSteering ? 'Yes' : 'No', truck2: t2?.spec?.interiorFeatures[0]?.adjustableSteering ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.interiorFeatures[0]?.adjustableSteering ? 'Yes' : 'No' : "-" },
      { label: "Driver Info Display", truck1: t1?.spec?.interiorFeatures[0]?.driverInfoDisplay ? 'Yes' : 'No', truck2: t2?.spec?.interiorFeatures[0]?.driverInfoDisplay ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.interiorFeatures[0]?.driverInfoDisplay ? 'Yes' : 'No' : "-" },
      { label: "Mobile Charging Point", truck1: t1?.spec?.interiorFeatures[0]?.mobileChargingPoint ? 'Yes' : 'No', truck2: t2?.spec?.interiorFeatures[0]?.mobileChargingPoint ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.interiorFeatures[0]?.mobileChargingPoint ? 'Yes' : 'No' : "-" },
      { label: "Seat Belts", truck1: t1?.spec?.interiorFeatures[0]?.seatBelts ? 'Yes' : 'No', truck2: t2?.spec?.interiorFeatures[0]?.seatBelts ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.interiorFeatures[0]?.seatBelts ? 'Yes' : 'No' : "-" },
      { label: "Hill Hold", truck1: t1?.spec?.interiorFeatures[0]?.hillHold ? 'Yes' : 'No', truck2: t2?.spec?.interiorFeatures[0]?.hillHold ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.interiorFeatures[0]?.hillHold ? 'Yes' : 'No' : "-" },
      { label: "Cruise Control", truck1: t1?.spec?.interiorFeatures[0]?.cruiseControl ? 'Yes' : 'No', truck2: t2?.spec?.interiorFeatures[0]?.cruiseControl ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.interiorFeatures[0]?.cruiseControl ? 'Yes' : 'No' : "-" },
      { label: " Navigation System", truck1: `${t1?.spec?.interiorFeatures[0]?.navigationSystem} `, truck2: `${t2?.spec?.interiorFeatures[0]?.navigationSystem} `, truck3: truck3 ? `${truck3?.spec?.interiorFeatures[0]?.navigationSystem} ` : "-" },
      { label: "Telematics", truck1: `${t1?.spec?.interiorFeatures[0]?.telematics} `, truck2: `${t2?.spec?.interiorFeatures[0]?.telematics} `, truck3: truck3 ? `${truck3?.spec?.interiorFeatures[0]?.telematics} ` : "-" },
      { label: "Steering Type", truck1: `${t1?.spec?.interiorFeatures[0]?.steeringType} `, truck2: `${t2?.spec?.interiorFeatures[0]?.steeringType} `, truck3: truck3 ? `${truck3?.spec?.interiorFeatures[0]?.steeringType} ` : "-" },
      { label: "Entertainment Pack", truck1: t1?.spec?.interiorFeatures[0]?.entertainPack ? 'Yes' : 'No', truck2: t2?.spec?.interiorFeatures[0]?.entertainPack ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.interiorFeatures[0]?.entertainPack ? 'Yes' : 'No' : "-" },
      { label: "Emergency Start", truck1: t1?.spec?.interiorFeatures[0]?.emergencyStart ? 'Yes' : 'No', truck2: t2?.spec?.interiorFeatures[0]?.emergencyStart ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.interiorFeatures[0]?.emergencyStart ? 'Yes' : 'No' : "-" }
    ]);

    setTyreSpec([
      { label: "Front Tyre", truck1: `${t1?.spec?.tyre[0]?.frontTyre}  `, truck2: `${t2?.spec?.tyre[0]?.frontTyre} `, truck3: truck3 ? `${truck3?.spec?.tyre[0]?.frontTyre} ` : "-" },
      { label: "Rear Tyre", truck1: `${t1?.spec?.tyre[0]?.rearTyre} `, truck2: `${t2?.spec?.tyre[0]?.rearTyre} `, truck3: truck3 ? `${truck3?.spec?.tyre[0]?.rearTyre} ` : "-" },
      { label: "Number of Tyres", truck1: `${t1?.spec?.tyre[0]?.numberOfTyres} `, truck2: `${t2?.spec?.tyre[0]?.numberOfTyres} `, truck3: truck3 ? `${truck3?.spec?.tyre[0]?.numberOfTyres} ` : "-" },
      { label: "Tubeless Tyre", truck1: t1?.spec?.tyre[0]?.tubelessTyres ? 'Yes' : 'No', truck2: t2?.spec?.tyre[0]?.tubelessTyres ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.tyre[0]?.tubelessTyres ? 'Yes' : 'No' : "-" }
    ]);

    setSafetyFeaturesSpec([
      { label: "Fog Light", truck1: t1?.spec?.safety[0]?.fogLights ? 'Yes' : 'No', truck2: t2?.spec?.safety[0]?.fogLights ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.safety[0]?.fogLights ? 'Yes' : 'No' : "-" },
      { label: "Emergency Exit", truck1: t1?.spec?.safety[0]?.emergencyExit ? 'Yes' : 'No', truck2: t2?.spec?.safety[0]?.emergencyExit ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.safety[0]?.emergencyExit ? 'Yes' : 'No' : "-" },
      { label: "Side Window", truck1: t1?.spec?.safety[0]?.sideWindow ? 'Yes' : 'No', truck2: t2?.spec?.safety[0]?.sideWindow ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.safety[0]?.sideWindow ? 'Yes' : 'No' : "-" },
      { label: "Luggage Boot", truck1: t1?.spec?.safety[0]?.luggageBoot ? 'Yes' : 'No', truck2: t2?.spec?.safety[0]?.luggageBoot ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.safety[0]?.luggageBoot ? 'Yes' : 'No' : "-" },
      { label: "Hat Rack", truck1: t1?.spec?.safety[0]?.hornack ? 'Yes' : 'No', truck2: t2?.spec?.safety[0]?.hornack ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.safety[0]?.hornack ? 'Yes' : 'No' : "-" },
      { label: "First Aid Kit", truck1: t1?.spec?.safety[0]?.firstAidKit ? 'Yes' : 'No', truck2: t2?.spec?.safety[0]?.firstAidKit ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.safety[0]?.firstAidKit ? 'Yes' : 'No' : "-" }
    ]);

    setOthersSpec([
      { label: "Accessories", truck1: t1?.spec?.others[0]?.accessories ? 'Yes' : 'No', truck2: t2?.spec?.others[0]?.accessories ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.others[0]?.accessories ? 'Yes' : 'No' : "-" },
      { label: "Warranty", truck1: t1?.spec?.others[0]?.warranty ? 'Yes' : 'No', truck2: t2?.spec?.others[0]?.warranty ? 'Yes' : 'No', truck3: truck3 ? truck3?.spec?.others[0]?.warranty ? 'Yes' : 'No' : "-" },
    ]);
  }, [truck1Data, truck2Data, selectedTruckData, selectedTruckData1, selectedTruckData2]);

  useEffect(() => {
    const fetchTrucksByBrand = async () => {
      if (!selectedBrand) return;

      try {
        const response = await axios.get(
          `${API.HOST}/api/category/getProductName/${encodeURIComponent(selectedBrand)}`
        );

        if (response?.data?.success) {
          const trucks = response?.data?.data?.map(item => item?.productName);
          setTrucksByBrand(prev => ({ ...prev, [selectedBrand]: trucks }));
        } else {
          console.warn(`Failed to fetch trucks for ${selectedBrand}:`, response?.data?.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message || error.message;
          console.warn(`Error ${status || ""}: ${message}`);
        } else {
          console.error("Unexpected error:", error);
        }

        setTrucksByBrand(prev => ({ ...prev, [selectedBrand]: [] }));


      }
    };

    fetchTrucksByBrand();
  }, [selectedBrand]);


  // Truck 1 brand change fetch
  useEffect(() => {
    const fetchTrucksForBrand1 = async () => {
      if (selectedBrand1) {
        try {
          const response = await axios.get(`${API.HOST}/api/category/getProductName/${encodeURIComponent(selectedBrand1)}`);
          if (response?.data?.success) {
            setAvailableTrucks1(response?.data?.data);
          } else {
            setAvailableTrucks1([]);
          }
        } catch (err) {
          setAvailableTrucks1([]);
        }
      } else {
        setAvailableTrucks1([]);
      }
    };
    fetchTrucksForBrand1();
  }, [selectedBrand1]);

  // Truck 2 brand change fetch
  useEffect(() => {
    const fetchTrucksForBrand2 = async () => {
      if (selectedBrand2) {
        try {
          const response = await axios.get(`${API.HOST}/api/category/getProductName/${encodeURIComponent(selectedBrand2)}`);
          if (response?.data?.success) {
            setAvailableTrucks2(response?.data?.data);
          } else {
            setAvailableTrucks2([]);
          }
        } catch (err) {
          setAvailableTrucks2([]);
        }
      } else {
        setAvailableTrucks2([]);
      }
    };
    fetchTrucksForBrand2();
  }, [selectedBrand2]);

  useEffect(() => {
    // Fetch trucks for the selected brand
    const fetchTrucksForBrand = async () => {
      if (selectedBrand) {
        try {
          const response = await axios.get(`${API.HOST}/api/category/getProductName/${encodeURIComponent(selectedBrand)}`);
          if (response?.data?.success) {
            // Store the full truck objects
            setAvailableTrucks(response?.data?.data);
          } else {
            setAvailableTrucks([]);
          }
        } catch (err) {
          setAvailableTrucks([]);
        }
      } else {
        setAvailableTrucks([]);
      }
    };
    fetchTrucksForBrand();
  }, [selectedBrand]);

  useEffect(() => {
    const fetchTruckData = async () => {
      if (selectedTruckId) {
        try {
          const response = await axios.get(`${API.HOST}/api/category/thirdCompare/${selectedTruckId}`);
          if (response?.data?.success) {
            setSelectedTruckData(response?.data?.data[0]);
          } else {
            setSelectedTruckData(null);
          }
        } catch (err) {
          setSelectedTruckData(null);
        }
      } else {
        setSelectedTruckData(null);
      }
    };
    fetchTruckData();
  }, [selectedTruckId]);

  // Fetch override data for Truck 1
  useEffect(() => {
    const fetchTruckData1 = async () => {
      if (selectedTruckId1) {
        try {
          const response = await axios.get(`${API.HOST}/api/category/thirdCompare/${selectedTruckId1}`);
          if (response?.data?.success) {
            setSelectedTruckData1(response?.data?.data[0]);
          } else {
            setSelectedTruckData1(null);
          }
        } catch (err) {
          setSelectedTruckData1(null);
        }
      } else {
        setSelectedTruckData1(null);
      }
    };
    fetchTruckData1();
  }, [selectedTruckId1]);

  // Fetch override data for Truck 2
  useEffect(() => {
    const fetchTruckData2 = async () => {
      if (selectedTruckId2) {
        try {
          const response = await axios.get(`${API.HOST}/api/category/thirdCompare/${selectedTruckId2}`);
          if (response?.data?.success) {
            setSelectedTruckData2(response?.data?.data[0]);
          } else {
            setSelectedTruckData2(null);
          }
        } catch (err) {
          setSelectedTruckData2(null);
        }
      } else {
        setSelectedTruckData2(null);
      }
    };
    fetchTruckData2();
  }, [selectedTruckId2]);

  if (!truck1Data || !truck2Data) {
    return <div className="text-center p-8 text-red-500">Error: Could not load truck comparison data. Please try again later.</div>;
  }

  return (
    <>
      <Head>
        <title>{rankData?.metaTitle}</title>
        {rankData?.metaDescription && (
          <meta name="description" content={rankData?.metaDescription} />
        )}
        <meta
          name="robots"
          content={`${rankData?.searchIndex ? 'index, follow' : 'noindex, nofollow'}, ${rankData?.imageIndex ? 'max-image-preview:large' : 'noimageindex'}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {rankData?.canonicalUrl ? (
          <link rel="canonical" href={`https://www.onlyheavy.com/${rankData.canonicalUrl}`} />
        ) : (
          <link
            rel="canonical"
            href={`https://onlyheavy.com/compare${rankData.slug}`}
          />
        )}
        {rankData?.metaTitle && (
          <meta property="og:title" content={rankData?.metaTitle} />
        )}
        {rankData?.metaDescription && (
          <meta property="og:description" content={rankData?.metaDescription} />
        )}
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_S3_URL}favicons.png`} />
        <meta
          property="og:url"
          content={
            rankData?.canonicalUrl || `https://onlyheavy.com/compare/${rankData?.slug}`
          }
        />
        {/* Twitter Meta Tag */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={rankData?.metaTitle}
        />
        <meta
          name="twitter:description"
          content={
            rankData?.metaDescription}
        />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_S3_URL}favicons.png`} />
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

          <h1 className="text-lg md:text-2xl font-bold my-8 text-center capitalize">
            {truck1Data?.productName} <span className="mx-3 text-orange-500">vs</span> {truck2Data?.productName}{" "}
            <span className="text-orange-500">Comparison</span>
          </h1>

          <div className="flex flex-col md:flex-row flex-wrap justify-center items-stretch gap-4 my-8">
            {/* Truck 1 */}
            <div className="w-full md:w-auto md:flex-1 md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-md text-center flex flex-col">
              <div className="relative">
                <img
                  src={`${process.env.NEXT_PUBLIC_S3_URL}${(selectedTruckData1 || truck1Data)?.productImage}`}
                  alt={(selectedTruckData1 || truck1Data)?.productName || "Truck 1"}
                  width={350}
                  height={250}
                  className="rounded-t-lg object-cover w-full h-36 md:h-52"
                />
                <button
                  className="absolute top-2 right-2 px-3 py-1 text-xs md:text-sm bg-white/90 border border-orange-500 text-orange-500 cursor-pointer rounded hover:bg-white"
                  onClick={() => setIsEditingFirst((prev) => !prev)}
                  aria-label="Edit first truck"
                >
                  {isEditingFirst ? 'Close' : 'Edit'}
                </button>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-sm md:text-base capitalize">
                  {(selectedTruckData1 || truck1Data)?.productName}
                </h3>
                <p className="font-bold text-sm md:text-lg mt-1">
                  ₹ {(selectedTruckData1 || truck1Data)?.minPrice} - {(selectedTruckData1 || truck1Data)?.maxPrice} Lakh*
                </p>

                {isEditingFirst && (
                  <div className="mt-4 text-left">
                    <select
                      className="w-full mb-3 p-2 border rounded bg-gray-50 text-left text-gray-700 text-sm"
                      value={selectedBrand1}
                      onChange={(e) => {
                        setSelectedBrand1(e.target.value);
                        setSelectedTruckName1('');
                        setSelectedTruckId1('');
                      }}
                    >
                      <option value="">Select Brand</option>
                      {brands?.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                    <select
                      className="w-full p-2 border rounded bg-gray-50 text-left text-gray-700 text-sm"
                      value={selectedTruckName1}
                      onChange={(e) => {
                        setSelectedTruckName1(e.target.value);
                        const truckObj = availableTrucks1.find((truck) => truck?.productName === e.target.value);
                        if (truckObj) {
                          setSelectedTruckId1(truckObj._id);
                        } else {
                          setSelectedTruckId1('');
                        }
                      }}
                      disabled={!selectedBrand1}
                    >
                      <option value="">Select Truck</option>
                      {availableTrucks1?.map((truck) => (
                        <option key={truck._id} value={truck?.productName}>{truck?.productName}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* VS indicator for mobile */}
            <div className="flex md:hidden items-center w-full justify-center my-2">
              <div className="p-2 rounded-full bg-white border-2 border-orange-500 text-orange-500 font-bold text-lg">
                VS
              </div>
            </div>

            {/* VS indicator for desktop */}
            <div className="hidden md:flex items-center">
              <div className="p-3 rounded-full bg-white border-2 border-orange-500 text-orange-500 font-bold text-xl">
                VS
              </div>
            </div>

            {/* Truck 2 */}
            <div className="w-full md:w-auto md:flex-1 md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-md text-center flex flex-col">
              <div className="relative">
                <img
                  src={`${process.env.NEXT_PUBLIC_S3_URL}${(selectedTruckData2 || truck2Data)?.productImage}`}
                  alt={(selectedTruckData2 || truck2Data)?.productName || "Truck 2"}
                  width={350}
                  height={250}
                  className="rounded-t-lg object-cover w-full h-36 md:h-52"
                />
                <button
                  className="absolute top-2 right-2 px-3 py-1 text-xs md:text-sm bg-white/90 border border-orange-500 text-orange-500 cursor-pointer rounded hover:bg-white"
                  onClick={() => setIsEditingSecond((prev) => !prev)}
                  aria-label="Edit second truck"
                >
                  {isEditingSecond ? 'Close' : 'Edit'}
                </button>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-sm md:text-base capitalize">
                  {(selectedTruckData2 || truck2Data)?.productName}
                </h3>
                <p className="font-bold text-sm md:text-lg mt-1">
                  ₹ {(selectedTruckData2 || truck2Data)?.minPrice} - {(selectedTruckData2 || truck2Data)?.maxPrice} Lakh*
                </p>

                {isEditingSecond && (
                  <div className="mt-4 text-left">
                    <select
                      className="w-full mb-3 p-2 border rounded bg-gray-50 text-left text-gray-700 text-sm"
                      value={selectedBrand2}
                      onChange={(e) => {
                        setSelectedBrand2(e.target.value);
                        setSelectedTruckName2('');
                        setSelectedTruckId2('');
                      }}
                    >
                      <option value="">Select Brand</option>
                      {brands?.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                    <select
                      className="w-full p-2 border rounded bg-gray-50 text-left text-gray-700 text-sm"
                      value={selectedTruckName2}
                      onChange={(e) => {
                        setSelectedTruckName2(e.target.value);
                        const truckObj = availableTrucks2.find((truck) => truck?.productName === e.target.value);
                        if (truckObj) {
                          setSelectedTruckId2(truckObj._id);
                        } else {
                          setSelectedTruckId2('');
                        }
                      }}
                      disabled={!selectedBrand2}
                    >
                      <option value="">Select Truck</option>
                      {availableTrucks2?.map((truck) => (
                        <option key={truck._id} value={truck?.productName}>{truck?.productName}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* VS indicator for mobile between truck 2 and 3 */}
            {selectedTruckData && (
              <div className="flex md:hidden items-center w-full justify-center my-2">
                <div className="p-2 rounded-full bg-white border-2 border-orange-500 text-orange-500 font-bold text-lg">
                  VS
                </div>
              </div>
            )}

            {/* VS indicator for desktop */}
            <div className="hidden xl:flex items-center">
              <div className="p-3 rounded-full bg-white border-2 border-orange-500 text-orange-500 font-bold text-xl">
                VS
              </div>
            </div>

            {/* Truck 3 */}
            {selectedTruckData ? (
              <div className="w-full md:w-auto md:flex-1 md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-md text-center flex flex-col">
                <div className="relative">
                  <img
                    src={`${process.env.NEXT_PUBLIC_S3_URL}${selectedTruckData?.productImage}`}
                    alt={selectedTruckData?.productName || "Truck 3"}
                    width={350}
                    height={250}
                    className="rounded-t-lg object-cover w-full h-36 md:h-52"
                  />
                  <button
                    className="absolute top-2 right-2 px-3 py-1 text-xs md:text-sm bg-white/90 border border-orange-500 text-orange-500 cursor-pointer rounded hover:bg-white"
                    onClick={() => setIsEditingThird((prev) => !prev)}
                    aria-label="Edit third truck"
                  >
                    {isEditingThird ? 'Close' : 'Edit'}
                  </button>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-semibold text-sm md:text-base capitalize ">
                    {selectedTruckData?.productName}
                  </h3>
                  <p className="font-bold text-sm md:text-lg mt-1">
                    ₹ {selectedTruckData?.minPrice} - {selectedTruckData?.maxPrice} Lakh*
                  </p>

                  {isEditingThird && (
                    <div className="mt-4 text-left">
                      <select
                        className="w-full mb-3 p-2 border rounded bg-gray-50 text-left text-gray-700 text-sm"
                        value={selectedBrand}
                        onChange={(e) => {
                          setSelectedBrand(e.target.value);
                          setSelectedTruck('');
                          setSelectedTruckId('');
                        }}
                      >
                        <option value="">Select Brand</option>
                        {brands?.map((brand) => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                      <select
                        className="w-full p-2 border rounded bg-gray-50 text-left text-gray-700 text-sm"
                        value={selectedTruck}
                        onChange={(e) => {
                          setSelectedTruck(e.target.value);
                          const truckObj = availableTrucks.find((truck) => truck?.productName === e.target.value);
                          if (truckObj) {
                            setSelectedTruckId(truckObj._id);
                          } else {
                            setSelectedTruckId("");
                          }
                        }}
                        disabled={!selectedBrand}
                      >
                        <option value="">Select Truck</option>
                        {availableTrucks?.map((truck) => (
                          <option key={truck._id} value={truck?.productName}>{truck?.productName}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full md:w-auto md:flex-1 md:max-w-sm bg-white border-2 border-dashed border-gray-300 rounded-lg text-center p-4 flex flex-col items-center justify-center relative">
                <button
                  className="absolute top-2 right-2 px-3 py-1 text-xs md:text-sm bg-white/90 border border-orange-500 text-orange-500 cursor-pointer rounded hover:bg-white"
                  onClick={() => setIsEditingThird((prev) => !prev)}
                  aria-label="Edit third truck"
                >
                  {isEditingThird ? 'Close' : 'Edit'}
                </button>
                <div className="bg-gray-100 rounded-full p-4 mb-4">
                  <Image
                    src="/icons/truck.svg"
                    alt="truck icon"
                    width={50}
                    height={50}
                  />
                </div>
                <select
                  className="w-full mb-4 p-3 border rounded bg-gray-50 text-left text-gray-500 text-sm"
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setSelectedTruck('');
                  }}
                >
                  <option value="">Select Brand</option>
                  {brands?.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                </select>
                <select
                  className="w-full p-3 border rounded bg-gray-50 text-left text-gray-500 text-sm"
                  value={selectedTruck}
                  onChange={e => {
                    setSelectedTruck(e.target.value);
                    // Find the selected truck object
                    const truckObj = availableTrucks.find(truck => truck?.productName === e.target.value);
                    if (truckObj) {
                      setSelectedTruckId(truckObj._id);
                    } else {
                      setSelectedTruckId("");
                    }
                  }}
                  disabled={!selectedBrand}
                >
                  <option value="">Select Truck</option>
                  {availableTrucks?.map(truck => <option key={truck._id} value={truck?.productName}>{truck?.productName}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Mobile Sticky Header */}
          <div className="md:hidden sticky top-0 z-50 bg-gray-50 w-full border border-gray-200 rounded-md p-3 shadow-sm mb-4">
            <div className={`grid gap-2 ${selectedTruckData ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {/* Truck 1 */}
              {truck1Data && (
                <div className="flex flex-col items-center bg-white border rounded-lg shadow p-2">
                  <img
                    src={`${process.env.NEXT_PUBLIC_S3_URL}${truck1Data?.productImage}`}
                    alt={truck1Data?.productName}
                    className="w-12 h-8 object-contain mb-1"
                  />
                  <h4 className="text-xs font-semibold text-center leading-tight">
                    {truck1Data?.productName}
                  </h4>
                  <p className="text-xs text-gray-600">
                    ₹{truck1Data?.minPrice}L
                  </p>
                </div>
              )}

              {/* Truck 2 */}
              {truck2Data && (
                <div className="flex flex-col items-center bg-white border rounded-lg shadow p-2">
                  <img
                    src={`${process.env.NEXT_PUBLIC_S3_URL}${truck2Data?.productImage}`}
                    alt={truck2Data?.productName}
                    className="w-12 h-8 object-contain mb-1"
                  />
                  <h4 className="text-xs font-semibold text-center leading-tight">
                    {truck2Data?.productName}
                  </h4>
                  <p className="text-xs text-gray-600">
                    ₹{truck2Data?.minPrice}L
                  </p>
                </div>
              )}

              {/* Truck 3 - Only if selected */}
              {selectedTruckData && (
                <div className="flex flex-col items-center bg-white border rounded-lg shadow p-2">
                  <img
                    src={`${process.env.NEXT_PUBLIC_S3_URL}${selectedTruckData?.productImage}`}
                    alt={selectedTruckData?.productName}
                    className="w-12 h-8 object-contain mb-1"
                  />
                  <h4 className="text-xs font-semibold text-center leading-tight">
                    {selectedTruckData?.productName}
                  </h4>
                  <p className="text-xs text-gray-600">
                    ₹{selectedTruckData?.minPrice || '—'}L
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Sticky Header */}
          <div className="hidden md:block sticky top-0 z-50 bg-gray-50 w-full border border-gray-200 rounded-md p-4 shadow-sm">
            <div className={`grid gap-5 ${selectedTruckData ? 'grid-cols-4' : 'grid-cols-3'}`}>
              {/* Left Description */}
              <div className="">
                <p className="font-semibold text-sm md:text-base text-gray-800">
                  Compare trucks helps you make an informed purchase decision.
                </p>
              </div>

              {/* Truck 1 */}
              {truck1Data && (
                <div className="flex items-center bg-white border rounded-lg shadow p-3 w-full ">
                  <img
                    src={`${process.env.NEXT_PUBLIC_S3_URL}${truck1Data?.productImage}`}
                    alt={truck1Data?.productName}
                    className="w-16 h-12 object-contain mr-3"
                  />
                  <div>
                    <h4 className="text-sm font-semibold whitespace-nowrap">
                      {truck1Data?.productName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      From ₹ {truck1Data?.minPrice} Lakh
                    </p>
                  </div>
                </div>
              )}

              {/* Truck 2 */}
              {truck2Data && (
                <div className="flex items-center bg-white border rounded-lg shadow p-3 w-full ">
                  <img
                    src={`${process.env.NEXT_PUBLIC_S3_URL}${truck2Data?.productImage}`}
                    alt={truck2Data?.productName}
                    className="w-16 h-12 object-contain mr-3"
                  />
                  <div>
                    <h4 className="text-sm font-semibold whitespace-nowrap">
                      {truck2Data?.productName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      From ₹ {truck2Data?.minPrice} Lakh
                    </p>
                  </div>
                </div>
              )}

              {/* Truck 3 - Only if selected */}
              {selectedTruckData && (
                <div className="flex items-center bg-white border rounded-lg shadow p-3 w-full ">
                  <img
                    src={`${process.env.NEXT_PUBLIC_S3_URL}${selectedTruckData?.productImage}`}
                    alt={selectedTruckData?.productName}
                    className="w-16 h-12 object-contain mr-3"
                  />
                  <div>
                    <h4 className="text-sm font-semibold whitespace-nowrap">
                      {selectedTruckData?.productName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      From ₹ {selectedTruckData?.minPrice || '—'} Lakh
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md my-8">
            <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
              <h2 className="text-xl font-bold mb-2 md:mb-0">
                Performance
              </h2>
            </div>
            <div>
              {performanceSpecs.map((spec, index) => (
                <div key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  {/* Mobile/Tablet Layout: Two-row structure */}
                  <div className="lg:hidden">
                    {/* Spec Name Header */}
                    <div className="p-3 md:p-4 font-semibold text-sm md:text-base border-b border-gray-200 bg-gray-100">
                      {spec?.label}
                    </div>
                    {/* Truck Values Row */}
                    <div className={`grid gap-2 md:gap-4 p-3 md:p-4 ${selectedTruckData ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      {selectedTruckData && <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>}
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className={`hidden lg:grid gap-4 items-center p-4 ${selectedTruckData ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    {selectedTruckData && <div className="text-start text-base break-words">{spec?.truck3}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md my-8">
            <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
              <h2 className="text-xl font-bold mb-2 md:mb-0">Dimensions</h2>
            </div>
            <div>
              {dimensionSpecs.map((spec, index) => (
                <div key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  {/* Mobile/Tablet Layout: Two-row structure */}
                  <div className="lg:hidden">
                    {/* Spec Name Header */}
                    <div className="p-3 md:p-4 font-semibold text-sm md:text-base border-b border-gray-200 bg-gray-100">
                      {spec?.label}
                    </div>
                    {/* Truck Values Row */}
                    <div className={`grid gap-2 md:gap-4 p-3 md:p-4 ${selectedTruckData ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      {selectedTruckData && <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>}
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className={`hidden lg:grid gap-4 items-center p-4 ${selectedTruckData ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    {selectedTruckData && <div className="text-start text-base break-words">{spec?.truck3}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md my-8">
            <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
              <h2 className="text-xl font-bold mb-2 md:mb-0">Brakes Suspension</h2>
            </div>
            <div>
              {brakesSuspensionSpec.map((spec, index) => (
                <div key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  {/* Mobile/Tablet Layout: Two-row structure */}
                  <div className="lg:hidden">
                    {/* Spec Name Header */}
                    <div className="p-3 md:p-4 font-semibold text-sm md:text-base border-b border-gray-200 bg-gray-100">
                      {spec?.label}
                    </div>
                    {/* Truck Values Row */}
                    <div className={`grid gap-2 md:gap-4 p-3 md:p-4 ${selectedTruckData ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      {selectedTruckData && <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>}
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className={`hidden lg:grid gap-4 items-center p-4 ${selectedTruckData ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    {selectedTruckData && <div className="text-start text-base break-words">{spec?.truck3}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md my-8">
            <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
              <h2 className="text-xl font-bold mb-2 md:mb-0">Transmission & Load</h2>
            </div>
            <div>
              {transmissionLoadSpec.map((spec, index) => (
                <div key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  {/* Mobile/Tablet Layout: Two-row structure */}
                  <div className="lg:hidden">
                    {/* Spec Name Header */}
                    <div className="p-3 md:p-4 font-semibold text-sm md:text-base border-b border-gray-200 bg-gray-100">
                      {spec?.label}
                    </div>
                    {/* Truck Values Row */}
                    <div className={`grid gap-2 md:gap-4 p-3 md:p-4 ${selectedTruckData ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      {selectedTruckData && <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>}
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className={`hidden lg:grid gap-4 items-center p-4 ${selectedTruckData ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    {selectedTruckData && <div className="text-start text-base break-words">{spec?.truck3}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md my-8">
            <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
              <h2 className="text-xl font-bold mb-2 md:mb-0">Cabin & Body</h2>
            </div>
            <div>
              {cabinAndBodySpec.map((spec, index) => (
                <div key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  {/* Mobile/Tablet Layout: Two-row structure */}
                  <div className="lg:hidden">
                    {/* Spec Name Header */}
                    <div className="p-3 md:p-4 font-semibold text-sm md:text-base border-b border-gray-200 bg-gray-100">
                      {spec?.label}
                    </div>
                    {/* Truck Values Row */}
                    <div className={`grid gap-2 md:gap-4 p-3 md:p-4 ${selectedTruckData ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      {selectedTruckData && <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>}
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className={`hidden lg:grid gap-4 items-center p-4 ${selectedTruckData ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    {selectedTruckData && <div className="text-start text-base break-words">{spec?.truck3}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md my-8">
            <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
              <h2 className="text-xl font-bold mb-2 md:mb-0">Interior Features</h2>
            </div>
            <div>
              {interiorFeaturesSpec.map((spec, index) => (
                <div key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  {/* Mobile/Tablet Layout: Two-row structure */}
                  <div className="lg:hidden">
                    {/* Spec Name Header */}
                    <div className="p-3 md:p-4 font-semibold text-sm md:text-base border-b border-gray-200 bg-gray-100">
                      {spec?.label}
                    </div>
                    {/* Truck Values Row */}
                    <div className={`grid gap-2 md:gap-4 p-3 md:p-4 ${selectedTruckData ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      {selectedTruckData && <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>}
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className={`hidden lg:grid gap-4 items-center p-4 ${selectedTruckData ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    {selectedTruckData && <div className="text-start text-base break-words">{spec?.truck3}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md my-8">
            <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
              <h2 className="text-xl font-bold mb-2 md:mb-0">Tyre</h2>
            </div>
            <div>
              {tyreSpec.map((spec, index) => (
                <div key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  {/* Mobile/Tablet Layout: Two-row structure */}
                  <div className="lg:hidden">
                    {/* Spec Name Header */}
                    <div className="p-3 md:p-4 font-semibold text-sm md:text-base border-b border-gray-200 bg-gray-100">
                      {spec?.label}
                    </div>
                    {/* Truck Values Row */}
                    <div className={`grid gap-2 md:gap-4 p-3 md:p-4 ${selectedTruckData ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      {selectedTruckData && <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>}
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className={`hidden lg:grid gap-4 items-center p-4 ${selectedTruckData ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    {selectedTruckData && <div className="text-start text-base break-words">{spec?.truck3}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md my-8">
            <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
              <h2 className="text-xl font-bold mb-2 md:mb-0">Safety Features</h2>
            </div>
            <div>
              {safetyFeaturesSpec.map((spec, index) => (
                <div key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  {/* Mobile/Tablet Layout: Two-row structure */}
                  <div className="lg:hidden">
                    {/* Spec Name Header */}
                    <div className="p-3 md:p-4 font-semibold text-sm md:text-base border-b border-gray-200 bg-gray-100">
                      {spec?.label}
                    </div>
                    {/* Truck Values Row */}
                    <div className={`grid gap-2 md:gap-4 p-3 md:p-4 ${selectedTruckData ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      {selectedTruckData && <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>}
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className={`hidden lg:grid gap-4 items-center p-4 ${selectedTruckData ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    {selectedTruckData && <div className="text-start text-base break-words">{spec?.truck3}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md my-8">
            <div className="bg-[#FFE8DE] p-4 rounded-t-lg text-[#FA7436]">
              <h2 className="text-xl font-bold mb-2 md:mb-0">Others</h2>
            </div>
            <div>
              {othersSpec.map((spec, index) => (
                <div key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  {/* Mobile/Tablet Layout: Two-row structure */}
                  <div className="lg:hidden">
                    {/* Spec Name Header */}
                    <div className="p-3 md:p-4 font-semibold text-sm md:text-base border-b border-gray-200 bg-gray-100">
                      {spec?.label}
                    </div>
                    {/* Truck Values Row */}
                    <div className={`grid gap-2 md:gap-4 p-3 md:p-4 ${selectedTruckData ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      {selectedTruckData && <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>}
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className={`hidden lg:grid gap-4 items-center p-4 ${selectedTruckData ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    {selectedTruckData && <div className="text-start text-base break-words">{spec?.truck3}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
            {truck1Data && (
              <div className="bg-[#E4F5E9] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">{truck1Data.productName}</h3>
                <div className='flex items-center gap-2 mb-5'>
                  <img src="/icons/like.svg" alt="like" />
                  <p className='font-bold text-base'>Pros</p>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
                  {truck1Data.pros.map((pro, index) => <li key={index}>{pro}</li>)}
                </ul>
              </div>
            )}
            {truck2Data && (
              <div className="bg-[#E4F5E9] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">{truck2Data.productName}</h3>
                <div className='flex items-center gap-2 mb-5'>
                  <img src="/icons/like.svg" alt="like" />
                  <p className='font-bold text-base'>Pros</p>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
                  {truck2Data.pros.map((pro, index) => <li key={index}>{pro}</li>)}
                </ul>
              </div>
            )}

            {selectedTruckData ? (
              <div className="bg-[#E4F5E9] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">{selectedTruckData?.productName}</h3>
                <div className='flex items-center gap-2 mb-5'>
                  <img src="/icons/like.svg" alt="like" />
                  <p className='font-bold text-base'>Pros</p>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
                  {selectedTruckData?.pros.map((pro, index) => <li key={index}>{pro}</li>)}
                </ul>
              </div>
            ) : ""}

          </div>
        </div>
      </div>
    </>
  );
};

export default TruckCompare;
