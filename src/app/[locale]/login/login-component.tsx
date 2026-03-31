'use client';

import FormVariable from "@/ui/forms/form-variable";
import { Box, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DBFreelanceRegisterTypeInsert, validateDBRegisterInsert } from "@/db/schema/registered-freelance-users";
import { useTranslations } from "next-intl";
import { makePlaceholder } from "@/utils/makePlaceholder";
import { useCustomMutation } from "@/tanstack/post/post-mutation";
import { useRouter } from "next/navigation";
import instance from "@/axios-instance/instance";

export default function LoginComponent() {
    const t = useTranslations("root.signIn");
    const router = useRouter();

    const { control, watch, handleSubmit } = useForm({
        resolver: zodResolver(validateDBRegisterInsert),
        defaultValues: {
            id: "",
            email: "",
            password: "",
        },
    });

    const login = useCustomMutation<DBFreelanceRegisterTypeInsert>(['login-key'])

    const handleSubmitForm = async (data: DBFreelanceRegisterTypeInsert) => {
        console.log("FORM SUBMITTED", data);
        try {
            const getToken = await instance.get('/api/cookies');
            const userId = JSON.parse(getToken.data.data);
            login.mutate(
                {
                    url: '/api/login',
                    body: data,
                },
                {
                    onSuccess: (res) => {
                        console.log("STATUS:", res.status);
                        console.log("DATA:", res.data);
                        console.log("ID UTENTE:", res.data.data);
                        router.push(`/${userId}/dashboard`);
                    },
                    onError: (err) => {
                        console.error("ERRORE MUTATION:", err);
                    }
                });

        } catch (error) {
            console.error("Errore nella chiamata client:", error);
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