"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

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
            message: "Missing Fields. Failed to Update Product.",
        };
    }

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
}

export async function deleteProduct(id: string) {
    try {
        //   await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath("/products");
        return { message: "Product deleted." };
    } catch (error) {
        console.log(error);
        return { message: "Database error: failed to delete product." };
    }
}
