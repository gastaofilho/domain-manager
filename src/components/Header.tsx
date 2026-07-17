import Link from "next/link";

export function Header() {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Gestão de ativos digitais
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Gerenciador de Domínios
        </h1>

        <p className="mt-2 max-w-2xl text-slate-600">
          Cadastre e acompanhe os domínios vinculados aos clientes.
        </p>
      </div>

      <Link
      href="/domains/new"
      className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      >
      + Novo domínio
      </Link>
    </header>
  );
}