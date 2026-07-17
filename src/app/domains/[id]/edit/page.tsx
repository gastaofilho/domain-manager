import Link from "next/link";

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
          className="mb-6 inline-flex font-medium text-blue-600 hover:underline"
        >
          ← Voltar para a lista
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Edição
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Editar domínio
          </h1>

          <p className="mt-2 text-slate-600">
            Atualize as informações do domínio selecionado.
          </p>
        </div>

        {Number.isInteger(domainId) ? (
          <EditDomainLoader domainId={domainId} />
        ) : (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
            O identificador informado é inválido.
          </div>
        )}
      </div>
    </main>
  );
}