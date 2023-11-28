import {
    PencilIcon,
    PlusIcon,
    TrashIcon,
    ShoppingCartIcon,
    CheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteProduct, addProductToCart } from "@/app/lib/actions";

export function CreateProduct() {
    return (
        <Link
            href="/dashboard/products/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Create Product</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateProduct({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/products/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteProduct({ id }: { id: string }) {
    const deleteProductWithId = deleteProduct.bind(null, id);

    return (
        <form action={deleteProductWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}

export function AddProductToCart({
    props,
}: {
    props: {
        userEmail: string;
        productId: string;
        quantity: number;
        price: number;
    };
}) {
    const addProductToCartWithProps = addProductToCart.bind(null, props);

    return (
        <form action={addProductToCartWithProps}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Add to cart</span>
                <ShoppingCartIcon className="w-5" />
            </button>
        </form>
    );
}

export function Checkout() {
    return (
        <Link
            href="/dashboard/carts/checkout"
            className="flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
            <span className="hidden md:block">Checkout</span>{" "}
            <CheckIcon className="h-5 md:ml-4" />
        </Link>
    );
}
