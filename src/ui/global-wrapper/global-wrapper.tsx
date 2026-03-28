'use client';

import { useTranslations } from "next-intl";
import styles from "./globalWrap.module.sass";
import { globalWrapperProps } from "@/@types/global-wrapper";

export const GlobalWrapper = (props: globalWrapperProps) => {
    const t = useTranslations("global");
    return (
        <div className={styles.global}>
            <div className={styles.logo}>
                {/** Logo */}
                Logo
            </div>
            <div className={styles.title}>
                {/** Titolo */}
                <h1>{t("title")}</h1>
            </div>
            <div className={styles.bodyWrapper}>
                {/** Body */}
                {props.bodyWrapped}
            </div>
            <div className={styles.footer}>
                {/** Footer */}
                Footer
            </div>
        </div>
    )
}