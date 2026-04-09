import fs from "fs/promises";
import path from "path";
import { ApiResponse } from "@/@types/ApiResponse";
import { db } from "@/db/database";
import { DBInvoiceTypeInsert, invoices } from "@/db/schema/invoices";


export async function POST() {
    const filePath = path.join(process.cwd(), "src", "json", "invoice-mgc.json");
    try {
        const readFile = await fs.readFile(filePath, { encoding: 'utf-8' });
        const parsedFile = readFile !== "" ? JSON.parse(readFile) as Array<DBInvoiceTypeInsert> : null;

        if (parsedFile === null) {
            const response: ApiResponse<null> = {
                success: false,
                message: "Il file era vuoto o corrotto",
                data: null,
                status: 404,
            };

            return Response.json(
                response,
                { status: 400 },
            );
        }

        const existingDB = await db
            .select()
            .from(invoices);

        const existingKeys = new Set(
            existingDB.map(el => `${el.protocolNumb}-${el.invoiceToken}`)
        );

        const filterParsedFiles = parsedFile.filter(items =>
            !existingKeys.has(`${items.protocolNumb}-${items.invoiceToken}`)
        );

        if (filterParsedFiles.length === 0) {
            const response: ApiResponse<null> = {
                success: false,
                message: "Tutti le fatture sono già presenti nel database",
                data: null,
                status: 404,
            };

            return Response.json(
                response,
                { status: 404 },
            );
        }

        const validDateParsedFile = filterParsedFiles.map((el) => ({
            ...el,
            createdAt: el.createdAt ? new Date(el.createdAt) : new Date,
            creationDate: el.creationDate ? new Date(el.creationDate) : new Date,
        }));
        console.log("Come è combinato sto file? ", validDateParsedFile);

        // Qui fallisce!!!
        await db.insert(invoices).values(validDateParsedFile);

        const response: ApiResponse<Array<DBInvoiceTypeInsert>> = {
            success: true,
            message: "Fatture aggiunte con successo",
            data: parsedFile,
            status: 200,
        };
        return Response.json(
            response,
            { status: 200 },
        );

    } catch (error: any) {
        const err = error instanceof Error ? error.message : error;
        const response: ApiResponse<any> = {
            success: false,
            message: err,
            data: error,
            status: 500,
        };

        return Response.json(
            response,
            { status: 500 },
        );
    }
};