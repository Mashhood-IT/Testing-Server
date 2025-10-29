// import React, { useState, useMemo } from "react";
// import {
//     useGetCategoriesQuery,
//     useGetProductsQuery,
// } from "../features/catalog/catalogApi";
// import { Link } from "react-router-dom";
// import { ShoppingBag, Eye, Filter, ArrowRight } from "lucide-react";

// export default function ProductSection() {
//     const [selectedCategory, setSelectedCategory] = useState(null);

//     const { data: cats } = useGetCategoriesQuery();
//     const { data: prods, isLoading, isError } = useGetProductsQuery({ 
//         page: 1, 
//         category: selectedCategory,
//     });

//     const categories = useMemo(() => cats || [], [cats]);

//     const handleCategoryClick = (categoryId) => {
//         setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
//     };

//     // Helper function to get proper image URL
//     const getImageUrl = (imagePath) => {
//         if (!imagePath) return null;
//         if (imagePath.startsWith('http')) return imagePath;
//         return `http://localhost:5000${imagePath}`;
//     };

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="relative w-20 h-20 mx-auto mb-6">
//                         <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
//                         <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                     </div>
//                     <p className="text-xl font-semibold text-gray-700">Loading Products...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (isError) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
//                 <div className="text-center bg-white p-10 rounded-3xl shadow-2xl max-w-md">
//                     <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <ShoppingBag className="w-8 h-8 text-red-600" />
//                     </div>
//                     <p className="text-xl font-semibold text-gray-800 mb-4">Oops! Something went wrong</p>
//                     <p className="text-gray-600 mb-6">Unable to load products</p>
//                     <button 
//                         onClick={() => window.location.reload()}
//                         className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const ProductImage = ({ product }) => {
//         const imageUrl = product.images?.[0] ? getImageUrl(product.images[0]) : null;

//         if (imageUrl) {
//             return (
//                 <img
//                     src={imageUrl}
//                     alt={product.title}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f1f5f9" width="400" height="400"/%3E%3C/svg%3E';
//                     }}
//                 />
//             );
//         }

//         return (
//             <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
//                 <ShoppingBag className="w-20 h-20 text-slate-300" />
//             </div>
//         );
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
//             {/* Hero Section */}
//             <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-20 px-6 overflow-hidden">
//                 <div className="absolute inset-0">
//                     <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
//                     <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
//                 </div>
                
//                 <div className="max-w-7xl mx-auto relative z-10 text-center">
//                     <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
//                         <ShoppingBag className="w-12 h-12" />
//                     </div>
//                     <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight">
//                         Our Products
//                     </h1>
//                     <p className="text-xl sm:text-2xl max-w-2xl mx-auto font-light">
//                         Discover Excellence in Every Product
//                     </p>
//                 </div>
//             </div>

//             {/* Categories Section */}
//             <section className="py-12 px-6 bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-40">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="flex items-center gap-3 mb-6">
//                         <div className="p-2 bg-blue-100 rounded-lg">
//                             <Filter className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <h3 className="font-bold text-2xl text-gray-800">
//                             Filter by Category
//                         </h3>
//                     </div>
                    
//                     <div className="flex flex-wrap gap-3">
//                         <button
//                             className={`px-6 py-3 rounded-full text-sm font-bold transform hover:scale-105 transition-all shadow-md ${
//                                 selectedCategory === null
//                                     ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl"
//                                     : "bg-white text-gray-700 hover:shadow-xl border-2 border-gray-200"
//                             }`}
//                             onClick={() => setSelectedCategory(null)}
//                         >
//                             All Products
//                         </button>
//                         {categories?.map((c) => (
//                             <button
//                                 key={c._id}
//                                 className={`px-6 py-3 rounded-full text-sm font-bold transform hover:scale-105 transition-all shadow-md ${
//                                     selectedCategory === c._id
//                                         ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl"
//                                         : "bg-white text-gray-700 hover:shadow-xl border-2 border-gray-200"
//                                 }`}
//                                 onClick={() => handleCategoryClick(c._id)}
//                             >
//                                 {c.name}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Products Gallery */}
//             <section className="py-16 px-6">
//                 <div className="max-w-7xl mx-auto">
//                     {prods?.items?.length > 0 ? (
//                         <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                             {prods.items.map((p) => (
//                                 <div
//                                     key={p._id}
//                                     className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
//                                 >
//                                     {/* Image Container */}
//                                     <div className="relative overflow-hidden aspect-square">
//                                         <ProductImage product={p} />
                                        
//                                         {/* Gradient Overlay on Hover */}
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        
//                                         {/* View Details Button - Appears on Hover */}
//                                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
//                                             <Link
//                                                 to={`/product/${p._id}`}
//                                                 className="flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-sm shadow-2xl transform scale-90 group-hover:scale-100 transition-all hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white"
//                                             >
//                                                 <Eye size={18} />
//                                                 View Details
//                                             </Link>
//                                         </div>

