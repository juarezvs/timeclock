export const dynamic = 'force-dynamic';

async function fetchClocks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/clocks`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Falha ao carregar');
  return res.json() as Promise<any[]>;
}

export default async function ClocksPage() {
  const clocks = await fetchClocks();
  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Relógios</h1>
        <a className="underline" href="/clocks/new">Novo</a>
      </div>
      <table className="w-full border-collapse">
        <thead><tr className="text-left border-b">
          <th className="py-2">Serial</th><th className="py-2">Local</th><th className="py-2">Ativo</th>
        </tr></thead>
        <tbody>
          {clocks.map(c => (
            <tr key={c.id} className="border-b">
              <td className="py-2">{c.serial}</td>
              <td className="py-2">{c.location}</td>
              <td className="py-2">{c.isActive ? 'Sim' : 'Não'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
