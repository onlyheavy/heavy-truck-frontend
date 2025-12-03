import { useEffect, useState } from 'react';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import { useCategory } from '@/hooks/useContext';

export default function BackHoeFeatures() {
  const [showMore, setShowMore] = useState(false);
  const { categoryData } = useCategory();

  const specifications = categoryData[0]?.specInfo

  if (!specifications) return <div>No specifications found.</div>;



  return (
    <div className="mx-auto bg-white rounded-lg border border-gray-300 mt-10">
      <h2 className="text-lg md:text-2xl font-semibold mb-4 p-5 capitalize">{categoryData[0]?.productName} Specs & Features</h2>

      {/* Engine */}
      {specifications.engine?.map((item, index) => (
        <Section key={index} title="Engine">
          <SpecItem label="Model" value={item?.model || 'N/A'} />
          <SpecItem label="Engine Displacement" value={item?.engineDisplacement || 'N/A'} />
          <SpecItem label="Engine Power" value={item?.enginePower || 'N/A'} />
          <SpecItem label="Max Torque" value={item?.maxTorque || 'N/A'} />
          <SpecItem label="Fuel Type" value={item?.fuelType || 'N/A'} />
          <SpecItem label="Transmission Type" value={item?.transmissionType || 'N/A'} />
        </Section>
      ))}

      {/* Loader General */}
      {specifications.loaderGeneral?.map((item, index) => (
        <Section key={index} title="Loader General">
          <SpecItem label="Dump Height" value={item?.dumpHeight || 'N/A'} />
          <SpecItem label="Load Over Height" value={item?.loadOverHeight || 'N/A'} />
          <SpecItem label="Hinge Pin Height" value={item?.hingePinHeight || 'N/A'} />
          <SpecItem label="Max Reach Full Height" value={item?.maxReachFullHeight || 'N/A'} />
          <SpecItem label="Bucket Capacity" value={item?.bucketCapacity || 'N/A'} />
          <SpecItem label="Bucket Breakout Force" value={item?.bucktBreakoutForce || 'N/A'} />
          <SpecItem label="Turning Radius" value={item?.turningRadius || 'N/A'} />
          <SpecItem label="Max Payload" value={item?.maxPayload || 'N/A'} />
          <SpecItem label="Dump Angle" value={item?.dumpAngle || 'N/A'} />
          <SpecItem label="Loader Arm Breakout Force" value={item?.loaderArmBreakoutForce || 'N/A'} />
        </Section>
      ))}

      {/* Backhoe */}
      {specifications.backHoe?.map((item, index) => (
        <Section key={index} title="Backhoe">
          <SpecItem label="Max Digging Depth" value={item?.maxDiggingDepth || 'N/A'} />
          <SpecItem label="Max Working Height" value={item?.maxWorkingHeight || 'N/A'} />
          <SpecItem label="Backhoe Bucket Capacity" value={item?.backHoeBucketCapacity || 'N/A'} />
          <SpecItem label="Bucket Rotation" value={item?.bucketRotation || 'N/A'} />
          <SpecItem label="Dipper Tear Out Force" value={item?.dipperTearOutForce || 'N/A'} />
          <SpecItem label="Max Lift Capacity" value={item?.maxLiftCapacity || 'N/A'} />
          <SpecItem label="Max Load Over Height" value={item?.maxLoadOverHeight || 'N/A'} />
        </Section>
      ))}

      {/* Dimensions and Weight */}
      {specifications.dimensionsAndWeight?.map((item, index) => (
        <Section key={index} title="Dimensions and Weight">
          <SpecItem label="Max Operating Weight" value={item?.maxOperatingWeight || 'N/A'} />
          <SpecItem label="Transport Length" value={item?.transportLength || 'N/A'} />
          <SpecItem label="Width Over Stabilizers" value={item?.widthOverStabilizers || 'N/A'} />
          <SpecItem label="Wheel Base" value={item?.wheelBase || 'N/A'} />
          <SpecItem label="Minimum Ground Clearance" value={item?.minimumGroundClearance || 'N/A'} />
          <SpecItem label="Height To Top Of Cab" value={item?.heightToTopOfCab || 'N/A'} />
        </Section>
      ))}

      {showMore && (
        <>
          {/* Hydraulic System */}
          {specifications.hydraulicSystem?.map((item, index) => (
            <Section key={index} title="Hydraulic System">
              <SpecItem label="Pump Type" value={item?.pumpType || 'N/A'} />
              <SpecItem label="Pump Flow Rate" value={item?.pumpFlowRate || 'N/A'} />
              <SpecItem label="System Pressure" value={item?.systemPressure || 'N/A'} />
              <SpecItem label="Hydraulic Oil Capacity" value={item?.hydraulicOilCapacity ? 'Yes' : 'No'} />
            </Section>
          ))}

          {/* Service Capacities */}
          {specifications.serviceCapacities?.map((item, index) => (
            <Section key={index} title="Service Capacities">
              <SpecItem label="Engine Oil" value={item?.engineOil ? 'Yes' : 'No'} />
              <SpecItem label="Rear Axle Oil" value={item?.rearAxleOil ? 'Yes' : 'No'} />
              <SpecItem label="Transmission Oil" value={item?.transmissionOil ? 'Yes' : 'No'} />
              <SpecItem label="Hydraulic Oil" value={item?.hydraulicOil || 'N/A'} />
              <SpecItem label="Fuel Tank" value={item?.fuelTank ? 'Yes' : 'No'} />
              <SpecItem label="Coolant" value={item?.coolant ? 'Yes' : 'No'} />
            </Section>
          ))}

          {/* Steering and Brakes */}
          {specifications.steeringAndBrakes?.map((item, index) => (
            <Section key={index} title="Steering and Brakes">
              <SpecItem label="Steering Type" value={item?.steeringType || 'N/A'} />
              <SpecItem label="Turning Circle Diameter" value={item?.turningCircleDiameter || 'N/A'} />
              <SpecItem label="System Pressure" value={item?.systemPressure || 'N/A'} />
              <SpecItem label="Service Brake Type" value={item?.serviceBrakeType ? 'Yes' : 'No'} />
              <SpecItem label="Parking Brakes" value={item?.ParkingBrakes ? 'Yes' : 'No'} />
            </Section>
          ))}

          {/* Tyres and Axles */}
          {specifications.tyresAndAxles?.map((item, index) => (
            <Section key={index} title="Tyres and Axles">
              <SpecItem label="Standard Front Type" value={item?.standardFrontType ? 'Yes' : 'No'} />
              <SpecItem label="Standard Rear Type" value={item?.standardRearType ? 'Yes' : 'No'} />
              <SpecItem label="Rear Axle Description" value={item?.rearAxleDescription ? 'Yes' : 'No'} />
              <SpecItem label="Front Axle Description" value={item?.frontAxleDescription ? 'Yes' : 'No'} />
            </Section>
          ))}

          {/* Electrical and General */}
          {specifications.electricalAndGeneral?.map((item, index) => (
            <Section key={index} title="Electrical and General">
              <SpecItem label="Battery Voltage" value={item?.batteryVoltage ? 'Yes' : 'No'} />
              <SpecItem label="Max Forward Speed" value={item?.maxForwordSpeed ? 'Yes' : 'No'} />
              <SpecItem label="Max Reverse Speed" value={item?.maxReverseSpeed ? 'Yes' : 'No'} />
            </Section>
          ))}
        </>
      )}

      <div className="text-center py-4 ">
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-orange-500 font-medium hover:text-orange-600 focus:outline-none flex items-center justify-center mx-auto gap-2 cursor-pointer"
        >
          {showMore ? (
            <>
              Show Less <FaAngleDoubleUp />
            </>
          ) : (
            <>
              Show More <FaAngleDoubleDown />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="">
      <h3 className="text-lg font-semibold bg-[#FFE8DE] p-3 flex items-center text-orange-500">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 p-3 gap-x-6 md:grid-cols-2 lg:grid-cols-2 gap-y-4 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0 border-l border-dashed border-gray-300 -translate-x-1/2"></div>
        {children}
      </div>
    </div>
  );
}

function SpecItem({ label, value }) {
  return (
    <div className="flex gap-8 md:gap-14 border-b py-1 border-gray-200 border-dashed">
      <span className="font-semibold text-[#212529] text-sm w-full md:w-44">{label}</span>
      {/* <span className="mx-2 invisible md:block">-</span> */}
      <span className="text-sm text-[#212529] w-full  text-left font-normal ">{value}</span>
    </div>
  );
}
