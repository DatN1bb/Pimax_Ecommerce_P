import React from 'react';
import { useCartStore } from '../context/useCartStore';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
    isOpen,
    onClose,
    onProceedToCheckout,
}) => {
    const { items, updateQuantity, removeFromCart, getSubtotal } = useCartStore();

    if (!isOpen) return null;

    const subtotal = getSubtotal();
    const shipping = subtotal > 0 ? 5.99 : 0;
    const total = subtotal + shipping;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
            <div className="w-full max-w-md bg-white h-full flex flex-col shadow-xl">
                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl front-bold">Your Cart</h2>
                    <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-800 text-lg font-bold">
                        ✕
                    </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y auto p-4 space-y-4">
                {items.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        Your cart is empty
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                            <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain rounded" />
                            <div className="flex-1">
                                <h4 className="font-semibold text-sm line-clamp-1"> {item.name}</h4>
                                <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300 text-sm">
                                        -
                                    </button>
                                    <span className="text-sm font-medium">{item.quantity}</span>
                                    <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300 text-sm">
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-xs">
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>
            
            {/* Footer Action */}
            {items.length > 0 && (
                <div className="p-4 border-t bg-gray-50 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base border-t pt-2">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button
                        onClick={onProceedToCheckout}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover_bg-blue-700 transition mt-4">
                            Proceed to Checkout
                        </button>
                </div>
            )}
            </div>
        </div>       
    );
};