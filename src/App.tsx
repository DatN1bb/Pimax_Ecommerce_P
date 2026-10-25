import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import type { Product } from './types';
import { Navbar } from './components/navbar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { useCartStore } from './context/useCartStore';

function App() {
  {/* Filter and Search */}
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');

  {/* Cart actions */}
  const addToCart = useCartStore((state) => state.addToCart);
  const totalItems = useCartStore((state) => state.getTotalItems());

  {/* Sort logic */}
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'low-high') return a.price - b.price;
      if (sortBy === 'high-low') return b.price - a.price;
      return 0;
      {/* Default = Popular */}
    });
    }, [searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product: Product, quantity: number) => {
    console.log(`Added ${quantity} of ${product.name} to cart.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <Navbar
      cartCount={0}
      onOpenCart={() => console.log('Opened cart')}
      selectedCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
      />

      {/* Product Catalog */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Sorting Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          {/* Search Input */}
          <input
          type="text"
          placeholder="search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />

          {/* Sort Selection */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" >
              <option value="popular font-sans"> Popular</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
        </div>
        </div>

        {/* Product Heading */}
        <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-6">My Collection</h1>
        <span className="text-sm text-gray-500">
          Showing {filteredProducts.length} results
        </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No products found matching your search.
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={(p) => setSelectedProduct(p)} />
          ))}
        </div>
        )}
      </main>

      {/* Product Detail */}
      <ProductModal
      product={selectedProduct}
      onClose={() => setSelectedProduct(null)}
      onAddToCart={handleAddToCart} />
    </div>
  );
};

export default App
