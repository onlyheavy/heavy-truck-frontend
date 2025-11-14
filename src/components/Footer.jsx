import { MapPin, Phone } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full text-white bg-[url('/footer-bg.svg')] bg-cover bg-center">
      {/* Footer */}
      <footer className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side */}
            <div className="lg:w-1/3">
              <img className="h-8 w-auto mb-4" src="/logo.svg" alt="Logo" />
              <p className="text-sm mb-4 leading-relaxed text-gray-100">
                Only Heavy is a one-stop research and information platform for
                all your new truck-buying needs in India.
              </p>
            </div>

            {/* Right Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 flex-1">
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#FA7436]">
                  QUICK LINKS
                </h3>
                <ul className="space-y-2 text-sm text-gray-200">
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

              {/* Pages */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#FA7436]">
                  Pages
                </h3>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>
                    <a href="#" className="hover:text-white">
                      Truck Brochure
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Compare Trucks
                    </a>
                  </li>
                </ul>
              </div>

              {/* Policy Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#FA7436]">
                  Policy Links
                </h3>
                <ul className="space-y-2 text-sm text-gray-200">
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

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#FA7436]">
                  Contact Us
                </h3>
                <div className="space-y-2 text-sm text-gray-200">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>+91  93422 00875</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📧</span>
                    <span>support@onlyheavy.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-500 mt-8 pt-6 text-center text-sm text-gray-300">
            <p>© Copyright 2024 TruckMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
