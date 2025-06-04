import { useEffect, useState } from 'react';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import { useCategory } from '@/hooks/useContext';

export default function TruckFeatures() {
  const [showMore, setShowMore] = useState(false);
  const { categoryData } = useCategory();

  const specifications = categoryData[0]?.specInfo


  if (!specifications) return <div>No specifications found.</div>;



  return (
    <div className="mx-auto bg-white rounded-lg border border-gray-300 mt-10">
      <h2 className="text-2xl font-semibold mb-4 p-5">{categoryData[0]?.productName} Specs & Features</h2>

      {/* Performance */}
      {
        specifications.engine?.map((item, index) => (
          <Section title="Performance">
            <SpecItem label="Engine" value={item?.engineType} />
            <SpecItem label="Engine Norm" value={item?.emissionNorm} />
            <SpecItem label="Gradeability" value={item?.gradeAbility} />
            <SpecItem label="Power" value={item?.enginePower} />
            <SpecItem label="Engine Cylinders" value={item?.engineCylinder} />
            <SpecItem label="Max Torque" value={item?.torque} />
            <SpecItem label="Max Speed" value={item?.maxSpeed} />
            <SpecItem label="Fuel Tank" value={item?.fuelTankCapacity} />
            <SpecItem label="GVW" value="Nill" />
            <SpecItem label="Payload Capacity" value="Nill" />
            <SpecItem label="Mileage" value={item?.mileage
            } />
          </Section>
        ))
      }
      {/* Dimensions */}
      {
        specifications.dimensions?.map((item, index) => (
          <Section title="Dimensions">
            <SpecItem label="Length" value={`${item?.overallLength} mm`} />
            <SpecItem label="Width" value={`${item?.overallWidthh} mm`} />
            <SpecItem label="Height" value={`${item?.overallHeight} mm`} />
            <SpecItem label="Wheelbase" value={`${item?.wheelBase} mm`} />
            <SpecItem label="Ground Clearance" value={`${item?.groundClearance} mm`} />
            <SpecItem label="Minimum Turning Radius" value={`${item?.turningRadius}`} />
          </Section>
        ))
      }


      {showMore && (
        <>
          {/* Brakes Suspension */}
          {specifications.brakesAndSuspension?.map((item, index) => (
            <Section title="Brakes Suspension">
              <SpecItem label="Brakes" value={item?.brakeType} />
              <SpecItem label="Parking Brakes" value={item?.parkingBrake} />
              <SpecItem label="Front Axle" value="N/A" />
              <SpecItem label="Rear Axle" value="N/A" />
              <SpecItem label="Front Suspension" value={item?.frontSuspension} />
              <SpecItem label="Rear Suspension" value={item?.rearSuspension} />
              <SpecItem label="Abs" value={item?.ABS} />
              <SpecItem label="Anti RollBar" value={item?.antiRollBar} />
            </Section>
          ))}

          {/* Clutch Transmission */}
          {specifications.transmissionLoad?.map((item, index) => (
            <Section title="Clutch Transmission">
              <SpecItem label="Clutch" value={item?.transmissionType} />
              <SpecItem label="Gearbox" value={item?.gearBox} />
              <SpecItem label="AxleConfiguration" value={item?.axleConfiguration} />
              <SpecItem label="FrontAxle" value={item?.frontAxle} />
              <SpecItem label="GVW" value={item?.GrossVehicleWeight} />
              <SpecItem label="kerb Weight" value={item?.kerbWeight} />
              <SpecItem label="Payload" value={item?.payload} />
            </Section>
          ))
          }
          {/* Body Cabin*/}
          {specifications.cabinAndBody?.map((item, index) => (
            <Section key={index} title="Body Cabin">
              <SpecItem label="Body Option" value={item.bodyOption || 'N/A'} />
              <SpecItem label="Chassis Type" value={item.chassisType || 'N/A'} />
              <SpecItem label="Seating Capacity" value={item.seatingCapacity || 'N/A'} />
              <SpecItem label="Cabin Type" value={item.cabinType || 'N/A'} />
              <SpecItem label="Tiltable Cabin" value={item.tiltableCabin || 'N/A'} />
              <SpecItem label="ApplicationType" value={item.applicationType || 'N/A'} />
            </Section>
          ))}

          {/* interiorFeatures*/}
          {specifications.interiorFeatures?.map((item, index) => (
            <Section key={index} title="Interior Features">
              <SpecItem label="AC" value={item.AC ? 'Yes' : 'No'} />
              <SpecItem label="Adjustable Driver Seat" value={item.adjustableDriverSeat ? 'Yes' : 'No'} />
              <SpecItem label="Seat Types" value={item.seatTypes || 'N/A'} />
              <SpecItem label="Arm Rest" value={item.armRest ? 'Yes' : 'No'} />
              <SpecItem label="Tiltable Steering" value={item.tiltableStreeing ? 'Yes' : 'No'} />
              <SpecItem label="Adjustable Steering" value={item.adjustableSteering ? 'Yes' : 'No'} />
              <SpecItem label="Driver Info Display" value={item.driverInfoDisplay === "true" ? 'Yes' : 'No'} />
              <SpecItem label="Mobile Charging Point" value={item.mobileChargingPoint ? 'Yes' : 'No'} />
              <SpecItem label="Seat Belts" value={item.seatBelts ? 'Yes' : 'No'} />
              <SpecItem label="Hill Hold" value={item.hillHold ? 'Yes' : 'No'} />
              <SpecItem label="Cruise Control" value={item.cruiseControl ? 'Yes' : 'No'} />
              <SpecItem label="Navigation System" value={item.navigationSystem || 'N/A'} />
              <SpecItem label="Telematics" value={item.telematics || 'N/A'} />
              <SpecItem label="Steering Type" value={item.steeringType === "true" ? 'Yes' : 'No'} />
              <SpecItem label="Entertainment Pack" value={item.entertainPack ? 'Yes' : 'No'} />
              <SpecItem label="Emergency Start" value={item.emergencyStart ? 'Yes' : 'No'} />
            </Section>
          ))}


          {/* Tyre*/}
          {specifications.tyre?.map((item, index) => (
            <Section key={index} title="Tyre">
              <SpecItem label="Front Tyre" value={item.frontTyre || 'N/A'} />
              <SpecItem label="Rear Tyre" value={item.rearType || 'N/A'} />
              <SpecItem label="Number of Tyres" value={item.noOfTyres || 'N/A'} />
              <SpecItem label="Tubeless Tyre" value={item.tubelessTyre ? 'Yes' : 'No'} />
            </Section>
          ))}

          {specifications.safety?.map((item, index) => (
            <Section key={index} title="Safety Features">
              <SpecItem label="Fog Light" value={item.fogLight ? 'Yes' : 'No'} />
              <SpecItem label="Emergency Exit" value={item.emergencyExit ? 'Yes' : 'No'} />
              <SpecItem label="Side Window" value={item.sideWindow ? 'Yes' : 'No'} />
              <SpecItem label="Luggage Boot" value={item.luggageBoot ? 'Yes' : 'No'} />
              <SpecItem label="Hat Rack" value={item.hatrack ? 'Yes' : 'No'} />
              <SpecItem label="First Aid Kit" value={item.fristAidKit ? 'Yes' : 'No'} />
            </Section>
          ))}

          {specifications.others?.map((item, index) => (
            <Section key={index} title="Others">
              <SpecItem label="Accessories" value={item.accessories ? 'Yes' : 'No'} />
              <SpecItem label="Warranty" value={item.warranty ? 'Yes' : 'No'} />
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
    <div className="flex border-b py-1 border-gray-200 border-dashed">
      <span className="font-semibold text-[#212529] text-sm w-44">{label}</span>
      <span className="mx-10 invisible">-</span>
      <span className="text-sm text-[#254154] font-normal">{value}</span>
    </div>
  );
}
