import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { NewDomainForm } from "@/components/domains/NewDomainForm";

export default function NewDomainPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a lista
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Novo cadastro
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Cadastrar domínio
          </h1>

          <p className="mt-2 text-slate-600">
            Adicione um domínio e acompanhe sua situação e vencimento.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <NewDomainForm />
        </div>
      </div>
    </main>
  );
}