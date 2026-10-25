import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types";

export interface CartItem extends Product {
    quantity: number;
    }

    interface CartState {
        items: CartItem[];
        addToCart: (product: Product) => void;
        removeFromCart: (productId: number) => void;
        updateQuantity: (productId: number, quantity: number) => void;
        clearCart: () => void;
        getTotalItems: () => number;
        getSubtotal: () => number;
    }

    export const useCartStore = create<CartState>()(
        persist(
            (set, get) => ({
                items: [],

                addToCart: (product) => {
                    set((state) => {
                    const existingIndex = state.items.findIndex((item) => item.id === product.id);
                    if (existingIndex > -1) {
                        {/* item exists, update quantity */}
                        const newItems = [...state.items];
                        newItems[existingIndex].quantity += 1;
                        return { items: newItems };
                    }
                    {/* adding new item to cart */}
                    return { items: [...state.items, { ...product, quantity: 1 }] };
                    });
                },              
                
                    removeFromCart: (productId) => {
                        set((state) => ({
                            items: state.items.filter((item) => item.id !== productId),
                        }));
                    },

                    updateQuantity: (productId, quantity) => {
                        set((state) => {
                            if (quantity <= 0) {
                                return { items: state.items.filter((item) => item.id !== productId) };
                            }
                            return {
                                items: state.items.map((item) =>
                                item.id === productId ? { ...item, quantity } : item),
                            };
                        });
                    },

                    clearCart: () => set({ items: [] }),

                    getTotalItems: () => {
                        return get().items.reduce((total, item) => total + item.quantity, 0);
                    },

                    getSubtotal: () => {
                        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
                    },
                }),
                {
                    name: "cart-storage",
                }
            )


        );
    