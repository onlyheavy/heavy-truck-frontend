import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const MainLayout = ({
  children,
  truckFeaturesRef,
  truckGalleryRef,
  truckFuelRef,
  truckEmiCaluculator,
  truckBrochure,
  truckLoan,
}) => {
  return (
    <>
      <div className="container bg-[#FEFCFB] mx-auto ">
        <Navbar />
        <div className="md:mx-5 mx-2 bg-[#FEFCFB]">
          <main
            className="container md:p-8 p-4"
            truckGalleryRef={truckGalleryRef}
            truckFeaturesRef={truckFeaturesRef}
            truckFuelRef={truckFuelRef}
            truckEmiCaluculator={truckEmiCaluculator}
            truckBrochure={truckBrochure}
            truckLoan={truckLoan}
          >
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
