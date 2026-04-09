'use client'

import instance from "@/axios-instance/instance"
import { useEffect } from "react"

interface apiProps {
    url: string;
}

export default function PostJsonData({ url }: apiProps) {
    useEffect(() => {
        const resultApi = async () => {
            const res = await instance.post(url);
            return res.data;
        };
        resultApi();
    }, []);
    return null;
};