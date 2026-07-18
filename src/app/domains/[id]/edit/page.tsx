import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { EditDomainLoader } from "@/components/domains/EditDomainLoader";

interface EditDomainPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditDomainPage({
  params,
}: EditDomainPageProps) {
  const { id } = await params;
  const domainId = Number(id);

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
            Atualização
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Editar domínio
          </h1>

          <p className="mt-2 text-slate-600">
            Atualize os dados do domínio selecionado.
          </p>
        </div>

        {Number.isInteger(domainId) && domainId > 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <EditDomainLoader domainId={domainId} />
          </div>
        ) : (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
            O identificador informado é inválido.
          </div>
        )}
      </div>
    </main>
  );
}