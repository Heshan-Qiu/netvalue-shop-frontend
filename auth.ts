import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";

async function getUser(email: string): Promise<User | undefined> {
    try {
        // Mock user data
        const mockUser = {
            id: "1", // Assumed user ID
            name: "User", // Assumed user name
            email: "user@netvalue.nz", // Use the passed-in email
            password:
                "$2b$10$J2A2aadQONYFdb0equU4bOxGcBH233fQ0pFlXTpcU/owqSE11G7Ky", // bcrypt-hashed assumed password
        };

        return mockUser;
        // Note: Here we are directly returning mock data, no database query is performed
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
                        return user;
                    }
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
