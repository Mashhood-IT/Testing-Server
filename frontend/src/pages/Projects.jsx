import React from 'react';
import { Building2, Award, CheckCircle, Zap, Users, TrendingUp } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'SNGPL',
      icon: Building2,
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      description: 'ACS has provided more than 300 Rugged Handheld Computers for their Field Force Automation. These devices are now used for Meter reading across different cities in Pakistan.',
      highlight: 'After the successful delivery of the BV5500 Pro units, ACS signed a Service Level Agreement for 300 units, covering maintenance for the next 4 years.',
      stats: { devices: '300+', years: '4', cities: 'Multiple' }
    },
    {
      id: 2,
      title: 'Nestle Pakistan Limited',
      icon: Award,
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      description: 'ACS has been providing Preventive Maintenance Services to Nestle Pakistan for over 10 years. This includes Rugged Handheld Computers and Thermal Bluetooth Printers for their water sales force automation in metro cities of Pakistan.',
      services: [
        'Thermal Bluetooth Printer SMT-P58A',
        'Blackview BV5500 Pro Rugged Devices',
        'Jabra Headsets',
        'Barco ClickShare',
        'Black Box'
      ],
      stats: { experience: '10+', type: 'Maintenance', scope: 'Metro Cities' }
    },
    {
      id: 3,
      title: 'Coca Cola Pakistan Limited',
      icon: TrendingUp,
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      description: 'ACS has been the registered vendor for Coca Cola Pakistan for the last 7 years, providing various IT services and products. We have delivered numerous successful orders, including:',
      services: [
        'Thermal Bluetooth Printer SMT-P58A',
        'HP Data Cartridges',
        'Jabra & Plantronics Headsets'
      ],
      stats: { partnership: '7+', status: 'Registered Vendor', orders: 'Multiple' }
    }
  ];

  const achievements = [
    { icon: Users, label: 'Happy Clients', value: '50+' },
    { icon: CheckCircle, label: 'Projects Completed', value: '100+' },
    { icon: Award, label: 'Years Experience', value: '26+' },
    { icon: Zap, label: 'Active Projects', value: '15+' }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 px-6 sm:px-8 md:px-16 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Our Projects
          </h1>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed">
            Projects done by Asian Computer Services
          </p>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24 -mt-16 relative z-20 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{achievement.value}</p>
                <p className="text-sm text-gray-600">{achievement.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div 
                key={project.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl group"
              >
                {/* Card Header with Gradient */}
                <div className={`bg-gradient-to-r ${project.color} p-8 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  {/* Stats */}
                  <div className={`${project.bgColor} rounded-xl p-4 mb-6 grid grid-cols-3 gap-2`}>
                    {Object.entries(project.stats).map(([key, value], idx) => (
                      <div key={idx} className="text-center">
                        <p className={`text-lg font-bold ${project.iconColor}`}>{value}</p>
                        <p className="text-xs text-gray-600 capitalize">{key}</p>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlight (if exists) */}
                  {project.highlight && (
                    <div className={`${project.bgColor} border-l-4 border-${project.iconColor.split('-')[1]}-600 p-4 rounded-r-lg mb-6`}>
                      <p className="text-sm text-gray-700 italic">
                        {project.highlight}
                      </p>
                    </div>
                  )}

                  {/* Services List */}
                  {project.services && (
                    <div className="space-y-3">
                      <p className="font-semibold text-gray-900 mb-3">Services Provided:</p>
                      {project.services.map((service, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-start gap-3 group/item hover:translate-x-2 transition-transform duration-200"
                        >
                          <CheckCircle className={`w-5 h-5 ${project.iconColor} flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-700 text-sm leading-relaxed">{service}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className={`bg-gradient-to-r ${project.color} px-8 py-4`}>
                  <p className="text-white text-center font-semibold text-sm">
                    Trusted Partnership
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's work together to bring your vision to life
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105">
            Contact Us Today
          </button>
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="h-2 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500"></div>
    </div>
  );
};

export default Projects;