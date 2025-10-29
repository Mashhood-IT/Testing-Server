import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, ChevronRight, Star, TrendingUp, Zap, Heart, User, Package, Sparkles } from 'lucide-react';
import { useGetCategoriesQuery, useGetProductsQuery } from '../features/catalog/catalogApi';
import { useNavigate } from "react-router-dom"; // ✅ add this at the top

// Base API URL - adjust this to match your backend URL

const ModernEcommerce = () => {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [cartCount, setCartCount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState(1);

    // Fetch categories from API
    const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery();

    // Fetch products from API with search, pagination, and category
    const { data: productsData, isLoading: productsLoading, error: productsError } = useGetProductsQuery({
        page,
        q: searchQuery,
        category: selectedCategory !== 'all' ? selectedCategory : undefined
    });

    // Transform API data to match component structure
    const categories = [
        { id: 'all', name: 'All Products', icon: '🛍️' },
        ...(Array.isArray(categoriesData) ? categoriesData : []).map(cat => ({
            id: cat.id || cat._id,
            name: cat.name || cat.title,
            icon: cat.icon || '📦'
        }))
    ];

    // Extract products from API response - handles multiple response formats
    const products = Array.isArray(productsData?.items)
        ? productsData.items
        : Array.isArray(productsData?.products)
            ? productsData.products
            : Array.isArray(productsData)
                ? productsData
                : [];

    // Get product ID safely
    const getProductId = (product) => product._id || product.id;

    // Get product image safely with full URL
    const getProductImage = (product) => {
        let imageUrl = null;
        
        // Check for various image field formats
        if (product.imageUrl) imageUrl = product.imageUrl;
        else if (product.image) imageUrl = product.image;
        else if (Array.isArray(product.images) && product.images.length > 0) {
            imageUrl = product.images[0];
        }
        
        // If image exists and is a relative path, prepend base URL
        if (imageUrl) {
            if (imageUrl.startsWith('/')) {
                return `${import.meta.env.VITE_API_URL}${imageUrl}`;
            }
            return imageUrl;
        }
        
        return null;
    };

    // Get product category ID safely
    const getProductCategoryId = (product) => {
        if (typeof product.category === 'object') {
            return product.category?._id || product.category?.id;
        }
        return product.category || product.categoryId;
    };

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
        );
    };

    const addToCart = () => {
        setCartCount(prev => prev + 1);
    };

    // Handle search with debounce
    const handleSearch = (value) => {
        setSearchQuery(value);
        setPage(1);
    };

    // Handle category change
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setSidebarOpen(false);
        setPage(1);
    };

    // Loading state
    if (categoriesLoading || productsLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">⏳</div>
                    <h3 className="text-2xl font-bold text-gray-700">Loading amazing products...</h3>
                </div>
            </div>
        );
    }

    // Error state
    if (categoriesError || productsError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-6xl mb-4">❌</div>
                    <h3 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong</h3>
                    <p className="text-gray-600">Unable to load data. Please try again later.</p>
                  {(categoriesError || productsError) && (
  <p className="text-sm text-gray-500 mt-2">
    {categoriesError?.message 
      || productsError?.message 
      || (productsError?.data ? JSON.stringify(productsError.data) : null) 
      || JSON.stringify(productsError) 
      || 'Unknown error'}
  </p>
)}

                </div>
            </div>
        );
    }

    // Get total count
    const totalProducts = productsData?.total || products.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div className="container mx-auto px-4 py-6">
                <div className="flex gap-6">
                    {/* Sidebar */}
                    <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
                        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-purple-100">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Package className="text-purple-600" />
                                Categories
                            </h2>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryChange(cat.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 group ${selectedCategory === cat.id
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                            : 'hover:bg-purple-50'
                                            }`}
                                    >
                                        <span className="text-2xl">{cat.icon}</span>
                                        <span className="flex-1">{cat.name}</span>
                                        <ChevronRight size={18} className={`transition-transform ${selectedCategory === cat.id ? 'translate-x-1' : ''}`} />
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl">
                                <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                                    <Zap size={18} />
                                    Special Offer
                                </h3>
                                <p className="text-sm text-purple-800">Get 20% off on your first order!</p>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Hero Banner */}
                        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl p-8 mb-6 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles size={24} />
                                    <span className="text-sm font-semibold uppercase tracking-wider">AI Powered Shopping</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-2">Discover Amazing Products</h2>
                                <p className="text-purple-100 mb-4">Curated just for you with AI technology</p>
                                <div className='flex gap-4'>
                                    <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105">
                                        Shop Now
                                    </button>
                                    <div className="flex-1 max-w-2xl">
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="text"
                                                placeholder="Search products..."
                                                value={searchQuery}
                                                onChange={(e) => handleSearch(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-600 focus:outline-none transition-colors text-gray-800"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trending Section */}
                        {products.filter(p => p.trending).length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp className="text-purple-600" size={24} />
                                    <h3 className="text-2xl font-bold">Trending Now</h3>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {products.filter(p => p.trending).slice(0, 4).map(product => {
                                        const productId = getProductId(product);
                                        const productImage = getProductImage(product);
                                        
                                        return (
                                            <div key={productId} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-purple-100 cursor-pointer">
                                                <div className="mb-2 text-center">
                                                    {productImage ? (
                                                        <img src={productImage} alt={product.name || product.title} className="w-full h-20 object-contain" />
                                                    ) : (
                                                        <div className="text-6xl">📦</div>
                                                    )}
                                                </div>
                                                <h4 className="font-semibold text-sm mb-1 truncate">{product.name || product.title}</h4>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-purple-600 font-bold">${product.price}</span>
                                                    <div className="flex items-center gap-1">
                                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                        <span className="text-xs">{product.rating || 4.5}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Products Grid Header */}
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold mb-4">
                                {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name || 'Products'}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {products.length} {products.length === 1 ? 'product' : 'products'} found
                                {productsData?.total && ` • Total: ${productsData.total}`}
                            </p>
                        </div>

                        {/* Products Grid */}
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product, idx) => {
                                    const productId = getProductId(product);
                                    const productImage = getProductImage(product);
                                    const productName = product.name || product.title || 'Untitled Product';
                                    
                                    return (
                                        <div
                                            key={productId}
                                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-purple-100 group"
                                        >
                                            <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 p-8">
                                                <button
                                                    onClick={() => toggleFavorite(productId)}
                                                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform z-10"
                                                >
                                                    <Heart
                                                        size={20}
                                                        className={favorites.includes(productId) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                                                    />
                                                </button>
                                                <div className="text-center transform group-hover:scale-110 transition-transform">
                                                    {productImage ? (
                                                        <img
                                                            src={productImage}
                                                            alt={productName}
                                                            className="w-full h-32 object-contain"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.parentElement.innerHTML = '<div class="text-8xl">📦</div>';
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="text-8xl">📦</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <h3 className="font-bold text-lg mb-2 line-clamp-2">{productName}</h3>

                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                                        <span className="font-semibold">{product.rating || 4.5}</span>
                                                    </div>
                                                    {/* <span className="text-gray-400 text-sm">({product.reviews || 0} reviews)</span> */}
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                                                   <button
    onClick={() => navigate(`/product/${productId}`)}
    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
>
    <ShoppingCart size={18} />
    View
</button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
                                <p className="text-gray-500">Try adjusting your search or filters</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {productsData?.totalPages && productsData.totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-white rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 bg-purple-600 text-white rounded-xl shadow-md font-semibold">
                                    {page} / {productsData.totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(productsData.totalPages, p + 1))}
                                    disabled={page === productsData.totalPages}
                                    className="px-4 py-2 bg-white rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ModernEcommerce;