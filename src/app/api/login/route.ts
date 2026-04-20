import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { ApiResponse, LoginTokenPayload } from "@/@types/ApiResponse";
import { DBFreelanceRegisterTypeInsert, registeredFreelanceUsers, validateDBRegisterInsert } from "@/db/schema/registered-freelance-users";
import { ZodError } from "zod";
import { db } from "@/db/database";
import { controlUserIntoDb } from "@/middlewares/controlUsersToDB";


export async function POST(req: Request) {
    try {
        const tokenFirm = process.env.FIRM_TOKEN!;
        const cookieStore = await cookies();
        const body = await req.json();
        const parsedValidBody = await validateDBRegisterInsert.safeParseAsync(body);

        if (!parsedValidBody.success) {
            const response: ApiResponse<ZodError<DBFreelanceRegisterTypeInsert>> = {
                success: false,
                message: "Il corpo non rispetta il tipo inferito",
                data: parsedValidBody.error,
                status: 404
            };
            // console.log("La response se è insuccess è: ", parsedValidBody.error);
            return Response.json(
                response,
                {
                    status: 404
                }
            );
        }
        // console.log("I dati del body parsato sono: ", parsedValidBody.data);
        // I dati del body parsato sono:  { email: 'mattiedisperati@bula.it', id: '', password: '0000' }
        const emailUser = parsedValidBody.data.email;
        const passwordUser = parsedValidBody.data.password;
        // console.log("La mail esiste? ", emailUser);
        const controlledUser = await controlUserIntoDb(emailUser)
        // console.log("Il DB nella middleware ha ritornato: ", controlledUser);
        {/**Il DB nella middleware ha ritornato:  
            {
                data: 
                    [
                        {
                            createdAt: 2026-03-31T00:00:00.000Z,
                            email: 'mgc@bula.it',
                            id: 'iduserfittizio',
                            password: '0000'
                        }
                    ],
                success: true
            } 
        */}

        if (controlledUser.success === false) {
            const hashPassword = await bcrypt.hash(passwordUser, 10);
            // console.log("L'utente che non esiste a DB è: ", emailUser);
            const token = jwt.sign(
                { email: emailUser },
                tokenFirm,
                {
                    expiresIn: '5d',
                }
            );

            parsedValidBody.data = {
                ...parsedValidBody.data,
                id: token,
                password: hashPassword,
            };

            await db
                .insert(registeredFreelanceUsers)
                .values(parsedValidBody.data);

            cookieStore.set(
                'auth-login',
                token,
                {
                    httpOnly: true,
                    sameSite: 'lax',
                    path: '/',
                    maxAge: 60 * 60 * 24 * 5,
                    priority: 'high',
                }
            );

            return Response.json({
                success: true,
                message: 'Utente registrato',
                data: token,
                status: 200,
            }, { status: 200 });
        } else if (controlledUser.success === true) {
            if (controlledUser.data !== undefined) {
                const idUserExisted = controlledUser.data.id !== "" ? controlledUser.data.id : false;
                // console.log("L'ID dell'utente esiste o devo ricrearlo?", idUserExisted);
                cookieStore.set(
                    'auth-login',
                    JSON.stringify(controlledUser.data.id),
                    {
                        httpOnly: true,
                        sameSite: 'lax',
                        path: '/',
                        maxAge: 60 * 60 * 24 * 5,
                        priority: 'high',
                    }
                )

                return Response.json({
                    success: true,
                    message: "utente esistente e loggato",
                    data: controlledUser.data?.id,
                    status: 200,
                }, { status: 200 });
            } else {
                return Response.json({
                    success: false,
                    message: "utente inesistente",
                    data: "nessun dato da mostrare",
                    status: 404,
                }, { status: 404 });
            }
        } else {
            return Response.json({
                success: false,
                message: "Qualcosa non ha funzionato!",
                data: null,
                status: 404,
            }, { status: 404 });
        }
    } catch (err: Error | unknown) {
        console.log("Errore nel trycatch: ", err);
        return Response.json({
            success: false,
            message: "errore nella chiamata API",
            data: err instanceof Error ? err.message : err,
            status: 500,
        }, { status: 500 });
    }
};