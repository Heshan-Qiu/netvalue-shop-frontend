import Image from "next/image";
import {
    UpdateProduct,
    DeleteProduct,
    AddProductToCart,
} from "@/app/ui/products/buttons";
import { formatCurrency } from "@/app/lib/utils";
import { fetchFilteredProducts } from "@/app/lib/data";
import { auth } from "../../../auth";

export default async function ProductsTiledTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const products = await fetchFilteredProducts(query, currentPage);
    const session = await auth();
    const userEmail = session?.user?.email || "";

    return (
        <div className="mt-6">
            <div className="flex flex-wrap gap-4">
                {products?.map((product) => (
                    <div
                        key={product.id}
                        className="flex-1 min-w-[240px] max-w-[300px] bg-white p-4 rounded-md border border-gray-300"
                    >
                        <div className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center">
                                <Image
                                    src={product.image_url}
                                    className="mr-2 rounded-full"
                                    width={28}
                                    height={28}
                                    alt={`${product.name}'s picture`}
                                />
                                <p>{product.name}</p>
                            </div>
                            <div className="text-xl font-medium">
                                {formatCurrency(product.price)}
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <div className="flex flex-col text-sm">
                                <p className="text-gray-500">
                                    SKU: {product.sku}
                                </p>
                                <p className="text-sm">{product.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <AddProductToCart
                                    props={{
                                        userEmail: userEmail,
                                        productId: product.id,
                                        quantity: 1,
                                        price: product.price,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
