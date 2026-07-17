import type { DomainFormData } from "@/types/Domain";

export function parseDomainData(data: DomainFormData) {
  return {
    name: data.name.trim(),
    clientName: data.clientName.trim(),
    expirationDate: new Date(
      `${data.expirationDate}T12:00:00`
    ),
    status: data.status,
  };
}