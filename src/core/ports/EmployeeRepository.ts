import { Employee } from '../employee/Employee';

export interface EmployeeRepository {
  create(employee: Employee): Promise<void>;
  findByEmail(email: string): Promise<Employee | null>;
  findByCpf(cpf: string): Promise<Employee | null>;
  getById(id: string): Promise<Employee | null>;
  list(): Promise<Employee[]>;
}
