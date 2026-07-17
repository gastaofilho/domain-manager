import { Header } from "@/components/Header";
import { DomainList } from "@/components/domains/DomainList";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Header />
        <DomainList />
      </div>
    </main>
  );
}
