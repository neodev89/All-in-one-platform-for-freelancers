'use client';

import styles from "./dashboard.module.sass";
import instance from "@/axios-instance/instance";
import { useGet } from "@/tanstack/get/get-mutation";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCallWebSocket } from "@/ui/components/websocket/useWebsocket";
import { createdCols } from "@/ui/components/tables/columns/created-cols";
import { CustomTable } from "@/ui/components/tables/CustomTable";
import { DBInvoiceTypeSelect } from "@/db/schema/invoices";
import { GridRowParams } from "@mui/x-data-grid";
import { ModalTable } from "@/ui/components/modals/modalTable";
import { joinInvoiceAndFreelanceType } from "@/@types/joinInvoiceAndFreelance";
import { createColumns } from "@/ui/function-table/createColumns";

export default function DashboardComponent() {
    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);
    const [selectRow, setSelectRow] = useState<DBInvoiceTypeSelect>({
        id: -1,
        createdAt: new Date(),
        numInvoice: "",
        taxable: "",
        vat: "",
        total: "",
        creationDate: new Date(),
        protocolNumb: "",
        taxIdCode: "",
        invoiceToken: "",
    });

    const getToken = useGet<string>({
        url: '/api/cookies',
        key: ['get-auth-token'],
        enabled: true,
    });
    console.log("Il token di riferimento è: ", getToken.data?.data);

    const joinTable = useGet<joinInvoiceAndFreelanceType[]>({
        url: "/api/freelancer/data-join",
        key: ["get-join-table"],
        enabled: getToken.data?.data ? true : false,
    });
    console.log(" I dati dell'API che fa la join sono: ", joinTable.data?.data);

    const colsJoin = createColumns<joinInvoiceAndFreelanceType>({ dataCols: joinTable.data?.data || [] })
    const rowsJoin = joinTable.data?.data ?? [];

    const ws = useCallWebSocket<DBInvoiceTypeSelect>("ws://localhost:8080");
    console.log("WS DATA:", ws, Array.isArray(ws));

    const cols = createdCols(ws.data);

    const handleBack = async () => {
        const res = await instance.delete(
            "/api/cookies",
        );
        if (res.data === null) return;
        router.push("/login");
    };

    const handleDataClicked = (row: DBInvoiceTypeSelect) => {
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
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleBack}
                >
                    Indietro
                </Button>
            </Box>
            <Box className={styles.table}>
                <Box className={styles.boxTable}>
                    <Typography variant={'h5'}>Tabella delle fatture &quot;pura&quot;</Typography>
                    <CustomTable
                        rows={ws.data}
                        columns={cols}
                        onRowDoubleClick={(params: GridRowParams<DBInvoiceTypeSelect>) => {
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