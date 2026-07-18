import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { validateDomainData } from "@/utils/validateDomainData";
import { serializeDomain } from "@/utils/serializeDomain";
import { parseDomainData } from "@/utils/parseDomainData";
import { isPrismaUniqueError } from "@/utils/isPrismaUniqueError";


interface DomainRouteContext {
  params: Promise<{
    id: string;
  }>;
}

function getDomainId(id: string): number | null {
  const domainId = Number(id);

  if (!Number.isInteger(domainId) || domainId <= 0) {
    return null;
  }

  return domainId;
}

export async function GET(
  _request: Request,
  context: DomainRouteContext
) {
  try {
    const { id } = await context.params;
    const domainId = getDomainId(id);

    if (domainId === null) {
      return NextResponse.json(
        {
          message: "O identificador informado é inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const domain = await prisma.domain.findUnique({
      where: {
        id: domainId,
      },
    });

    if (!domain) {
      return NextResponse.json(
        {
          message: "Domínio não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(serializeDomain(domain));
  } catch (error) {
    console.error("Erro ao buscar domínio:", error);

    return NextResponse.json(
      {
        message: "Não foi possível carregar o domínio.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: Request,
  context: DomainRouteContext
) {
  try {
    const { id } = await context.params;
    const domainId = getDomainId(id);

    if (domainId === null) {
      return NextResponse.json(
        {
          message: "O identificador informado é inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const requestData: unknown = await request.json();

    if (!validateDomainData(requestData)) {
      return NextResponse.json(
        {
          message: "Verifique os campos informados. O domínio deve estar em um formato válido, como exemplo.com.br.",
        },
        {
          status: 400,
        }
      );
    }

    const existingDomain =
      await prisma.domain.findUnique({
        where: {
          id: domainId,
        },
      });

    if (!existingDomain) {
      return NextResponse.json(
        {
          message: "Domínio não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    const updatedDomain =
      await prisma.domain.update({
        where: {
          id: domainId,
        },
        data: parseDomainData(requestData),
      });

    return NextResponse.json(
      serializeDomain(updatedDomain)
    );
  } catch (error) {
    if (isPrismaUniqueError(error)) {
      return NextResponse.json(
        {
          message:
            "Já existe outro domínio cadastrado com esse endereço.",
        },
        {
          status: 409,
        }
      );
    }

    console.error(
      "Erro ao atualizar domínio:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Não foi possível atualizar o domínio.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: DomainRouteContext
) {
  try {
    const { id } = await context.params;
    const domainId = getDomainId(id);

    if (domainId === null) {
      return NextResponse.json(
        {
          message: "O identificador informado é inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const existingDomain =
      await prisma.domain.findUnique({
        where: {
          id: domainId,
        },
      });

    if (!existingDomain) {
      return NextResponse.json(
        {
          message: "Domínio não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.domain.delete({
      where: {
        id: domainId,
      },
    });

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    console.error("Erro ao excluir domínio:", error);

    return NextResponse.json(
      {
        message: "Não foi possível excluir o domínio.",
      },
      {
        status: 500,
      }
    );
  }
}