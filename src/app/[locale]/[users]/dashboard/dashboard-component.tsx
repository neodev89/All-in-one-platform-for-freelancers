'use client';

import { ApiResponse } from "@/@types/ApiResponse";
import instance from "@/axios-instance/instance";
import { useGet } from "@/tanstack/get/get-mutation";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardComponent() {
    const router = useRouter();
    const [id, setId] = useState<ApiResponse<string | undefined>>({
        success: false,
        message: "",
        data: undefined,
        status: 0,
    });

    const getToken = useGet<ApiResponse<string>>({
        url: '/api/cookies',
        key: ['get-auth-token'],
        enabled: true,
    });

    useEffect(() => {
        if (!getToken.isLoading) {
            if (!getToken.data) {
                return;
            }
            if (!getToken.data.data) return;
            const idString = getToken.data.data;
            setId(idString);
        }
    }, [id, getToken.data]);

    // console.log("Adesso ho salvato il mio ID: ", id);

    const handleBack = async () => {
        const res = await instance.delete(
            "/api/cookies",
        );
        if (res.data === null) return;
        router.push("/login");
    }

    // console.log("il token sta in: ", getToken.data);
    return (
        <div>
            Dashboard
            <Button
                color="primary"
                variant="contained"
                onClick={handleBack}
            >
                Indietro
            </Button>
        </div>
    )
}