// app/[locale]/layout.tsx
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>; // IMPORTANTE: Deve essere Promise
}) {
    const { locale } = await params;
    // Se vuoi mantenere la sicurezza, fai un controllo interno
    const languages = ["en", "it"];
    if (!languages.includes(locale)) {
        // gestisci l'errore o usa un default
    }
    // Verifica che il locale sia valido
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Abilita il rendering statico per questo locale
    setRequestLocale(locale);

    // Recupera i messaggi lato server
    const messages = await getMessages();

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}