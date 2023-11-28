import Image from "next/image";
import { formatCurrency } from "@/app/lib/utils";

export default async function AdminCartTable({
    carts,
}: {
    carts: [
        {
            cart_id: string;
            user_id: string;
            total_quantity: number;
            total_price: number;
            status: string;
            user_first_name: string;
            user_last_name: string;
            user_email: string;
        }
    ];
}) {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {carts?.map((cart) => (
                            <div
                                key={cart.cart_id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div className="mb-2 flex items-center">
                                        <p>
                                            {cart.user_first_name}{" "}
                                            {cart.user_last_name}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div className="text-xl font-medium">
                                        {cart.total_quantity}
                                    </div>
                                    <div className="text-xl font-medium">
                                        {formatCurrency(cart.total_price)}
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
                                    Customer Name
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
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {carts?.map((cart) => (
                                <tr
                                    key={cart.cart_id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <p>
                                                {cart.user_first_name}{" "}
                                                {cart.user_last_name}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {cart.total_quantity}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatCurrency(cart.total_price)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {cart.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
