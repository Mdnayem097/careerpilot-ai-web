import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // In client-side App Router context, protected routes check token via AuthContext & localStorage / API headers
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/ai/:path*', '/career-items/add', '/career-items/manage'],
};
