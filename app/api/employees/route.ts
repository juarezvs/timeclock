import 'server-only';
import { NextResponse } from 'next/server';
import { useCases } from '@/src/config/container';
import { employeeInputSchema } from '@/src/infra/validation/employeeInput';
import { ConflictError, DomainError } from '@/src/core/use-cases/errors';

export const runtime = 'nodejs'; // Prisma requer Node runtime

export async function GET() {
  try {
    const list = await useCases.listEmployees.execute();
    return NextResponse.json(list, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: 'Erro ao listar' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const dto = employeeInputSchema.parse(json);
    const created = await useCases.createEmployee.execute(dto);
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
    console.error(e);
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
  }
}
