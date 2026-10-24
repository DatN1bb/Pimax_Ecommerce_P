import React, { useState } from 'react';
import { PRODUCTS } from './data/products';
import type { Product } from './types';
import { Navbar } from './components/navbar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
        <h1 className="text-2xl font-bold mb-6">My Collection</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={(p) => setSelectedProduct(p)} />
          ))}
        </div>
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
