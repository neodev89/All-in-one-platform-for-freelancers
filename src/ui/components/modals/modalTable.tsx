'use client'

import CloseIcon from '@mui/icons-material/Close';
import styles from "./modalTable.module.sass";

import { type modalTableType } from "@/@types/modalTableType";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Slide } from "@mui/material";
import { forwardRef } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { GridColDef } from '@mui/x-data-grid';
import { DBInvoiceTypeSelect } from '@/db/schema/invoices';
import { CustomTable } from '../tables/CustomTable';


const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalTable = ({ open, setOpen, selectRow, setSelectRow }: modalTableType) => {

    const handleClose = () => {
        setSelectRow({
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
        setOpen(false);
    };

    const column: GridColDef<DBInvoiceTypeSelect>[] = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 50,
            sortable: true,
        },
        {
            field: "createdAt",
            headerName: "Data di creazione",
            minWidth: 200,
            sortable: true,
        },
        {
            field: "numInvoice",
            headerName: "numero Fattura",
            minWidth: 150,
            sortable: true,
        },
        {
            field: "taxable",
            headerName: "imponibile",
            minWidth: 150,
            sortable: true,
        },
        {
            field: "vat",
            headerName: "Iva %",
            minWidth: 100,
            sortable: true,
        },
        {
            field: "total",
            headerName: "totale",
            minWidth: 150,
            sortable: true,
        },
        {
            field: "creationDate",
            headerName: "data di fatturazione",
            minWidth: 200,
            sortable: true,
        },
        {
            field: "protocolNumb",
            headerName: "protocollo",
            minWidth: 80,
            sortable: true,
        },
        {
            field: "taxIdCode",
            headerName: "Codice ID",
            minWidth: 200,
            sortable: true,
        },
        {
            field: "invoiceToken",
            headerName: "token utente",
            minWidth: 100,
            sortable: true,
        }
    ]

    return (
        <Dialog
            open={open}
            fullScreen
            slots={{
                transition: Transition,
            }}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: "rgba(255, 255, 255, 0.25)",
                    }
                }
            }}
        >
            <DialogTitle>
                <Box className={styles.title}>
                    <Box className={styles.title_mod}></Box>
                    <Box className={styles.title_btn}>
                        <IconButton
                            onClick={handleClose}
                        >
                            <CloseIcon color='error' />
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent>
                {
                    (selectRow) ? (
                        <CustomTable
                            rows={[selectRow]}
                            columns={column}
                        />
                    ) : (
                        <CustomTable
                            rows={[]}
                            columns={column}
                        />
                    )
                }
            </DialogContent>
        </Dialog>
    )
};