export type EmployeeProps = {
  id?: string;
  matricula: string;
  name: string;
  email: string;
  cpf: string;        // manter como string (com/sem máscara)
  hiredAt: Date;
  status?: 'ACTIVE' | 'INACTIVE';
  departmentId?: string | null;
};
