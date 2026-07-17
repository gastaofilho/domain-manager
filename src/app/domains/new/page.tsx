import Link from "next/link";

import { NewDomainForm } from "@/components/domains/NewDomainForm";

export default function NewDomainPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 transition hover:text-blue-800"
        >
          ← Voltar para os domínios
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Cadastrar domínio
        </h1>

        <p className="mt-2 text-slate-600">
          Preencha os dados para adicionar um novo domínio ao
          gerenciador.
        </p>
      </div>

      <NewDomainForm />
    </main>
  );
}