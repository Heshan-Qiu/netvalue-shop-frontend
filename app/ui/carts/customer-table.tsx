import Image from "next/image";
import { formatCurrency } from "@/app/lib/utils";
import { Checkout } from "../products/buttons";

export default async function CustomerCartTable({
    cartItems,
}: {
    cartItems: [
        {
            cart_item_id: string;
            cart_id: string;
            product_id: string;
            quantity: number;
            price: number;
            product_name: string;
            product_image_url: string;
        }
    ];
}) {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {cartItems?.map((item) => (
                            <div
                                key={item.cart_item_id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div className="mb-2 flex items-center">
                                        <Image
                                            src={item.product_image_url}
                                            className="mr-2 rounded-full"
                                            width={28}
                                            height={28}
                                            alt={`${item.product_name}'s picture`}
                                        />
                                        <p>{item.product_name}</p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div className="text-xl font-medium">
                                        {item.quantity}
                                    </div>
                                    <div className="text-xl font-medium">
                                        {formatCurrency(item.price)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-5 font-medium sm:pl-6"
                                >
                                    Product Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Quantity
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {cartItems?.map((item) => (
                                <tr
                                    key={item.cart_item_id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={item.product_image_url}
                                                className="rounded-full"
                                                width={28}
                                                height={28}
                                                alt={`${item.product_name}'s picture`}
                                            />
                                            <p>{item.product_name}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {item.quantity}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatCurrency(item.price)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-8">
                        <Checkout />
                    </div>
                </div>
            </div>
        </div>
    );
}
