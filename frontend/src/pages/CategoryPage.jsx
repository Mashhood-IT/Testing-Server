import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../features/catalog/catalogApi";

const API_BASE_URL = "http://localhost:5000";

const CategoryPage = () => {
  const { id } = useParams();

  const { data: categoriesData } = useGetCategoriesQuery();

  const { data: productsData, isLoading, error } = useGetProductsQuery();
  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.categories || [];

  const products = Array.isArray(productsData?.items)
    ? productsData.items
    : Array.isArray(productsData?.products)
    ? productsData.products
    : [];

  const category = categories.find((c) => c._id === id);

  const getProductImage = (product) => {
    let imageUrl = null;

    if (product.imageUrl) imageUrl = product.imageUrl;
    else if (product.image) imageUrl = product.image;
    else if (Array.isArray(product.images) && product.images.length > 0) {
      imageUrl = product.images[0]?.url || product.images[0];
    }

    if (imageUrl) {
      if (imageUrl.startsWith("/")) {
        return `${API_BASE_URL}${imageUrl}`;
      }
      return imageUrl;
    }

    return "/placeholder.png";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-lg font-medium text-gray-700 animate-pulse">
              Loading amazing products...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600">
            {error?.data?.message || "Unable to load products"}
          </p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Category Not Found
          </h3>
          <p className="text-gray-600 mb-6">
            The category you're looking for doesn't exist
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg">
              Category
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            {category.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked collection of premium products
          </p>
        </div>

        {/* Products Section */}
        <div>
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <span className="text-sm sm:text-base text-gray-700 font-semibold bg-gradient-to-r from-white to-purple-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border border-purple-100 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              {products.length} {products.length === 1 ? "Product" : "Products"}
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-7">
              {products.map((p) => (
                <Link
                  key={p._id}
                  to={`/product/${p._id}`}
                  className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6 sm:p-8">
                    {/* Animated Background Circles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-300 rounded-full blur-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full blur-2xl"></div>
                    </div>

                    {/* New Badge */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      New
                    </div>

                    <img
                      src={getProductImage(p)}
                      alt={p.title || p.name}
                      className="relative w-full h-32 sm:h-40 lg:h-48 object-contain mx-auto transform group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                      onError={(e) => {
                        if (
                          e.target.src !==
                          `${window.location.origin}/placeholder.png`
                        ) {
                          e.target.src = `${window.location.origin}/placeholder.png`;
                        }
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg line-clamp-2 group-hover:text-purple-600 transition-colors duration-300 min-h-[2.5rem]">
                      {p.title || p.name}
                    </h3>

                    <div className="flex items-center justify-between pt-2">
                      {/* View Details Button */}
                      <span className="text-sm font-semibold text-purple-600 group-hover:text-purple-700 transition-colors flex items-center gap-1">
                        View Details
                      </span>

                      {/* Animated Arrow */}
                      <div className="w-9 h-9 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl p-12 sm:p-20 text-center border border-purple-100">
              {/* Icon Container */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full animate-pulse"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-purple-50 to-blue-50 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                No Products Found
              </h3>
              <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
                We couldn't find any products in this category. Try exploring
                other categories or check back later!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
