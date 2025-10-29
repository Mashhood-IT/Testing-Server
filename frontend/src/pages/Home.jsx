import React, { useState, useEffect } from "react";
import ProductSection from "../components/ProductSection";
import EcommerceHero from "../components/EcommerceHero";
import { Link } from "react-router-dom";
import ClientSlider from "../components/CLientSlider";
import ModernEcommerce from "../components/ModernEcommerce";
import ACSServices from "../components/ACSServices";

const useMockData = () => {
  const categories = [
    { _id: "1", name: "Electronics" },
    { _id: "2", name: "Fashion" },
    { _id: "3", name: "Home & Living" },
    { _id: "4", name: "Sports" },
    { _id: "5", name: "Books" },
  ];

  const products = [
    {
      _id: "1",
      title: "Wireless Headphones",
      category: { name: "Electronics" },
      price: 99.99,
      images: ["/api/placeholder/400/300"],
    },
    {
      _id: "2",
      title: "Smart Watch",
      category: { name: "Electronics" },
      price: 199.99,
      images: ["/api/placeholder/400/300"],
    },
    {
      _id: "3",
      title: "Running Shoes",
      category: { name: "Sports" },
      price: 79.99,
      images: ["/api/placeholder/400/300"],
    },
    {
      _id: "4",
      title: "Leather Jacket",
      category: { name: "Fashion" },
      price: 149.99,
      images: ["/api/placeholder/400/300"],
    },
  ];

  return { categories, products };
};

export default function Home() {
  const { categories: cats, products: prods } = useMockData();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Amazing products and fast delivery! Highly recommended.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      text: "Best shopping experience ever. Quality products at great prices.",
      rating: 5,
    },
    {
      name: "Emma Wilson",
      text: "Customer service is outstanding. Will shop again!",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleViewProduct = (productId) => {
    console.log("View product:", productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 1. Hero Section */}
      <EcommerceHero />
      <ModernEcommerce />

      {/* 2. Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Quality Products</h3>
              <p className="text-gray-600 text-sm">
                Premium quality guaranteed on all items
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Best Prices</h3>
              <p className="text-gray-600 text-sm">
                Competitive pricing you can trust
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Quick shipping to your doorstep
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                We're here to help anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProductSection />

      {/* 5. Special Offer Banner */}
      <section className="py-16 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            🎉 Limited Time Offer!
          </h2>
          <p className="text-xl md:text-2xl mb-6">
            Get up to 50% OFF on selected items. Hurry up!
          </p>
          <button className="px-10 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all shadow-2xl">
            Shop Sale Now
          </button>
        </div>
      </section>

      <ACSServices />

      <ClientSlider />

      {/* 6. Testimonials Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-bold text-4xl md:text-5xl mb-12 text-gray-800 text-center tracking-wide">
            What Our Customers Say
          </h3>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-indigo-100">
            {/* Subtle animated gradient background overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 via-purple-300 to-blue-400 opacity-20 animate-pulse rounded-3xl"></div>

            <div className="relative z-10 text-center">
              {/* Rating Stars */}
              <div className="mb-4 flex justify-center">
                {[...Array(testimonials[activeTestimonial].rating)].map(
                  (_, i) => (
                    <span
                      key={i}
                      className="text-yellow-400 text-3xl transition-all duration-300 transform hover:scale-125 drop-shadow-sm"
                    >
                      ★
                    </span>
                  )
                )}
              </div>

              {/* Testimonial Text */}
              <p className="text-xl md:text-2xl text-gray-700 mb-6 italic font-medium leading-relaxed transition-all duration-500 ease-in-out transform hover:scale-105">
                "{testimonials[activeTestimonial].text}"
              </p>

              {/* Customer Name */}
              <p className="font-semibold text-lg text-indigo-600 transition-all duration-300">
                - {testimonials[activeTestimonial].name}
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-4 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`transition-all rounded-full ${
                    idx === activeTestimonial
                      ? "bg-indigo-600 w-8 h-3"
                      : "bg-gray-300 w-3 h-3"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
