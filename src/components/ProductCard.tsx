import React from "react";
import type { Product } from "../types";
import { useCartStore } from "../context/useCartStore";

interface ProductCardProps {
    product: Product;
    onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        addToCart(product);
    };

    return (
        <div onClick={() => onSelectProduct(product)}
        className="group bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col">

            <div className="relative h-48 w-full overflow-hidden bg-gray-50 p-4">
                <img src={product.image} 
                alt={product.name} 
                className="object-scale-down max-w-full max-h-full group-hover:scale-105 transition-transform duration-500"
                loading="lazy" />
                <span className="absolute inset-0 w-full h-full object-contain top-3 left-3  text-xs font-semibold px-2.5 py-1 text-gray-700 shadow-sm">
                    {product.category}
                </span>
            </div>

            <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <div className="flex items-center text-xs text-amber-500 font-medium">
                        ★ <span className="text-gray-700 ml-1">{product.rating.rate} ({product.rating.count})</span>
                    </div>
                </div>

                <button 
                onClick={handleAddToCart}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-sm shadow-sm cursor-pointer">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
    