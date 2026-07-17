"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { DomainForm } from "./DomainForm";

import type { DomainFormData } from "@/types/Domain";

import { domainService } from "@/services/domain.service";

export function NewDomainForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleCreateDomain(
    domainData: DomainFormData
  ) {
    try {
      setIsSubmitting(true);

      await domainService.create(domainData);

      router.push("/");
    } catch (error) {
      console.error(error);

      alert("Erro ao cadastrar domínio.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DomainForm
      submitLabel="Cadastrar domínio"
      isSubmitting={isSubmitting}
      onSubmit={handleCreateDomain}
    />
  );
}