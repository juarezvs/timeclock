import { EmployeeRepository } from '../ports/EmployeeRepository';
import { Employee } from '../employee/Employee';
import { ConflictError } from './errors';

type Input = {
  name: string;
  matricula: string;
  email: string;
  cpf: string;
  hiredAt?: Date;
  departmentId?: string | null;
};

export class CreateEmployee {
  constructor(private repo: EmployeeRepository) {}

  async execute(input: Input) {
    // Regra de unicidade
    const existingEmail = await this.repo.findByEmail(input.email.toLowerCase());
    if (existingEmail) throw new ConflictError('E-mail já cadastrado');

    const cpfDigits = input.cpf.replace(/\D/g, '');
    const existingCpf = await this.repo.findByCpf(cpfDigits);
    if (existingCpf) throw new ConflictError('CPF já cadastrado');

    const entity = Employee.create({
      name: input.name,
      matricula: input.matricula,
      email: input.email,
      cpf: input.cpf,
      hiredAt: input.hiredAt ?? new Date(),
      departmentId: input.departmentId ?? null,
    });

    await this.repo.create(entity);
    return entity.toJSON();
  }
}
