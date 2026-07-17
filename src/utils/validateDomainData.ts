import {
  DOMAIN_STATUS_OPTIONS,
} from "@/constants/domain";

import type {
  DomainFormData,
  DomainStatus,
} from "@/types/Domain";

function isDomainStatus(
  status: unknown
): status is DomainStatus {
  return (
    typeof status === "string" &&
    DOMAIN_STATUS_OPTIONS.some(
      ([value]) => value === status
    )
  );
}

function isValidDateString(
  value: unknown
): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const match = value.match(
    /^(\d{4})-(\d{2})-(\d{2})$/
  );

  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(
    year,
    month - 1,
    day
  );

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function validateDomainData(
  data: unknown
): data is DomainFormData {
  if (
    typeof data !== "object" ||
    data === null
  ) {
    return false;
  }

  const domainData = data as Record<
    string,
    unknown
  >;

  return (
    typeof domainData.name === "string" &&
    domainData.name.trim().length > 0 &&
    typeof domainData.clientName === "string" &&
    domainData.clientName.trim().length > 0 &&
    isValidDateString(
      domainData.expirationDate
    ) &&
    isDomainStatus(domainData.status)
  );
}