'use client';

import instance from "@/axios-instance/instance";
import { useMutation } from "@tanstack/react-query";

interface mutationProps<T> {
    url: string;
    body: T;
    pathRegister?: string;
}

export function useCustomMutation<T>(mutationKey: string[]) {

    const request = async ({ url, body }: mutationProps<T>) => {
        const res = await instance.post(url, body, {
            validateStatus: () => true,
        });
        return { status: res.status, data: res.data };
    };

    return useMutation({
        mutationKey,
        mutationFn: request,
    });
}
