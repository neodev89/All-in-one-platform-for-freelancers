'use client';

import FormVariable from "@/ui/forms/form-variable";
import { Box, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DBFreelanceRegisterTypeInsert, validateDBRegisterInsert } from "@/db/schema/registered-freelance-users";
import { useTranslations } from "next-intl";
import { makePlaceholder } from "@/utils/makePlaceholder";
import { useCustomMutation } from "@/tanstack/post/post-mutation";
import { usePathname, useRouter } from "next/navigation";
import { ApiResponse } from "@/@types/ApiResponse";
import { useGet } from "@/tanstack/get/get-mutation";

function generatePublicId(): string {
    return Math.random().toString(36).slice(2, 10);
}

export default function LoginComponent() {
    const t = useTranslations("root.signIn");
    const router = useRouter();
    const pathname = usePathname();
    const isDashboard = pathname.includes("/dashboard");

    const { control, handleSubmit } = useForm({
        resolver: zodResolver(validateDBRegisterInsert),
        defaultValues: {
            id: "",
            email: "",
            password: "",
        },
    });

    const login = useCustomMutation<DBFreelanceRegisterTypeInsert>(['login-key'])

    const getToken = useGet<ApiResponse<string>>({
        url: "/api/cookies",
        key: ["get-auth-token"],
        enabled: isDashboard,
    });
    const token = getToken.data?.data;

    const handleSubmitForm = async (data: DBFreelanceRegisterTypeInsert) => {
        console.log("FORM SUBMITTED", data);
        const publicId = generatePublicId();
        try {
            // Genera un ID breve per l’URL
            login.mutate(
                {
                    url: '/api/login',
                    body: data,
                },
                {
                    onSuccess: (_) => {
                        if (token === undefined) {
                            router.push("/")
                        }
                        router.push(`${publicId}/dashboard`);
                    }
                }
            );

        } catch (error) {
            console.error("Errore nella chiamata client:", error);
            router.push("/");
        }
    };


    return (
        <Box component={'form'} onSubmit={handleSubmit(handleSubmitForm)}>
            <Stack spacing={1.5}>
                <FormVariable
                    control={control}
                    name="email"
                    type="email"
                    placeholder={makePlaceholder({
                        arg: "email",
                    })}
                />
                <FormVariable
                    control={control}
                    name="password"
                    type="password"
                    placeholder={makePlaceholder({
                        arg: "password",
                    })}
                />
            </Stack>
            <Box>
                <Button type="submit" color="primary" variant="text">
                    {t("submit")}
                </Button>
            </Box>
        </Box>
    )
}