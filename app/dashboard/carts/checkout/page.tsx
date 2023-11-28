import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";
import { CustomerCardWrapper } from "@/app/ui/carts/cards";
import { CustomerCardsSkeleton } from "@/app/ui/skeletons";
import CheckoutForm from "@/app/ui/carts/checkout-form";
import { Suspense } from "react";
import { auth } from "../../../../auth";
import { fetchCartItemsByEmail } from "@/app/lib/data";

export const metadata: Metadata = {
    title: "Checkout",
};

export default async function Page() {
    const session = await auth();
    const email = session?.user?.email || "";

    const { cart, cartItems } = await fetchCartItemsByEmail(email);

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Checkout
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CustomerCardsSkeleton />}>
                    <CustomerCardWrapper cart={cart} />
                </Suspense>
            </div>
            <CheckoutForm />
        </main>
    );
}
