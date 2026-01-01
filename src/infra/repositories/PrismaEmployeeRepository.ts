import { EmployeeRepository } from "@/src/core/ports/EmployeeRepository";
import { Employee } from "@/src/core/employee/Employee";
import { EmployeeFactory } from "@/src/core/employee/EmployeeFactory";
import prisma from '@/lib/prisma'


export class PrismaEmployeeRepository implements EmployeeRepository {

    async create(employee: Employee): Promise<void> {
        const data = EmployeeFactory.toPersistence(employee);
        await prisma.employee.create({ data })
    }

    async findByEmail(email: string) {
        const found = await prisma.employee.findUnique({ where: { email } });
        return found ? EmployeeFactory.fromPersistence(found) : null;
    }

    async findByCpf(cpf: string) {
        const found = await prisma.employee.findUnique({ where: { cpf } });
        return found ? EmployeeFactory.fromPersistence(found) : null;
    }

    async getById(id: string) {
        const found = await prisma.employee.findUnique({ where: { id } });
        return found ? EmployeeFactory.fromPersistence(found) : null;
    }

    async list() {
        const rows = await prisma.employee.findMany({ orderBy: { createdAt: 'desc' } });
        return rows.map(EmployeeFactory.fromPersistence);
    }
}

