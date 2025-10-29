import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../features/catalog/catalogApi";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Check,
  Truck,
  Shield,
  RotateCcw,
  Award,
  Clock,
  Package,
  Headphones,
  ChevronDown,
  ChevronUp,
  Zap,
  Gift,
  Globe,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Maximize2,
} from "lucide-react";



const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/')) return `${import.meta.env.VITE_API_URL}${imagePath}`;
  return `${import.meta.env.VITE_API_URL}/${imagePath}`;
};

export default function ProductDetail({ images = [] }) {
  const { id } = useParams();
  const {
    data: productsData,
    isFetching,
    error,
  } = useGetProductsQuery({ page: 1 });
  const railRef = React.useRef(null);
  
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const currentProduct = productsData?.items?.find((p) => p._id === id);

const relatedProducts = React.useMemo(() => {
  if (!productsData?.items || !currentProduct?.category?._id) return [];
  return productsData.items.filter(
    (p) => p.category?._id === currentProduct.category._id && p._id !== currentProduct._id
  );
}, [productsData, currentProduct]);

// dynamic (optional) specs + faqs from product
const specs = Array.isArray(currentProduct?.specs) ? currentProduct.specs : [];
const faqsDynamic = Array.isArray(currentProduct?.faqs) ? currentProduct.faqs : [];



  const galleryImages = React.useMemo(() => {
  const srcs = Array.isArray(currentProduct?.images) ? currentProduct.images : [];
  return srcs
    .map((p) => getFullImageUrl(p))
    .filter((u) => u && !u.toLowerCase().endsWith(".pdf"));
}, [currentProduct]);
  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const goToPrev = () => {
    setSelectedImage(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const scrollLeft = () => {
  setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

const scrollRight = () => {
  setCurrentIndex((prev) => {
    const maxIdx = Math.max(0, galleryImages.length - 4);
    return Math.min(maxIdx, prev + 1);
  });
};


  const [cartMessage, setCartMessage] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (currentProduct?.images?.length > 0) {
      setMainImage(currentProduct.images[0]);
    }
    if (currentProduct?.sizes?.length > 0) {
      setSelectedSize(currentProduct.sizes[0]);
    }
    if (currentProduct?.colors?.length > 0) {
      setSelectedColor(currentProduct.colors[0]);
    }
  }, [currentProduct]);

  const handleAddToCart = () => {
    if (!currentProduct) return;

    const message = `🛒 *New Order Request*%0A
Product: ${encodeURIComponent(currentProduct.title)}%0A
Quantity: ${quantity}%0A
${selectedSize ? `Size: ${encodeURIComponent(selectedSize)}%0A` : ""}
${selectedColor ? `Color: ${encodeURIComponent(selectedColor)}%0A` : ""}
%0A
Please confirm my order!`;

    const phone = "923404493417";
    const whatsappURL = `https://wa.me/${phone}?text=${message}`;

    window.open(whatsappURL, "_blank");

    setCartMessage(`📩 Redirecting you to WhatsApp to confirm your order...`);
    setTimeout(() => setCartMessage(""), 5000);
  };
  useEffect(() => {
  if (currentProduct?.tabs && currentProduct.tabs.length > 0) {
    setActiveTab(currentProduct.tabs[0].tab);
  }
}, [currentProduct]);

  const downloadPdf = async () => {
  if (!currentProduct?._id) return;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${currentProduct._id}/pdf`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch PDF');
    }

    const blob = await response.blob();

    // Create a link element, trigger download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // You can customize filename here
    a.download = `${currentProduct.title}.pdf`;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    alert('Failed to download PDF. Please try again later.');
  }
};

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, you can return it within 30 days for a full refund. The product must be unused and in its original packaging.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days. Express shipping is available and takes 1-2 business days. Free shipping is offered on all orders over $50.",
    },
    {
      question: "Is this product authentic?",
      answer:
        "Yes, all our products are 100% authentic and come directly from authorized manufacturers. Each product includes authenticity certificates and warranty cards.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, PayPal, and cash on delivery. All transactions are secured with SSL encryption for your safety.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Once your order is shipped, you'll receive a tracking number via WhatsApp and email. You can use this to track your package in real-time.",
    },
    {
      question: "Do you offer warranty?",
      answer:
        "All products come with a manufacturer's warranty. The warranty period varies by product but typically ranges from 6 months to 2 years. Please check the product details for specific warranty information.",
    },
  ];



useEffect(() => {
  if (!galleryImages.length) {
    setSelectedImage(null);
    setCurrentIndex(0);
    return;
  }
  const maxIdx = Math.max(0, galleryImages.length - 4);
  if (currentIndex > maxIdx) setCurrentIndex(0);
}, [galleryImages, currentIndex]);

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }
// ---------- Helper values for the "aesthetic" section ----------
const pd = currentProduct?.productAdditional || {};
const hasAdditionalText = Boolean(
  (pd.tagline && pd.tagline.trim()) ||
  (pd.title2 && pd.title2.trim()) ||
  (pd.subTitle2 && pd.subTitle2.trim()) ||
  (pd.description2 && pd.description2.trim())
);

// Prefer product images; fall back to galleryImages already in the component
const imagesForShow = Array.isArray(currentProduct?.images) && currentProduct.images.length
  ? currentProduct.images.map((i) => getFullImageUrl(i))
  : galleryImages;

// For chevrons: how many cards fit in view (assuming 4 desktop)
const visiblePerView = 4;
const maxIndex = Math.max(0, imagesForShow.length - visiblePerView);

  if (error || !currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <p className="text-xl text-red-600 mb-4">Product not found!</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }
  const hasAdditional =
  !!(
    currentProduct?.productAdditional &&
    (
      currentProduct.productAdditional.tagline ||
      currentProduct.productAdditional.title2 ||
      currentProduct.productAdditional.subTitle2 ||
      currentProduct.productAdditional.description2
    )
  );



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="hover:text-indigo-600 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-indigo-600 cursor-pointer">
            {currentProduct.category?.name}
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">
            {currentProduct.title}
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="grid lg:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-12">
            {/* Left Side - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative group">
                {mainImage ? (
                  <img
src={getFullImageUrl(mainImage)}
                    alt={currentProduct.title}
                    className="w-full h-[400px] sm:h-[500px] object-cover rounded-2xl shadow-lg transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-[400px] sm:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400 rounded-2xl">
                    <span className="text-lg">No Image Available</span>
                  </div>
                )}

                {/* Stock Badge */}
                {currentProduct.stock > 0 && (
                  <div className="absolute top-4 left-4 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold shadow-lg">
                    In Stock
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {currentProduct.images?.map((image, index) => (
                  <img
                    key={index}
src={getFullImageUrl(image)}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl cursor-pointer transition-all flex-shrink-0 ${
                      mainImage === image
                        ? "border-4 border-indigo-600 shadow-lg scale-105"
                        : "border-2 border-gray-200 hover:border-indigo-400 opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className="flex flex-col">
              {/* Category Badge */}
              <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-lg font-semibold mb-4 w-fit">
                {currentProduct.category?.name}
              </span>

              {/* Product Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {currentProduct.title}
              </h1>

              {/* Description */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-700 leading-relaxed">
                  {currentProduct.description || "No description available"}
                </p>
              </div>

              {/* Sizes */}
              {currentProduct.sizes && currentProduct.sizes.length > 0 && (
                <div className="mb-6">
                  <p className="font-semibold text-gray-900 mb-3 text-lg">
                    Select Size:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {currentProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                          selectedSize === size
                            ? "bg-indigo-600 text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {currentProduct.colors && currentProduct.colors.length > 0 && (
                <div className="mb-6">
                  <p className="font-semibold text-gray-900 mb-3 text-lg">
                    Select Color:
                  </p>
                  <div className="flex gap-3">
                    {currentProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full transition-all ${
                          selectedColor === color
                            ? "ring-4 ring-indigo-600 ring-offset-2 scale-110"
                            : "ring-2 ring-gray-200"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="flex flex-col gap-4">
                {/* WhatsApp Order Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={24} />
                  Order via WhatsApp
                </button>

                {/* Download PDF Button */}
            <button
  onClick={downloadPdf}
  className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
    />
  </svg>
  Download PDF
</button>
              </div>

              {/* Cart Message */}
              {cartMessage && (
                <div className="mt-4 p-4 bg-green-50 border-2 border-green-500 rounded-xl flex items-center gap-2">
                  <Check size={20} className="text-green-600" />
                  <p className="text-green-700 font-medium">{cartMessage}</p>
                </div>
              )}

              {/* Features */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <Truck size={24} className="text-blue-600" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      Free Delivery
                    </p>
                    <p className="text-xs text-gray-600">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <Shield size={24} className="text-green-600" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      Secure Payment
                    </p>
                    <p className="text-xs text-gray-600">100% protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                  <RotateCcw size={24} className="text-purple-600" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      Easy Returns
                    </p>
                    <p className="text-xs text-gray-600">30 days guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

           <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Tabs */}
{currentProduct?.tabs && currentProduct.tabs.length > 0 && (
  <div className="mt-10">
    <h3 className="text-2xl font-extrabold text-gray-800 mb-6">Product Details</h3>
    <div className="flex border-b border-gray-200 space-x-2 sm:space-x-6 relative">
      {currentProduct.tabs.map((tab, idx) => (
        <button
          key={tab.tab}
          className={`relative px-4 py-2 font-semibold transition-colors duration-200
            ${activeTab === tab.tab
              ? "text-indigo-600"
              : "text-gray-500 hover:text-indigo-500"}
            focus:outline-none`}
          onClick={() => setActiveTab(tab.tab)}
        >
          {tab.tabName}
          {activeTab === tab.tab && (
            <span className="absolute left-0 right-0 -bottom-1 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-lg transition-all duration-300"></span>
          )}
        </button>
      ))}
    </div>
    <div className="mt-6">
      {currentProduct.tabs.map(
        (tab) =>
          activeTab === tab.tab && (
            <div
              key={tab.tab}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 transition-all duration-300"
            >
              <h4 className="text-lg sm:text-xl font-bold text-indigo-700 mb-2">{tab.tabName}</h4>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {tab.tabDescription}
              </p>
            </div>
          )
      )}
    </div>
  </div>
)}
        </div>

<div className={`relative ${hasAdditional ? 'bg-gradient-to-br rounded-xl from-slate-900 via-teal-900 to-slate-900' : "bg-transparent"} py-20 px-4 sm:px-6 lg:px-8 overflow-hidden`}>
  {/* Animated Background Elements */}
  {hasAdditional &&
 <>
 <div className="absolute inset-0 opacity-20">
    <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
    <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
    <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
  </div>
 </>
}
  <div className="max-w-7xl mx-auto relative z-10">
    {/* Header Section — render ONLY if there is any additional text */}
    {hasAdditional && (
      <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 mb-10 shadow-2xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-3">
            {currentProduct?.productAdditional?.tagline && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
                <h3 className="text-sm text-teal-600 font-semibold uppercase tracking-widest">
                  {currentProduct.productAdditional.tagline}
                </h3>
              </div>
            )}

            {(currentProduct?.productAdditional?.title2 ||
              currentProduct?.productAdditional?.subTitle2) && (
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black">
                {currentProduct?.productAdditional?.title2 && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-teal-700 to-cyan-700">
                    {currentProduct.productAdditional.title2}
                  </span>
                )}
                {currentProduct?.productAdditional?.subTitle2 && (
                  <span className="block text-2xl sm:text-3xl mt-2 font-extrabold text-slate-700">
                    {currentProduct.productAdditional.subTitle2}
                  </span>
                )}
              </h2>
            )}
          </div>

          <div className="max-w-md space-y-4">
            {currentProduct?.productAdditional?.description2 && (
              <p className="text-gray-700 leading-relaxed text-sm">
                {currentProduct.productAdditional.description2}
              </p>
            )}
          </div>
        </div>
      </div>
    )}  
    {/* Slider Container */}
    <div className="relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border border-white/20">
      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group"
        >
          <ChevronLeft
            size={28}
            className="text-white group-hover:-translate-x-1 transition-transform"
          />
        </button>
      )}

      {currentIndex < galleryImages.length - 4 && (
        <button
          onClick={scrollRight}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group"
        >
          <ChevronRight
            size={28}
            className="text-white group-hover:translate-x-1 transition-transform"
          />
        </button>
      )}

      {/* Images Grid */}
      <div className="overflow-hidden px-2 sm:px-4">
        <div
          className="flex gap-4 sm:gap-6 transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {(Array.isArray(galleryImages) ? galleryImages : []).map(
            (image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-square transform transition-all duration-500 hover:scale-105 hover:-rotate-1">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* Hover Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <ZoomIn size={28} className="text-white" />
                    </div>
                    <span className="text-white font-bold text-lg px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                      View Full Size
                    </span>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-3 right-3 w-10 h-10 border-t-4 border-r-4 border-white/50 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute bottom-3 left-3 w-10 h-10 border-b-4 border-l-4 border-white/50 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* Image Number Badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg transform transition-all duration-500 group-hover:scale-110">
                    {index + 1}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Beautiful Dots Indicator */}
      <div className="flex justify-center items-center gap-3 mt-8">
        {Array.from({
          length: Math.max(1, galleryImages.length - 3),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full transition-all duration-500 ${
              currentIndex === index
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 w-12 shadow-lg"
                : "bg-gray-300 w-3 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>

    {/* Lightbox Modal */}
    {selectedImage !== null && (
      <div className="fixed inset-0 bg-black/98 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        {/* Close Button */}
        <button
          onClick={closeLightbox}
          className="absolute top-6 right-6 w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center hover:bg-white/20 hover:rotate-90 transition-all duration-300 z-50 group"
        >
          <X
            size={28}
            className="text-white group-hover:scale-110 transition-transform"
          />
        </button>

        {/* Previous Button */}
        <button
          onClick={goToPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center hover:from-teal-500/40 hover:to-cyan-500/40 transition-all duration-300 z-50 group"
        >
          <ChevronLeft
            size={32}
            className="text-white group-hover:-translate-x-1 transition-transform"
          />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center hover:from-teal-500/40 hover:to-cyan-500/40 transition-all duration-300 z-50 group"
        >
          <ChevronRight
            size={32}
            className="text-white group-hover:translate-x-1 transition-transform"
          />
        </button>

        {/* Main Image Container */}
        <div className="max-w-6xl w-full max-h-[85vh] relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={galleryImages[selectedImage]}
              alt={`Full view ${selectedImage + 1}`}
              className="w-full h-full object-contain rounded-3xl"
            />

            {/* Image Info Overlay */}
            <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20">
              <p className="text-white font-bold text-lg">
                Image {selectedImage + 1}
              </p>
              <p className="text-white/70 text-sm">
                of {galleryImages.length} photos
              </p>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-4 rounded-full shadow-2xl">
            <span className="text-white font-bold text-lg">
              {selectedImage + 1} / {galleryImages.length}
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 max-w-2xl overflow-x-auto px-4 py-2 bg-white/5 backdrop-blur-xl rounded-2xl">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden transition-all duration-300 ${
                selectedImage === index
                  ? "ring-4 ring-teal-400 scale-110 shadow-2xl"
                  : "opacity-50 hover:opacity-100 hover:scale-105"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
</div>


     
{/* ---------- SPECIFICATIONS (optional) ---------- */}
{specs.length > 0 && (
  <div className="bg-white mt-8 rounded-3xl shadow-2xl overflow-hidden mb-8 p-6 sm:p-8 lg:p-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
      Specifications
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {specs.map((s, i) => (
        <div key={i} className="p-6 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-900 mb-2">
            {s.label}
          </h4>
          <p className="text-gray-600">
            {s.value}
          </p>
        </div>
      ))}
    </div>
  </div>
)}

{/* ---------- FAQ (optional) ---------- */}
{faqsDynamic.length > 0 && (
  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 p-6 sm:p-8 lg:p-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
      Frequently Asked Questions
    </h2>

    <div className="space-y-4 max-w-4xl mx-auto">
      {faqsDynamic.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => toggleFaq(index)}
            className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold text-gray-900 text-left">
              {faq.question}
            </span>
            {openFaq === index ? (
              <ChevronUp size={24} className="text-indigo-600 flex-shrink-0" />
            ) : (
              <ChevronDown size={24} className="text-gray-400 flex-shrink-0" />
            )}
          </button>

          {openFaq === index && (
            <div className="p-6 bg-white border-t border-gray-200">
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)}


        {/* Key Features Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 p-6 sm:p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600 text-sm">
                Made with the finest materials for lasting durability
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600 text-sm">
                Express shipping available to your doorstep
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Gift Packaging
              </h3>
              <p className="text-gray-600 text-sm">
                Beautiful packaging perfect for gifting
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600 text-sm">
                Customer service available anytime you need
              </p>
            </div>
          </div>
        </div>
        {/* MORE PRODUCTS  */}
      {/* RELATED PRODUCTS – REIMAGINED */}
<section className="py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50 to-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
      <div>
        <p className="text-sm tracking-widest font-semibold text-teal-600/80">
          MORE IN {currentProduct?.category?.name?.toUpperCase() || "THIS CATEGORY"}
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900">
          You might also like
        </h2>
        <p className="mt-2 text-slate-600">
          Hand-picked products from the same category, tailored to your taste.
        </p>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => railRef.current?.scrollBy({ left: -railRef.current.clientWidth, behavior: "smooth" })}
          className="h-11 w-11 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow transition-all flex items-center justify-center"
          aria-label="Previous"
        >
          <ChevronLeft className="text-slate-700" size={22} />
        </button>
        <button
          onClick={() => railRef.current?.scrollBy({ left: railRef.current.clientWidth, behavior: "smooth" })}
          className="h-11 w-11 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow transition-all flex items-center justify-center"
          aria-label="Next"
        >
          <ChevronRight className="text-slate-700" size={22} />
        </button>
      </div>
    </div>

    {/* Content */}
    {Array.isArray(relatedProducts) && relatedProducts.length > 0 ? (
      <>
        <div
          ref={(el) => (railRef.current = el)}
          className="relative flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-p-4 pb-2 hide-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          {relatedProducts.map((prod) => {
            const img = prod.images?.[0] ? getFullImageUrl(prod.images[0]) : null;
            return (
              <article
                key={prod._id}
                className="snap-start flex-shrink-0 w-72 sm:w-80 bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-all group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                  {img ? (
                    <img
                      src={img}
                      alt={prod.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center bg-slate-100 text-slate-400">
                      No Image
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-teal-600 text-white shadow">
                      ${Number(prod.price || 0).toFixed(2)}
                    </span>
                    {prod.stock > 0 ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-700">
                        In stock
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-700">
                        Out of stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <p className="text-xs font-medium text-teal-700/80">
                    {prod.category?.name || "Category"}
                  </p>
                  <h3 className="mt-1 font-bold text-slate-900 line-clamp-2 min-h-[3rem]">
                    {prod.title}
                  </h3>

                </div>
              </article>
            );
          })}
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({
            length: Math.max(1, Math.ceil(relatedProducts.length / 4)),
          }).map((_, i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-slate-300 data-[active=true]:w-6 data-[active=true]:bg-gradient-to-r data-[active=true]:from-teal-500 data-[active=true]:to-cyan-500 transition-all"
              data-active={Math.round((railRef.current?.scrollLeft || 0) / ((railRef.current?.clientWidth || 1))) === i}
            />
          ))}
        </div>
      </>
    ) : (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-slate-600">
          No other products found in this category yet.
        </p>
      </div>
    )}
  </div>
</section>
      </div>
    </div>
  );
}
