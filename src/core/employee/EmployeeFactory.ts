import { Employee } from './Employee';
import { EmployeeProps } from './EmployeeProps';

export const EmployeeFactory = {
  fromPersistence(raw: any) {
    // transforma um registro do repositório em entidade do domínio
    return Employee.create({
      id: raw.id,
      matricula: raw.matricula,
      name: raw.name,
      email: raw.email,
      cpf: raw.cpf,
      hiredAt: raw.hiredAt,
      status: raw.status,
      departmentId: raw.departmentId ?? null,
    });
  },
  toPersistence(entity: Employee): any {
    const e = entity.toJSON();
    return {
      id: e.id,
      name: e.name,
      matricula: e.matricula,
      email: e.email,
      cpf: e.cpf,
      hiredAt: e.hiredAt,
      status: e.status,
      departmentId: e.departmentId,
    };
  },
};
