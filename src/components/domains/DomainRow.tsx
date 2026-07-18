"use client";

import Link from "next/link";

import { DOMAIN_STATUS_CONFIG } from "@/constants/domain";
import { formatDate } from "@/utils/formatDate";

import type { Domain } from "@/types/Domain";

interface DomainRowProps {
  domain: Domain;
  onDelete: (domain: Domain) => void;
  isDeleting?: boolean;
}

export function DomainRow({
  domain,
  onDelete,
  isDeleting = false,
}: DomainRowProps) {
  const statusConfig =
    DOMAIN_STATUS_CONFIG[domain.status];

  return (
    <tr className="transition-colors hover:bg-slate-50">
      <td className="px-6 py-4 text-slate-600">
        {domain.clientName}
      </td>

      <td className="px-6 py-4">
        <p className="font-medium text-slate-900">
          {domain.name}
        </p>
      </td>

      <td className="px-6 py-4 text-slate-700">
        {formatDate(domain.expirationDate)}
      </td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${statusConfig.className}`}
        >
          {statusConfig.label}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/domains/${domain.id}/edit`}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            Editar
          </Link>

          <button
            type="button"
            disabled={isDeleting}
            onClick={() => onDelete(domain)}
            className="inline-flex min-w-20 items-center justify-center rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </td>
    </tr>
  );
}