const comparisonData = [
  {
    title: "Performance",
    specs: [
      { label: "Engine", key: "engineType" },
      { label: "Engine Norm", key: "emissionNorm" },
      { label: "Power", key: "enginePower" },
      { label: "Engine Cylinders", key: "engineCylinders" },
      { label: "Max Torque", key: "torque" },
      { label: "Max Speed", key: "maxSpeed" },
      { label: "Fuel Tank", key: "fuelTankCapacity" },
      { label: "GVW", key: "gvw" },
      { label: "Payload Capacity", key: "payload" },
      { label: "Mileage", key: "mileage" },
    ],
  },
  {
    title: "Dimensions",
    specs: [
      { label: "Length", key: "length" },
      { label: "Width", key: "width" },
      { label: "Height", key: "height" },
      { label: "Wheelbase", key: "wheelbase" },
      { label: "Ground Clearance", key: "groundClearance" },
      { label: "Minimum Turning Radius", key: "turningRadius" },
    ],
  },
];

export default function ComparisonTable({ vehicles }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
      {comparisonData.map((category, i) => (
        <div key={i}>
          <div className="bg-[#FFE8DE] text-orange-500 font-semibold text-sm px-4 py-2">
            {category.title}
          </div>
          {category.specs.map((spec, j) => (
            <div
              key={j}
              className="grid grid-cols-[200px_repeat(auto-fit,minmax(0,1fr))] gap-x-4 px-4 py-3 text-sm border-t"
            >
              <div className="font-medium">{spec.label}</div>
              {vehicles.map((vehicle, k) => (
                <div key={k}>{vehicle[spec.key] || "N/A"}</div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
