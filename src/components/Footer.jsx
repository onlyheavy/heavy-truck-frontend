import { MapPin, Phone } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className="w-full text-white bg-[url('/footer-bg.svg')] bg-cover bg-center">

      {/* Footer */}
      <footer className="  py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img className="h-8 w-auto mb-4" src="/logo.svg" alt="Logo" />
              <p className=" text-sm mb-4">
                Only Heay is a one-stop research and information platform for all your new truck-buying needs in India.
              </p>
              {/* <div className="flex space-x-4">
                <Phone className="h-5 w-5 " />
                <span className="text-sm ">+91 98765 43210</span>
              </div> */}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">QUICK LINKS</h3>
              <ul className="space-y-2 text-sm ">
                <li>
                  <a href="#" className="hover:text-white">
                    New Trucks
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Used Trucks
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Compare Trucks
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Truck News
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Reviews
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">POLICY LINKS</h3>
              <ul className="space-y-2 text-sm ">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Disclaimer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">CONTACT US</h3>
              <div className="space-y-2 text-sm ">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>123 Business District, Mumbai, India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>info@truckmarket.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-400 mt-8 pt-8 text-center text-sm ">
            <p>© Copyright 2024 TruckMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer