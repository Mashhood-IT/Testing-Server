import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Headphones, MessageCircle, CheckCircle } from 'lucide-react';
import { useSubmitContactFormMutation } from "../features/catalog/catalogApi";  // Ensure the API hook is correct

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [submitContactForm] = useSubmitContactFormMutation();

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@acspk.com',
      link: 'mailto:info@acspk.com',
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+92 42 36602501 - 02',
      link: 'tel:+924236602501',
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Headphones,
      title: 'Tech Support',
      value: 'support@acspk.com',
      link: 'mailto:support@acspk.com',
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  const workingHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 2:00 PM' },
    { day: 'Sunday', time: 'Closed' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await submitContactForm(formData).unwrap();
      if (response) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      setError('Failed to send the message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white py-20 px-6 sm:px-8 md:px-16 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed italic">
            "To give real service you must add something which cannot be bought or measured with money, and that is Sincerity and Integrity."
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24 -mt-16 relative z-20 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.link}
                className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
              >
                <div className={`bg-gradient-to-br ${method.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                <p className={`text-lg ${method.iconColor} font-semibold hover:underline`}>
                  {method.value}
                </p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Send className="text-indigo-600" />
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">We'd love to hear from you. Fill out the details below and we'll get back to you soon.</p>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-xl flex items-center gap-3">
                  <CheckCircle className="text-green-600 w-6 h-6" />
                  <p className="text-green-700 font-semibold">Message sent successfully! We'll respond soon.</p>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all">
              <div className="bg-gradient-to-br from-red-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Office</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Office # 203, 3rd Floor, Khan Tower, Walton Road, Defence Chowk, Lahore
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-indigo-600 font-semibold hover:text-indigo-700 hover:underline"
              >
                Get Directions →
              </a>
            </div>

            {/* Working Hours Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-xl p-8">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Working Hours</h3>
              <div className="space-y-4">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-200 last:border-0">
                    <span className="text-gray-700 font-medium">{schedule.day}</span>
                    <span className="text-gray-600">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Support Card */}
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl shadow-xl p-8 text-white text-center">
              <Headphones className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Need Quick Support?</h3>
              <p className="mb-6 text-white/90">Our team is ready to help you</p>
              <a
                href="tel:+924236602501"
                className="inline-block bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl h-96 flex items-center justify-center shadow-xl">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium">
                Map Integration Area
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Add your Google Maps embed here
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="h-2 bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500"></div>
    </div>
  );
};

export default ContactUs;