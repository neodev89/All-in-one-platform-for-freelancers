// app/users/[id]/layout.tsx

import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function UserLayout({
    children,
    params
}: {
    children: ReactNode;
    params: Promise<{ locale: string, users: string }>
}) {
    const { users } = await params;

    // Qui puoi leggere il cookie se serve
    const token = (await cookies()).get('auth-login')?.value;
    if (!token) {
        return redirect("/login");
    }

    return (
        <div className="flex min-h-screen">
            {/* <Sidebar userId={id} /> */}

            <main className="flex-1 p-6">
                {/* <Header userId={id} /> */}

                {/* Qui verranno renderizzati i componenti figli */}
                <div className="mt-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
