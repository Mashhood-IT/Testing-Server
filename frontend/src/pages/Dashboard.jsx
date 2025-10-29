import React from "react";
import { LayoutDashboard, List, Layers, ShoppingBag, User, ArrowRight, Sparkles } from "lucide-react";

export default function Dashboard() {
  const cards = [
    {
      title: "Manage Categories",
      icon: <List size={28} />,
      path: "/dashboard/categories",
      gradient: "from-indigo-500 via-purple-500 to-indigo-600",
      description: "Organize and control product categories",
      accentColor: "indigo",
    },

    {
      title: "Manage Products",
      icon: <ShoppingBag size={28} />,
      path: "/dashboard/products",
      gradient: "from-rose-500 via-pink-500 to-rose-600",
      description: "Add, edit and showcase products",
      accentColor: "rose",
    },
    {
      title: "My Profile",
      icon: <User size={28} />,
      path: "/dashboard/profile",
      gradient: "from-amber-500 via-orange-500 to-amber-600",
      description: "Update your personal information",
      accentColor: "amber",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl" style={{ transform: 'translate(-50%, -50%)', animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <div className="w-full max-w-7xl mb-8 sm:mb-12 lg:mb-16">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md mb-4">
              <Sparkles className="text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium text-indigo-600">Welcome Back, Admin</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <LayoutDashboard className="text-indigo-600 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                SuperAdmin Dashboard
              </span>
            </h1>
            
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Manage your entire platform from one powerful interface
            </p>
          </div>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {cards.map((item, i) => (
            <a
              key={i}
              href={item.path}
              className="group relative block"
            >
              {/* Glow Effect on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
              
              {/* Card Container */}
              <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-transparent">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative p-6 sm:p-8 flex flex-col h-full min-h-[240px] sm:min-h-[280px]">
                  {/* Icon Container */}
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                      <div className="text-white group-hover:rotate-12 transition-transform duration-500">
                        {item.icon}
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-grow space-y-2 sm:space-y-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500">
                      {item.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 group-hover:text-white/90 transition-colors duration-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-gray-400 group-hover:text-white/80 transition-colors duration-500">
                      Explore
                    </span>
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 group-hover:bg-white/20 transition-all duration-500">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-500" />
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Element */}
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="w-full max-w-7xl mt-12 sm:mt-16 lg:mt-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-600">24/7</p>
                <p className="text-xs sm:text-sm text-gray-600">System Uptime</p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-600">100%</p>
                <p className="text-xs sm:text-sm text-gray-600">Secure Access</p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-rose-600">Fast</p>
                <p className="text-xs sm:text-sm text-gray-600">Performance</p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-600">Easy</p>
                <p className="text-xs sm:text-sm text-gray-600">Management</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}