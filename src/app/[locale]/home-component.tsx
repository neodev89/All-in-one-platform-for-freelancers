'use client';

import styles from "./page.module.sass";
import { GlobalWrapper } from "@/ui/global-wrapper/global-wrapper";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HomeComponent() {
    return (
        <GlobalWrapper
            bodyWrapped={<HomeWrappedComponent />}
        />
    )
}

const HomeWrappedComponent = () => {
    const t = useTranslations("root");
    return (
        <Box className={styles.page}>
            <Stack spacing={1}>
                <Box>
                    <Typography variant="h4">{t("title")}</Typography>
                </Box>
                <Box>
                    <Typography variant="h6">{t("subtitle")}</Typography>
                </Box>
                <Box>
                    <Link href={'/login'} className={styles.access}>
                        <Typography component={'p'}>
                            {t("access")}
                        </Typography>
                    </Link>
                </Box>
            </Stack>
        </Box>
    )
}