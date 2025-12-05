import React, { useEffect, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import Modal from 'react-modal';
import { useCategory } from '@/hooks/useContext';
import PriceForm from '@/components/brochure/PriceForm';


Modal.setAppElement('#__next');

const BackHoeGallery = () => {
  const { categoryData } = useCategory();
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("");

  const handleClick = (type) => {
    setStatus(type);
    setShowForm(true);
  };

  useEffect(() => {

    if (categoryData?.[0]?.productImage?.length) {
      const formattedImages = categoryData[0].productImage.map((data) => (
        `${process.env.NEXT_PUBLIC_S3_URL}${data}`
      ));
      setImageList(formattedImages);
      setSelectedImage(formattedImages[0]);
    }
  }, [categoryData]);

  const features = [
    {
      title: categoryData?.[0]?.engineCC || 'N/A',
      img: '/icons/cc.svg',
    },
    {
      title: categoryData?.[0]?.fuelType || 'N/A',
      img: '/icons/petrol.svg',
    },
    {
      title: 'Compare',
      img: '/icons/compare.svg',
    },
  ];

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const EmptyGallery = () => (
    <div className='block md:flex  gap-8'>
      {/* Desktop Empty Gallery */}
      <div className="hidden sm:block">
        <div className="mb-4 rounded w-[550px] h-[320px] bg-gray-200 flex items-center justify-center">
          <img src="/icons/image-placeholder.svg" alt="No image" className="w-16 h-16 opacity-50" />
        </div>

        {/* Empty Thumbnails */}
        <div className="flex space-x-4">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="w-24 h-24 border rounded overflow-hidden bg-gray-200 flex items-center justify-center">
              <img src="/icons/image-placeholder.svg" alt="No thumbnail" className="w-8 h-8 opacity-50" />
            </div>
          ))}

          {/* View All Button */}
          <button
            className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded text-sm cursor-not-allowed opacity-50"
          >
            View All
          </button>
        </div>
      </div>

      {/* Mobile Empty Gallery */}
      <div className="w-full max-w-sm mx-auto mt-6 block sm:hidden mb-6 md:mb-0">
        <div className="rounded-xl overflow-hidden shadow-md bg-gray-200 h-56 flex items-center justify-center">
          <img src="/icons/image-placeholder.svg" alt="No image" className="w-16 h-16 opacity-50" />
        </div>
        <div className="flex justify-center mt-3 space-x-2">
          {[1, 2, 3].map((_, index) => (
            <span
              key={index}
              className="w-3 h-3 rounded-full bg-gray-300"
            ></span>
          ))}
        </div>
      </div>

      {/* Truck Info & Features */}
      <div className='flex flex-col gap-7'>
        <div className='flex gap-3 items-center'>
          <h1 className='font-bold text-2xl text-black capitalize'>{categoryData?.[0]?.productName || 'Product Name'}</h1>
          <div className='bg-orange-500 rounded-full w-fit px-3 py-1 text-white flex items-center gap-3'>
            <img src="/icons/star.svg" alt="star" />
            <p className='text-sm '>{categoryData?.[0]?.starRating || '0.0'}</p>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <p className='text-[#797979] text-sm font-semibold'>Ex-Showroom Price</p>
          <p className='font-bold text-lg '>₹ {Number(categoryData[0]?.minPrice).toLocaleString('en-IN')} - ₹ {Number(categoryData[0]?.maxPrice).toLocaleString('en-IN')} Lakh* </p>
        </div>

        <div className='flex gap-2 items-center'>
          {features.map((feature, i) => (
            <div key={i} className='flex gap-3 items-center mb-2 bg-[#FFF0E9] rounded-full px-3 py-2'>
              <img src={feature.img} alt={feature.title} className='w-5 h-5' />
              <p className='text-sm font-semibold'>{feature.title}</p>
            </div>
          ))}
        </div>

        <div className='flex gap-3 items-center text-sm'>
          <button className='text-[#FA7436] border border-[#FA7436] p-3 rounded-md cursor-pointer hover:bg-[#FA7436] hover:text-white transition-all duration-200 font-bold' onClick={() => handleClick("onroad")}>
            Get on road price
          </button>
          <button className='cursor-pointer text-white bg-[#FA7436] p-3 rounded-md font-semibold' onClick={() => handleClick("discount")}>
            Check Discount Offer
          </button>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 relative shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">
                Download {categoryData?.[0]?.productName || 'Product'} Brochure
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Download {categoryData?.[0]?.productName || 'Product'} brochure online. Check out the PDF brochure at Only Heavy with all features and specifications.
              </p>
            </div>
            <button
              onClick={() => {
                if (categoryData?.[0]?.brochureUrl) {
                  window.open(categoryData[0].brochureUrl, '_blank');
                } else {
                  handleClick('brochure');
                }
              }}
              className="bg-[#FA7436] hover:bg-[#e8652a] rounded-full p-3 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
              aria-label="Download Brochure"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M12 15V3M12 15L8 11M12 15L16 11M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {showForm && <PriceForm onClose={() => setShowForm(false)} id={categoryData[0]?._id} status={status} brand={categoryData[0]?.brandName} />}
    </div>
  );

  return !imageList.length ? <EmptyGallery /> : (
    <div className='block md:flex gap-8'>
      {/* Desktop Gallery */}
      <div className="hidden sm:block">
        <div className="mb-4 rounded w-[550px] h-[320px]">
          <Zoom>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-[320px] object-cover rounded"
            />
          </Zoom>
        </div>

        {/* Thumbnails */}
        <div className="flex space-x-4">
          {imageList.slice(0, 4).map((img, i) => (
            <div key={i} className={`w-24 h-24 border rounded overflow-hidden ${img === selectedImage ? 'border-orange-500' : ''}`}>
              <img
                src={img}
                onClick={() => setSelectedImage(img)}
                className="w-full h-full object-cover transition-transform duration-150 hover:scale-110 cursor-pointer"
                alt={`Thumbnail ${i + 1}`}
              />
            </div>
          ))}

          {/* View All Button */}
          <button
            onClick={() => setModalIsOpen(true)}
            className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded text-sm hover:bg-gray-300 cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="All Images"
          overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
          className="bg-white p-6 rounded-lg max-h-[80vh] overflow-auto outline-none z-50"
        >
          <div className="bg-white z-50 p-6 rounded-lg overflow-auto">
            <h2 className="text-lg font-bold mb-4">All Images</h2>
            <div className="grid grid-cols-3 gap-4">
              {imageList.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => {
                    setSelectedImage(img);
                    setModalIsOpen(false);
                  }}
                  className="w-full h-32 object-cover rounded cursor-pointer hover:scale-105 transition-transform duration-200"
                  alt={`Image ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setModalIsOpen(false)}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-400 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </Modal>
      </div>

      {/* Mobile Gallery */}
      <div className="w-full max-w-sm mx-auto mt-6 block sm:hidden mb-6 md:mb-0">
        <div className="rounded-xl overflow-hidden shadow-md">
          <img
            src={imageList[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-56 object-cover"
          />
        </div>
        <div className="flex justify-center mt-3 space-x-2">
          {imageList.map((_, index) => (
            <span
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? "bg-orange-500 w-6" : "bg-orange-200"
                }`}
            ></span>
          ))}
        </div>
      </div>

      {/* Truck Info & Features */}
      <div className='flex flex-col gap-7'>
        <div className='flex gap-3 items-center justify-between'>
          <h1 className='font-bold text-lg capitalize'>{categoryData[0]?.productName}</h1>
          <div className='bg-orange-500 rounded-full w-fit px-3 py-1 text-white flex items-center gap-3'>
            <img src="/icons/star.svg" alt="star" />
            <p className='text-sm'>{categoryData[0]?.starRating}</p>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <p className='text-[#797979] text-sm font-semibold'>Ex-Showroom Price</p>
          <p className='font-bold text-sm md:text-lg'>₹ {Number(categoryData[0]?.minPrice).toLocaleString('en-IN')} - ₹ {Number(categoryData[0]?.maxPrice).toLocaleString('en-IN')} Lakh* </p>
        </div>

        <div className='flex gap-2 items-center'>
          {features.map((feature, i) => (
            <div key={i} className='flex gap-3 items-center mb-2 bg-[#FFF0E9] rounded-full px-3 py-2'>
              <img src={feature.img} alt={feature.title} />
              <p className='text-sm font-semibold'>{feature.title}</p>
            </div>
          ))}
        </div>

        <div className='flex gap-3 items-center text-sm'>
          <button onClick={() => handleClick("onroad")} className='text-[#FA7436] border border-[#FA7436] px-2 py-2 md:px-2 md:py-3 rounded-md cursor-pointer hover:bg-[#FA7436] hover:text-white transition-all duration-200 font-bold'>
            Get on road price
          </button>
          <button onClick={() => handleClick("discount")} className='cursor-pointer text-white bg-[#FA7436] px-2 py-2 md:px-2 md:py-3 rounded-md font-semibold'>
            Check Discount Offer
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 relative shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">
                Download {categoryData?.[0]?.productName || 'Product'} Brochure
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Download {categoryData?.[0]?.productName || 'Product'} brochure online. Check out the PDF brochure at Only Heavy with all features and specifications.
              </p>
            </div>
            <button
              onClick={() => {
                if (categoryData?.[0]?.brochureUrl) {
                  window.open(categoryData[0].brochureUrl, '_blank');
                } else {
                  handleClick('brochure');
                }
              }}
              className="bg-[#FA7436] hover:bg-[#e8652a] rounded-full p-3 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
              aria-label="Download Brochure"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M12 15V3M12 15L8 11M12 15L16 11M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {showForm && <PriceForm onClose={() => setShowForm(false)} id={categoryData[0]?._id} status={status} brand={categoryData[0]?.brandName} />}
    </div>
  );
};

export default BackHoeGallery;
