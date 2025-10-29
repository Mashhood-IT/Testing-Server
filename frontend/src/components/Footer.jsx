import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Cpu,
  Clock,
  Award,
  ArrowRight,
  ExternalLink,
  Smartphone,
  Printer,
  Laptop,
  ChevronRight,
} from "lucide-react";

export default function ACSFooter() {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/team" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Repair Services", href: "/services/repair" },
        { label: "SLA Services", href: "/services/sla" },
        { label: "Support Services", href: "/services/support" },
        { label: "IT Solutions", href: "/services/it" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/",
      color: "from-blue-500 to-blue-600",
      name: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/",
      color: "from-pink-500 to-purple-600",
      name: "Instagram",
    },
    {
      icon: Twitter,
      href: "https://x.com/",
      color: "from-sky-400 to-blue-500",
      name: "Twitter",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/",
      color: "from-blue-600 to-blue-700",
      name: "LinkedIn",
    },
  ];

  const locations = [
    { city: "Lahore", icon: <MapPin className="w-4 h-4" /> },
    { city: "Karachi", icon: <MapPin className="w-4 h-4" /> },
    { city: "Peshawar", icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Brand & Contact Info - Takes more space */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-2xl">
                    <Cpu className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <span className="font-black text-2xl bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Asian Computer
                  </span>
                  <p className="text-xs text-gray-400 font-semibold">
                    Services
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="relative p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-blue-400/20">
              <div className="absolute top-2 left-2 text-blue-400/30 text-4xl font-serif">
                "
              </div>
              <p className="text-gray-300 leading-relaxed italic text-sm pl-6">
                To give real service you must add something which cannot be
                bought or measured with money, and that is Sincerity and
                Integrity.
              </p>
            </div>
            {/* Locations Pills */}
            <div className="flex flex-wrap gap-2">
              {locations.map((location, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-400/30 rounded-full hover:bg-blue-500/20 transition-all"
                >
                  {location.icon}
                  <span className="text-xs font-semibold text-blue-300">
                    {location.city}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links Grid */}
     {/* Footer Links Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {footerSections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
                  {section.title}
                  <ChevronRight className="w-4 h-4" />
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-all duration-300 text-sm flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 group-hover:bg-cyan-400 transition-all"></span>
                        <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
              Contact Us
              <ChevronRight className="w-4 h-4" />
            </h3>
            
            <div className="space-y-3">
              <a
                href="mailto:info@acspk.com"
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-all duration-300 group"
              >
                <div className="bg-blue-500/20 p-2.5 rounded-xl group-hover:bg-blue-500/30 group-hover:scale-110 transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm">info@acspk.com</span>
              </a>

              <a
                href="tel:+924236602501"
                className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-all duration-300 group"
              >
                <div className="bg-green-500/20 p-2.5 rounded-xl group-hover:bg-green-500/30 group-hover:scale-110 transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm">+92 42 36602501-02</span>
              </a>

              <div className="flex items-start gap-3 text-gray-300">
                <div className="bg-purple-500/20 p-2.5 rounded-xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm leading-relaxed">
                  Office # 203, 3rd Floor, Khan Tower,
                  <br />
                  Walton Road, Defence Chowk, Lahore
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-gray-800">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Follow Us</h4>
              <div className="flex gap-2 flex-wrap">
                {socialLinks.map((social, socialIdx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={socialIdx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                      title={social.name}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.color} rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity`}></div>
                      <div className="relative p-2 rounded-lg backdrop-blur-md bg-white/10 hover:bg-white/20 transform hover:scale-110 transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-gray-400">
            <span>
              © {new Date().getFullYear()} Asian Computer Services. All rights
              reserved.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Designed By:</span>
              <a
                href="https://muhammad-usman-resume24.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-cyan-400 transition-colors font-semibold flex items-center gap-1"
              >
                Muhammad Usman
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
}
