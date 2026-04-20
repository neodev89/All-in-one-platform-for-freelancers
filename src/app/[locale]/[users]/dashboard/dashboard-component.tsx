'use client';

import styles from "./dashboard.module.sass";
import instance from "@/axios-instance/instance";
import Link from "next/link";
import { useGet } from "@/tanstack/get/get-mutation";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCallWebSocket } from "@/ui/components/websocket/useWebsocket";
import { createdCols } from "@/ui/components/tables/columns/created-cols";
import { CustomTable } from "@/ui/components/tables/CustomTable";
import { DBInvoiceTypeSelect } from "@/db/schema/invoices";
import { GridRowParams } from "@mui/x-data-grid";
import { ModalTable } from "@/ui/components/modals/modalTable";
import { createColumns } from "@/ui/function-table/createColumns";
import { joinInvoiceAndFreelanceDataType } from "@/zod/joinInvoiceAndFreelanceDataSchema";
import { DBInvoiceTable } from "@/@types/DBInvoiceTable";

const formatDate = (value: Date): string => {
    // 2026-06-03T12:00:00.000Z example
    
    const splitDate = String(value).split("T")[0];
    const splitTime = String(value).split("T")[1].slice(0, 5);

    const dateLocale = {
        y: splitDate.split("-")[0],
        m: splitDate.split("-")[1],
        d: splitDate.split("-")[2]
    }

    return `${dateLocale.d}/${dateLocale.m}/${dateLocale.y} - ${splitTime}`;
};

export default function DashboardComponent() {
    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);
    const [selectRow, setSelectRow] = useState<DBInvoiceTable>({
        id: -1,
        createdAt: "",
        numInvoice: "",
        taxable: "",
        vat: "",
        total: "",
        creationDate: "",
        protocolNumb: "",
        taxIdCode: "",
        invoiceToken: "",
    });

    const getToken = useGet<string>({
        url: '/cookies',
        key: ['get-auth-token'],
        enabled: true,
    });
    console.log("Il token di riferimento è: ", getToken.data?.data);

    const joinTable = useGet<joinInvoiceAndFreelanceDataType[]>({
        url: "/freelancer/data-join",
        key: ["get-join-table"],
        enabled: getToken.data?.data ? true : false,
    });
    console.log(" I dati dell'API che fa la join sono: ", joinTable.data?.data);

    const colsJoin = useMemo(() => {
        return createColumns<joinInvoiceAndFreelanceDataType>({ dataCols: joinTable.data?.data || [] });
    }, [joinTable]);

    const newJoinRows = joinTable.data ? joinTable.data?.data.map((el) => ({
        ...el,
        createdAt: formatDate(el.createdAt),
        creationDate: formatDate(el.creationDate),
    })) : [];

    const rowsJoin = joinTable.data?.data ? newJoinRows : [];

    const ws = useCallWebSocket<DBInvoiceTypeSelect>("ws://localhost:8080");
    console.log("WS DATA:", ws, Array.isArray(ws));

    const wsRows = ws.data ? ws.data.map((el) => ({
        ...el,
        vat: el.vat ?? "0",
        taxIdCode: el.taxIdCode ?? "C.F. o p. IVA",
        createdAt: formatDate(el.createdAt),
        creationDate: formatDate(el.creationDate),
    })) : [];

    const cols = useMemo(() => {
        return createdCols(ws.data);
    }, [ws.data]);

    const handleBack = async () => {
        const res = await instance.delete(
            "/cookies",
        );
        if (res.data === null) return;
        router.push("/login");
    };

    const handleDataClicked = (row: DBInvoiceTable) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tokenRow = row.invoiceToken;
        if (!tokenRow) return;
        setSelectRow(row);
        setOpen(true);
    };

    // console.log("il token sta in: ", getToken.data);
    return (
        <div className={styles.dashboard}>
            <Box className={styles.backBtn}>
                Dashboard
                <Link href={"./add-data"} className={styles.link}>Vai al form</Link>
                <Link href={"./invoices"} className={styles.link}>Vai alle fatture</Link>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleBack}
                    sx={{ height: "3rem" }}
                >
                    Indietro
                </Button>
            </Box>
            <Box className={styles.table}>
                <Box className={styles.boxTable}>
                    <Typography variant={'h5'}>Tabella delle fatture &quot;pura&quot;</Typography>
                    <CustomTable
                        rows={wsRows}
                        columns={cols}
                        onRowDoubleClick={(params: GridRowParams<DBInvoiceTable>) => {
                            console.log("Doppio click sulla riga: ", params.id);
                            console.log("Mostro anche la riga selezionata: ", params.row);
                            handleDataClicked(params.row)
                        }}
                    />
                </Box>
                <Box className={styles.boxTable}>
                    <Typography variant={'h5'}>Tabella delle fatture e alcuni dati del freelance uniti tramite join &quot;sporca&quot;</Typography>
                    <CustomTable
                        rows={rowsJoin}
                        columns={colsJoin}
                    />
                </Box>
            </Box>
            <ModalTable
                open={open}
                setOpen={setOpen}
                selectRow={selectRow}
                setSelectRow={setSelectRow}
            />
        </div>
    )
}