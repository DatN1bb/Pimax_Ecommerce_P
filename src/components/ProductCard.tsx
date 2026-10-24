import React from "react";
import type { Product } from "../types";

interface ProductCardProps {
    product: Product;
    onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
    return (
        <div onClick={() => onSelectProduct(product)}
        className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col">

            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img src={product.image} 
                alt={product.name} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                loading="lazy" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-xs font-semibold px-2.5 py-1 rounded-full text-gray-700 shadow-sm">
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
            </div>
        </div>
    );
};
    