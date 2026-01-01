import 'server-only';
import { NextResponse } from 'next/server';
import { useCases } from '@/src/config/container';
import { clockInputSchema } from '@/src/infra/validation/clockInput';
import { ConflictError, DomainError } from '@/src/core/use-cases/errors';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const list = await useCases.listClocks.execute();
    return NextResponse.json(list, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Erro ao listar' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const dto = clockInputSchema.parse(await req.json());
    const created = await useCases.createClock.execute(dto);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    if (e.name === 'ZodError') {
      return NextResponse.json({ message: 'Dados inválidos', issues: e.issues }, { status: 400 });
    }
    if (e instanceof ConflictError) {
      return NextResponse.json({ message: e.message }, { status: 409 });
    }
    if (e instanceof DomainError) {
      return NextResponse.json({ message: e.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
  }
}
