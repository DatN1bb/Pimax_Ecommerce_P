import React from "react";

interface NavbarProps {
    cartCount: number;
    selectedCategory: string;
    onOpenCart: () => void;
    onSelectCategory: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, selectedCategory, onOpenCart, onSelectCategory }) => {
    const categories = ["All", "Electronics", "Clothing", "Books"];

    return (
        <header className="sticky top-0 z-50 bg-slate-500 shadow-sm border-b border-black-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

                <div className="flex items-center gap-8">
                    <h1 className="text-l font-bold bg-gradiant-to-r text-slate-300 cursor-pointer">
                        ShopEasy
                    </h1>

                    <nav className="hidden md:flex gap-4">
                        {categories.map((cat) => (
                            <button key={cat} 
                            onClick={() => onSelectCategory(cat)} 
                            className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-full cursor-pointer ${
                                selectedCategory === cat 
                                ? 'bg-vlue-50 text-blue-600' 
                                : 'text-gray-300 hover:text-gray-300 hover:bg-gray-600'
                                }`}>
                                    {cat}
                            </button>
                        ))}
                    </nav>
                    </div>

                    <button
                        onClick={onOpenCart}
                        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-300"
                        aria-label="Cart" >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-scale-up">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        </div>
        </header>
    );
};