import type { Domain as PrismaDomain } from "@/generated/prisma/client";
import type { Domain } from "@/types/Domain";

export function serializeDomain(
  domain: PrismaDomain
): Domain {
  return {
    id: domain.id,
    name: domain.name,
    clientName: domain.clientName,
    expirationDate: domain.expirationDate
      .toISOString()
      .slice(0, 10),
    status: domain.status,
  };
}