import React from "react";

const FirstProductPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20">
        <div className="max-w-xl">
          <h1 className="text-5xl font-serif text-gold-400 mb-4">
            Noir Essence
          </h1>
          <p className="text-gray-400 mb-6">
            A fragrance of power, mystery, and timeless sophistication.
          </p>
          <button className="bg-yellow-600 px-8 py-3 rounded-full hover:bg-yellow-500">
            Purchase - $499
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1615212049275-5a06987d4b16"
          alt="Perfume"
          className="w-full md:w-1/2 rounded-3xl mt-8 md:mt-0 shadow-2xl"
        />
      </section>

      {/* Story */}
      <section className="p-10 md:p-20 bg-gradient-to-b from-black to-gray-900">
        <h2 className="text-3xl font-semibold mb-4 text-yellow-500">
          The Story Behind
        </h2>
        <p className="text-gray-400 leading-relaxed">
          Born in Paris, crafted by the world’s finest perfumers. Noir Essence
          combines rare amberwood, jasmine, and midnight musk — creating an aura
          of dominance and allure that lasts beyond the night.
        </p>
      </section>

      {/* Ingredients */}
      <section className="p-10 md:p-20 bg-black">
        <h2 className="text-3xl font-semibold mb-6 text-yellow-500">
          Core Notes
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Amberwood", "Jasmine", "Musk"].map((note, i) => (
            <div
              key={i}
              className="bg-gray-900 p-6 rounded-2xl text-center hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-semibold text-yellow-400">{note}</h3>
              <p className="text-sm mt-2 text-gray-500">
                Essence that defines the true luxury of Noir.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="p-10 md:p-20 bg-gradient-to-b from-gray-900 to-black">
        <h2 className="text-3xl font-semibold mb-8 text-center text-yellow-500">
          Testimonials
        </h2>
        <div className="space-y-8">
          <div className="p-6 bg-gray-800 rounded-xl">
            “It’s not just a scent. It’s a presence.” – Alexander V.
          </div>
          <div className="p-6 bg-gray-800 rounded-xl">
            “Wearing Noir makes me feel like royalty.” – Camille R.
          </div>
        </div>
      </section>

      {/* CTA */}
      <footer className="text-center p-10 bg-yellow-600 text-black">
        <h3 className="text-xl font-bold">Indulge in Luxury</h3>
        <button className="mt-4 px-6 py-3 bg-black text-yellow-500 rounded-full hover:text-white">
          Add to Cart
        </button>
      </footer>
    </div>
  );
};

export default FirstProductPage
