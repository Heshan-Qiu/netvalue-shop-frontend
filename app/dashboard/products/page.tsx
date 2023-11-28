import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import ProductsTable from "@/app/ui/products/table";
import ProductsTiledTable from "@/app/ui/products/tiled-table";
import { CreateProduct } from "@/app/ui/products/buttons";
import { lusitana } from "@/app/ui/fonts";
import {
    ProductsTableSkeleton,
    ProductsTiledSkeleton,
} from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchProductsPages } from "@/app/lib/data";
import { Metadata } from "next";
import { auth } from "../../../auth";

export const metadata: Metadata = {
    title: "Products",
};

export default async function Page({
    searchParams,
}: {
    searchParams?: { query?: string; page?: string };
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchProductsPages(query);

    const session = await auth();
    const role = session?.user?.name;

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search products..." />
                {role === "Admin" && <CreateProduct />}
            </div>
            <Suspense
                key={query + currentPage}
                fallback={
                    role === "Admin" ? (
                        <ProductsTableSkeleton />
                    ) : (
                        <ProductsTiledSkeleton />
                    )
                }
            >
                {role === "Admin" ? (
                    <ProductsTable query={query} currentPage={currentPage} />
                ) : (
                    <ProductsTiledTable
                        query={query}
                        currentPage={currentPage}
                    />
                )}
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
