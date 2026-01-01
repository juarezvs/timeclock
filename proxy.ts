import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
    matcher: [
        '/(private)(.*)',
        '/app/employees/:path*',
        '/app/clocks/:path',
    ],
};

export function proxy(req: NextRequest){

    const isAuthenticated = req.cookies.get('auth')?.value === 'true';
    if (!isAuthenticated){
        const loginUrl =new URL('/login', req.url);
        loginUrl.searchParams.set('next',req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);

    }
    return NextResponse.next();

}