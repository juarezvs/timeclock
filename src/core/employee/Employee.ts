import { EmployeeProps } from './EmployeeProps';

export class Employee {
  private props: Required<EmployeeProps>;

  private constructor(props: Required<EmployeeProps>) {
    this.props = props;
  }

  static create(props: EmployeeProps) {
    // Regras de negócio mínimas
    if (!props.name?.trim()) throw new Error('Name is required');
    if (!props.email?.includes('@')) throw new Error('Invalid email');
    if (!/^\d{11}$/.test(props.cpf.replace(/\D/g, ''))) throw new Error('Invalid CPF format');
    const status = props.status ?? 'ACTIVE';
    const id = props.id ?? crypto.randomUUID();
    const hiredAt = props.hiredAt ?? new Date();

    return new Employee({
      id,
      matricula: props.matricula.trim().toUpperCase(),
      name: props.name.trim(),
      email: props.email.toLowerCase(),
      cpf: props.cpf.replace(/\D/g, ''),
      hiredAt,
      status,
      departmentId: props.departmentId ?? null,
    });
  }

  get id() { return this.props.id; }
  get matricula() { return this.props.matricula;}
  get name() { return this.props.name; }
  get email() { return this.props.email; }
  get cpf() { return this.props.cpf; }
  get hiredAt() { return this.props.hiredAt; }
  get status() { return this.props.status; }
  get departmentId() { return this.props.departmentId; }

  toJSON() {
    return { ...this.props };
  }
}
