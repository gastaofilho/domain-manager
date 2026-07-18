"use client";

import { FormEvent, useState } from "react";

import Link from "next/link";

import {
  CalendarDays,
  CircleDot,
  Globe2,
  Save,
  UserRound,
} from "lucide-react";

import type {
  DomainFormData,
} from "@/types/Domain";
import { DOMAIN_STATUS_OPTIONS } from "@/constants/domain";

interface DomainFormProps {
  initialValues?: DomainFormData;
  submitLabel?: string;
  isSubmitting?: boolean;
  errorMessage?: string;
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
  errorMessage,
  onSubmit,
}: DomainFormProps) {
  const [formData, setFormData] =
    useState<DomainFormData>(initialValues);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    await onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          <span
            aria-hidden="true"
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-200 text-xs font-bold text-red-800"
          >
            !
          </span>

          <p>{errorMessage}</p>
        </div>
      )}
      <div>
        <label
          htmlFor="name"
          className="flex items-center gap-2 text-sm font-semibold text-slate-800"
        >
          <Globe2 className="h-4 w-4 text-blue-600" />
          Domínio
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
          required
          placeholder="exemplo.com.br"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
        />

        <p className="mt-2 text-xs text-slate-500">
          Informe apenas o endereço, sem http:// ou https://.
        </p>
      </div>

      <div>
        <label
          htmlFor="clientName"
          className="flex items-center gap-2 text-sm font-semibold text-slate-800"
        >
          <UserRound className="h-4 w-4 text-blue-600" />
          Cliente
        </label>

        <input
          id="clientName"
          name="clientName"
          type="text"
          value={formData.clientName}
          onChange={handleChange}
          disabled={isSubmitting}
          required
          placeholder="Nome do cliente"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
        />
      </div>

      <div>
        <label
          htmlFor="expirationDate"
          className="flex items-center gap-2 text-sm font-semibold text-slate-800"
        >
          <CalendarDays className="h-4 w-4 text-blue-600" />
          Data de vencimento
        </label>

        <input
          id="expirationDate"
          name="expirationDate"
          type="date"
          value={formData.expirationDate}
          onChange={handleChange}
          disabled={isSubmitting}
          required
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="flex items-center gap-2 text-sm font-semibold text-slate-800"
        >
          <CircleDot className="h-4 w-4 text-blue-600" />
          Status
        </label>

        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={isSubmitting}
          required
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
        >
          {DOMAIN_STATUS_OPTIONS.map(
            ([value, config]) => (
              <option key={value} value={value}>
                {config.label}
              </option>
            )
          )}
        </select>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <Link
          href="/"
          className={`inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 ${isSubmitting
            ? "pointer-events-none opacity-50"
            : ""
            }`}
        >
          Cancelar
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-w-44 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-4 w-4" />

          {isSubmitting ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}