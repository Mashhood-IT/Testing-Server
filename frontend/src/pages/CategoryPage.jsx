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

const {data:productsData, isLoading, error} = useGetProductsQuery()
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
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600">{error?.data?.message || "Unable to load products"}</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Category Not Found</h3>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist</p>
          <Link to="/" className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
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
          <div className="flex items-center justify-between mb-6 sm:mb-8">
          
            <span className="text-sm sm:text-base text-gray-600 bg-white px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-md">
              {products.length} {products.length === 1 ? "item" : "items"}
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
              {products.map((p) => (
                <Link
                  key={p._id}
                  to={`/product/${p._id}`}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/0 to-purple-400/0 group-hover:from-indigo-400/20 group-hover:to-purple-400/20 transition-all duration-300"></div>
                    <img
                      src={getProductImage(p)}
                      alt={p.title || p.name}
                      className="w-full h-32 sm:h-40 lg:h-48 object-contain mx-auto transform group-hover:scale-110 transition-transform duration-300"
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
                  
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
                      {p.title || p.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      </span>
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 sm:p-16 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;