import React, { useState } from "react";
import { Heart, Droplet, Battery, Smartphone, Activity, Wifi } from "lucide-react";

const SmartWatchPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    {
      title: "Heart & Sleep Tracking",
      desc: "24/7 advanced heart-rate monitor with detailed sleep stages.",
      icon: <Heart className="w-10 h-10 text-red-500" />,
    },
    {
      title: "Water Resistant 50m",
      desc: "Perfect for swimming, showering, or your next adventure.",
      icon: <Droplet className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "7-Day Battery Life",
      desc: "Stay charged longer with optimized battery performance.",
      icon: <Battery className="w-10 h-10 text-green-500" />,
    },
  ];

  const specs = [
    ["Display", "1.8-inch AMOLED Retina Display"],
    ["Battery Life", "Up to 7 Days Continuous Use"],
    ["Water Resistance", "Up to 50 meters"],
    ["Connectivity", "Bluetooth 5.3 + WiFi"],
    ["Sensors", "Heart Rate, SpO2, Accelerometer, GPS"],
    ["Compatibility", "iOS 13+ / Android 8+"],
  ];

  const reviews = [
    {
      name: "Sarah M.",
      comment: "The best smartwatch I've ever owned! Elegant, responsive, and accurate health tracking.",
      rating: 5,
    },
    {
      name: "David R.",
      comment: "Battery lasts longer than expected, and the sleep tracker is on point!",
      rating: 4,
    },
    {
      name: "Lena P.",
      comment: "Beautiful display and smooth interface. I get compliments every day.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "Is SmartWatch Pro X compatible with my iPhone?",
      a: "Yes! It works seamlessly with both iOS and Android devices.",
    },
    {
      q: "Can I wear it while swimming?",
      a: "Absolutely! It's water-resistant up to 50 meters.",
    },
    {
      q: "How long does it take to charge?",
      a: "It takes about 90 minutes to fully charge the battery.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-0 -left-20"></div>
          <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse bottom-0 -right-20" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent animate-pulse">
              SmartWatch Pro X
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
              Track your health, fitness, and productivity — all from your wrist.
              Built for performance, precision, and style that never sleeps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300">
                Buy Now - $299
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <img
              src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7"
              alt="Smartwatch"
              className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl transform hover:scale-105 hover:rotate-2 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 p-6 sm:p-8 rounded-3xl hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2 text-white">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-blue-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-white">
            Watch It In Action 🎥
          </h2>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              className="w-full h-64 sm:h-80 lg:h-96"
              src="https://www.youtube.com/embed/psL_5RIBqnY"
              title="Smartwatch Demo"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Every Angle. Every Detail.
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <img
              src="https://images.unsplash.com/photo-1544117519-31a4b719223d"
              alt="Smartwatch close-up"
              className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-500"
            />
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="Smartwatch on wrist"
              className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-500"
            />
            <img
              src="https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d"
              alt="Smartwatch fitness tracking"
              className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-500"
            />
            <img
              src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1"
              alt="Smartwatch lifestyle"
              className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-500"
            />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1598331668826-20cecc596b8c"
            alt="Smartwatch Lifestyle"
            className="w-full rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500"
          />
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Designed for Life. Built for You.
            </h2>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              Crafted from aerospace-grade aluminum and sapphire glass, the
              SmartWatch Pro X is more than just technology — it's your lifestyle
              companion. From the gym to the boardroom, it seamlessly blends into
              every moment of your day.
            </p>
            <ul className="space-y-2 text-gray-300">
              {["AI-powered health analytics", "Wireless magnetic charging", "Compatible with iOS & Android"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Lifestyle Images Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Your Perfect Companion
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="relative group overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1551816230-ef5deaed4a26"
                alt="Fitness tracking"
                className="w-full h-64 sm:h-80 object-cover transform group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Fitness Tracking</h3>
                  <p className="text-gray-300 text-sm sm:text-base">Monitor every workout with precision</p>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1484704849700-f032a568e944"
                alt="Professional lifestyle"
                className="w-full h-64 sm:h-80 object-cover transform group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Professional Style</h3>
                  <p className="text-gray-300 text-sm sm:text-base">Elegant design for every occasion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Technical Specifications
          </h2>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden">
            {specs.map(([label, value], i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6 border-b border-white/10 last:border-b-0 hover:bg-white/10 transition-colors"
              >
                <span className="font-semibold text-blue-400">{label}</span>
                <span className="text-gray-300">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            What Our Users Say 💬
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <p className="italic text-gray-300 mb-4">"{review.comment}"</p>
                <div className="text-yellow-400 mb-2 text-xl">
                  {"⭐".repeat(review.rating)}
                </div>
                <p className="text-sm text-gray-400">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 mb-16">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 sm:p-6 text-left font-semibold flex justify-between items-center hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <span className="text-2xl transform transition-transform duration-300" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    ↓
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-300 text-sm sm:text-base">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Own Your Future Today
            </h3>
            <p className="text-gray-300 text-base sm:text-lg">
              Order now and experience the smartest watch ever built.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 transition-all duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartWatchPage;