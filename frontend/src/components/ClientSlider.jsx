import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import IMAGES from '../assets/images'; 

const ClientSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const clients = [
    { id: 1, img: IMAGES.firstClientSlider, name: 'Client 1' },
    { id: 2, img: IMAGES.secondClientSlider, name: 'Client 2' },
    { id: 3, img: IMAGES.thirdClientSlider, name: 'Client 3' },
    { id: 4, img: IMAGES.fourthClientSlider, name: 'Client 4' },
    { id: 5, img: IMAGES.fifthClientSlider, name: 'Client 5' },
    { id: 6, img: IMAGES.sixthClientSlider, name: 'Client 6' },
    { id: 7, img: IMAGES.seventhClientSlider, name: 'Client 7' },
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg">
              Trusted By Industry Leaders
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Esteemed Clients
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            We're proud to collaborate with industry pioneers, innovative startups, and established brands. 
            Together, we've built remarkable success stories that speak volumes about our commitment to excellence.
          </p>
        </div>

        {/* Slider Section */}
        <div className="max-w-7xl mx-auto">
          <div className="client-slider-wrapper">
            <Slider {...settings}>
              {clients.map((client) => (
                <div key={client.id} className="px-2 sm:px-3 py-4">
                  <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                    
                    {/* Content */}
                    <div className="relative p-6 sm:p-8 flex items-center justify-center min-h-[160px] sm:min-h-[180px]">
                      <div className="relative">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                        
                        <img 
                          src={client.img} 
                          alt={client.name}
                          className="relative mx-auto w-28 h-28 sm:w-36 sm:h-36 object-contain transform group-hover:scale-110 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                        />
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              500+
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">Happy Clients</div>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              98%
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">Satisfaction Rate</div>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              1000+
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">Projects Done</div>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              15+
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Slider Dots */}
      <style jsx>{`
        .client-slider-wrapper :global(.slick-dots) {
          bottom: -40px;
        }
        
        .client-slider-wrapper :global(.slick-dots li button:before) {
          font-size: 12px;
          color: #6366f1;
          opacity: 0.3;
        }
        
        .client-slider-wrapper :global(.slick-dots li.slick-active button:before) {
          opacity: 1;
          color: #6366f1;
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @media (max-width: 640px) {
          .client-slider-wrapper :global(.slick-dots) {
            bottom: -35px;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientSlider;