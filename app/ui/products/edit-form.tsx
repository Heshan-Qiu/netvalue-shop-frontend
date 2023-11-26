"use client";

import { ProductForm } from "@/app/lib/definitions";
import Link from "next/link";
import {
    IdentificationIcon,
    TagIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { useFormState } from "react-dom";
import { updateProduct } from "@/app/lib/actions";

export default function EditProductForm({ product }: { product: ProductForm }) {
    const initialState = { message: null, errors: {} };
    const updateProductWithId = updateProduct.bind(null, product.id);
    const [state, dispatch] = useFormState(updateProductWithId, initialState);

    return (
        <form action={dispatch}>
            <input type="hidden" name="id" value={product.id} />
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Product Name */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                    >
                        Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter product name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                defaultValue={product.name}
                                aria-describedby="name-error"
                            />
                            <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <div
                            id="name-error"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {state.errors?.name &&
                                state.errors.name.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}
                                    >
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                {/* Product SKU */}
                <div className="mb-4">
                    <label
                        htmlFor="sku"
                        className="mb-2 block text-sm font-medium"
                    >
                        SKU
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="sku"
                                name="sku"
                                type="text"
                                placeholder="Enter product SKU"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                defaultValue={product.sku}
                                aria-describedby="sku-error"
                            />
                            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <div
                            id="sku-error"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {state.errors?.sku &&
                                state.errors.sku.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}
                                    >
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                {/* Product Price */}
                <div className="mb-4">
                    <label
                        htmlFor="price"
                        className="mb-2 block text-sm font-medium"
                    >
                        Price
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                placeholder="Enter product price"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                defaultValue={product.price}
                                aria-describedby="price-error"
                            />
                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <div
                            id="price-error"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {state.errors?.price &&
                                state.errors.price.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}
                                    >
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                {/* Product Description */}
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium"
                    >
                        Description
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <textarea
                                id="description"
                                name="description"
                                rows={6}
                                placeholder="Enter product description"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                defaultValue={product.description}
                                aria-describedby="description-error"
                            />
                            <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <div
                            id="description-error"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {state.errors?.description &&
                                state.errors.description.map(
                                    (error: string) => (
                                        <p
                                            className="mt-2 text-sm text-red-500"
                                            key={error}
                                        >
                                            {error}
                                        </p>
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </div>
            <div aria-live="polite" aria-atomic="true">
                {state.message && (
                    <p className="mt-2 text-sm text-red-500">{state.message}</p>
                )}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/products"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Product</Button>
            </div>
        </form>
    );
}
