export async function fetchFilteredProducts(
    query: string,
    currentPage: number
) {
    // Mock 6 products
    const products = [...Array(6)].map((_, index) => ({
        id: ((currentPage - 1) * 6 + index + 1).toString(),
        name: "Product" + ((currentPage - 1) * 6 + index + 1),
        sku: "SKU" + ((currentPage - 1) * 6 + index + 1),
        price: 100 + index,
        description: "Description" + index,
        image_url: "/products/product.png",
    }));

    return products;
}

export async function fetchProductsPages(query: string) {
    return 10;
}

export async function fetchProductById(id: string) {
    return {
        id: id,
        name: "Product" + id,
        sku: "SKU" + id,
        price: 100,
        description: "Description" + id,
        image_url: "/products/product.png",
    };
}
