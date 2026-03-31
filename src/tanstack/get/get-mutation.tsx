'use client';

import instance from "@/axios-instance/instance"
import { ApiResponse, MutationConfig } from "@/@types/ApiResponse";
import { useQuery } from "@tanstack/react-query";

export const useGet = <T,>({ url, key }: MutationConfig) => {
    return useQuery<ApiResponse<T>>({
        queryKey: key,
        queryFn: async () => {
            const res = await instance.get<ApiResponse<T>>(url);
            return res.data;
        }
    })
}