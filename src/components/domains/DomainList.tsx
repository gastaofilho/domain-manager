"use client";

import { useEffect, useState } from "react";

import { DomainTable } from "./DomainTable";
import { domainService } from "@/services/domain.service";
import { DomainSummary } from "./DomainSummary";

import type { Domain } from "@/types/Domain";

export function DomainList() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingDomainId, setDeletingDomainId] =
    useState<number | null>(null);

  const [domainToDelete, setDomainToDelete] =
    useState<Domain | null>(null);

  type Feedback = {
    type: "success" | "error";
    message: string;
  };

  const [feedback, setFeedback] =
    useState<Feedback | null>(null);

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

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback(null);
    }, 4000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [feedback]);

  function handleDeleteDomain(domain: Domain) {
    setDomainToDelete(domain);
  }

  async function confirmDeleteDomain() {
    if (!domainToDelete) {
      return;
    }

    try {
      setDeletingDomainId(domainToDelete.id);
      setFeedback(null);

      await domainService.remove(domainToDelete.id);

      setDomains((currentDomains) =>
        currentDomains.filter(
          (domain) => domain.id !== domainToDelete.id
        )
      );

      setFeedback({
        type: "success",
        message: `O domínio "${domainToDelete.name}" foi excluído com sucesso.`,
      });

      setDomainToDelete(null);
    } catch (error) {
      console.error(error);

      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível excluir o domínio.",
      });
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
    <div className="space-y-6">
      <DomainSummary domains={domains} />

      {feedback && (
        <div
          role="status"
          className={`flex items-start justify-between gap-4 rounded-xl border px-4 py-3 text-sm font-medium ${feedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
            }`}
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${feedback.type === "success"
                  ? "bg-emerald-200 text-emerald-800"
                  : "bg-red-200 text-red-800"
                }`}
            >
              {feedback.type === "success" ? "✓" : "!"}
            </span>

            <p>{feedback.message}</p>
          </div>

          <button
            type="button"
            onClick={() => setFeedback(null)}
            aria-label="Fechar mensagem"
            className="rounded p-1 leading-none opacity-70 transition hover:bg-black/5 hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Domínios cadastrados
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Consulte e gerencie os domínios dos clientes.
            </p>
          </div>

          <span className="text-sm font-medium text-slate-500">
            {domains.length}{" "}
            {domains.length === 1
              ? "registro"
              : "registros"}
          </span>
        </div>

        <DomainTable
          domains={domains}
          onDelete={handleDeleteDomain}
          deletingDomainId={deletingDomainId}
        />
      </section>

      {domainToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-domain-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600">
              !
            </div>

            <h2
              id="delete-domain-title"
              className="mt-5 text-xl font-bold text-slate-900"
            >
              Excluir domínio
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Você tem certeza de que deseja excluir o domínio{" "}
              <strong className="font-semibold text-slate-900">
                {domainToDelete.name}
              </strong>
              ? Essa ação não poderá ser desfeita.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={deletingDomainId !== null}
                onClick={() => setDomainToDelete(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={deletingDomainId !== null}
                onClick={confirmDeleteDomain}
                className="inline-flex min-w-36 items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deletingDomainId !== null
                  ? "Excluindo..."
                  : "Confirmar exclusão"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}