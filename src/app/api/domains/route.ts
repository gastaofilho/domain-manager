import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { validateDomainData } from "@/utils/validateDomainData";
import { serializeDomain } from "@/utils/serializeDomain";
import { parseDomainData } from "@/utils/parseDomainData";
import { isPrismaUniqueError } from "@/utils/isPrismaUniqueError";

export async function GET() {
  try {
    const domains = await prisma.domain.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(
      domains.map(serializeDomain)
    );
  } catch (error) {
    console.error("Erro ao buscar domínios:", error);

    return NextResponse.json(
      {
        message: "Não foi possível carregar os domínios.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const requestData: unknown =
      await request.json();

    if (!validateDomainData(requestData)) {
      return NextResponse.json(
        {
          message:
            "Verifique os campos informados. O domínio deve estar em um formato válido, como exemplo.com.br.",
        },
        {
          status: 400,
        }
      );
    }

    const domain = await prisma.domain.create({
      data: parseDomainData(requestData),
    });

    return NextResponse.json(
      serializeDomain(domain),
      {
        status: 201,
      }
    );
  } catch (error) {
    if (isPrismaUniqueError(error)) {
      return NextResponse.json(
        {
          message:
            "Já existe um domínio cadastrado com esse endereço.",
        },
        {
          status: 409,
        }
      );
    }

    console.error(
      "Erro ao cadastrar domínio:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Não foi possível cadastrar o domínio.",
      },
      {
        status: 500,
      }
    );
  }
}