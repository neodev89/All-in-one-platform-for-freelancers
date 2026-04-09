import { ApiResponse } from "@/@types/ApiResponse";
import { joinInvoiceAndFreelanceType } from "@/@types/joinInvoiceAndFreelance";
import { db } from "@/db/database";
import { freelanceData } from "@/db/schema/freelance-data";
import { invoices } from "@/db/schema/invoices";
import { asc, eq } from "drizzle-orm";

export async function GET() {
    try {
        const joinInvoiceAndFreelance =
            await db
                .select({
                    invoice: invoices,
                    name: freelanceData.name,
                    lastName: freelanceData.lastName,
                })
                .from(invoices)
                .leftJoin(
                    freelanceData,
                    eq(invoices.invoiceToken, freelanceData.tokenUser)
                )
                .where(eq(invoices.invoiceToken, freelanceData.tokenUser))
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
            name: el.name,
            lastName: el.lastName
        }));

        const response: ApiResponse<joinInvoiceAndFreelanceType[]> = {
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