
const cards = [
  {
    img: "/images/news1.svg",
    title: "New Model Launches",
    desc: "Stay ahead with our latest truck models designed for maximum performance, fuel efficiency, and durability. Discover trucks built to meet the growing demands of your business."
  },
  {
    img: "/images/news2.svg",
    title: "Industry Trends",
    desc: "Keep up with the newest trends in the trucking industry, from electric and hybrid trucks to advanced safety and smart technology features."
  },
  {
    img: "/images/news3.svg",
    title: "Customer Success Stories",
    desc: "Read how businesses across India are growing faster and reducing costs with our reliable trucks. Real stories, real success."
  }
];

export default function LatestNews() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mx-10  mb-10">
          <div className="hidden md:block w-60 border-t border-gray-300"></div>
          <span className="mx-4 text-xl md:text-3xl font-bold text-gray-900">
            Latest News
          </span>
          <div className="hidden md:block w-60 border-t border-gray-300"></div>
        </div>
        <div className="sm:hidden overflow-x-auto px-4 scrollbar-hide">
          <div className="flex gap-4 w-max">
            {cards.map((card, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-72 bg-white rounded-md p-3 overflow-hidden border border-gray-300 hover:shadow-lg"
              >
                <img src={card?.img} alt="latest news" className="w-full h-40 object-cover rounded-md" />

                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-md p-3 overflow-hidden border border-gray-300 hover:shadow-lg"
            >
              <img src={card?.img} alt="latest news" className="w-full h-40 object-cover rounded-md" />

              <div className="mt-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
