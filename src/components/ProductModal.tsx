import React, { useState } from "react";
import type { Product} from "../types";

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
    onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
    product,
    onClose,
    onAddToCart,
}) => {
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">

            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2">

                <button onClick={onClose}
                className="absolute top-4 right-4 z-20 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                aria-label="Close Modal">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="relative bg-gray-100 h-72 w-full flex items-center justify-center p-6 rounded-l-3xl">
                    <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full max-h-56 object-contain transition-transform duration-500 "/>
                    <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md text-xs font-semibold px-3 py-3 rounded-full text-gray-700 shadow-sm">
                        {product.category}
                    </span>
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h2>

                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex itmems-center text-amber-500 text-sm font-semibold">
                                ★ <span className="ml-1 text-gray-800">{product.rating.rate}</span>                           
                            </div>
                            <span className="text-gray-400 text-sm">•</span>
                            <span className="text-sm text-gray-500">{product.rating.count} Reviews</span>
                        </div>

                        <p className="text-gray-600 text-sm mt-4 leading-relaxed max-h-36 overflow-y-auto">{product.description}</p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100"></div>
                    <div className="text-2xl font-extrabold text-gray-900 mb-4">${product.price.toFixed(2)}</div>

                    
                        </div>
                    </div>
                    </div>
    );
};