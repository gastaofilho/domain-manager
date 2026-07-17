"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { DomainForm } from "./DomainForm";
import { domainService } from "@/services/domain.service";

import type {
  Domain,
  DomainFormData,
} from "@/types/Domain";

interface EditDomainFormProps {
  domain: Domain;
}

export function EditDomainForm({
  domain,
}: EditDomainFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleUpdateDomain(
    domainData: DomainFormData
  ) {
    try {
      setIsSubmitting(true);

      await domainService.update(
        domain.id,
        domainData
      );

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o domínio."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const initialValues: DomainFormData = {
    name: domain.name,
    clientName: domain.clientName,
    expirationDate: domain.expirationDate,
    status: domain.status,
  };

  return (
    <DomainForm
      initialValues={initialValues}
      submitLabel="Salvar alterações"
      isSubmitting={isSubmitting}
      onSubmit={handleUpdateDomain}
    />
  );
}