import { lusitana } from "@/app/ui/fonts";
import { auth } from "../../auth";

export default async function Page() {
    const session = await auth();

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Welcome {session?.user?.email}! This is the Dashboard.
            </h1>
        </main>
    );
}
