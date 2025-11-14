import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/layouts/AdminLayout';
import ProfileTab from '@/components/Add-Truck/ProfileTab';
import EngineTab from '@/components/Add-Truck/EngineTab';
import SeoTab from '@/components/Add-Truck/SeoTab';
import toast from 'react-hot-toast';

const AddTruck = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [truckId, setTruckId] = useState(null);
  const [truckMeta, setTruckMeta] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle successful completion of each step
  const handleStepComplete = async (id, metadata = {}) => {
    if (!id) {
      toast.error('No valid ID received');
      return;
    }

    try {
      setIsLoading(true);
      setTruckId(id);
      const updatedMeta = {
        categoryName: metadata?.categoryName || truckMeta.categoryName,
        fuelType: metadata?.fuelType || truckMeta.fuelType
      };
      setTruckMeta(updatedMeta);

      const queryParams = { id };
      if (updatedMeta.categoryName) {
        queryParams.category = updatedMeta.categoryName;
      }
      if (updatedMeta.fuelType) {
        queryParams.fuel = updatedMeta.fuelType;
      }

      router.replace({
        pathname: router.pathname,
        query: queryParams
      }, undefined, { shallow: true });

      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error('Error in step transition:', error);
      toast.error('Error processing step: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      // Ensure the URL always has the id as a query param
      if (truckId) {
        const queryParams = { id: truckId };
        if (truckMeta.categoryName) {
          queryParams.category = truckMeta.categoryName;
        }
        if (truckMeta.fuelType) {
          queryParams.fuel = truckMeta.fuelType;
        }

        router.replace({
          pathname: router.pathname,
          query: queryParams
        }, undefined, { shallow: true });
      }
    }
  };

  const handleNextStep = async () => {
    try {
      setIsLoading(true);

      // Get the current tab's submit function
      const currentTab = document.querySelector('[data-tab-submit]');
      if (currentTab && typeof currentTab.submit === 'function') {
        await currentTab.submit();
      }
    } catch (error) {
      console.error('Error processing step:', error);
      toast.error('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Render current step
  const renderStep = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return <ProfileTab onComplete={handleStepComplete} />;
      case 2:
        return truckId ? (
          <EngineTab truckId={truckId} onComplete={handleStepComplete} onBack={handlePrevStep} />
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-red-500">
              No valid truck ID. Please complete the profile step first.
            </div>
          </div>
        );
      case 3:
        return truckId ? (
          <SeoTab truckId={truckId} onComplete={handleStepComplete} onBack={handlePrevStep} />
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-red-500">
              No valid truck ID. Please complete the profile step first.
            </div>
          </div>
        );
      default:
        return <ProfileTab onComplete={handleStepComplete} />;
    }
  };

  // Effect to handle invalid states
  useEffect(() => {
    if (!truckId && currentStep > 1) {
      setCurrentStep(1);
      toast.error('No valid truck ID found. Starting over.');
    }
  }, [truckId, currentStep]);

  // Scroll to top on step change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  useEffect(() => {
    const { category, fuel } = router.query;
    if (category || fuel) {
      setTruckMeta(prev => ({
        categoryName: category || prev.categoryName,
        fuelType: fuel || prev.fuelType
      }));
    }
  }, [router.query, router.query.category, router.query.fuel]);

  return (
    <AdminLayout>
      <div className="bg-white">
        <h1 className="text-2xl font-bold  text-gray-800 mb-6">Add New Truck</h1>
        <div className="bg-white rounded-lg shadow">
          {/* Progress Bar */}
          <div className="border-b px-6 py-4">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <div
                className={`flex items-center ${currentStep >= 1 ? 'text-orange-500' : 'text-gray-400'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
                >
                  1
                </div>
                <span className="ml-2">Profile</span>
              </div>
              <div className={`h-0.5 w-16 ${currentStep >= 2 ? 'bg-orange-500' : 'bg-gray-300'}`} />
              <div
                className={`flex items-center ${currentStep >= 2 ? 'text-orange-500' : 'text-gray-400'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
                >
                  2
                </div>
                <span className="ml-2">Specifications</span>
              </div>
              <div className={`h-0.5 w-16 ${currentStep >= 3 ? 'bg-orange-500' : 'bg-gray-300'}`} />
              <div
                className={`flex items-center ${currentStep >= 3 ? 'text-orange-500' : 'text-gray-400'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 3 ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
                >
                  3
                </div>
                <span className="ml-2">SEO</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="md:p-6 p-4 bg-[#FEFCFB]">{renderStep()}</div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddTruck;
