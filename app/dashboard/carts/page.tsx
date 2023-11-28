import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";
import { AdminCardWrapper, CustomerCardWrapper } from "@/app/ui/carts/cards";
import CustomerCartTable from "@/app/ui/carts/customer-table";
import AdminCartTable from "@/app/ui/carts/admin-table";
import { AdminCardsSkeleton, CustomerCardsSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { auth } from "../../../auth";
import { fetchCarts, fetchCartItemsByEmail } from "@/app/lib/data";

export const metadata: Metadata = {
    title: "Carts",
};

export default async function Page() {
    const session = await auth();
    const role = session?.user?.name;
    const email = session?.user?.email || "";

    const carts = role === "Admin" ? await fetchCarts() : null;
    const { cart, cartItems } =
        role === "Customer"
            ? await fetchCartItemsByEmail(email)
            : { cart: null, cartItems: null };

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Carts
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense
                    fallback={
                        role === "Admin" ? (
                            <AdminCardsSkeleton />
                        ) : (
                            <CustomerCardsSkeleton />
                        )
                    }
                >
                    {role === "Admin" ? (
                        <AdminCardWrapper carts={carts} />
                    ) : (
                        <CustomerCardWrapper cart={cart} />
                    )}
                </Suspense>
            </div>
            {role === "Admin" ? (
                <AdminCartTable carts={carts} />
            ) : (
                <CustomerCartTable cartItems={cartItems} />
            )}
        </main>
    );
}
