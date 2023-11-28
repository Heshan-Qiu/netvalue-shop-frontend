import customAxios from "./axios";

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredProducts(
    query: string,
    currentPage: number
) {
    const response = await customAxios
        .get(
            `${process.env.NEXT_PUBLIC_API_URL}/products?search=${query}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        )
        .catch((error) => {
            console.log(error);
            throw new Error("Failed to fetch products.");
        });

    if (response && response.data) {
        const { page, totalPages, limit, total, data } = response.data;
        return data;
    }

    return [];
}

export async function fetchProductsPages(query: string) {
    const response = await customAxios
        .get(
            `${process.env.NEXT_PUBLIC_API_URL}/products/total?search=${query}`
        )
        .catch((error) => {
            console.log(error);
            throw new Error("Failed to fetch products.");
        });

    if (response && response.data) {
        console.debug("Total products found:", response.data);
        const { count } = response.data;
        return Math.floor(
            (parseInt(count) + ITEMS_PER_PAGE - 1) / ITEMS_PER_PAGE
        );
    }

    return 0;
}

export async function fetchProductById(id: string) {
    const response = await customAxios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
        .catch((error) => {
            console.log(error);
            throw new Error("Failed to fetch product.");
        });

    if (response && response.data) {
        console.debug("Product found:", response.data);
        return response.data;
    }

    return undefined;
}

export async function fetchCartItemsByEmail(userEmail: string) {
    const response = await customAxios
        .get(
            `${process.env.NEXT_PUBLIC_API_URL}/carts/${encodeURIComponent(
                userEmail
            )}`
        )
        .catch((error) => {
            console.log(error);
            throw new Error("Failed to fetch cart items.");
        });

    if (response && response.data) {
        return response.data;
    }

    return [];
}

export async function fetchCarts() {
    const response = await customAxios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/carts`)
        .catch((error) => {
            console.log(error);
            throw new Error("Failed to fetch carts.");
        });

    if (response && response.data) {
        return response.data;
    }

    return [];
}