//                                         {/* Quick View Icon - Top Right */}
//                                         <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                             <div className="p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
//                                                 <ArrowRight className="w-5 h-5 text-gray-900" />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Product Title - Always Visible */}
//                                     <div className="p-6">
//                                         <h4 className="font-bold text-lg text-gray-800 text-center line-clamp-2 group-hover:text-blue-600 transition-colors">
//                                             {p.title}
//                                         </h4>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-32">
//                             <div className="inline-block p-8 bg-white rounded-full shadow-xl mb-6">
//                                 <ShoppingBag className="w-20 h-20 text-gray-300" />
//                             </div>
//                             <h3 className="text-3xl font-bold text-gray-800 mb-3">No Products Found</h3>
//                             <p className="text-gray-600 mb-8 text-lg">
//                                 Try selecting a different category
//                             </p>
//                             <button
//                                 onClick={() => setSelectedCategory(null)}
//                                 className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all"
//                             >
//                                 View All Products
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </section>

//             {/* Decorative Bottom Border */}
//             <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
//         </div>
//     );
// }



import React, { useState, useMemo } from "react";
import {
    useGetCategoriesQuery,
    useGetProductsQuery,
} from "../features/catalog/catalogApi";
import { Link } from "react-router-dom";
import { ShoppingBag, Sparkles, ArrowRight } from "lucide-react";

export default function ProductSection() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { data: cats } = useGetCategoriesQuery();
    const { data: prods, isLoading, isError } = useGetProductsQuery({ 
        page: 1, 
        category: selectedCategory,
    });

    const categories = useMemo(() => cats || [], [cats]);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:5000${imagePath}`;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                        <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                        <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-purple-400 animate-pulse" />
                    </div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Loading Magic...
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
                <div className="text-center bg-gradient-to-br from-slate-900 to-slate-800 p-12 rounded-3xl border border-red-500/20 max-w-md">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-500/30">
                        <ShoppingBag className="w-10 h-10 text-red-400" />
                    </div>
                    <p className="text-2xl font-bold text-white mb-3">Something Went Wrong</p>
                    <p className="text-gray-400 mb-8">Unable to load products</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const ProductImage = ({ product }) => {
        const imageUrl = product.images?.[0] ? getImageUrl(product.images[0]) : null;

        if (imageUrl) {
            return (
                <img
                    src={imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%231e293b" width="400" height="400"/%3E%3C/svg%3E';
                    }}
                />
            );
        }

        return (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <ShoppingBag className="w-20 h-20 text-slate-600" />
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-pink-900/20"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                
                <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-semibold text-purple-300">Premium Collection</span>
                    </div>
                    
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Discover
                        </span>
                        <br />
                        <span className="text-white">Our Products</span>
                    </h1>
                    
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Curated excellence, delivered to your doorstep
                    </p>
                </div>
            </div>

            {/* Categories */}
            <section className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-wrap gap-3 justify-center">
                        <button
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                                selectedCategory === null
                                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                                    : "bg-slate-800/50 text-gray-300 hover:bg-slate-800 border border-slate-700/50"
                            }`}
                            onClick={() => setSelectedCategory(null)}
                        >
                            All
                        </button>
                        {categories?.map((c) => (
                            <button
                                key={c._id}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                                    selectedCategory === c._id
                                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                                        : "bg-slate-800/50 text-gray-300 hover:bg-slate-800 border border-slate-700/50"
                                }`}
                                onClick={() => handleCategoryClick(c._id)}
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {prods?.items?.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {prods.items.map((p, idx) => (
                                <Link
                                    key={p._id}
                                    to={`/product/${p._id}`}
                                    className="group relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-800 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10"
                                    style={{animationDelay: `${idx * 50}ms`}}
                                >
                                    <div className="relative aspect-square overflow-hidden">
                                        <ProductImage product={p} />
                                        
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                        
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <div className="flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-full font-bold text-sm shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                                                View
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>

                                        <div className="absolute top-4 right-4 w-10 h-10 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-purple-500/30">
                                            <ArrowRight className="w-5 h-5 text-purple-300" />
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <h4 className="font-bold text-white text-center line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                                            {p.title}
                                        </h4>
                                    </div>

                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32">
                            <div className="inline-flex p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-full border-2 border-slate-700/50 mb-8">
                                <ShoppingBag className="w-20 h-20 text-slate-600" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-3">No Products Found</h3>
                            <p className="text-gray-400 mb-8 text-lg">
                                Try a different category
                            </p>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all"
                            >
                                View All
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
        </div>
    );
}