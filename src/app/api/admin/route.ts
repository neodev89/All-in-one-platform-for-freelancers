import fs from "fs/promises";
import path from "path";
import { ApiResponse } from "@/@types/ApiResponse";
import { db } from "@/db/database";
import { DBFreelanceRegisterTypeInsert, registeredFreelanceUsers } from "@/db/schema/registered-freelance-users";


export async function POST() {
    const filePath = path.join(process.cwd(), "src", "json", "register.json");
    try {
        const readFile = await fs.readFile(filePath, { encoding: 'utf-8' });
        const parsedFile = readFile !== "" ? JSON.parse(readFile) as Array<DBFreelanceRegisterTypeInsert> : null;

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
            .from(registeredFreelanceUsers);

        const setDbEmail = new Set(existingDB.map(el => el.email));

        const filterParsedFiles = parsedFile.filter(items => !setDbEmail.has(items.email));

        if (filterParsedFiles.length === 0) {
            const response: ApiResponse<null> = {
                success: false,
                message: "Tutti gli utenti sono già presenti nel database",
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
        }));
        // console.log("Come è combinato sto file? ", validDateParsedFile);

        // Qui fallisce!!!
        await db.insert(registeredFreelanceUsers).values(validDateParsedFile);

        const response: ApiResponse<Array<DBFreelanceRegisterTypeInsert>> = {
            success: true,
            message: "Utenti aggiunti con successo",
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