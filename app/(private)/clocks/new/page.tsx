'use client';

import { useState } from 'react';

export default function NewClockPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setToast(null); setLoading(true);

    const form = e.currentTarget;
    const data = {
      serial: (form.elements.namedItem('serial') as HTMLInputElement).value,
      location: (form.elements.namedItem('location') as HTMLInputElement).value,
      isActive: (form.elements.namedItem('isActive') as HTMLInputElement).checked,
    };

    const res = await fetch('/api/clocks', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setLoading(false);
    if (res.ok) { setToast('Relógio cadastrado.'); form.reset(); }
    else {
      const body = await res.json().catch(() => ({}));
      setToast(body?.message ?? 'Falha ao cadastrar.');
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Cadastrar Relógio</h1>
      {toast && <div className="mb-3 border p-3 rounded">{toast}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Serial</label>
          <input name="serial" required className="border rounded w-full p-2" />
        </div>
        <div>
          <label className="block text-sm">Localização</label>
          <input name="location" required className="border rounded w-full p-2" />
        </div>
        <div className="flex items-center gap-2">
          <input id="isActive" name="isActive" type="checkbox" defaultChecked />
          <label htmlFor="isActive" className="text-sm">Ativo</label>
        </div>
        <button disabled={loading} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </main>
  );
}
