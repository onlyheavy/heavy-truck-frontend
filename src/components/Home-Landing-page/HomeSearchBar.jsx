import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const HomeSearchBar = () => {
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedModel, setSelectedModel] = useState("")

  const truckBrands = {
    Tata: ["Tata Ace", "Tata Intra V10", "Tata LPT 407"],
    "Ashok Leyland": ["Dost+", "Partner", "Boss"],
    Mahindra: ["Bolero Pickup", "Jeeto", "Furio"],
    Eicher: ["Pro 2049", "Pro 3015"],
    BharatBenz: ["1015R", "1217C"],
  }

  const handleQuote = () => {
    if (!selectedBrand || !selectedModel) {
      alert("Please select both brand and model")
      return
    }
    alert(`You requested a quote for ${selectedBrand} - ${selectedModel}`)
  }


  return (
    <div>
      <section className="bg-gradient-to-b from-[#FFF0E5] to-[#FFF9F5] py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
            <div className="">
              <h2 className="text-4xl lg:text-5xl font-bold  mb-6 text-balance 
               bg-gradient-to-b from-[#E9C3A2] to-[#2F2717] bg-clip-text text-transparent">
                Find the Perfect Truck
                <br />
                <span className="">for Your Business &</span>
                <br />
                Lifestyle
              </h2>

              <p className="text-lg text-[#566479] mb-8 text-pretty">
                Easily estimate how much you’ll spend on fuel each month based on mileage, fuel price, and efficiency.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 bg-white p-5 rounded-md border border-orange-400">

                {/* Select Brand */}
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value)
                    setSelectedModel("") // reset model when brand changes
                  }}
                  className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 w-60"
                >
                  <option value="">Select Truck Brand</option>
                  {Object.keys(truckBrands).map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>

                {/* Select Model */}
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedBrand}
                  className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 w-60 disabled:opacity-50"
                >
                  <option value="">Select Truck Model</option>
                  {selectedBrand &&
                    truckBrands[selectedBrand]?.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                </select>

                {/* Get Quote Button */}
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleQuote}
                >
                  Get Quote
                </Button>
              </div>

            </div>
            <div className="relative w-full h-full">
              {/* Ring in the back */}
              <img
                src="/images/ring.svg"
                alt="ring"
                className="absolute inset-0 w-full h-full z-0"
              />

              {/* Truck on top */}
              <img
                src="/images/home-truck.svg?height=400&width=600"
                alt="Commercial Truck"
                className="relative w-full h-auto z-10"
              />
            </div>

          </div>
        </div>
      </section>


    </div>
  )
}

export default HomeSearchBar