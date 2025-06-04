import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const JcbLayout = ({
  children,

}) => {
  return (
    <>
      <div className="container mx-auto ">
        <Navbar
        
        />
        <div className="md:mx-5 mx-2 bg-[#FEFCFB]">
          <main className="container md:p-8 p-4">{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default JcbLayout;
