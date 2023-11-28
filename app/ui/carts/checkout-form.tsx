"use client";

import Link from "next/link";
import { Button } from "@/app/ui/button";
import {
    UserCircleIcon,
    PhoneIcon,
    EnvelopeIcon,
    HomeModernIcon,
    CreditCardIcon,
} from "@heroicons/react/24/outline";
import { checkoutCart } from "@/app/lib/client-actions";

export default function CheckoutForm() {
    return (
        <form action={checkoutCart}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Name */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                    >
                        Name
                    </label>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {/* Phone */}
                <div className="mb-4">
                    <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium"
                    >
                        Phone
                    </label>
                    <div className="relative">
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {/* Email */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {/* Address */}
                <div className="mb-4">
                    <label
                        htmlFor="address"
                        className="mb-2 block text-sm font-medium"
                    >
                        Address
                    </label>
                    <div className="relative">
                        <textarea
                            id="address"
                            name="address"
                            rows={4}
                            placeholder="Enter your address"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <HomeModernIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {/* Card Information */}
                <div className="mb-4">
                    <label
                        htmlFor="card-info"
                        className="mb-2 block text-sm font-medium"
                    >
                        Card Information
                    </label>
                    <div className="relative">
                        <input
                            id="card-info"
                            name="card-info"
                            type="text"
                            placeholder="Enter your card number"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <CreditCardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/carts"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Pay Now</Button>
            </div>
        </form>
    );
}
