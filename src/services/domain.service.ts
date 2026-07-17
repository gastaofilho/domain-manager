import type {
  Domain,
  DomainFormData,
} from "@/types/Domain";

const DOMAINS_API_URL = "/api/domains";

async function handleResponse<T>(
  response: Response
): Promise<T> {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => null);

    const errorMessage =
      errorData?.message ??
      "Não foi possível concluir a operação.";

    throw new Error(errorMessage);
  }

  return response.json();
}

export const domainService = {
  async getAll(): Promise<Domain[]> {
    const response = await fetch(DOMAINS_API_URL, {
      method: "GET",
      cache: "no-store",
    });

    return handleResponse<Domain[]>(response);
  },

  async getById(id: number): Promise<Domain> {
    const response = await fetch(
      `${DOMAINS_API_URL}/${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return handleResponse<Domain>(response);
  },

  async create(
    domainData: DomainFormData
  ): Promise<Domain> {
    const response = await fetch(DOMAINS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(domainData),
    });

    return handleResponse<Domain>(response);
  },

  async update(
    id: number,
    domainData: DomainFormData
  ): Promise<Domain> {
    const response = await fetch(
      `${DOMAINS_API_URL}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(domainData),
      }
    );

    return handleResponse<Domain>(response);
  },

  async remove(id: number): Promise<void> {
    const response = await fetch(
      `${DOMAINS_API_URL}/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => null);

      throw new Error(
        errorData?.message ??
          "Não foi possível excluir o domínio."
      );
    }
  },
};