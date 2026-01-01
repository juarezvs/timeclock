'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get('next') ?? '/employees';

  async function doLogin() {
    setLoading(true);
    await fetch('/api/auth/login', { method: 'POST' });
    router.push(next);
  }

  return (
    <main className="max-w-sm mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <p className="mb-6 text-sm text-gray-600">
        Demonstração: o botão abaixo cria um cookie de sessão.
      </p>
      <button
        onClick={doLogin}
        disabled={loading}
        className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </main>
  );
}
