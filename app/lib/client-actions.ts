"use client";

import { redirect } from "next/navigation";

export async function checkoutCart() {
    redirect("/dashboard/carts");
}
