"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { DomainForm } from "./DomainForm";

import type { DomainFormData } from "@/types/Domain";

import { domainService } from "@/services/domain.service";

export function NewDomainForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const initialValues: DomainFormData = {
    name: "",
    clientName: "", 
    expirationDate: "",
    status: "active",
  };

  async function handleCreateDomain(
    domainData: DomainFormData
  ) {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await domainService.create(domainData);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível cadastrar o domínio."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DomainForm
      initialValues={initialValues}
      submitLabel="Cadastrar domínio"
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
      onSubmit={handleCreateDomain}
    />
  );
}