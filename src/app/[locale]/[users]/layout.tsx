import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';


export default async function LocaleRootLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    // Se vuoi mantenere la sicurezza, fai un controllo interno
    const languages = ["en", "it"];
    if (!languages.includes(locale)) {
        // gestisci l'errore o usa un default
    }
    // Verifica che il locale sia valido
    if (!routing.locales.includes(locale as any)) {
        return notFound();
    }

    // Abilita il rendering statico per questo locale
    setRequestLocale(locale);

    // Recupera i messaggi lato server
    const messages = await getMessages();
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    )
}