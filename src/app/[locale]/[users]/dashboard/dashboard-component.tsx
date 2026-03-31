'use client';

import { ApiResponse } from "@/@types/ApiResponse";
import { useGet } from "@/tanstack/get/get-mutation";

export default function DashboardComponent() {
    const getToken = useGet<ApiResponse<string>>({
        url: '/api/cookies',
        key: ['get-auth-token'],
    });
    console.log(getToken.data);
    return (
        <div>
            Dashboard
        </div>
    )
}