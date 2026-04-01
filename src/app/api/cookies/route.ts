import { cookies } from "next/headers";

export async function GET() {
    try {
        const token = (await cookies()).get('auth-login')?.value;

        if (!token) {
            return Response.json({
                success: false,
                message: "token scaduto o nullo",
                data: undefined,
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
            data: undefined,
            status: 500,
        }, { status: 500 });
    }
};

export async function DELETE() {
    try {
        const cookieStore = await cookies();

        cookieStore.delete('auth-login');
        return Response.json({
            success: true,
            message: "Token cancellato",
            data: "",
            status: 200,
        }, { status: 200 });
    } catch (error) {
        return Response.json({
            success: false,
            message: "Qualcosa è andato storto nel trycatch",
            data: undefined,
            status: 500,
        }, { status: 500 });
    }
}