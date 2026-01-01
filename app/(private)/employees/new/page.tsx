'use client';

import { useState } from 'react';

export default function NewEmployeePage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setToast(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      matricula: (form.elements.namedItem('matricula') as HTMLInputElement).value,
      
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      cpf: (form.elements.namedItem('cpf') as HTMLInputElement).value,
      hiredAt: (form.elements.namedItem('hiredAt') as HTMLInputElement).value,
      departmentId: (form.elements.namedItem('departmentId') as HTMLInputElement).value || null,
    };

    const res = await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setLoading(false);
    if (res.ok) {
      setToast('Funcionário cadastrado com sucesso.');
      form.reset();
    } else {
      const body = await res.json().catch(() => ({}));
      setToast(body?.message ?? 'Falha ao cadastrar.');
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Cadastrar Funcionário</h1>
      {toast && <div className="mb-3 border p-3 rounded">{toast}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Nome</label>
          <input name="name" required className="border rounded w-full p-2" />
        </div>
        <div>
          <label className="block text-sm">Matrícula</label>
          <input name="matricula" required className="border rounded w-full p-2" />
        </div>
        <div>
          <label className="block text-sm">E-mail</label>
          <input name="email" type="email" required className="border rounded w-full p-2" />
        </div>
        <div>
          <label className="block text-sm">CPF (apenas números)</label>
          <input name="cpf" required pattern="\d{11}" className="border rounded w-full p-2" />
        </div>
        <div>
          <label className="block text-sm">Data de Admissão</label>
          <input name="hiredAt" type="date" className="border rounded w-full p-2" />
        </div>
        <div>
          <label className="block text-sm">Departamento (opcional)</label>
          <input name="departmentId" className="border rounded w-full p-2" placeholder="UUID do departamento" />
        </div>

        <button
          disabled={loading}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </main>
  );
}
