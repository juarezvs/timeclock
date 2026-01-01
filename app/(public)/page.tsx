import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">PontoJUS – Menu</h1>
      <p className="mb-6">Esta página é pública. Para acessar os cadastros, faça login.</p>
      <div className="grid gap-4">
        <Link href="/login" className="underline">Fazer login</Link>
        <Link href="/employees" className="block p-4 border rounded hover:bg-gray-50">
          Cadastro de Funcionários
        </Link>
        <Link href="/clocks" className="block p-4 border rounded hover:bg-gray-50">
          Cadastro de Relógios
        </Link>
      </div>
    </main>
  );
}
