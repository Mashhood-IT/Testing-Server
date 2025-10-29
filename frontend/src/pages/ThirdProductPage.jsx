import React from "react";

const ThirdProductPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50 text-gray-800">
      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20">
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold mb-4 text-blue-600">
            AirFlex Sneakers
          </h1>
          <p className="text-gray-600 mb-6">
            Designed for speed, comfort, and street style.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Buy Now - $149
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1606813902914-1d06b4b16856"
          alt="Sneakers"
          className="w-full md:w-1/2 rounded-3xl shadow-lg mt-8 md:mt-0"
        />
      </section>

      {/* Highlights */}
      <section className="p-10 md:p-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Why You'll Love Them
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Feather-Light Cushioning", "Ultra Grip Sole", "Breathable Mesh"].map(
            (feature, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow hover:shadow-xl"
              >
                <h3 className="font-bold text-blue-600 mb-2">{feature}</h3>
                <p className="text-sm text-gray-500">
                  Tested by athletes, loved by everyone.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Reviews */}
      <section className="p-10 bg-white">
        <h2 className="text-3xl font-semibold mb-8 text-center text-blue-600">
          Customer Love ❤️
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-50 rounded-xl">
            “I run daily in these. They feel like clouds!” – Jake P.
          </div>
          <div className="p-6 bg-pink-50 rounded-xl">
            “Stylish, comfy, and durable. Worth every penny!” – Emma T.
          </div>
        </div>
      </section>

      {/* CTA */}
      <footer className="text-center p-10 bg-blue-600 text-white">
        <h3 className="text-xl font-semibold mb-2">Run the World</h3>
        <p className="mb-4">Order your AirFlex sneakers now</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-100">
          Add to Cart
        </button>
      </footer>
    </div>
  );
};

export default ThirdProductPage
