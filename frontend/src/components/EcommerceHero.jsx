import React, { useState, useEffect } from 'react';
import { Smartphone, Printer, Laptop, Cpu, TrendingUp, ShieldCheck, Clock, MapPin, Zap, Star, Award, Users, ArrowRight, CheckCircle } from 'lucide-react';

export default function ACSHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [count, setCount] = useState({ years: 0, clients: 0, cities: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 4);
    }, 3000);

    // Counter animation
    const countInterval = setInterval(() => {
      setCount(prev => ({
        years: prev.years < 26 ? prev.years + 1 : 26,
        clients: prev.clients < 500 ? prev.clients + 20 : 500,
        cities: prev.cities < 3 ? prev.cities + 1 : 3
      }));
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
      clearInterval(countInterval);
    };
  }, []);

  const services = [
    { icon: <Smartphone className="w-5 h-5" />, text: "Rugged Devices", color: "from-blue-400 to-cyan-500" },
    { icon: <Printer className="w-5 h-5" />, text: "Thermal Printers", color: "from-purple-400 to-pink-500" },
    { icon: <Laptop className="w-5 h-5" />, text: "IT Solutions", color: "from-green-400 to-emerald-500" },
    { icon: <Cpu className="w-5 h-5" />, text: "Smart Technology", color: "from-orange-400 to-red-500" },
  ];

  const products = [
    { name: "Android PDA", availability: "In Stock", trend: "Popular", color: "from-blue-400 to-cyan-500" },
    { name: "Bluetooth Printers", availability: "Available", trend: "Trending", color: "from-purple-400 to-pink-500" },
    { name: "Rugged Phones", availability: "Ready", trend: "New", color: "from-green-400 to-emerald-500" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
          style={{
            top: '20%',
            left: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl"
          style={{
            bottom: '20%',
            right: '10%',
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        ></div>
        <div 
          className="absolute w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Company Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-full border border-blue-400/30 shadow-lg shadow-blue-500/20">
              <div className="relative">
                <Award className="w-5 h-5 text-blue-400 animate-pulse" />
                <div className="absolute inset-0 bg-blue-400 blur-md opacity-50"></div>
              </div>
              <span className="text-sm font-bold text-blue-300">Since 1998 - Trusted Excellence</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="block text-white mb-2">Complete IT</span>
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
                  Solutions Provider
                </span>
              </h1>
              
              {/* Tagline */}
              <div className="flex items-start gap-3 text-lg sm:text-xl text-cyan-300">
                <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <span className="leading-relaxed">"Sincerity and Integrity in every service"</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
              Pakistan's leading Solution Integration Company specializing in Handheld/Rugged devices, Thermal Printers, and complete IT solutions. Trusted by multinationals and government sectors nationwide.
            </p>

            {/* Services Pills */}
            <div className="flex flex-wrap gap-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`group flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${service.color} bg-opacity-10 backdrop-blur-lg rounded-full border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer ${
                    activeService === index ? 'ring-2 ring-cyan-400 scale-105' : ''
                  }`}
                >
                  <div className="text-white group-hover:rotate-12 transition-transform">
                    {service.icon}
                  </div>
                  <span className="text-sm font-semibold text-white">{service.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-600 rounded-full font-bold text-lg shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              
              <button className="group px-8 py-4 bg-white/5 backdrop-blur-lg border-2 border-cyan-400/30 rounded-full font-bold text-lg text-white hover:bg-white/10 hover:border-cyan-400/60 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5" />
                View Locations
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-400">Authorized Dealer</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-400">100% Growth Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Content - Service Dashboard */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Main Service Card */}
            <div className="relative">
              {/* Holographic Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
              
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-2xl rounded-3xl border border-blue-400/30 p-6 sm:p-8 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Cpu className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">ACS Solutions</h3>
                      <p className="text-xs text-cyan-400">Nationwide Coverage</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full">
                    <span className="text-xs font-bold text-green-400">ACTIVE</span>
                  </div>
                </div>

                {/* Product Cards */}
                <div className="space-y-4">
                  {products.map((item, index) => (
                    <div
                      key={index}
                      className={`group bg-slate-800/50 backdrop-blur-lg rounded-2xl p-4 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer ${
                        activeService === index ? 'border-cyan-400 shadow-lg shadow-cyan-400/20' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}>
                            {services[index]?.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{item.name}</h4>
                            <p className="text-xs text-gray-400">Premium Quality</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-cyan-400">{item.availability}</div>
                          <div className="text-xs text-green-400 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {item.trend}
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                          style={{ width: activeService === index ? '95%' : '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">{count.years}+</div>
                    <div className="text-xs text-gray-400 mt-1">Years Exp.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">{count.clients}+</div>
                    <div className="text-xs text-gray-400 mt-1">Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">{count.cities}</div>
                    <div className="text-xs text-gray-400 mt-1">Cities</div>
                  </div>
                </div>

                {/* Location Pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Lahore', 'Karachi', 'Peshawar'].map((city, idx) => (
                    <div key={idx} className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full">
                      <span className="text-xs font-semibold text-blue-300">{city}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-bounce">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50" style={{ animation: 'bounce 2s infinite', animationDelay: '0.5s' }}>
                <Printer className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Bar */}
        <div className={`mt-12 sm:mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-blue-400/20 p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Expert Team</h4>
                <p className="text-xs text-gray-400">Dedicated Support</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Authorized</h4>
                <p className="text-xs text-gray-400">BLACKVIEW Dealer</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-3">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Certified</h4>
                <p className="text-xs text-gray-400">NTN & GST</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Growing</h4>
                <p className="text-xs text-gray-400">100% Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path d="M0,64 C240,96 480,96 720,64 C960,32 1200,32 1440,64 L1440,120 L0,120 Z" fill="url(#wave-gradient)" opacity="0.3"/>
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}