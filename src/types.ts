
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    rating: {
      rate: number;
      count: number;
    };
}

export interface CartItem {
    product: Product;
    quantity: number;
}