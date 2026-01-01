import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Em produção, valide credenciais; aqui é "demo".
  const res = NextResponse.json({ ok: true }, { status: 200 });
  res.cookies.set('auth', 'true', { httpOnly: true, path: '/', sameSite: 'lax' });
  return res;
}
