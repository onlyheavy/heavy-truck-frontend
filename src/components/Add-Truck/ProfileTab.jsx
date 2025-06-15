import React, { useEffect, useState } from 'react';
import { X, Plus } from 'lucide-react';
import Select from 'react-select';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import API from '@/utils/api';

const ProfileTab = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    categoryName: '',
    brandName: '',
    subCategoryName: '',
    productName: '',
    minPrice: '',
    maxPrice: '',
    starRating: '',
    engineCC: '',
    fuelType: '',
    productImage: [],
    keyFeature: [{
      power: '',
      GVW: '',
      payload: '',
      engineDisplacement: '',
      mileage: '',
      noOfTyres: '',
      fuelTankCapacity: '',
      wheelBase: ''
    }],
    pros: [],
    cons: [],
    uses: [],
    FAQ: []
  });

  const [specId, setSpecId] = useState(null);
  const [proInput, setProInput] = useState('');
  const [conInput, setConInput] = useState('');
  const [faqInput, setFaqInput] = useState({ question: '', answer: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedUses, setSelectedUses] = useState([]);
  const [productImage, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // Brand options
  const brandOptions = [
    { value: 'tata', label: 'Tata Motors' },
    { value: 'mahindra', label: 'Mahindra' },
    { value: 'ashok-leyland', label: 'Ashok Leyland' },
    { value: 'bharat-benz', label: 'BharatBenz' },
    { value: 'eicher', label: 'Eicher' },
    { value: 'force', label: 'Force Motors' }
  ];

  // SubCategory options
  const subCategoryOptions = [
    { value: 'mini-trucks', label: 'Mini Trucks' },
    { value: 'medium-trucks', label: 'Medium Trucks' },
    { value: 'medium-tipper', label: 'Medium Tipper' },
    { value: 'heavy-trucks', label: 'Heavy Trucks' },
    { value: 'heavy-tipper', label: 'Heavy Tipper' },
    { value: 'trailers', label: 'Trailers' },
    { value: 'mixers', label: 'Mixers' },
    { value: 'bulkers', label: 'Bulkers' },

  ];

  // Uses options for trucks
  const useOptions = [
    { value: 'construction-material', label: 'Construction Material Transport' },
    { value: 'goods-delivery', label: 'Goods Delivery' },
    { value: 'refrigerated-transport', label: 'Refrigerated Transport' },
    { value: 'container-transport', label: 'Container Transport' },
    { value: 'agricultural-transport', label: 'Agricultural Transport' },
    { value: 'beverage-transport', label: 'Beverage Transport' },
    { value: 'oil-tanker', label: 'Oil/Fuel Transport' },
    { value: 'waste-management', label: 'Waste Management' }
  ];

  // Fuel type options
  const fuelTypeOptions = [
    { value: 'Petrol', label: 'Petrol' },
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Cng', label: 'CNG' }
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle product selection
  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
    setFormData(prev => ({
      ...prev,
      productName: selectedOption ? selectedOption.label : ''
    }));
  };

  // Handle brand selection
  const handleBrandChange = (selectedOption) => {
    setSelectedBrand(selectedOption);
    setFormData(prev => ({
      ...prev,
      brandName: selectedOption ? selectedOption.label : ''
    }));
  };

  // Handle SubCategory selection
  const handleSubCategory = (selectedOption) => {
    setSelectedSubCategory(selectedOption);
    setFormData(prev => ({
      ...prev,
      subCategoryName: selectedOption ? selectedOption.label : ''
    }));
  };

  // Handle uses selection
  const handleUsesChange = (selectedOptions) => {
    setSelectedUses(selectedOptions);
    setFormData(prev => ({
      ...prev,
      uses: selectedOptions.map(option => option.label)
    }));
  };

  // Handle key feature changes
  const handleKeyFeatureChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      keyFeature: [{
        ...prev.keyFeature[0],
        [name]: value
      }]
    }));
  };

  // Handle pros and cons
  const handleAddItem = (type) => {
    if (type === 'pro' && proInput.trim()) {
      setFormData(prev => ({
        ...prev,
        pros: [...prev.pros, proInput]
      }));
      setProInput('');
    } else if (type === 'con' && conInput.trim()) {
      setFormData(prev => ({
        ...prev,
        cons: [...prev.cons, conInput]
      }));
      setConInput('');
    }
  };

  const handleRemoveItem = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData(prev => ({
      ...prev,
      productImage: [...prev.productImage, ...files] // Only add File objects
    }));

    // Call the upload function here or later on form submit
    // uploadImage(files, categoryId);
  };


  // Handle FAQ
  const handleAddFaq = () => {
    if (faqInput.question.trim() && faqInput.answer.trim()) {
      setFormData(prev => ({
        ...prev,
        FAQ: [...prev.FAQ, faqInput]
      }));
      setFaqInput({ question: '', answer: '' });
    }
  };

  const handleRemoveFaq = (index) => {
    setFormData(prev => ({
      ...prev,
      FAQ: prev.FAQ.filter((_, i) => i !== index)
    }));

  };


  useEffect(() => {
    if (id) {
      setdataFn()
    }
  }, []);


  // get the data from the form
  const setdataFn = async () => {
    try {
      const response = await axios.get(`${API.HOST}/api/category/getData/${id}`);
      if (response.data.success === true) {
        console.log('API Response:', response.data.data);

        if (response.data.data.specId) {
          setSpecId(response.data.data.specId);
        }

        // Add debug logging for image URLs
        if (response.data.data.productImage && response.data.data.productImage.length > 0) {
          console.log('Complete image URLs:', response.data.data.productImage.map(img =>
            `https://only-heavy.s3.eu-north-1.amazonaws.com/${img}`
          ));
        }

        // Map the uses array to the format expected by react-select
        const mappedUses = response.data.data.uses.map(use => {
          const matchingOption = useOptions.find(option =>
            option.label === use || option.value === use
          );
          return matchingOption || { value: use.toLowerCase().replace(/\s+/g, '-'), label: use };
        });

        setSelectedUses(mappedUses);

        // Set the form data including images
        setFormData({
          ...response.data.data,
          keyFeature: response.data.data.keyFeature || [{
            power: '',
            GVW: '',
            payload: '',
            engineDisplacement: '',
            mileage: '',
            noOfTyres: '',
            fuelTankCapacity: '',
            wheelBase: ''
          }],
          pros: response.data.data.pros || [],
          cons: response.data.data.cons || [],
          uses: response.data.data.uses || [],
          FAQ: response.data.data.FAQ || [],
          productImage: response.data.data.productImage || []
        });

        // Set existing images
        if (response.data.data.productImage && response.data.data.productImage.length > 0) {
          console.log('Setting images from API:', response.data.data.productImage);
          setImages(response.data.data.productImage);
        }

        const matchingBrand = brandOptions.find(option =>
          option.label === response.data.data.brandName
        );
        setSelectedBrand(matchingBrand);
      }
    } catch (err) {
      console.error('Error fetching truck data:', err);
    }
  };

  // Store specId in localStorage whenever it changes
  useEffect(() => {
    if (specId) {
      localStorage.setItem('currentSpecId', specId);
    }
  }, [specId]);

  const uploadImage = async (imageFiles, id) => {
    const formData = new FormData();

    // Log the imageFiles for debugging
    console.log('Uploading images:', imageFiles);

    // Check if imageFiles is an array and has items
    if (!Array.isArray(imageFiles) || imageFiles.length === 0) {
      console.warn('No images to upload');
      return;
    }

    // Append each file to FormData
    imageFiles.forEach((file, index) => {
      if (file instanceof File) {
        formData.append('productUrl', file);
        console.log(`Appending file ${index}:`, file.name);
      } else {
        console.warn(`Skipping invalid file at index ${index}:`, file);
      }
    });

    try {
      const response = await axios.post(
        `${API.HOST}/api/category/updateImage/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file upload
          },
        }
      );
      console.log("Image upload response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  useEffect(() => {
    console.log("Current selected images:", formData.productImage);
  }, [formData.productImage]);



  // Expose submit function via data attribute
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsSubmitting(true);

    try {
      // First, create/update the category without images
      const payload = {
        ...formData,
        productImage: [] // We'll handle images separately
      };

      let response;

      if (id) {
        // Update existing category
        response = await axios.put(
          `${API.HOST}/api/category/UpdateCategory/${id}`,
          payload,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        console.log('Updated category:', response.data);
      } else {
        // Create new category
        response = await axios.post(
          `${API.HOST}/api/category/createCategory`,
          payload,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      onComplete(response?.data?.data?._id);

      if (response.data && response?.data?.data?._id) {
        // If we have images to upload, do it after category creation/update
        if (formData.productImage.length > 0) {
          try {
            await uploadImage(formData.productImage, response.data.data._id);
            toast.success(`Truck profile ${id ? 'updated' : 'created'} with images successfully!`);
          } catch (imageError) {
            console.error('Failed to upload images:', imageError);
            toast.error(`Truck profile ${id ? 'updated' : 'saved'} but failed to upload images`);
          }
        } else {
          toast.success(`Truck profile ${id ? 'updated' : 'created'} successfully!`);
        }

        return true;
      } else {
        throw new Error('Truck saved but ID not received');
      }
    } catch (error) {
      console.error('Failed to submit profile:', error);
      toast.error(`Failed to ${id ? 'update' : 'create'} truck profile`);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };



  // Common input field class
  const inputFieldClass = "w-full text-sm p-2 border border-gray-200 rounded focus:outline-none focus:border-orange-500";

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm md:p-8 p-4">
        <h2 className="text-2xl text-center text-orange-500 font-semibold mb-8">Profile</h2>

        <form className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 mb-2">Category</label>
              <input
                type="text"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                placeholder="Category Name - Ex: Commercial Trucks"
                className={inputFieldClass}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">SubCategory</label>
              <Select
                options={subCategoryOptions}
                value={selectedSubCategory}
                onChange={handleSubCategory}
                placeholder="Select Your SubCategory"
                className="react-select-container"
                classNamePrefix="react-select"
              />
              {selectedSubCategory && (
                <div className="mt-2">
                  <div className="flex items-center bg-red-50 text-red-800 px-3 py-1 rounded">
                    <span>{selectedSubCategory.label}</span>
                    <button
                      type="button"
                      className="ml-auto"
                      onClick={() => handleSubCategory(null)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* <div className='flex gap-5 items-center'> */}
            <div>
              <label className="block text-gray-700 mb-2">Min Price</label>
              <input
                type="number"
                name="minPrice"
                value={formData.minPrice}
                onChange={handleChange}
                placeholder="Min-Price - Ex: 1800000"
                className={inputFieldClass}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Max Price</label>
              <input
                type="number"
                name="maxPrice"
                value={formData.maxPrice}
                onChange={handleChange}
                placeholder="Max-Price - Ex: 1800000"
                className={inputFieldClass}
              />
            </div>
            {/* </div> */}

            <div>
              <label className="block text-gray-700 mb-2">Product Name</label>

              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Product Name - Ex: Tata Yodha 2.0"
                className={inputFieldClass}
              />

            </div>

            <div>
              <label className="block text-gray-700 mb-2">Brand</label>
              <Select
                options={brandOptions}
                value={selectedBrand}
                onChange={handleBrandChange}
                placeholder="Select Your Brand"
                className="react-select-container"
                classNamePrefix="react-select"
              />
              {selectedBrand && (
                <div className="mt-2">
                  <div className="flex items-center bg-red-50 text-red-800 px-3 py-1 rounded">
                    <span>{selectedBrand.label}</span>
                    <button
                      type="button"
                      className="ml-auto"
                      onClick={() => handleBrandChange(null)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Engine CC</label>
              <input
                type="text"
                name="engineCC"
                value={formData.engineCC}
                onChange={handleChange}
                placeholder="Engine CC - Ex: 2956 CC"
                className={inputFieldClass}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Fuel Type</label>
              <Select
                options={fuelTypeOptions}
                value={fuelTypeOptions.find(option => option.value === formData.fuelType)}
                onChange={(selectedOption) => {
                  setFormData(prev => ({
                    ...prev,
                    fuelType: selectedOption ? selectedOption.value : ''
                  }));
                }}
                placeholder="Select Fuel Type"
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 mb-2">Star Rating</label>
              <input
                type="number"
                name="starRating"
                value={formData.starRating}
                onChange={handleChange}
                placeholder="Star Rating - Ex: 4.5"
                className={inputFieldClass}
              />
            </div>
          </div>

          <div className="mb-2 w-full">
            <label className="block text-gray-700 mb-2">Product Image</label>
            <div className="flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg h-36 relative">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <Plus size={24} className="text-gray-400" />
                <span className="text-gray-400 text-sm mt-1">Choose Images</span>
              </div>
            </div>

            {/* Preview Selected Images */}
            {formData.productImage.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {formData.productImage.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img instanceof File ?
                        URL.createObjectURL(img) :
                        `https://only-heavy.s3.eu-north-1.amazonaws.com/${img}`
                      }
                      alt={`preview-${index}`}
                      className="w-20 h-20 object-cover rounded border"
                      onError={(e) => {
                        console.error('Image failed to load:', img);
                        e.target.src = 'https://via.placeholder.com/100?text=Error';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          productImage: prev.productImage.filter((_, i) => i !== index)
                        }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>






          {/* Key Features */}
          <h3 className="text-2xl text-center text-orange-500 font-semibold mb-8">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 mb-2">Power</label>
              <input
                type="text"
                name="power"
                value={formData.keyFeature[0].power}
                onChange={handleKeyFeatureChange}
                placeholder="Power - Ex: 100 HP @ 3500 rpm"
                className={inputFieldClass}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Gross Vehicle Weight</label>
              <input
                type="text"
                name="GVW"
                value={formData.keyFeature[0].GVW}
                onChange={handleKeyFeatureChange}
                placeholder="Gross Vehicle Weight - Ex: 3490 kg"
                className={inputFieldClass}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Payload</label>
              <input
                type="text"
                name="payload"
                value={formData.keyFeature[0].payload}
                onChange={handleKeyFeatureChange}
                placeholder="Payload - Ex: 1500 kg"
                className={inputFieldClass}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Engine Displacement</label>
              <input
                type="text"
                name="engineDisplacement"
                value={formData.keyFeature[0].engineDisplacement}
                onChange={handleKeyFeatureChange}
                placeholder="Engine Displacement - Ex: 2956 cc"
                className={inputFieldClass}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Mileage</label>
              <input
                type="text"
                name="mileage"
                value={formData.keyFeature[0].mileage}
                onChange={handleKeyFeatureChange}
                placeholder="Mileage - Ex: 12.5 km/l"
                className={inputFieldClass}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">No. of Tyres</label>
              <input
                type="text"
                name="noOfTyres"
                value={formData.keyFeature[0].noOfTyres}
                onChange={handleKeyFeatureChange}
                placeholder="Number of Tyres - Ex: 6"
                className={inputFieldClass}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Fuel Tank Capacity</label>
              <input
                type="text"
                name="fuelTankCapacity"
                value={formData.keyFeature[0].fuelTankCapacity}
                onChange={handleKeyFeatureChange}
                placeholder="Fuel - Ex: Diesel"
                className={inputFieldClass}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Wheelbase</label>
              <input
                type="text"
                name="wheelBase"
                value={formData.keyFeature[0].wheelBase}
                onChange={handleKeyFeatureChange}
                placeholder="Wheelbase - Ex: 3335 mm"
                className={inputFieldClass}
              />
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 mb-2">pros</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={proInput}
                  onChange={(e) => setProInput(e.target.value)}
                  placeholder="Pros - Ex: Excellent fuel efficiency"
                  className={inputFieldClass}
                />
                <button
                  type="button"
                  onClick={() => handleAddItem('pro')}
                  className="bg-orange-500 text-white px-4 rounded cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {formData.pros.map((item, index) => (
                  <div key={index} className="flex items-center bg-red-50 text-red-800 px-3 py-1 rounded">
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('pros', index)}
                      className="ml-auto cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">cons</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={conInput}
                  onChange={(e) => setConInput(e.target.value)}
                  placeholder="Cons - Ex: Higher maintenance cost"
                  className={inputFieldClass}
                />
                <button
                  type="button"
                  onClick={() => handleAddItem('con')}
                  className="bg-orange-500 text-white px-4 rounded cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {formData.cons.map((item, index) => (
                  <div key={index} className="flex items-center bg-red-50 text-red-800 px-3 py-1 rounded">
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('cons', index)}
                      className="ml-auto"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Uses */}
          <div className="mb-8">
            <label className="block text-gray-700 mb-2">uses</label>
            <Select
              isMulti
              options={useOptions}
              value={selectedUses}
              onChange={handleUsesChange}
              placeholder="Select"
              className="react-select-container"
              classNamePrefix="react-select"
            />
            {selectedUses.length > 0 && (
              <div className="mt-2 space-y-2">
                {selectedUses.map((use, index) => (
                  <div key={index} className="flex items-center bg-red-50 text-red-800 px-3 py-1 rounded">
                    <span>{use.label}</span>
                    <button
                      type="button"
                      className="ml-auto cursor-pointer"
                      onClick={() => {
                        const newUses = selectedUses.filter((_, i) => i !== index);
                        handleUsesChange(newUses);
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FAQs */}
          <div className="mb-8">
            <label className="block text-gray-700 mb-2">FAQS</label>
            <div className="space-y-4">
              <input
                type="text"
                value={faqInput.question}
                onChange={(e) => setFaqInput(prev => ({ ...prev, question: e.target.value }))}
                placeholder="Question - Ex: What is the maximum payload capacity?"
                className={inputFieldClass}
              />
              <textarea
                value={faqInput.answer}
                onChange={(e) => setFaqInput(prev => ({ ...prev, answer: e.target.value }))}
                placeholder="Answer - Ex: The maximum payload capacity of Tata Yodha 2.0 is 1500 kg, making it suitable for various commercial applications."
                className={`${inputFieldClass} h-24`}
              />
              <button
                type="button"
                onClick={handleAddFaq}
                className="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Add FAQ
              </button>

              {/* FAQ Preview Section */}
              {formData.FAQ.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium text-gray-700">Added FAQs:</h4>
                  {formData.FAQ.map((faq, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 relative group">
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(index)}
                        className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <X size={20} />
                      </button>
                      <h5 className="font-medium text-gray-800 mb-2">Q: {faq.question}</h5>
                      <p className="text-gray-600">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>

      </div >
      <div className='flex justify-center my-5'>
        <button onClick={handleSubmit} className='bg-orange-500 text-lg font-medium text-white px-8 py-2 rounded cursor-pointer'>save</button>

      </div>

    </div >
  );
};

export default ProfileTab;
