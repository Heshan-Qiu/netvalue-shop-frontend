require("dotenv").config();

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import customAxios from "@/app/lib/axios";

async function getUser(email: string): Promise<User | undefined> {
    try {
        const response = await customAxios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${email}`)
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 404) {
                    console.debug("User not found:", email);
                    return undefined;
                }
                throw new Error("Failed to fetch user.");
            });

        if (response && response.data) {
            console.debug("User found:", response.data);
            const user = {
                id: response.data.user_id,
                name: response.data.role,
                email: response.data.email,
                password: response.data.password,
                role: response.data.role,
            };
            return user;
        }

        return undefined;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);

                    if (!user) {
                        console.log("User not found");
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (passwordMatch) {
                        console.log("Credentials match for user", user);
                        const sessionUser = {
                            name: user.role,
                            email: user.email,
                        };
                        return user;
                    }
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
