'use client'

import CustomField from "@/ui/forms/custom-field";
import styles from "./page.module.sass";
import { bodySendToPost, bodySendToPostSchema, joinInvoiceAndFreelanceDataSchema, joinInvoiceAndFreelanceDataType } from "@/zod/joinInvoiceAndFreelanceDataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { makePlaceholder } from "@/utils/makePlaceholder";
import { Button } from "@mui/material";
import { useCustomMutation } from "@/tanstack/post/post-mutation";
import { useRouter } from "next/navigation";
import { useGet } from "@/tanstack/get/get-mutation";
import { Link, usePathname } from "@/i18n/navigation";

export default function AddDataComponent() {
    const router = useRouter();
    const pathname = usePathname();
    const replacePathNav = pathname.replace("add-data", "dashboard");
    console.log("Il path è: ", replacePathNav);

    const { control, handleSubmit, setValue, getValues } = useForm<bodySendToPost>({
        defaultValues: {
            name: "",
            lastName: "",
            id: 0,
            createdAt: "",
            numInvoice: "",
            taxable: "",
            vat: "",
            total: "",
            creationDate: "",
            taxIdCode: "",
        },
        resolver: zodResolver(bodySendToPostSchema)
    });
    const getToken = useGet<string>({
        url: '/cookies',
        key: ['get-auth-token'],
        enabled: true,
    });
    console.log("Il token di riferimento è: ", getToken.data?.data);

    const existingData = useGet<joinInvoiceAndFreelanceDataType[]>({
        url: "/freelancer/data-join",
        key: ["get-join-table"],
        enabled: getToken.data?.data ? true : false,
    });

    useEffect(() => {
        if (existingData.data) {
            const lengthForId = existingData.data.data.length - 1;
            const lastIndex = existingData.data.data[lengthForId];
            setValue("id", lastIndex.id);
        }
    }, [existingData.data, setValue]);

    const addData = useCustomMutation<bodySendToPost>(['add-data-post']);

    console.log("I dati del form sono: ", getValues());
    const handleSubForm = async (data: bodySendToPost) => {
        // const parsedData: bodySendToPost = {
        //     ...data,
        //     createdAt: new Date(data.createdAt).toISOString(),
        //     creationDate: new Date(data.creationDate).toISOString(),
        // };
        await addData.mutateAsync({
            url: "/freelancer/add-data",
            body: data,
        });

        if (addData.isSuccess) {
            router.push("show-data");
        }
        console.log("i dati passati all'API sono: ", data);
    };

    return (
        <div className={styles.container}>
            <div className={styles.externalFromForm}>
                <form className={styles.form}>
                    <div className={styles.internalToForm}>
                        <CustomField
                            control={control}
                            name="name"
                            type="text"
                            placeholder={'name'}
                            disabled={false}
                        />
                        <CustomField
                            control={control}
                            name="lastName"
                            type="text"
                            placeholder={'lastName'}
                            disabled={false}
                        />

                        <CustomField
                            control={control}
                            name="id"
                            type="number"
                            placeholder={'id'}
                            disabled={true}
                        />
                        <CustomField
                            control={control}
                            name="createdAt"
                            type="text"
                            placeholder={'createdAt'}
                            disabled={false}
                        />
                        <CustomField
                            control={control}
                            name="numInvoice"
                            type="text"
                            placeholder={'numInvoice'}
                            disabled={false}
                        />
                        <CustomField
                            control={control}
                            name="taxable"
                            type="text"
                            placeholder={'taxable'}
                            disabled={false}
                        />
                        <CustomField
                            control={control}
                            name="vat"
                            type="text"
                            placeholder={'vat'}
                            disabled={false}
                        />
                        <CustomField
                            control={control}
                            name="total"
                            type="text"
                            placeholder={'total'}
                            disabled={false}
                        />
                        <CustomField
                            control={control}
                            name="creationDate"
                            type="text"
                            placeholder={'creationDate'}
                            disabled={false}
                        />
                        <CustomField
                            control={control}
                            name="taxIdCode"
                            type="text"
                            placeholder={'taxIdCode'}
                            disabled={false}
                        />
                    </div>
                    <div className={styles.submit}>
                        <Button
                            type="submit"
                            size="medium"
                            color="primary"
                            variant="contained"
                            onClick={handleSubmit(handleSubForm)}
                        >
                            Invia
                        </Button>
                    </div>
                </form>
                <Link className={styles.link} href={replacePathNav}>
                    Indietro
                </Link>
            </div>
        </div>
    )
}