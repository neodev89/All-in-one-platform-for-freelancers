import { cookies } from "next/headers";

export async function GET() {
    try {
        const token = (await cookies()).get('auth-login')?.value;

        if (!token) {
            return Response.json({
                success: false,
                message: "token scaduto o nullo",
                data: null,
                status: 400,
            }, { status: 400 });
        }

        return Response.json({
            success: true,
            message: "Token valido!",
            data: token,
            status: 200,
        }, { status: 200 });
    } catch (error: any) {
        const messageError = error instanceof Error ? error.message : error;
        console.log(messageError);
        return Response.json({
            success: false,
            message: messageError,
            data: null,
            status: 500,
        }, { status: 500 });
    }
};