import React, { useState, useEffect } from "react";
import {
  Settings,
  Gauge,
  FileText,
  Headphones,
  Wrench,
  Shield,
  Clock,
  CheckCircle,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function ACSServices() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("services-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const services = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Repair Services",
      description:
        "Businesses depend on Computers in increasing ways every day. Even a minor computer problem disrupts our life and hampers business activities.",
      color: "from-blue-500 to-cyan-500",
      features: ["Quick Turnaround", "Expert Technicians", "Genuine Parts"],
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: "SLA Services",
      description:
        "A service-level agreement (SLA) is a contract between a service provider and its customers that documents what services the provider will furnish and defines the service standards the provider is obligated to meet.",
      color: "from-purple-500 to-pink-500",
      features: ["Guaranteed Uptime", "24/7 Monitoring", "Fast Response"],
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Support Services",
      description:
        "Whether you need comprehensive coverage, assistance with technical issues, there's a ACS OneCare Support Service that's right for you.",
      color: "from-green-500 to-emerald-500",
      features: ["Remote Assistance", "On-Site Support", "Help Desk"],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Managed IT Services",
      description:
        "Comprehensive IT management solutions that keep your systems secure, updated, and running smoothly with proactive monitoring and maintenance.",
      color: "from-orange-500 to-red-500",
      features: [
        "Proactive Monitoring",
        "Security Updates",
        "System Optimization",
      ],
    },
  ];

  return (
    <div
      id="services-section"
      className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-full border border-blue-400/20 mb-4">
            <Settings className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold text-blue-700">
              Our Expertise
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
            SERVICES
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 mx-auto mb-6"></div>

          <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
            As a business leader, you need meaningful visibility and insight
            into the performance and security of your information ecosystem.
            Your core functions depend on your critical IT systems being
            available at all times. With our Managed IT Services, you can enjoy
            peace of mind knowing that your vital operations are backed by
            industry experts to manage your complex IT environment, reduce risk,
            and avoid downtime.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>

              {/* Animated Border */}
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                  hoveredCard === index ? "ring-2 ring-offset-2" : "ring-0"
                }`}
                style={{
                  ringColor:
                    hoveredCard === index
                      ? `rgb(${
                          index === 0
                            ? "59, 130, 246"
                            : index === 1
                            ? "168, 85, 247"
                            : index === 2
                            ? "34, 197, 94"
                            : "249, 115, 22"
                        })`
                      : "transparent",
                }}
              ></div>

              <div className="relative p-6 sm:p-8">
                {/* Icon Container */}
                <div className="mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    <div className="text-white">{service.icon}</div>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                  style={{
                    backgroundImage:
                      hoveredCard === index
                        ? `linear-gradient(to right, ${
                            index === 0
                              ? "rgb(59, 130, 246), rgb(6, 182, 212)"
                              : index === 1
                              ? "rgb(168, 85, 247), rgb(236, 72, 153)"
                              : index === 2
                              ? "rgb(34, 197, 94), rgb(16, 185, 129)"
                              : "rgb(249, 115, 22), rgb(239, 68, 68)"
                          })`
                        : "none",
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle
                        className={`w-4 h-4 flex-shrink-0 ${
                          index === 0
                            ? "text-blue-500"
                            : index === 1
                            ? "text-purple-500"
                            : index === 2
                            ? "text-green-500"
                            : "text-orange-500"
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button
                  className={`group/btn w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${service.color} text-white font-semibold rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300`}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Bottom Accent Line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div
          className={`mt-16 sm:mt-20 text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-cyan-400" />
                <Zap className="w-8 h-8 text-yellow-400" />
                <Shield className="w-8 h-8 text-green-400" />
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Need Expert IT Support?
              </h3>

              <p className="text-slate-300 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
                Our team of experienced professionals is ready to help you with
                all your IT needs. Available 24/7 for emergency support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* WhatsApp Floating Button */}
                <a
                  href="https://wa.me/923404493417?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.52 3.48A11.77 11.77 0 0 0 12 0a11.77 11.77 0 0 0-8.52 3.48A11.81 11.81 0 0 0 0 12c0 2.07.54 4.08 1.58 5.86L0 24l6.3-1.64A11.82 11.82 0 0 0 12 24c6.63 0 12-5.37 12-12a11.81 11.81 0 0 0-3.48-8.52zM12 22.03a9.93 9.93 0 0 1-5.06-1.38l-.36-.21-3.74.97 1-3.64-.23-.37A9.92 9.92 0 0 1 2 12c0-5.52 4.48-10 10-10 2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.37-7.68c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.5-.17 0-.37 0-.57 0-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.09 3.2 5.07 4.48.71.31 1.26.5 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
