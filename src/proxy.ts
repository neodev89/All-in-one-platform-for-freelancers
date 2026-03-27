import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Il matcher deve includere la root "/" e i prefissi dei locale
  matcher: [
    // Matcher consigliato dalla documentazione ufficiale next-intl
    '/', 
    '/(it|en)/:path*', // Sostituisci con i tuoi locale reali
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};