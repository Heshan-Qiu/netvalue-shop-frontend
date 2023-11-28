import { InboxIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { formatCurrency } from "@/app/lib/utils";

const iconMap = {
    quantity: InboxIcon,
    price: CurrencyDollarIcon,
};

export async function AdminCardWrapper({
    carts,
}: {
    carts: [
        {
            cart_id: string;
            user_id: number;
            total_quantity: number;
            total_price: number;
            status: string;
            user_first_name: string;
            user_last_name: string;
            user_email: string;
        }
    ];
}) {
    const totalOrders = carts?.length || 0;
    const totalQuantity = carts?.reduce(
        (acc, cart) => acc + cart.total_quantity,
        0
    );
    const totalPrice = carts?.reduce((acc, cart) => acc + +cart.total_price, 0);
    console.debug({ totalOrders, totalQuantity, totalPrice });

    return (
        <>
            <Card title="Total Orders" value={totalOrders} type="quantity" />
            <Card
                title="Total Quantity"
                value={totalQuantity}
                type="quantity"
            />
            <Card
                title="Total Price"
                value={formatCurrency(totalPrice)}
                type="price"
            />
        </>
    );
}

export async function CustomerCardWrapper({
    cart,
}: {
    cart: {
        cart_id: string;
        user_id: number;
        total_quantity: number;
        total_price: number;
        status: string;
        created_time: string;
        updated_time: string;
    };
}) {
    return (
        <>
            <Card
                title="Total Quantity"
                value={cart.total_quantity}
                type="quantity"
            />
            <Card
                title="Total Price"
                value={formatCurrency(cart.total_price)}
                type="price"
            />
        </>
    );
}

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: "quantity" | "price";
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            >
                {value}
            </p>
        </div>
    );
}
