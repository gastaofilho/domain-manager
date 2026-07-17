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
    <tr>
      <td className="px-6 py-4 font-medium text-slate-900">
        {domain.clientName}
      </td>

      <td className="px-6 py-4 text-slate-700">
        {domain.name}
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

      <td className="px-6 py-4 text-right">
        <Link
          href={`/domains/${domain.id}/edit`}
          className="mr-3 font-medium text-blue-600 hover:underline"
        >
          Editar
        </Link>

        <button
          type="button"
          disabled={isDeleting}
          onClick={() => onDelete(domain)}
          className="font-medium text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Excluindo..." : "Excluir"}
        </button>
      </td>
    </tr>
  );
}