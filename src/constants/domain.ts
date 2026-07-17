import type { DomainStatus } from "@/types/Domain";

interface DomainStatusConfig {
  label: string;
  className: string;
}

export const DOMAIN_STATUS_CONFIG: Record<
  DomainStatus,
  DomainStatusConfig
> = {
  active: {
    label: "Ativo",
    className: "bg-green-100 text-green-700",
  },
  pending: {
    label: "Pendente",
    className: "bg-yellow-100 text-yellow-700",
  },
  expired: {
    label: "Expirado",
    className: "bg-red-100 text-red-700",
  },
};

export const DOMAIN_STATUS_OPTIONS = Object.entries(
  DOMAIN_STATUS_CONFIG
) as [DomainStatus, DomainStatusConfig][];