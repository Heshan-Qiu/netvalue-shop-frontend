"use server";

require("dotenv").config();

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import customAxios from "./axios";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", Object.fromEntries(formData));
    } catch (error) {
        if ((error as Error).message.includes("CredentialsSignin")) {
            return "CredentialsSignin";
        }
        throw error;
    }
}

const FormSchema = z.object({
    id: z.string(),
    name: z
        .string({
            invalid_type_error: "Please enter a name.",
        })
        .min(1, { message: "Please enter a name." }),
    sku: z
        .string({
            invalid_type_error: "Please enter a SKU.",
        })
        .min(1, { message: "Please enter a SKU." }),
    price: z.coerce
        .number()
        .gt(0, { message: "Please enter a price greater than $0." }),
    description: z
        .string({
            invalid_type_error: "Please enter a description.",
        })
        .min(1, { message: "Please enter a description." }),
    image_url: z.string(),
});

const CreateProduct = FormSchema.omit({ id: true, image_url: true });

export type State = {
    errors?: {
        name?: string[];
        sku?: string[];
        price?: string[];
        description?: string[];
    };
    message?: string | null;
};

export async function createProduct(prevState: State, formData: FormData) {
    const validatedFields = CreateProduct.safeParse({
        name: formData.get("name"),
        sku: formData.get("sku"),
        price: formData.get("price"),
        description: formData.get("description"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Product.",
        };
    }

    const postData = {
        name: validatedFields.data.name,
        sku: validatedFields.data.sku,
        price: validatedFields.data.price,
        description: validatedFields.data.description,
        // To simple the demo, we are using the same image for all products
        imageUrl: "/products/product.png",
    };

    const response = await customAxios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/products`, postData)
        .catch((error) => {
            console.log(error);
            throw new Error(`Failed to create product ${postData}`);
        });

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
}

const UpdateProduct = FormSchema.omit({ id: true, image_url: true });

export async function updateProduct(
    id: string,
    prevState: State,
    formData: FormData
) {
    const validatedFields = UpdateProduct.safeParse({
        name: formData.get("name"),
        sku: formData.get("sku"),
        price: formData.get("price"),
        description: formData.get("description"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: `Missing Fields. Failed to Update Product ${id}.`,
        };
    }

    const putData = {
        id: id,
        name: validatedFields.data.name,
        sku: validatedFields.data.sku,
        price: validatedFields.data.price,
        description: validatedFields.data.description,
        // To simple the demo, we are using the same image for all products
        imageUrl: "/products/product.png",
    };

    const response = await customAxios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, putData)
        .catch((error) => {
            console.log(error);
            throw new Error(`Failed to update product ${putData}`);
        });

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
}

export async function deleteProduct(id: string) {
    await customAxios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
        .catch((error) => {
            console.log(error);
            throw new Error(`Failed to delete product ${id}.`);
        });
    revalidatePath("/dashboard/products");
}

export async function addProductToCart({
    userEmail,
    productId,
    quantity,
    price,
}: {
    userEmail: string;
    productId: string;
    quantity: number;
    price: number;
}) {
    const postData = {
        userEmail: userEmail,
        productId: productId,
        quantity: quantity,
        price: price,
    };

    await customAxios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/carts`, postData)
        .catch((error) => {
            console.log(error);
            throw new Error(`Failed to add product ${postData} to cart.`);
        });
}
