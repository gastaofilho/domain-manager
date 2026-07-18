import { DomainRow } from "./DomainRow";
import { DOMAIN_STATUS_CONFIG } from "@/constants/domain";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

import type { Domain } from "@/types/Domain";

interface DomainTableProps {
  domains: Domain[];
  onDelete: (domain: Domain) => void;
  deletingDomainId?: number | null;
}

export function DomainTable({
  domains,
  onDelete,
  deletingDomainId = null,
}: DomainTableProps) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Cliente
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Domínio
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Vencimento
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {domains.map((domain) => (
              <DomainRow
                key={domain.id}
                domain={domain}
                onDelete={onDelete}
                isDeleting={deletingDomainId === domain.id}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 md:hidden">
        {domains.map((domain) => {
          const statusConfig =
            DOMAIN_STATUS_CONFIG[domain.status];

          const isDeleting =
            deletingDomainId === domain.id;

          return (
            <article
              key={domain.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">
                    Cliente
                  </p>

                  <h3 className="mt-1 font-semibold text-slate-900">
                    {domain.clientName}
                  </h3>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusConfig.className}`}
                >
                  {statusConfig.label}
                </span>
              </div>

              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-sm text-slate-500">
                    Domínio
                  </dt>

                  <dd className="mt-1 font-medium text-slate-900">
                    {domain.name}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-slate-500">
                    Vencimento
                  </dt>

                  <dd className="mt-1 text-slate-700">
                    {formatDate(domain.expirationDate)}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex gap-3 border-t border-slate-200 pt-4">
                <Link
                  href={`/domains/${domain.id}/edit`}
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Editar
                </Link>

                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => onDelete(domain)}
                  className="flex-1 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isDeleting ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}