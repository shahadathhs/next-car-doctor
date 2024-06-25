import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const middleware = (request) => {
  // Access cookies from the request headers
  const token = request.cookies.get('next-auth.session-token');
  const pathname = request.nextUrl.pathname;

  // console.log('Token:', token); // Log the token for debugging

  // Allow requests to API routes to pass through
  if (pathname.includes('/api/')) {
    return NextResponse.next();
  }

  // Redirect to login if no token is found
  if (!token) {
    const loginUrl = new URL(`/login?redirect=${pathname}`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to pass through if token is present
  return NextResponse.next();
};

export const config = {
  matcher: ['/my-bookings/:path*', '/services/:path*'],
};