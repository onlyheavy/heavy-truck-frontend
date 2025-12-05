import BackHoeNavbar from '@/components/BackHoeNavbar';
import Footer from '@/components/Footer';
import React from 'react';

const BackHoeLayout = ({
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
        <BackHoeNavbar />
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

export default BackHoeLayout;
