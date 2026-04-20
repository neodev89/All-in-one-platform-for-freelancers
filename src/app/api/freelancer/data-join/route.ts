import { ApiResponse } from "@/@types/ApiResponse";
import { db } from "@/db/database";
import { freelanceData } from "@/db/schema/freelance-data";
import { invoices } from "@/db/schema/invoices";
import { joinInvoiceAndFreelanceDataType } from "@/zod/joinInvoiceAndFreelanceDataSchema";
import { and, asc, eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-login")?.value.trim().replace(/^"+|"+$/g, "").replace(/[\u200B-\u200D\uFEFF]/g, "");
        if (!token) {
            return Response.json({
                success: false,
                message: "Token scaduto o inesistente",
                data: null,
                status: 401,
            }, { status: 401 });
        }
        console.log(`C'è uno spazio disgraziato nel ${token}`);

        const joinInvoiceAndFreelance =
            await db
                .select({
                    invoice: invoices,
                    name: freelanceData.name,
                    lastName: freelanceData.lastName,
                })
                .from(invoices)
                .innerJoin(
                    freelanceData,
                    eq(invoices.invoiceToken, freelanceData.tokenUser)
                )
                .where(
                    and(
                        eq(invoices.invoiceToken, freelanceData.tokenUser),
                        eq(invoices.invoiceToken, token),
                        eq(freelanceData.tokenUser, token)
                    )
                )
                .orderBy(asc(invoices.protocolNumb))
            ;

        if (joinInvoiceAndFreelance.length === 0) {
            const response: ApiResponse<null> = {
                success: false,
                message: "I dati del DB non ci sono",
                data: null,
                status: 404
            };
            return Response.json(
                response,
                { status: 404 },
            );
        }

        const result = joinInvoiceAndFreelance.map((el) => ({
            ...el.invoice,
            name: el.name!,
            lastName: el.lastName!
        }));

        const response: ApiResponse<joinInvoiceAndFreelanceDataType[]> = {
            success: true,
            message: "I dati sono stati uniti e sono disponibili",
            data: result,
            status: 200,
        };
        
        return Response.json(
            response,
            { status: 200 }
        );
        
    } catch (error: Error | unknown) {
        return Response.json({
            success: false,
            message: "Errore nella chiamata API",
            data: error instanceof Error ? error.message : error,
            status: 500
        }, { status: 500 });
    }
};