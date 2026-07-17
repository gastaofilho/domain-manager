export type DomainStatus = "active" | "pending" | "expired";

export type Domain = {
  id: number;
  name: string;
  clientName: string;
  expirationDate: string;
  status: DomainStatus;
};

export type DomainFormData = Omit<Domain, "id">;