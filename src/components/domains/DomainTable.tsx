import { DomainRow } from "./DomainRow";

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
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="w-full min-w-[760px]">
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
              isDeleting={
                deletingDomainId === domain.id
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}