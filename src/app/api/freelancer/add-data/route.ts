import fs from "fs/promises";
import path from "path";
import { ApiResponse } from "@/@types/ApiResponse";
import { isTypeJoinInvoice } from "@/@types/type-guard/guardJoinData";
import { joinInvoiceAndFreelanceDataType } from "@/zod/joinInvoiceAndFreelanceDataSchema";
import { cookies } from "next/headers";
import { normalizeInvoiceForDB } from "@/utils/normalizeInvoiceToDB";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedBody = isTypeJoinInvoice(body);
        console.log("Vedo i dati del body", body);
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-login")?.value;

        if (!token) {
            const response: ApiResponse<undefined> = {
                success: false,
                message: "token invalidato o scaduto",
                data: undefined,
                status: 401,
            };
            return Response.json(
                response,
                { status: 401 },
            );
        }

        if (!parsedBody) {
            const response: ApiResponse<null> = {
                success: false,
                message: "Il corpo della richiesta non soddisfa il tipo atteso",
                data: null,
                status: 404,
            };
            return Response.json(
                response,
                { status: 404 },
            );
        }

        const filePath = path.join(process.cwd(), "src", "json", "joinData.json");
        const existFile = await fs.readFile(filePath, { encoding: 'utf-8' });
        if (!existFile) {
            const response: ApiResponse<undefined> = {
                success: false,
                message: "il file non esiste o è corrotto",
                data: undefined,
                status: 404,
            };
            return Response.json(
                response,
                { status: 404 },
            );
        }     
        const normalizeInvoice = normalizeInvoiceForDB({
            form: body, protocolNumb: "15", token
        });
        
        await fs.writeFile(filePath, JSON.stringify(normalizeInvoice, null, 2));
        const response: ApiResponse<string> = {
            success: true,
            message: "I dati sono stati aggiunti",
            data: JSON.stringify(body, null, 2),
            status: 200,
        };
        return Response.json(
            response,
            { status: 200 },
        );

    } catch (error: Error | unknown) {
        const err = error instanceof Error ? error.message : error;
        const resErr = error instanceof Error ? error.cause : error;

        const response: ApiResponse<Error | unknown> = {
            success: false,
            message: `${err}`,
            data: resErr,
            status: 500,
        };
        return Response.json(
            response,
            { status: 500 },
        );
    }
}