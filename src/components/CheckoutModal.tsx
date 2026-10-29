import React, { useState } from "react";
import { useCartStore } from "../context/useCartStore";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
    const { items, getSubtotal, clearCart } = useCartStore();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const subtotal = getSubtotal();
    const shipping = subtotal > 0 ? 5.99 : 0;
    const total = subtotal + shipping;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.address.trim()) newErrors.address = 'Shipping address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSuccess(true);
            clearCart();
        }
    };
    
    const handleClose = () => {
        setIsSuccess(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
                <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold">
                    ✕
                </button>

                {isSuccess ? (
                    /* Confirmation Screen */
                    <div className="text-center py-8 space-y-4">
                        <div className="text-5xl">🎉 yippie 🎉</div>
                        <h2 className="text-2xl font-bold text-green-600">Order Placed Successfully</h2>
                        <p className="text-gray-600">Thank you for your purchase, {formData.name}. We've sent a confirmation email to <span className="font-semibold">{formData.email}</span></p>
                        <button
                        onClick={handleClose}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    /* Checkout Form */
                    <div>
                        <h2 className="text-2xl text-black font-bold mb-4">Checkout</h2>
                        
                        {/* Order Summary */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-sm space-y-1">
                            <p className="font-semibold text-gray-700 mb-2"> Order Summary ({items.length} unique items)</p>
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full mt-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full mt-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                                <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`w-full mt-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                                errors.address ? 'border-red-500' : 'border-gray-300'
                                }`}
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`w-full mt-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                                    errors.city ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    />
                                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                </div>
                                </div>
                                    <button 
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-6">
                                        Place Order (${total.toFixed(2)})
                                    </button>
                                    </form>
                                </div>
                )}               
                </div>
            </div>
         );
        };
    
