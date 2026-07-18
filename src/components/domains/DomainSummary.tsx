import type { Domain } from "@/types/Domain";

interface DomainSummaryProps {
    domains: Domain[];
}

export function DomainSummary({
    domains,
}: DomainSummaryProps) {
    const total = domains.length;

    const active = domains.filter(
        (domain) => domain.status === "active"
    ).length;

    const pending = domains.filter(
        (domain) => domain.status === "pending"
    ).length;

    const expired = domains.filter(
        (domain) => domain.status === "expired"
    ).length;

    const summaryItems = [
        {
            label: "Total de domínios",
            value: total,
            description: "Todos os registros",
            accentClass: "bg-slate-900",
            valueClass: "text-slate-900",
        },
        {
            label: "Ativos",
            value: active,
            description: "Domínios em operação",
            accentClass: "bg-emerald-500",
            valueClass: "text-emerald-700",
        },
        {
            label: "Pendentes",
            value: pending,
            description: "Aguardando regularização",
            accentClass: "bg-amber-500",
            valueClass: "text-amber-700",
        },
        {
            label: "Expirados",
            value: expired,
            description: "Necessitam atenção",
            accentClass: "bg-red-500",
            valueClass: "text-red-700",
        },
    ];

    return (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryItems.map((item) => (
                <article
                    key={item.label}
                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div
                        className={`absolute inset-x-0 top-0 h-1 ${item.accentClass}`}
                    />

                    <p className="text-sm font-medium text-slate-500">
                        {item.label}
                    </p>

                    <p
                        className={`mt-3 text-3xl font-bold tracking-tight ${item.valueClass}`}
                    >
                        {item.value}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        {item.description}
                    </p>
                </article>
            ))}
        </section>
    );
}