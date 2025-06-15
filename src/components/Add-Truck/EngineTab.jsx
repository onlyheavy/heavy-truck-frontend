import { useState, useCallback, memo, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import API from '@/utils/api';

// Memoized Input Component
const InputField = memo(({ label, name, value, onChange, placeholder, type = "text" }) => {
  return (
    <div className="mb-4 md:mb-0">
      <label className="block text-gray-900 font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, type === "checkbox" ? e.target.checked : e.target.value)}
        className={type === "checkbox" ?
          "h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded" :
          "w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"}
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  );
});

InputField.displayName = 'InputField';

// Memoized Checkbox Component
const CheckboxField = memo(({ label, name, checked, onChange }) => {
  return (
    <div className="flex items-center pb-2 md:pb-0 space-x-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(name, e.target.checked)}
        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
      />
      <label className="text-gray-700">{label}</label>
    </div>
  );
});

CheckboxField.displayName = 'CheckboxField';

// Section component
const Section = memo(({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-[#FA7436] text-center mb-4">{title}</h2>
    <hr className='my-5 border-dashed' />
    <div className="block md:grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-5 mb-10">
      {children}
    </div>
  </div>
));

Section.displayName = 'Section';

const EngineTab = ({ truckId, onComplete }) => {
  console.log(truckId, 'truckId');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const specId = localStorage.getItem('currentSpecId');
  const [formData, setFormData] = useState({
    // Engine Details
    engineType: '',
    engineCylinders: '',
    engineDisplacement: '',
    enginePower: '',
    engineRPM: '',
    torque: '',
    fuelType: '',
    fuelTankCapacity: '',
    mileage: '',
    gradeability: '',
    emissionNorm: '',
    maxSpeed: '',
    battery: '',

    // Transmission Details
    gearBox: '',
    transmissionType: '',
    axleConfiguration: '',
    frontAxle: '',
    rearAxle: '',
    GrossVehicleWeight: '',
    kerbWeight: '',
    payload: '',

    // Dimensions
    overallLength: '',
    overallWidthh: '',
    overallHeight: '',
    wheelbase: '',
    wheelbase2: '',
    groundClearance: '',
    turningRadius: '',

    // Brakes & Suspension
    frontSuspension: '',
    rearSuspension: '',
    brakeType: '',
    abs: false,
    parkingBrakes: false,
    antiRollBar: false,

    // Cabin & Body
    chassisType: '',
    cabinType: '',
    tiltableCabin: false,
    bodyOption: '',
    applicationType: '',
    seatingCapacity: '',

    // Interior Features
    ac: false,
    mobileChargingPoint: false,
    entertainPack: false,
    adjustableDriverSeat: false,
    seatBelts: false,
    emergencyStart: false,
    seatTypes: '',
    hillHold: false,
    cruiseControl: false,
    armRest: false,
    adjustableDriverSeat2: false,
    tiltableSteering: false,
    steeringType: '',
    driverInfoDisplay: '',
    navigationSystem: '',
    telematics: '',

    // Tyres
    frontTyre: '',
    rearTyre: '',
    tubelessTyres: false,
    numberOfTyres: '',

    // Safety
    fogLights: false,
    emergencyExit: false,
    sideWindow: false,
    luggageBoot: false,
    hornack: false,
    firstAidKit: false,

    // Others
    accessories: false,
    warranty: false,
  });

  useEffect(() => {
    if (specId && id) {  // Only fetch if we have both specId and id (editing mode)
      setDataFn();
    }
  }, []);

  const setDataFn = async () => {
    try {
      const response = await axios.get(`${API.HOST}/api/spec/getSpec/${specId}`);

      if (!response || !response.data) {
        throw new Error('No data received from server');
      }

      const data = response.data.data;

      setFormData({
        engineType: data.engine[0]?.engineType || '',
        engineCylinders: data.engine[0]?.engineCylinders || '',
        engineDisplacement: data.engine[0]?.engineDisplacement || '',
        enginePower: data.engine[0]?.enginePower || '',
        engineRPM: data.engine[0]?.engineRPM || '',
        torque: data.engine[0]?.torque || '',
        fuelType: data.engine[0]?.fuelType || '',
        fuelTankCapacity: data.engine[0]?.fuelTankCapacity || '',
        mileage: data.engine[0]?.mileage || '',
        gradeability: data.engine[0]?.gradeability || '',
        emissionNorm: data.engine[0]?.emissionNorm || '',
        maxSpeed: data.engine[0]?.maxSpeed || '',
        battery: data.engine[0]?.battery || '',
        gearBox: data.transmissionLoad[0]?.gearBox || '',
        transmissionType: data.transmissionLoad[0]?.transmissionType || '',
        axleConfiguration: data.transmissionLoad[0]?.axleConfiguration || '',
        frontAxle: data.transmissionLoad[0]?.frontAxle || '',
        rearAxle: data.transmissionLoad[0]?.rearAxle || '',
        GrossVehicleWeight: data.transmissionLoad[0]?.GrossVehicleWeight || '',
        kerbWeight: data.transmissionLoad[0]?.kerbWeight || '',
        payload: data.transmissionLoad[0]?.payload || '',
        overallLength: data.dimensions[0]?.overallLength || '',
        overallWidthh: data.dimensions[0]?.overallWidthh || '',
        overallHeight: data.dimensions[0]?.overallHeight || '',
        wheelbase: data.dimensions[0]?.wheelbase || '',
        wheelbase2: data.dimensions[0]?.wheelbase2 || '',
        groundClearance: data.dimensions[0]?.groundClearance || '',
        turningRadius: data.dimensions[0]?.turningRadius || '',
        frontSuspension: data.brakesAndSuspension[0]?.frontSuspension || '',
        rearSuspension: data.brakesAndSuspension[0]?.rearSuspension || '',
        brakeType: data.brakesAndSuspension[0]?.brakeType || '',
        abs: data.brakesAndSuspension[0]?.abs || false,
        parkingBrakes: data.brakesAndSuspension[0]?.parkingBrakes || false,
        antiRollBar: data.brakesAndSuspension[0]?.antiRollBar || false,
        chassisType: data.cabinAndBody[0]?.chassisType || '',
        cabinType: data.cabinAndBody[0]?.cabinType || '',
        tiltableCabin: data.cabinAndBody[0]?.tiltableCabin || false,
        bodyOption: data.cabinAndBody[0]?.bodyOption || '',
        applicationType: data.cabinAndBody[0]?.applicationType || '',
        seatingCapacity: data.cabinAndBody[0]?.seatingCapacity || '',
        ac: data.interiorFeatures[0]?.ac || false,
        mobileChargingPoint: data.interiorFeatures[0]?.mobileChargingPoint || false,
        entertainPack: data.interiorFeatures[0]?.entertainPack || false,
        adjustableDriverSeat: data.interiorFeatures[0]?.adjustableDriverSeat || false,
        seatBelts: data.interiorFeatures[0]?.seatBelts || false,
        emergencyStart: data.interiorFeatures[0]?.emergencyStart || false,
        seatTypes: data.interiorFeatures[0]?.seatTypes || '',
        hillHold: data.interiorFeatures[0]?.hillHold || false,
        cruiseControl: data.interiorFeatures[0]?.cruiseControl || false,
        armRest: data.interiorFeatures[0]?.armRest || false,
        adjustableDriverSeat2: data.interiorFeatures[0]?.adjustableDriverSeat2 || false,
        tiltableSteering: data.interiorFeatures[0]?.tiltableSteering || false,
        steeringType: data.interiorFeatures[0]?.steeringType || '',
        driverInfoDisplay: data.interiorFeatures[0]?.driverInfoDisplay || '',
        navigationSystem: data.interiorFeatures[0]?.navigationSystem || '',
        telematics: data.interiorFeatures[0]?.telematics || '',
        frontTyre: data.tyre[0]?.frontTyre || '',
        rearTyre: data.tyre[0]?.rearTyre || '',
        tubelessTyres: data.tyre[0]?.tubelessTyres || false,
        numberOfTyres: data.tyre[0]?.numberOfTyres || '',
        fogLights: data.safety[0]?.fogLights || false,
        emergencyExit: data.safety[0]?.emergencyExit || false,
        sideWindow: data.safety[0]?.sideWindow || false,
        luggageBoot: data.safety[0]?.luggageBoot || false,
        hornack: data.safety[0]?.hornack || false,
        firstAidKit: data.safety[0]?.firstAidKit || false,
        accessories: data.others[0]?.accessories || false,
        warranty: data.others[0]?.warranty || false,
      });

    } catch (error) {
      console.error('Error setting data:', error);
    }
  }


  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);



  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsSubmitting(true);

    try {
      if (!truckId) {
        throw new Error('No truck ID provided');
      }

      const payload = {
        engine: [{
          engineType: formData.engineType,
          engineCylinders: formData.engineCylinders,
          engineDisplacement: formData.engineDisplacement,
          enginePower: formData.enginePower,
          engineRPM: formData.engineRPM,
          torque: formData.torque,
          fuelType: formData.fuelType,
          fuelTankCapacity: formData.fuelTankCapacity,
          mileage: formData.mileage,
          gradeability: formData.gradeability,
          emissionNorm: formData.emissionNorm,
          maxSpeed: formData.maxSpeed,
          battery: formData.battery
        }],
        transmissionLoad: [{
          gearBox: formData.gearBox,
          transmissionType: formData.transmissionType,
          axleConfiguration: formData.axleConfiguration,
          frontAxle: formData.frontAxle,
          rearAxle: formData.rearAxle,
          GrossVehicleWeight: formData.GrossVehicleWeight,
          kerbWeight: formData.kerbWeight,
          payload: formData.payload
        }],
        dimensions: [{
          overallLength: formData.overallLength,
          overallWidthh: formData.overallWidthh,
          overallHeight: formData.overallHeight,
          wheelbase: formData.wheelbase,
          wheelbase2: formData.wheelbase2,
          groundClearance: formData.groundClearance,
          turningRadius: formData.turningRadius
        }],
        brakesAndSuspension: [{
          frontSuspension: formData.frontSuspension,
          rearSuspension: formData.rearSuspension,
          brakeType: formData.brakeType,
          abs: formData.abs,
          parkingBrakes: formData.parkingBrakes,
          antiRollBar: formData.antiRollBar
        }],
        cabinAndBody: [{
          chassisType: formData.chassisType,
          cabinType: formData.cabinType,
          tiltableCabin: formData.tiltableCabin,
          bodyOption: formData.bodyOption,
          applicationType: formData.applicationType,
          seatingCapacity: formData.seatingCapacity
        }],
        interiorFeatures: [{
          ac: formData.ac,
          mobileChargingPoint: formData.mobileChargingPoint,
          entertainPack: formData.entertainPack,
          adjustableDriverSeat: formData.adjustableDriverSeat,
          seatBelts: formData.seatBelts,
          emergencyStart: formData.emergencyStart,
          seatTypes: formData.seatTypes,
          hillHold: formData.hillHold,
          cruiseControl: formData.cruiseControl,
          armRest: formData.armRest,
          adjustableDriverSeat2: formData.adjustableDriverSeat2,
          tiltableSteering: formData.tiltableSteering,
          steeringType: formData.steeringType,
          driverInfoDisplay: formData.driverInfoDisplay,
          navigationSystem: formData.navigationSystem,
          telematics: formData.telematics
        }],
        tyre: [{
          frontTyre: formData.frontTyre,
          rearTyre: formData.rearTyre,
          tubelessTyres: formData.tubelessTyres,
          numberOfTyres: formData.numberOfTyres
        }],
        safety: [{
          fogLights: formData.fogLights,
          emergencyExit: formData.emergencyExit,
          sideWindow: formData.sideWindow,
          luggageBoot: formData.luggageBoot,
          hornack: formData.hornack,
          firstAidKit: formData.firstAidKit
        }],
        others: [{
          accessories: formData.accessories,
          warranty: formData.warranty
        }]
      };

      let response;
      if (specId) {
        // Update existing specification
        response = await axios.put(
          `${API.HOST}/api/spec/updateSpec/${specId}`,
          payload
        );
        toast.success('Specifications updated successfully!');
      } else {
        // Create new specification
        response = await axios.post(
          `${API.HOST}/api/spec/createSpec/${truckId}`,
          payload
        );
        toast.success('Specifications created successfully!');
      }

      if (response.status === 200 || response.status === 201) {
        await onComplete(truckId);
        return true;
      } else {
        throw new Error(response.data?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form: ' + (error.response?.data?.message || error.message));
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Attach submit function to DOM element
  useEffect(() => {
    const form = document.querySelector('form');
    if (form) {
      form.setAttribute('data-tab-submit', '');
      form.submit = handleSubmit;
    }
    return () => {
      if (form) {
        form.removeAttribute('data-tab-submit');
        delete form.submit;
      }
    };
  }, []);

  return (
    <div className='max-w-7xl mx-auto'>
      <div className=" md:p-6 p-4 bg-white rounded-lg shadow">
        <form className="space-y-8">
          <div>
            {/* Engine Section */}
            <Section title="Engine Details">
              <InputField
                label="Engine Type"
                name="engineType"
                value={formData.engineType}
                onChange={handleInputChange}
                placeholder="Engine Type - Ex: 4 Stroke Diesel Engine"
              />
              <InputField
                label="Engine Cylinders"
                name="engineCylinders"
                value={formData.engineCylinders}
                onChange={handleInputChange}
                placeholder="Engine Cylinders - Ex: 4 Cylinders"
              />
              <InputField
                label="Engine Displacement"
                name="engineDisplacement"
                value={formData.engineDisplacement}
                onChange={handleInputChange}
                placeholder="Engine Displacement - Ex: 2956 cc"
              />
              <InputField
                label="Engine Power"
                name="enginePower"
                value={formData.enginePower}
                onChange={handleInputChange}
                placeholder="Engine Power - Ex: 150 HP @ 2600 rpm"
              />
              <InputField
                label="Engine RPM"
                name="engineRPM"
                value={formData.engineRPM}
                onChange={handleInputChange}
                placeholder="Engine RPM - Ex: 2600 rpm"
              />
              <InputField
                label="Torque"
                name="torque"
                value={formData.torque}
                onChange={handleInputChange}
                placeholder="Torque - Ex: 500 Nm @ 1500 rpm"
              />
              <InputField
                label="Fuel Type"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                placeholder="Fuel Type - Ex: Diesel"
              />
              <InputField
                label="Fuel Tank Capacity"
                name="fuelTankCapacity"
                value={formData.fuelTankCapacity}
                onChange={handleInputChange}
                placeholder="Fuel Tank Capacity - Ex: 200 Liters"
              />
              <InputField
                label="Mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                placeholder="Mileage - Ex: 10 km/l"
              />
              <InputField
                label="Gradeability"
                name="gradeability"
                value={formData.gradeability}
                onChange={handleInputChange}
                placeholder="Gradeability - Ex: 30%"
              />
              <InputField
                label="Emission Norm"
                name="emissionNorm"
                value={formData.emissionNorm}
                onChange={handleInputChange}
                placeholder="Emission Norm - Ex: BS6"
              />
              <InputField
                label="Max Speed"
                name="maxSpeed"
                value={formData.maxSpeed}
                onChange={handleInputChange}
                placeholder="Max Speed - Ex: 80 km/h"
              />
              <InputField
                label="Battery"
                name="battery"
                value={formData.battery}
                onChange={handleInputChange}
                placeholder="Battery - Ex: 12V, 75Ah"
              />
            </Section>

            {/* Transmission Section */}
            <Section title="Transmission & Load">
              <InputField
                label="Gear Box"
                name="gearBox"
                value={formData.gearBox}
                onChange={handleInputChange}
                placeholder="gearBox - Ex: 6 Speed Manual"
              />
              <InputField
                label="Transmission Type"
                name="transmissionType"
                value={formData.transmissionType}
                onChange={handleInputChange}
                placeholder="Transmission Type - Ex: Manual"
              />
              <InputField
                label="Axle Configuration"
                name="axleConfiguration"
                value={formData.axleConfiguration}
                onChange={handleInputChange}
                placeholder="Axle Configuration - Ex: 4x2"
              />
              <InputField
                label="Front Axle"
                name="frontAxle"
                value={formData.frontAxle}
                onChange={handleInputChange}
                placeholder="Front Axle - Ex: Reverse Elliot Type"
              />
              <InputField
                label="Rear Axle"
                name="rearAxle"
                value={formData.rearAxle}
                onChange={handleInputChange}
                placeholder="Rear Axle - Ex: Single Reduction"
              />
              <InputField
                label="GVW"
                name="GrossVehicleWeight"
                value={formData.GrossVehicleWeight}
                onChange={handleInputChange}
                placeholder="GrossVehicleWeight - Ex: 25000 kg"
              />
              <InputField
                label="Kerb Weight"
                name="kerbWeight"
                value={formData.kerbWeight}
                onChange={handleInputChange}
                placeholder="Kerb Weight - Ex: 6500 kg"
              />
              <InputField
                label="Payload"
                name="payload"
                value={formData.payload}
                onChange={handleInputChange}
                placeholder="Payload - Ex: 18500 kg"
              />
            </Section>

            {/* Dimensions Section */}
            <Section title="Dimensions">
              <InputField
                label="Overall Length"
                name="overallLength"
                value={formData.overallLength}
                onChange={handleInputChange}
                placeholder="Overall Length - Ex: 9000 mm"
              />
              <InputField
                label="Overall Width"
                name="overallWidthh"
                value={formData.overallWidthh}
                onChange={handleInputChange}
                placeholder="Overall Width - Ex: 2490 mm"
              />
              <InputField
                label="Overall Height"
                name="overallHeight"
                value={formData.overallHeight}
                onChange={handleInputChange}
                placeholder="Overall Height - Ex: 3200 mm"
              />
              <InputField
                label="Wheelbase"
                name="wheelbase"
                value={formData.wheelbase}
                onChange={handleInputChange}
                placeholder="Enter Wheelbase"
              />
              <InputField
                label="Wheelbase 2"
                name="wheelbase2"
                value={formData.wheelbase2}
                onChange={handleInputChange}
                placeholder="Enter Wheelbase 2"
              />
              <InputField
                label="Ground Clearance"
                name="groundClearance"
                value={formData.groundClearance}
                onChange={handleInputChange}
                placeholder="Ground Clearance - Ex: 250 mm"
              />
              <InputField
                label="Turning Radius"
                name="turningRadius"
                value={formData.turningRadius}
                onChange={handleInputChange}
                placeholder="Turning Radius - Ex: 10.8 m"
              />
            </Section>

            {/* Brakes Section */}
            <Section title="Brakes & Suspension">
              <InputField
                label="Front Suspension"
                name="frontSuspension"
                value={formData.frontSuspension}
                onChange={handleInputChange}
                placeholder="Front Suspension - Ex: Parabolic Leaf Springs"
              />
              <InputField
                label="Rear Suspension"
                name="rearSuspension"
                value={formData.rearSuspension}
                onChange={handleInputChange}
                placeholder="Rear Suspension - Ex: Semi-Elliptical Leaf Springs"
              />
              <InputField
                label="Brake Type"
                name="brakeType"
                value={formData.brakeType}
                onChange={handleInputChange}
                placeholder="Brake Type - Ex: Air Brakes with ABS"
              />
              <CheckboxField
                label="ABS"
                name="abs"
                checked={formData.abs}
                onChange={handleInputChange}
              />
              <CheckboxField
                label="Parking Brakes"
                name="parkingBrakes"
                checked={formData.parkingBrakes}
                onChange={handleInputChange}
              />
              <CheckboxField
                label="Anti Roll Bar"
                name="antiRollBar"
                checked={formData.antiRollBar}
                onChange={handleInputChange}
              />
            </Section>

            {/* Cabin Section */}
            <Section title="Cabin & Body">
              <InputField
                label="Chassis Type"
                name="chassisType"
                value={formData.chassisType}
                onChange={handleInputChange}
                placeholder="Chassis Type - Ex: Ladder Type Frame"
              />
              <InputField
                label="Cabin Type"
                name="cabinType"
                value={formData.cabinType}
                onChange={handleInputChange}
                placeholder="Cabin Type - Ex: Day Cabin with AC"
              />
              <CheckboxField
                label="Tiltable Cabin"
                name="tiltableCabin"
                checked={formData.tiltableCabin}
                onChange={handleInputChange}
              />
              <InputField
                label="Body Option"
                name="bodyOption"
                value={formData.bodyOption}
                onChange={handleInputChange}
                placeholder="Body Option - Ex: High Side Deck"
              />
              <InputField
                label="Application Type"
                name="applicationType"
                value={formData.applicationType}
                onChange={handleInputChange}
                placeholder="Application Type - Ex: Long Haul Transport"
              />
              <InputField
                label="Seating Capacity"
                name="seatingCapacity"
                value={formData.seatingCapacity}
                onChange={handleInputChange}
                placeholder="Seating Capacity - Ex: Driver + 2"
              />
            </Section>

            {/* Interior Features Section */}
            <Section title="Interior Features">
              <div className="col-span-2 block mb-4 md:mb-0 md:grid grid-cols-2 gap-4">
                <CheckboxField
                  label="AC"
                  name="ac"
                  checked={formData.ac}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Mobile Charging Point"
                  name="mobileChargingPoint"
                  checked={formData.mobileChargingPoint}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Entertainment Pack"
                  name="entertainPack"
                  checked={formData.entertainPack}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Adjustable Driver Seat"
                  name="adjustableDriverSeat"
                  checked={formData.adjustableDriverSeat}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Seat Belts"
                  name="seatBelts"
                  checked={formData.seatBelts}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Emergency Start"
                  name="emergencyStart"
                  checked={formData.emergencyStart}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Hill Hold"
                  name="hillHold"
                  checked={formData.hillHold}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Cruise Control"
                  name="cruiseControl"
                  checked={formData.cruiseControl}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Arm Rest"
                  name="armRest"
                  checked={formData.armRest}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Adjustable Driver Seat 2"
                  name="adjustableDriverSeat2"
                  checked={formData.adjustableDriverSeat2}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Tiltable Steering"
                  name="tiltableSteering"
                  checked={formData.tiltableSteering}
                  onChange={handleInputChange}
                />
              </div>
              <InputField
                label="Seat Types"
                name="seatTypes"
                value={formData.seatTypes}
                onChange={handleInputChange}
                placeholder="Seat Types - Ex: Air Suspended Driver Seat"
              />
              <InputField
                label="Steering Type"
                name="steeringType"
                value={formData.steeringType}
                onChange={handleInputChange}
                placeholder="Steering Type - Ex: Power Steering with Tilt"
              />
              <InputField
                label="Driver Info Display"
                name="driverInfoDisplay"
                value={formData.driverInfoDisplay}
                onChange={handleInputChange}
                placeholder="Driver Info Display - Ex: Digital Cluster with LCD"
              />
              <InputField
                label="Navigation System"
                name="navigationSystem"
                value={formData.navigationSystem}
                onChange={handleInputChange}
                placeholder="Navigation System - Ex: 7-inch Touchscreen with GPS"
              />
              <InputField
                label="Telematics"
                name="telematics"
                value={formData.telematics}
                onChange={handleInputChange}
                placeholder="Telematics - Ex: Fleet Management System"
              />
            </Section>

            {/* Tyres Section */}
            <Section title="Tyres">
              <InputField
                label="Front Tyre"
                name="frontTyre"
                value={formData.frontTyre}
                onChange={handleInputChange}
                placeholder="Front Tyre - Ex: 295/80R22.5-16PR"
              />
              <InputField
                label="Rear Tyre"
                name="rearTyre"
                value={formData.rearTyre}
                onChange={handleInputChange}
                placeholder="Rear Tyre - Ex: 295/80R22.5-16PR (Dual)"
              />
              <CheckboxField
                label="Tubeless Tyres"
                name="tubelessTyres"
                checked={formData.tubelessTyres}
                onChange={handleInputChange}
              />
              <InputField
                label="Number of Tyres"
                name="numberOfTyres"
                value={formData.numberOfTyres}
                onChange={handleInputChange}
                placeholder="Number of Tyres - Ex: 6+1 Spare"
              />
            </Section>

            {/* Safety Section */}
            <Section title="Safety">
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <CheckboxField
                  label="Fog Lights"
                  name="fogLights"
                  checked={formData.fogLights}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Emergency Exit"
                  name="emergencyExit"
                  checked={formData.emergencyExit}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Side Window"
                  name="sideWindow"
                  checked={formData.sideWindow}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Luggage Boot"
                  name="luggageBoot"
                  checked={formData.luggageBoot}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Horn"
                  name="hornack"
                  checked={formData.hornack}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="First Aid Kit"
                  name="firstAidKit"
                  checked={formData.firstAidKit}
                  onChange={handleInputChange}
                />
              </div>
            </Section>

            {/* Others Section */}
            <Section title="Others">
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <CheckboxField
                  label="Accessories"
                  name="accessories"
                  checked={formData.accessories}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Warranty"
                  name="warranty"
                  checked={formData.warranty}
                  onChange={handleInputChange}
                />
              </div>
            </Section>
          </div>

        </form>
        <div className='flex justify-center my-5'>
          <button onClick={handleSubmit} className='bg-orange-500 text-lg font-medium text-white px-8 py-2 rounded cursor-pointer'>save</button>

        </div>
      </div>
    </div>
  );
};

export default EngineTab;