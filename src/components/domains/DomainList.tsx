"use client";

import { useEffect, useState } from "react";

import { DomainTable } from "./DomainTable";
import { domainService } from "@/services/domain.service";

import type { Domain } from "@/types/Domain";

export function DomainList() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingDomainId, setDeletingDomainId] =
    useState<number | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadDomains() {
      try {
        const domainList = await domainService.getAll();

        if (!isCancelled) {
          setDomains(domainList);
        }
      } catch (error) {
        console.error(error);

        if (!isCancelled) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Não foi possível carregar os domínios."
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadDomains();

    return () => {
      isCancelled = true;
    };
  }, []);

  async function handleDeleteDomain(
    domain: Domain
  ) {
    const shouldDelete = window.confirm(
      `Deseja realmente excluir o domínio "${domain.name}"?`
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingDomainId(domain.id);

      await domainService.remove(domain.id);

      setDomains((currentDomains) =>
        currentDomains.filter(
          (currentDomain) =>
            currentDomain.id !== domain.id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o domínio."
      );
    } finally {
      setDeletingDomainId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
        Carregando domínios...
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

  if (domains.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Nenhum domínio cadastrado
        </h2>

        <p className="mt-2 text-slate-600">
          Cadastre o primeiro domínio para começar.
        </p>
      </div>
    );
  }

  return (
    <DomainTable
      domains={domains}
      onDelete={handleDeleteDomain}
      deletingDomainId={deletingDomainId}
    />
  );
}