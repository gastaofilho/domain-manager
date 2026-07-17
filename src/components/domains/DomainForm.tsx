"use client";

import { FormEvent, useState } from "react";

import type {
  DomainFormData,
  DomainStatus,
} from "@/types/Domain";
import { DOMAIN_STATUS_OPTIONS } from "@/constants/domain";

interface DomainFormProps {
  initialValues?: DomainFormData;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (
    domainData: DomainFormData
  ) => void | Promise<void>;
}

const defaultValues: DomainFormData = {
  name: "",
  clientName: "",
  expirationDate: "",
  status: "active",
};

export function DomainForm({
  initialValues = defaultValues,
  submitLabel = "Salvar domínio",
  isSubmitting = false,
  onSubmit,
}: DomainFormProps) {
  const [formData, setFormData] =
    useState<DomainFormData>(initialValues);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    await onSubmit(formData);
  }

  function updateField<K extends keyof DomainFormData>(
    field: K,
    value: DomainFormData[K]
  ) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          Domínio
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(event) =>
            updateField("name", event.target.value)
          }
          placeholder="exemplo.com.br"
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="clientName"
          className="block text-sm font-medium text-slate-700"
        >
          Cliente
        </label>

        <input
          id="clientName"
          name="clientName"
          type="text"
          value={formData.clientName}
          onChange={(event) =>
            updateField("clientName", event.target.value)
          }
          placeholder="Nome do cliente ou empresa"
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="expirationDate"
            className="block text-sm font-medium text-slate-700"
          >
            Data de vencimento
          </label>

          <input
            id="expirationDate"
            name="expirationDate"
            type="date"
            value={formData.expirationDate}
            onChange={(event) =>
              updateField(
                "expirationDate",
                event.target.value
              )
            }
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-slate-700"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={(event) =>
              updateField(
                "status",
                event.target.value as DomainStatus
              )
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {DOMAIN_STATUS_OPTIONS.map(([value, config]) => (
              <option key={value} value={value}>
                {config.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end border-t border-slate-200 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Salvando..."
            : submitLabel}
        </button>
      </div>
    </form>
  );
}