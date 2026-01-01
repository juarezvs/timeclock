export const dynamic = 'force-dynamic';

async function fetchEmployees() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/employees`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Falha ao carregar lista');
  return res.json() as Promise<any[]>;
}

export default async function EmployeesPage() {
  const employees = await fetchEmployees();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Funcionários</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Nome</th>
            <th className="py-2">E-mail</th>
            <th className="py-2">CPF</th>
            <th className="py-2">Admissão</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id} className="border-b">
              <td className="py-2">{e.name}</td>
              <td className="py-2">{e.email}</td>
              <td className="py-2">{e.cpf}</td>
              <td className="py-2">{new Date(e.hiredAt).toLocaleDateString()}</td>
              <td className="py-2">{e.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
