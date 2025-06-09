export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
}

export interface CreateProductInput {
    name: string;
    price: number;
    category: string;
    stock: number;
}