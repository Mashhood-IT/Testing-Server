import React from 'react';
import { Award, Users, Target, TrendingUp } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { label: 'Years of Experience', value: '26+', icon: Award },
    { label: 'Happy Clients', value: '500+', icon: Users },
    { label: 'Cities Covered', value: '3', icon: Target },
    { label: 'Growth Rate', value: '100%', icon: TrendingUp }
  ];

  const services = [
    'Android PDA/Smart Rugged Phone',
    'Window & Android PDA',
    'Bluetooth Mobile Thermal Printer',
    'General Order Supplies (IT Services)',
    'Token Machine Paper Roll',
    'Thermal Paper Roll'
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6 sm:px-8 md:px-16 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center">
            About Us
          </h1>
          <p className="text-xl sm:text-2xl text-center max-w-4xl mx-auto leading-relaxed italic">
            "To give real service you must add something which cannot be bought or measured with money, and that is Sincerity and Integrity."
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 text-blue-600" />
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-20">
        {/* Introduction */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
            Asian Computer Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-center max-w-5xl mx-auto">
            Asian Computer Services is the only complete Solution Integration Company that started as a service and maintenance organization for Handheld/Rugged devices, Printers, and Laptops. This feature differentiates us from other computer-related organizations, which primarily started as computer vendors and added services as a necessary by-product to support their equipment sale activities.
          </p>
        </div>

        {/* What We Do Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-2 h-8 bg-blue-600 mr-4 rounded"></span>
            What We Do
          </h3>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            While serving remains the core activity, ACS also provides its clients with effective support in the following areas:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-start bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-colors duration-300">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* History Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 sm:p-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Our History</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              ACS was initially started in 1998 as a private firm in Lahore that dealt in the sale and service of network and thermal printers. A few years later, the company expanded to include the sale and repair of laptops, and in October 2006, it registered itself as a formal firm, obtaining its NTN & GST certificates.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The client-based custom services continued to grow rapidly, and over the years, the company developed an enviable reputation for dependability, service quality, and consistency. To provide support to customers across Pakistan, ACS expanded and now operates branches in Peshawar and Karachi, offering services nationwide.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg p-8 sm:p-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Our Expansion</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              In 2017, the company received the dealership for sales and after-sales services of handheld devices under the brand name "BLACKVIEW" and thermal Bluetooth printers. These products are now used by many multinational companies and government sectors.
            </p>
            <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
              <p className="text-sm text-gray-600 italic">
                Trusted by multinational companies and government sectors across Pakistan
              </p>
            </div>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-8 sm:p-12 text-white text-center">
          <Users className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">Our Team</h3>
          <p className="text-lg sm:text-xl leading-relaxed max-w-4xl mx-auto">
            ACS has a dedicated team of experts working around the clock to ensure that our customers receive the best support, information, business management, and marketing talent. This helps our clients to become more profitable, well-informed, and competitive in their business cycles.
          </p>
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="h-2 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"></div>
    </div>
  );
};

export default AboutUs;