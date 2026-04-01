import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export default createMiddleware(routing);

export const config = {
  // Il matcher deve includere la root "/" e i prefissi dei locale
  matcher: [
    // Matcher consigliato dalla documentazione ufficiale next-intl
    '/',
    '/(it|em)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};