import { useRouter } from 'next/router';
import { useCategory } from '@/hooks/useContext';

// Utility function to create a slug from a product name
const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphen
    .replace(/(^-|-$)+/g, '');   // remove starting or ending hyphens

const ComparisonCard = ({ vehicleImage, vehicleName, price }) => (
  <div className="flex-1">
    <div className="flex flex-col items-center">
      <img
        src={vehicleImage}
        alt={vehicleName}
        className="w-full max-w-[300px] h-auto mb-4"
      />
      <h3 className="font-semibold text-sm text-[#254154] mb-2">{vehicleName}</h3>
      <p className="text-sm font-bold text-[#254154] mb-4">{price}</p>
    </div>
  </div>
);

const ComparisonSection = ({ vehicles }) => {
  const router = useRouter();

  const handleCompare = () => {
    const slug1 = slugify(vehicles[0].name);
    const slug2 = slugify(vehicles[1].name);

    router.push(`/compare-truck/${slug1}-vs-${slug2}`);
  };

  return (
    <div className="border border-[#E0E8ED] rounded-lg p-2 relative w-[33%] max-w-[33%]">
      <div className="flex relative gap-2">
        {vehicles.map((vehicle, index) => (
          <ComparisonCard
            key={index}
            vehicleImage={vehicle.image}
            vehicleName={vehicle.name}
            price={vehicle.price}
          />
        ))}

        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="md:w-12 md:h-12 w-10 h-10 rounded-full bg-[#FA7436] text-white flex items-center justify-center font-semibold text-sm md:text-lg">
            VS
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleCompare}
          className="px-6 py-2 bg-white rounded text-[#FA7436] hover:bg-[#FA7436] hover:text-white border border-[#FA7436] font-semibold text-[16px] transition-colors"
        >
          Compare Now
        </button>
      </div>
    </div>
  );
};

const ComparisonTable = () => {
  const { categoryData, alterNative } = useCategory();

  const baseGroup1 = categoryData.length > 0 ? categoryData[0] : null;

  const group1 = baseGroup1
    ? Array(3).fill(baseGroup1).map((item) => ({
      image: `https://only-heavy.s3.eu-north-1.amazonaws.com/${item.productImage[0]}`,
      name: item.productName,
      price: `₹ ${item.minPrice} - ₹ ${item.maxPrice} Lakh*`,
    }))
    : [];


  const group2 = alterNative.slice(0, 3).map((item) => ({
    image: `https://only-heavy.s3.eu-north-1.amazonaws.com/${item.image}`,
    name: item.productName,
    price: `₹ ${item.minPrice} - ₹ ${item.maxPrice} Lakh*`,
  }));


  const pairedVehicles = group1.map((vehicle, index) => [vehicle, group2[index]]);

  return (
    <div className="my-10">
      <h2 className="text-lg md:text-2xl font-semibold mb-6">Compare Top Pickups</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {pairedVehicles.map((pair, index) => (
          <ComparisonSection key={index} vehicles={pair} />
        ))}
      </div>
    </div>
  );
};

export default ComparisonTable;
