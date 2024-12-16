import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from './i18nConfig';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // i18n routing middleware
  const response = i18nRouter(request, i18nConfig);

  // Check if the request is for the protected price-offers routes
  if (request.nextUrl.pathname.startsWith('/price-offers')) {
    // Get the user's token from NextAuth
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    // List of allowed emails
    const allowedEmails = ['amine@top-turnover.ai', 'argonautedigital.tim@gmail.com'];

    // Check if the user is authenticated and their email is allowed
    if (!token?.email || !allowedEmails.includes(token.email)) {
      const signInUrl = new URL('/api/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', request.url); // Redirect back to the protected page after signing in
      return NextResponse.redirect(signInUrl); // Redirect to sign-in page
    }
  }

  // Return the original i18n response if no price-offers match
  return response;
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
