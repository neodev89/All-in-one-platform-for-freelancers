import { ApiResponse } from "@/@types/ApiResponse";
import { db } from "@/db/database";
import { DBInvoiceTypeSelect, invoices } from "@/db/schema/invoices";
import { eq } from "drizzle-orm";

export async function GET(user: string) {
    try {
        const existingDB = await db
            .select()
            .from(invoices)
            .where(eq(invoices.invoiceToken, user));

        if (existingDB.length === 0) {
            const response: ApiResponse<null> = {
                success: false,
                message: "Il database è vuoto",
                data: null,
                status: 404
            };

            return Response.json(
                response,
                { status: 400 },
            );
        }

        const response: ApiResponse<DBInvoiceTypeSelect[]> = {
            success: false,
            message: "I dati delle fatture sono stati prelevati",
            data: existingDB,
            status: 200,
        };

        return Response.json(
            response,
            { status: 200 },
        );
    } catch (error: Error | unknown) {
        const response: ApiResponse<Error | unknown> = {
                success: false,
                message: "Il database è vuoto",
                data: error instanceof Error ? error.message : error,
                status: 500
            };

            return Response.json(
                response,
                { status: 500 },
            );
    }
}