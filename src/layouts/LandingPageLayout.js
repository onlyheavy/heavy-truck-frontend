import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const LandingPageLayout = ({
  children,

}) => {
  return (
    <>
      <div className="container mx-auto ">
        <Navbar
        
        />
        <div className="  bg-[#FEFCFB]">
          <main className="container">{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPageLayout;
