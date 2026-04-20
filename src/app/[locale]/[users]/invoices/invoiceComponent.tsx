'use client'

import instance from "@/axios-instance/instance";
import styles from "./invoice.module.sass";
import Link from "next/link";
import { mockInvoiceType } from "@/zod/mockInvoiceSchema";
import { useEffect, useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import { createColumns } from "@/ui/function-table/createColumns";
import { CustomTable } from "@/ui/components/tables/CustomTable";
import { tableMockType } from "@/@types/tableMockType";
import { usePathname } from "@/i18n/navigation";

export default function InvoiceComponent() {
    const pathname = usePathname();
    const [mockInvoice, setMockInvoice] = useState<Array<mockInvoiceType>>([]);

    console.log("Percorso url: ", pathname);
    const splitPathname = pathname.split("/")[1];
    console.log("Il path che mi serve è: ", splitPathname);

    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get(
                    "https://sandbox.mockerito.com/ecommerce/api/products"
                );
                const infered = res.data as mockInvoiceType[];
                if (!infered) {
                    return;
                }
                setMockInvoice(infered)
                console.log("Fattura mock:", res.data);
                // console.log("RAW DATA:", JSON.stringify(res.data, null, 2));

                // Qui puoi fare setState(res.data) se ti serve
            } catch (err) {
                console.error("Errore nel fetch della fattura mock:", err);
            }
        })();
    }, []);


    const rows = useMemo<Array<tableMockType>>(() => {
        if (!mockInvoice) return [];
        if (!Array.isArray(mockInvoice) || mockInvoice.length === 0) return [];

        return mockInvoice.map((el) => ({
            id: el.id,
            title: el.title,
            price: (el.price).toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            description: el.description,
            category: el.category,
            rate: el.rating !== null ? el.rating.rate : 0,
            count: el.rating !== null ? el.rating.count : 0,
        }));
    }, [mockInvoice]);
    console.log("ROWS: ", rows);

    const columns = useMemo(() => {
        const cols = createColumns({ dataCols: rows });
        return cols;
    }, [rows]);

    return (
        <div className={styles.invoice}>
            <Box className={styles.body}>
                <Box className={styles.bodyTable}>
                    <CustomTable
                        rows={rows}
                        columns={columns}
                    />
                </Box>
            </Box>
            <Box className={styles.actions}>
                <Box className={styles.actionBtn}>
                    <Button color="primary" variant="contained">
                        Invia dati
                    </Button>
                    <Link className={styles.links} href={`/${splitPathname}/dashboard`}>
                        Indietro
                    </Link>
                    <Link className={styles.links} href={'#'}>
                        VAI AI DATI
                    </Link>
                </Box>
            </Box>
        </div>
    )
}