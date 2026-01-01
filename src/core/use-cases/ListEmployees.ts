import { EmployeeRepository } from '../ports/EmployeeRepository';

export class ListEmployees {
  constructor(private repo: EmployeeRepository) {}
  async execute() {
    const employees = await this.repo.list();
    return employees.map(e => e.toJSON());
  }
}
