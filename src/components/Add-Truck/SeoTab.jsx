import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import API from '@/utils/api';
import { ArrowLeft } from 'lucide-react';

const inputFieldClass = "w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-orange-500 text-sm";

// Input Field Component
const InputField = ({ label, name, type = "text", value, onChange, placeholder }) => (
  <div className='w-full mb-6'>
    <label className='block text-gray-700 text-lg font-medium mb-2'>{label}</label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputFieldClass}`}
        rows={2}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputFieldClass}
      />
    )}
  </div>
);

// Checkbox Field Component
const CheckboxField = ({ label, name, checked, onChange }) => (
  <div className='flex items-center space-x-3 mb-4'>
    <input
      type='checkbox'
      name={name}
      checked={checked}
      onChange={onChange}
      className='form-checkbox h-5 w-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500'
    />
    <label className='text-gray-700 text-lg'>{label}</label>
  </div>
);

const SeoTab = ({ truckId, onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    slug: '',
    metaTitle: '',
    metaDescriptions: '',
    canonicalUrl: '',
    brochureUrl: '',
    searchIndex: false,
    imageIndex: false,
  });

  const router = useRouter()


  // Add cleanup effect
  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem('currentSpecId');
  //   };
  // }, []);

  const fetchSeoData = async () => {
    try {
      const response = await axios.get(`${API.HOST}/api/category/getData/${truckId}`);
      const data = response.data.data;
      setFormData({
        slug: data.slug || '',
        metaTitle: data.metaTitle || '',
        metaDescriptions: data.metaDescriptions || '',
        canonicalUrl: data.canonicalUrl || '',
        brochureUrl: data.brochureUrl || '',
        searchIndex: data.searchIndex || false,
        imageIndex: data.imageIndex || false,
      });


    } catch (error) {
      console.error('Error fetching SEO data:', error);
      toast.error('Error fetching SEO data: ' + error.message);
      setFormData({
        slug: '',
        metaTitle: '',
        metaDescriptions: '',
        canonicalUrl: '',
        brochureUrl: '',
        searchIndex: false,
        imageIndex: false,
      });
    }
  };

  useEffect(() => {
    if (truckId) {
      fetchSeoData();
    }
  }, [truckId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      await axios.put(`${API.HOST}/api/category/updateSeo/${truckId}`, formData);
      toast.success('SEO data updated successfully!');
      await onComplete(truckId);
      router.push('/admin/admin-landing');
      return true;
    } catch (error) {
      console.error('Error submitting SEO data:', error);
      toast.error('Failed to update SEO data: ' + error.message);
      throw error;
    }
  };

  const handleBack = () => {
    if (onBack) onBack();
  };

  return (
    <div className='max-w-7xl mx-auto'>
      <div className=' md:p-8 p-4 bg-white rounded-lg shadow'>
        {/* Back Button */}
        <button
          type="button"
          className="font-bold cursor-pointer border rounded-full p-3 border-black mb-4 flex items-center"
          onClick={handleBack}
        >
          <ArrowLeft strokeWidth={1.25} size={28} />
          <span className="ml-2">Back</span>
        </button>
        <div>
          <h2 className='text-2xl font-bold text-center text-orange-500 border-b-2 border-dashed border-gray-300 pb-6 mb-8'>
            SEO Details
          </h2>

          <form>
            <div className='grid md:grid-cols-2 gap-6'>
              <InputField
                label="Slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Enter Slug"
              />

              <InputField
                label="Meta Title"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                placeholder="Enter Meta Title"
              />
            </div>

            <div className='w-full'>
              <InputField
                label="Meta Description"
                name="metaDescriptions"
                type="textarea"
                value={formData.metaDescriptions}
                onChange={handleChange}
                placeholder="Enter Meta Description"
              />
            </div>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='w-full'>
                <InputField
                  label="Canonical URL"
                  name="canonicalUrl"
                  value={formData.canonicalUrl}
                  onChange={handleChange}
                  placeholder="Enter Canonical URL"
                />
              </div>
              <div className='w-full'>
                <InputField
                  label="Brochure URL"
                  name="brochureUrl"
                  value={formData.brochureUrl}
                  onChange={handleChange}
                  placeholder="Enter Canonical URL"
                />
              </div>
            </div>


            <div className='grid md:grid-cols-2 gap-6 mt-6 p-4 bg-gray-50 rounded-lg'>
              <CheckboxField
                label="Search Index"
                name="searchIndex"
                checked={formData.searchIndex}
                onChange={handleChange}
              />
              <CheckboxField
                label="Image Index"
                name="imageIndex"
                checked={formData.imageIndex}
                onChange={handleChange}
              />
            </div>


          </form>

        </div>
        <div className='flex justify-center my-5'>
          <button onClick={handleSubmit} className='bg-orange-500 text-lg font-medium text-white px-8 py-2 rounded cursor-pointer'>save</button>

        </div>
      </div>
    </div>
  );
};

export default SeoTab;
