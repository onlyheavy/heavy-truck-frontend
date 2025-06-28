import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import API from "@/utils/api";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

const TruckCompare = () => {
  const [truck1Data, setTruck1Data] = useState(null);
  const [truck2Data, setTruck2Data] = useState(null);
  const [rankData, setRankData] = useState(null);
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trucksByBrand, setTrucksByBrand] = useState({
    Tata: ["Tata Ace", "Tata Intra", "Tata Yodha"],
    Mahindra: ["Mahindra Jeeto", "Mahindra Bolero", "Mahindra Supro"],
    "Ashok Leyland": [], // Will be fetched from API
    Eicher: ["Eicher Pro 2049", "Eicher Pro 2059XP", "Eicher Pro 3015"],
  });

  const brands = ["Tata", "Mahindra", "Ashok Leyland", "Eicher"];
  const [availableTrucks, setAvailableTrucks] = useState([]);

  const router = useRouter();
  const { slug } = router.query;

  console.log('slug:', slug);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API.HOST}/api/compare/mahindra-jeeto-vs-tata-intra-v50`);
        const apiResponse = response.data;

        if (apiResponse.success) {
          const truck1 = apiResponse?.data?.left;
          const truck2 = apiResponse?.data?.right;
          const datas = apiResponse?.data?.existData
          console.log(truck1)
          setTruck1Data(truck1);
          setTruck2Data(truck2);
          setRankData(datas);




          setPerformanceSpecs([
            { label: "Engine Type", truck1: `${truck1?.spec?.engine[0]?.engineType} `, truck2: `${truck2.spec.engine[0]?.engineType} `, truck3: selectedTruckData ? selectedTruckData.spec.engine[0]?.engineType : "-" },
            { label: "Engine Cylinders", truck1: truck1?.spec?.engine[0]?.engineCylinders, truck2: truck2?.spec?.engine[0]?.engineCylinders, truck3: selectedTruckData ? selectedTruckData?.spec?.engine[0]?.engineCylinders : "-" },
            { label: "Engine Displacement", truck1: `${truck1?.spec?.engine[0]?.engineDisplacement} cc`, truck2: `${truck2?.spec?.engine[0]?.engineDisplacement} cc`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.engine[0]?.engineDisplacement} cc` : "-" },
            { label: "Engine Power", truck1: `${truck1?.spec?.engine[0]?.enginePower} HP`, truck2: `${truck2?.spec?.engine[0]?.enginePower} HP`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.engine[0]?.enginePower} HP` : "-" },
            { label: "Engine RPM", truck1: `${truck1?.spec?.engine[0]?.engineRPM} RPM`, truck2: `${truck2?.spec?.engine[0]?.engineRPM} RPM`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.engine[0]?.engineRPM} RPM` : "-" },
            { label: "Torque", truck1: `${truck1?.spec?.engine[0]?.torque} Nm`, truck2: `${truck2?.spec?.engine[0]?.torque} Nm`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.engine[0]?.torque} Nm` : "-" },
            { label: "Fuel Type", truck1: `${truck1?.spec?.engine[0]?.fuelType}`, truck2: `${truck2?.spec?.engine[0]?.fuelType}`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.engine[0]?.fuelType}` : "-" },
            { label: "Fuel Tank Capacity", truck1: `${truck1?.spec?.engine[0]?.fuelTankCapacity} litres`, truck2: `${truck2?.spec?.engine[0]?.fuelTankCapacity} litres`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.engine[0]?.fuelTankCapacity} litres` : "" },
            { label: "Mileage", truck1: `${truck1?.spec?.engine[0]?.mileage} km/l`, truck2: `${truck2?.spec?.engine[0]?.mileage} km/l`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.engine[0]?.mileage} km/l` : "-" },
            { label: "Gradeability", truck1: `${truck1?.spec?.engine[0]?.gradeability} %`, truck2: `${truck2?.spec?.engine[0]?.gradeability} %`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.engine[0]?.gradeability} %` : "-" },
            { label: "Emission Norm", truck1: `${truck1?.spec?.engine[0]?.emissionNorm} `, truck2: `${truck2?.spec?.engine[0]?.emissionNorm} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.engine[0]?.emissionNorm} ` : "-" },
            { label: "Max Speed", truck1: `${truck1?.spec?.engine[0]?.maxSpeed} km/h`, truck2: `${truck2?.spec?.engine[0]?.maxSpeed} km/h`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.engine[0]?.maxSpeed} km/h` : "-" },
            { label: "Battery", truck1: `${truck1?.spec?.engine[0]?.battery} `, truck2: `${truck2?.spec?.engine[0]?.battery} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.engine[0]?.battery} ` : "-" },
          ]);

          setDimensionSpecs([
            { label: "Over All Length", truck1: `${truck1?.spec?.dimensions[0]?.overallLength} mm `, truck2: `${truck2?.spec?.dimensions[0]?.overallLength} mm`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.dimensions[0]?.overallLength} mm` : "-" },
            { label: "Over All Width", truck1: `${truck1?.spec?.dimensions[0]?.overallWidthh} mm`, truck2: `${truck2?.spec?.dimensions[0]?.overallWidthh} mm`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.dimensions[0]?.overallWidthh} mm` : "-" },
            { label: "Over All Height", truck1: `${truck1?.spec?.dimensions[0]?.overallHeight} mm`, truck2: `${truck2?.spec?.dimensions[0]?.overallHeight} mm`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.dimensions[0]?.overallHeight} mm` : "-" },
            { label: "Wheelbase", truck1: `${truck1?.spec?.dimensions[0]?.wheelBase} mm`, truck2: `${truck2?.spec?.dimensions[0]?.wheelBase} mm`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.dimensions[0]?.wheelBase} mm` : "-" },
            { label: "Ground Clearance", truck1: `${truck1?.spec?.dimensions[0]?.groundClearance} mm`, truck2: `${truck2?.spec?.dimensions[0]?.groundClearance} mm`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.dimensions[0]?.groundClearance} mm` : "-" },
            { label: "Minimum Turning Radius", truck1: `${truck1?.spec?.dimensions[0]?.turningRadius} m`, truck2: `${truck2?.spec?.dimensions[0]?.turningRadius} m`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.dimensions[0]?.turningRadius} m` : "-" },
          ]);

          setBrakesSuspensionSpec([
            { label: "Front Suspension", truck1: `${truck1?.spec?.brakesAndSuspension[0]?.frontSuspension} `, truck2: `${truck2?.spec?.brakesAndSuspension[0]?.frontSuspension} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.brakesAndSuspension[0]?.frontSuspension} ` : "-" },
            { label: "Rear Suspension", truck1: `${truck1?.spec?.brakesAndSuspension[0]?.rearSuspension} `, truck2: `${truck2?.spec?.brakesAndSuspension[0]?.rearSuspension} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.brakesAndSuspension[0]?.rearSuspension} ` : "-" },
            { label: "Brakes Type", truck1: `${truck1?.spec?.brakesAndSuspension[0]?.brakeType} `, truck2: `${truck2?.spec?.brakesAndSuspension[0]?.brakeType} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.brakesAndSuspension[0]?.brakeType} ` : "-" },
            { label: "ABS", truck1: truck1?.spec?.brakesAndSuspension[0]?.abs === 'true' ? 'Yes' : 'No', truck2: truck2?.spec?.brakesAndSuspension[0]?.abs === 'true' ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.brakesAndSuspension[0]?.abs === 'true' ? 'Yes' : 'No' : "-" },
            { label: "Parking Brakes", truck1: truck1?.spec?.brakesAndSuspension[0]?.parkingBrakes === 'true' ? 'Yes' : 'No', truck2: truck2?.spec?.brakesAndSuspension[0]?.parkingBrakes === 'true' ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.brakesAndSuspension[0]?.parkingBrakes === 'true' ? 'Yes' : 'No' : "-" },
            {
              label: "Anti Roll Bar", truck1: truck1?.spec?.brakesAndSuspension[0]?.antiRollBar === 'true' ? 'Yes' : 'No', truck2: truck2?.spec?.brakesAndSuspension[0]?.antiRollBar === 'true' ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.brakesAndSuspension[0]?.antiRollBar === 'true' ? 'Yes' : 'No' : "-"
            },
          ]);

          setTransmissionLoadSpec([
            { label: "Gear box", truck1: `${truck1?.spec?.transmissionLoad[0]?.gearBox}  `, truck2: `${truck2?.spec?.transmissionLoad[0]?.gearBox} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.transmissionLoad[0]?.gearBox} ` : "-" },
            { label: "Transmission Type", truck1: `${truck1?.spec?.transmissionLoad[0]?.transmissionType} `, truck2: `${truck2?.spec?.transmissionLoad[0]?.transmissionType} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.transmissionLoad[0]?.transmissionType} ` : "-" },
            { label: "Axle Configuration", truck1: `${truck1?.spec?.transmissionLoad[0]?.axleConfiguration} `, truck2: `${truck2?.spec?.transmissionLoad[0]?.axleConfiguration} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.transmissionLoad[0]?.axleConfiguration} ` : "-" },
            { label: "Front Axle", truck1: `${truck1?.spec?.transmissionLoad[0]?.frontAxle} `, truck2: `${truck2?.spec?.transmissionLoad[0]?.frontAxle} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.transmissionLoad[0]?.frontAxle} ` : "-" },
            { label: "Gross Vehicle Weight", truck1: `${truck1?.spec?.transmissionLoad[0]?.GrossVehicleWeight} kg `, truck2: `${truck2?.spec?.transmissionLoad[0]?.GrossVehicleWeight} kg `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.transmissionLoad[0]?.GrossVehicleWeight} kg ` : "-" },
            { label: "Kerb Weight", truck1: `${truck1?.spec?.transmissionLoad[0]?.kerbWeight} kg `, truck2: `${truck2?.spec?.transmissionLoad[0]?.kerbWeight} kg `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.transmissionLoad[0]?.kerbWeight} kg ` : "-" },
            { label: "Payload", truck1: `${truck1?.spec?.transmissionLoad[0]?.payload} kg `, truck2: `${truck2?.spec?.transmissionLoad[0]?.payload} kg `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.transmissionLoad[0]?.payload} kg ` : "-" },
          ]);

          setCabinAndBodySpec([
            { label: "Chassis Type", truck1: `${truck1?.spec?.cabinAndBody[0]?.chassisType || "-"}`, truck2: `${truck2?.spec?.cabinAndBody[0]?.chassisType || "-"}`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.cabinAndBody[0]?.chassisType || "-"}` : "-" },
            { label: "Cabin Type", truck1: `${truck1?.spec?.cabinAndBody[0]?.cabinType || "-"}`, truck2: `${truck2?.spec?.cabinAndBody[0]?.cabinType || "-"}`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.cabinAndBody[0]?.cabinType || "-"}` : "-" },
            { label: "Tiltable Cabin", truck1: truck1?.spec?.cabinAndBody[0]?.tiltableCabin === 'true' ? 'Yes' : 'No', truck2: truck2?.spec?.cabinAndBody[0]?.tiltableCabin === 'true' ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.cabinAndBody[0]?.tiltableCabin === 'true' ? 'Yes' : 'No' : "-" },
            { label: "Body Option", truck1: `${truck1?.spec?.cabinAndBody[0]?.bodyOption || "-"}`, truck2: `${truck2?.spec?.cabinAndBody[0]?.bodyOption || "-"}`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.cabinAndBody[0]?.bodyOption || "-"}` : "-" },
            { label: "Application Type", truck1: `${truck1?.spec?.cabinAndBody[0]?.applicationType || "-"}`, truck2: `${truck2?.spec?.cabinAndBody[0]?.applicationType || "-"}`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.cabinAndBody[0]?.applicationType || "-"}` : "-" },
            { label: "Seating Capacity", truck1: `${truck1?.spec?.cabinAndBody[0]?.seatingCapacity || "-"}`, truck2: `${truck2?.spec?.cabinAndBody[0]?.seatingCapacity || "-"}`, truck3: selectedTruckData ? `${selectedTruckData?.spec?.cabinAndBody[0]?.seatingCapacity || "-"}` : "-" }
          ]);


          setInteriorFeaturesSpec([
            { label: "AC", truck1: truck1?.spec?.interiorFeatures[0]?.ac ? 'Yes' : 'No', truck2: truck2?.spec?.interiorFeatures[0]?.ac ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.interiorFeatures[0]?.ac ? 'Yes' : 'No' : "-" },
            { label: "Adjustable Driver Seat", truck1: truck1?.spec?.interiorFeatures[0]?.adjustableDriverSeat ? 'Yes' : 'No', truck2: truck2?.spec?.interiorFeatures[0]?.adjustableDriverSeat ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.interiorFeatures[0]?.adjustableDriverSeat ? 'Yes' : 'No' : "-" },
            { label: "Seat Types", truck1: `${truck1?.spec?.interiorFeatures[0]?.seatTypes} `, truck2: `${truck2?.spec?.interiorFeatures[0]?.seatTypes} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.interiorFeatures[0]?.seatTypes} ` : "-" },
            { label: "Arm Rest", truck1: truck1?.spec?.interiorFeatures[0]?.armRest ? 'Yes' : 'No', truck2: truck2?.spec?.interiorFeatures[0]?.armRest ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.interiorFeatures[0]?.armRest ? 'Yes' : 'No' : "-" },
            { label: "Tiltable Steering", truck1: truck1?.spec?.interiorFeatures[0]?.tiltableSteering ? 'Yes' : 'No', truck2: truck2?.spec?.interiorFeatures[0]?.tiltableSteering ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.interiorFeatures[0]?.tiltableSteering ? 'Yes' : 'No' : "-" },
            { label: "Adjustable Steering", truck1: truck1?.spec?.interiorFeatures[0]?.adjustableSteering ? 'Yes' : 'No', truck2: truck2?.spec?.interiorFeatures[0]?.adjustableSteering ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.interiorFeatures[0]?.adjustableSteering ? 'Yes' : 'No' : "-" },
            { label: "Driver Info Display", truck1: truck1?.spec?.interiorFeatures[0]?.driverInfoDisplay ? 'Yes' : 'No', truck2: truck2?.spec?.interiorFeatures[0]?.driverInfoDisplay ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.interiorFeatures[0]?.driverInfoDisplay ? 'Yes' : 'No' : "-" },
            { label: "Mobile Charging Point", truck1: truck1?.spec?.interiorFeatures[0]?.mobileChargingPoint ? 'Yes' : 'No', truck2: truck2?.spec?.interiorFeatures[0]?.mobileChargingPoint ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.interiorFeatures[0]?.mobileChargingPoint ? 'Yes' : 'No' : "-" },
            { label: "Seat Belts", truck1: truck1?.spec?.interiorFeatures[0]?.seatBelts ? 'Yes' : 'No', truck2: truck2?.spec?.interiorFeatures[0]?.seatBelts ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.interiorFeatures[0]?.seatBelts ? 'Yes' : 'No' : "-" },
            { label: "Hill Hold", truck1: truck1?.spec?.interiorFeatures[0]?.hillHold ? 'Yes' : 'No', truck2: truck2?.spec?.interiorFeatures[0]?.hillHold ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.interiorFeatures[0]?.hillHold ? 'Yes' : 'No' : "-" },
            { label: "Cruise Control", truck1: truck1?.spec?.interiorFeatures[0]?.cruiseControl ? 'Yes' : 'No', truck2: truck2?.spec?.interiorFeatures[0]?.cruiseControl ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.interiorFeatures[0]?.cruiseControl ? 'Yes' : 'No' : "-" },
            { label: " Navigation System", truck1: `${truck1?.spec?.interiorFeatures[0]?.navigationSystem} `, truck2: `${truck2?.spec?.interiorFeatures[0]?.navigationSystem} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.interiorFeatures[0]?.navigationSystem} ` : "-" },
            { label: "Telematics", truck1: `${truck1?.spec?.interiorFeatures[0]?.telematics} `, truck2: `${truck2?.spec?.interiorFeatures[0]?.telematics} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.interiorFeatures[0]?.telematics} ` : "-" },
            { label: "Steering Type", truck1: `${truck1?.spec?.interiorFeatures[0]?.steeringType} `, truck2: `${truck2?.spec?.interiorFeatures[0]?.steeringType} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.interiorFeatures[0]?.steeringType} ` : "-" },
            { label: "Entertainment Pack", truck1: truck1?.spec?.interiorFeatures[0]?.entertainPack ? 'Yes' : 'No', truck2: truck2?.spec?.interiorFeatures[0]?.entertainPack ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.interiorFeatures[0]?.entertainPack ? 'Yes' : 'No' : "-" },
            { label: "Emergency Start", truck1: truck1?.spec?.interiorFeatures[0]?.emergencyStart ? 'Yes' : 'No', truck2: truck2?.spec?.interiorFeatures[0]?.emergencyStart ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.interiorFeatures[0]?.emergencyStart ? 'Yes' : 'No' : "-" }
          ]);

          setTyreSpec([
            { label: "Front Tyre", truck1: `${truck1?.spec?.tyre[0]?.frontTyre}  `, truck2: `${truck2?.spec?.tyre[0]?.frontTyre} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.tyre[0]?.frontTyre} ` : "-" },
            { label: "Rear Tyre", truck1: `${truck1?.spec?.tyre[0]?.rearTyre} `, truck2: `${truck2?.spec?.tyre[0]?.rearTyre} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.tyre[0]?.rearTyre} ` : "-" },
            { label: "Number of Tyres", truck1: `${truck1?.spec?.tyre[0]?.numberOfTyres} `, truck2: `${truck2?.spec?.tyre[0]?.numberOfTyres} `, truck3: selectedTruckData ? `${selectedTruckData?.spec?.tyre[0]?.numberOfTyres} ` : "-" },
            { label: "Tubeless Tyre", truck1: truck1?.spec?.tyre[0]?.tubelessTyres ? 'Yes' : 'No', truck2: truck2?.spec?.tyre[0]?.tubelessTyres ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.tyre[0]?.tubelessTyres ? 'Yes' : 'No' : "-" }
          ]);


          setSafetyFeaturesSpec([
            { label: "Fog Light", truck1: truck1?.spec?.safety[0]?.fogLights ? 'Yes' : 'No', truck2: truck2?.spec?.safety[0]?.fogLights ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.safety[0]?.fogLights ? 'Yes' : 'No' : "-" },
            { label: "Emergency Exit", truck1: truck1?.spec?.safety[0]?.emergencyExit ? 'Yes' : 'No', truck2: truck2?.spec?.safety[0]?.emergencyExit ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.safety[0]?.emergencyExit ? 'Yes' : 'No' : "-" },
            { label: "Side Window", truck1: truck1?.spec?.safety[0]?.sideWindow ? 'Yes' : 'No', truck2: truck2?.spec?.safety[0]?.sideWindow ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.safety[0]?.sideWindow ? 'Yes' : 'No' : "-" },
            { label: "Luggage Boot", truck1: truck1?.spec?.safety[0]?.luggageBoot ? 'Yes' : 'No', truck2: truck2?.spec?.safety[0]?.luggageBoot ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.safety[0]?.luggageBoot ? 'Yes' : 'No' : "-" },
            { label: "Hat Rack", truck1: truck1?.spec?.safety[0]?.hornack ? 'Yes' : 'No', truck2: truck2?.spec?.safety[0]?.hornack ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.safety[0]?.hornack ? 'Yes' : 'No' : "-" },
            { label: "First Aid Kit", truck1: truck1?.spec?.safety[0]?.firstAidKit ? 'Yes' : 'No', truck2: truck2?.spec?.safety[0]?.firstAidKit ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.safety[0]?.firstAidKit ? 'Yes' : 'No' : "-" }
          ]);


          setOthersSpec([
            { label: "Accessories", truck1: truck1?.spec?.others[0]?.accessories ? 'Yes' : 'No', truck2: truck2?.spec?.others[0]?.accessories ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.others[0]?.accessories ? 'Yes' : 'No' : "-" },
            { label: "Warranty", truck1: truck1?.spec?.others[0]?.warranty ? 'Yes' : 'No', truck2: truck2?.spec?.others[0]?.warranty ? 'Yes' : 'No', truck3: selectedTruckData ? selectedTruckData?.spec?.others[0]?.warranty ? 'Yes' : 'No' : "-" },

          ]);

        } else {
          setError(new Error(apiResponse.message || 'API request failed'));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTruckData]);

  useEffect(() => {
    // Fetch trucks when a brand is selected
    const fetchTrucksByBrand = async () => {
      if (selectedBrand) {
        try {
          const response = await axios.get(`${API.HOST}/api/category/getProductName/${encodeURIComponent(selectedBrand)}`);
          if (response.data.success) {
            const trucks = response.data.data.map(item => item.productName);
            setTrucksByBrand(prev => ({ ...prev, [selectedBrand]: trucks }));
          }
        } catch (err) {
          // Optionally handle error
        }
      }
    };
    fetchTrucksByBrand();
  }, [selectedBrand]);

  useEffect(() => {
    // Fetch trucks for the selected brand
    const fetchTrucksForBrand = async () => {
      if (selectedBrand) {
        try {
          const response = await axios.get(`${API.HOST}/api/category/getProductName/${encodeURIComponent(selectedBrand)}`);
          if (response.data.success) {
            // Store the full truck objects
            setAvailableTrucks(response.data.data);
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
          if (response.data.success) {
            setSelectedTruckData(response.data.data[0]);
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

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error.message}</div>;

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

          <h1 className="text-lg md:text-2xl font-bold my-8 text-center capitalize">
            {truck1Data?.productName} vs {truck2Data?.productName}{" "}
            <span className="text-orange-500">Comparison</span>
          </h1>

          <div className="flex flex-col md:flex-row flex-wrap justify-center items-stretch gap-4 my-8">
            {/* Truck 1 */}
            <div className="w-full md:w-auto md:flex-1 md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-md text-center flex flex-col">
              <div className="relative">
                <img
                  src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${truck1Data.productImage}`}
                  alt={truck1Data?.productName || "Truck 1"}
                  width={350}
                  height={250}
                  className="rounded-t-lg object-cover w-full h-36 md:h-52"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-sm md:text-base capitalize">
                  {truck1Data?.productName}
                </h3>
                <p className="font-bold text-sm md:text-lg mt-1">
                  ₹ {truck1Data?.minPrice} - {truck1Data?.maxPrice} Lakh*
                </p>
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
                  src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${truck2Data.productImage}`}
                  alt={truck2Data?.productName || "Truck 2"}
                  width={350}
                  height={250}
                  className="rounded-t-lg object-cover w-full h-36 md:h-52"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-sm md:text-base capitalize">
                  {truck2Data?.productName}
                </h3>
                <p className="font-bold text-sm md:text-lg mt-1">
                  ₹ {truck2Data?.minPrice} - {truck2Data?.maxPrice} Lakh*
                </p>
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
                    src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${selectedTruckData?.productImage}`}
                    alt={selectedTruckData?.productName || "Truck 3"}
                    width={350}
                  height={250}
                    className="rounded-t-lg object-cover w-full h-36 md:h-52"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-semibold text-sm md:text-base capitalize ">
                    {selectedTruckData?.productName}
                  </h3>
                  <p className="font-bold text-sm md:text-lg mt-1">
                    ₹ {selectedTruckData?.minPrice} - {selectedTruckData?.maxPrice} Lakh*
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full md:w-auto md:flex-1 md:max-w-sm bg-white border-2 border-dashed border-gray-300 rounded-lg text-center p-4 flex flex-col items-center justify-center">
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
                  {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                </select>
                <select
                  className="w-full p-3 border rounded bg-gray-50 text-left text-gray-500 text-sm"
                  value={selectedTruck}
                  onChange={e => {
                    setSelectedTruck(e.target.value);
                    // Find the selected truck object
                    const truckObj = availableTrucks.find(truck => truck.productName === e.target.value);
                    if (truckObj) {
                      setSelectedTruckId(truckObj._id);
                    } else {
                      setSelectedTruckId("");
                    }
                  }}
                  disabled={!selectedBrand}
                >
                  <option value="">Select Truck</option>
                  {availableTrucks.map(truck => <option key={truck._id} value={truck.productName}>{truck.productName}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Mobile Sticky Header */}
          <div className="md:hidden sticky top-0 z-50 bg-gray-50 w-full border border-gray-200 rounded-md p-3 shadow-sm mb-4">
            <div className="grid grid-cols-3 gap-2">
              {/* Truck 1 */}
              {truck1Data && (
                <div className="flex flex-col items-center bg-white border rounded-lg shadow p-2">
                  <img
                    src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${truck1Data.productImage}`}
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
                    src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${truck2Data.productImage}`}
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
                    src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${selectedTruckData.productImage}`}
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
            <div className="grid grid-cols-4 gap-5">
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
                    src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${truck1Data.productImage}`}
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
                    src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${truck2Data.productImage}`}
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
                    src={`https://only-heavy.s3.eu-north-1.amazonaws.com/${selectedTruckData.productImage}`}
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
                    <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4">
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-center p-4">
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    <div className="text-start text-base break-words">{spec?.truck3}</div>
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
                    <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4">
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-center p-4">
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    <div className="text-start text-base break-words">{spec?.truck3}</div>
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
                    <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4">
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-center p-4">
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    <div className="text-start text-base break-words">{spec?.truck3}</div>
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
                    <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4">
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-center p-4">
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    <div className="text-start text-base break-words">{spec?.truck3}</div>
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
                    <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4">
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-center p-4">
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    <div className="text-start text-base break-words">{spec?.truck3}</div>
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
                    <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4">
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-center p-4">
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    <div className="text-start text-base break-words">{spec?.truck3}</div>
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
                    <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4">
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-center p-4">
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    <div className="text-start text-base break-words">{spec?.truck3}</div>
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
                    <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4">
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-center p-4">
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    <div className="text-start text-base break-words">{spec?.truck3}</div>
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
                    <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4">
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck1}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck2}</div>
                      <div className="text-start text-sm md:text-base break-words">{spec?.truck3}</div>
                    </div>
                  </div>

                  {/* Desktop Layout: Side-by-side structure */}
                  <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-center p-4">
                    <div className="font-semibold text-base break-words">{spec?.label}</div>
                    <div className="text-start text-base break-words">{spec?.truck1}</div>
                    <div className="text-start text-base break-words">{spec?.truck2}</div>
                    <div className="text-start text-base break-words">{spec?.truck3}</div>
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
