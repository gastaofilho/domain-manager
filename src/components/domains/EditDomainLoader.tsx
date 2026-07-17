"use client";

import { useEffect, useState } from "react";

import { EditDomainForm } from "./EditDomainForm";
import { domainService } from "@/services/domain.service";

import type { Domain } from "@/types/Domain";

interface EditDomainLoaderProps {
  domainId: number;
}

export function EditDomainLoader({
  domainId,
}: EditDomainLoaderProps) {
  const [domain, setDomain] = useState<Domain | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadDomain() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const domainData =
          await domainService.getById(domainId);

        setDomain(domainData);
      } catch (error) {
        console.error(error);

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar o domínio."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadDomain();
  }, [domainId]);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
        Carregando domínio...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        {errorMessage}
      </div>
    );
  }

  if (!domain) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
        Domínio não encontrado.
      </div>
    );
  }

  return <EditDomainForm domain={domain} />;
}