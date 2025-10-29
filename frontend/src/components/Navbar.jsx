import React, { useState, useEffect, useRef } from "react";
import {
  Store,
  LayoutDashboard,
  LogOut,
  LogIn,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useGetCategoriesQuery, useGetProductsQuery } from "../features/catalog/catalogApi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const pathname = location.pathname;
  const user = null; // replace with actual auth state later

  // Fetch categories and products
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetCategoriesQuery();

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetProductsQuery();

  // Normalize API data
  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.categories || [];

  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.products || [];

  // Merge Categories → Products
  const mergedCategories = categories.map((cat) => ({
    ...cat,
    products: products.filter(
      (p) => p.category?._id === cat._id
    ),
  }));

  const navLinks = [
    { to: "/", label: "Home", icon: Store },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Projects" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setHoveredCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (categoriesLoading || productsLoading) {
    return (
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto text-gray-600 font-medium">
          Loading menu...
        </div>
      </nav>
    );
  }

  if (categoriesError || productsError) {
    return (
      <nav className="bg-red-50 shadow-md p-4">
        <div className="max-w-7xl mx-auto text-red-600 font-medium">
          Failed to load menu data. Please try again later.
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 sm:p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Store className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="font-black text-lg sm:text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Asian Computer Services
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 relative">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    pathname === link.to
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                      : "text-gray-700 hover:bg-gray-100 hover:scale-105"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}

            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              {/* Main Categories Button */}
              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "categories" ? null : "categories"
                  )
                }
                className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                  activeDropdown === "categories"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Categories <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {activeDropdown === "categories" && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50">
                  {mergedCategories.map((cat) => (
                    <div
                      key={cat._id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      {/* Category Row */}
                      <div className="flex justify-between items-center px-4 py-3 text-gray-800 font-semibold hover:bg-gray-100 transition-all">
                        <Link
                          to={`/category/${cat._id}`}
                          className="flex-1 text-left"
                          onClick={() => {
                            setActiveDropdown(null);
                            setHoveredCategory(null);
                          }}
                        >
                          {cat.name}
                        </Link>

                        {/* Expand Arrow for Products */}
                        {cat.products?.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setHoveredCategory(
                                hoveredCategory === cat._id ? null : cat._id
                              );
                            }}
                            className="p-1 hover:bg-gray-200 rounded transition"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transform transition-transform ${
                                hoveredCategory === cat._id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Products Section */}
                      {hoveredCategory === cat._id &&
                        cat.products?.length > 0 && (
                          <div className="bg-gray-50 border-t border-gray-100">
                            {cat.products.map((p) => (
                              <Link
                                key={p._id}
                                to={`/product/${p._id}`}
                                className="block px-8 py-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600 text-sm transition-all"
                                onClick={() => {
                                  setActiveDropdown(null);
                                  setHoveredCategory(null);
                                }}
                              >
                                {p.name}
                              </Link>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Auth */}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    pathname.startsWith("/dashboard")
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                      : "text-gray-700 hover:bg-gray-100 hover:scale-105"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {[...navLinks, { label: "Categories", to: "#" }].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {mergedCategories.map((cat) => (
              <div key={cat._id} className="ml-4">
                <Link
                  to={`/category/${cat._id}`}
                  className="block px-4 py-2 text-gray-800 font-semibold hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {cat.name}
                </Link>
                {cat.products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/product/${p._id}`}
                    className="block ml-4 px-4 py-1 text-gray-700 text-sm hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
