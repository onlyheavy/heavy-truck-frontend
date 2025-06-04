import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const JcbTruckGallery = () => {
  const imageList = [
    '/images/jcb.png',
    '/images/jcb.png',
    '/images/jcb.png',
    '/images/jcb.png',
    '/images/jcb.png',
    '/images/jcb.png',
    
  ];

  const features = [
    {
      title: '36.4 KW (49hp)',
      img: '/icons/cc.svg',
    },
    {
      title: '0.18 Cum',
      img: '/icons/petrol.svg',
    },
    {
      title: '3020 mm',
      img: '/icons/compare.svg',
    },
  ]
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className='flex gap-8'>
      <div className="">
        <div className="mb-4  rounded w-[550px] h-[320px] ">
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

        {/* Modal for all images */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="All Images"
          className="fixed inset-0 flex items-center justify-center opacity-80  bg-black p-4"

        >
          <div className="bg-white p-6 rounded-lg overflow-auto">
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
                  alt={`All image ${i + 1}`}
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


      <div className='flex flex-col gap-7'>
        <div className='flex gap-3 items-center'>
          <h1 className='font-bold text-2xl'>JCB 2DX</h1>
          <div className='bg-orange-500 rounded-full w-fit px-3 py-1 text-white flex items-center gap-3'>
            <img src="/icons/star.svg" alt="" />
            <p className='text-sm'>4.9</p>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <p className='text-[#797979] text-sm font-semibold'>Ex-Showroom Price</p>
          <p className='font-bold text-lg'>₹ 18.00 - ₹ 20.40 Lakh* </p>
        </div>

        <div className='flex gap-2 items-center'>
          {
            features.map((feature, i) => (
              <div key={i} className='flex gap-3 items-center mb-2 bg-[#FFF0E9] rounded-full px-3 py-2'>
                <img src={feature.img} alt="" />
                <p className=' text-sm font-semibold'>{feature.title}</p>
              </div>
            ))
          }
        </div>

        <div className='flex gap-3 items-center text-sm'>
          <button className='text-[#FA7436] border border-[#FA7436] p-3 rounded-md cursor-pointer hover:bg-[#FA7436] hover:text-white transition-all duration-200 font-bold'>Get on road price</button>
          <button className='text-white bg-[#FA7436] p-3 rounded-md font-semibold'>Check Discount Offer</button>
        </div>

      </div>
    </div>

  );
};

export default JcbTruckGallery;
