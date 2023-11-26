export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Product = {
    id: string;
    name: string;
    sku: string;
    price: number;
    description: string;
    image_url: string;
};

export type ProductForm = {
    id: string;
    name: string;
    sku: string;
    price: number;
    description: string;
};
