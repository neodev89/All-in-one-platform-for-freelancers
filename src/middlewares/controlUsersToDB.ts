import { db } from "@/db/database";
import { DBFreelanceRegisterTypeInsert, registeredFreelanceUsers } from "@/db/schema/registered-freelance-users";
import { eq } from "drizzle-orm";

export async function controlUserIntoDb(emailUser: string): Promise<{
    data: DBFreelanceRegisterTypeInsert | null,
    success: boolean,
}> {
    try {
        const foundUser = await db
            .select()
            .from(registeredFreelanceUsers)
            .where(eq(registeredFreelanceUsers.email, emailUser))
            ;

        if (!foundUser) return {
            data: null,
            success: false,
        };
        return {
            data: foundUser[0],
            success: true,
        };
    } catch (error: any) {
        console.log("Errore nel trycatch: ", error);
        return {
            data: null,
            success: false,
        }
    }
}