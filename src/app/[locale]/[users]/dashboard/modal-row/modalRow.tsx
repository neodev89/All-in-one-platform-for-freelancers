'use client'

import { DBInvoiceTypeSelect } from "@/db/schema/invoices";
import { storage } from "@/lib/storage/stored";
import { useGet } from "@/tanstack/get/get-mutation";
import { ModalTable } from "@/ui/components/modals/modalTable";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function ModalRow() {
    const router = useRouter();
    const pathname = usePathname();

    const [open, setOpen] = useState<boolean>(false);

    const getToken = useGet<string>({
        url: '/api/cookies',
        key: ['get-auth-token'],
        enabled: true,
    });

    const savedRow = storage.get<DBInvoiceTypeSelect>("save-table-row");
    console.log("I dati salvati con il double click sono: ", savedRow);
    const arraySavedROw = savedRow !== null ? [savedRow] : [];
    console.log("I dati salvati con il double click sono: ", arraySavedROw);

    console.log("Il token in uso in questa sessione è: ", getToken.data);
    console.log("Il percorso è: ", pathname);

    return (
        <div>
            <Button color="primary" onClick={() => {
                const backPath = pathname.replace("modal-row", "");
                router.push(backPath);
            }}>
                Go back!
            </Button>
            <Button color="error" onClick={() => setOpen(true)}>
                Modale
            </Button>
            <ModalTable open={open} setOpen={setOpen} dataRow={arraySavedROw} />
        </div>
    )
};