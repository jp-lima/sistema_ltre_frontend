import { Link } from "react-router";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";

const experiments = [
  {
    id: 1,
    name: "Adsorção",
    image: "/experiments/adsorcao.jpg",
    subtitle: "Dados de laboratório",
    href: "/experimentos/adsorcao",
  },
];

function ExperimentCard({ experiment }) {
  return (
    <Link to={experiment.href} className="group block">
      <Card className="w-[182px] overflow-hidden rounded-xl border-0 bg-gradient-to-b from-ltre-light-blue to-ltre-dark-blue p-4 shadow-[0_2px_8px_rgba(0,0,0,0.09)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] dark:from-ltre-navy dark:to-ltre-dark-blue">
        <div className="mb-3 flex h-20 items-center justify-center rounded-lg bg-white/20 dark:bg-white/10">
          <img
            src={experiment.image}
            alt={experiment.name}
            className="h-[71px] w-[133px] rounded object-cover"
          />
        </div>
        <h3 className="text-base font-semibold text-white">{experiment.name}</h3>
        <p className="text-xs text-ltre-sky-50">{experiment.subtitle}</p>
      </Card>
    </Link>
  );
}

export default function ExperimentsPage() {
  return (
    <>
      <Sidebar />
      <PageContainer>
        <Header
          title="Modelos matemáticos"
          breadcrumbs={[
            { label: "LTRE", href: "/" },
            { label: "Modelos matemáticos" },
          ]}
        />
        <main className="p-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {experiments.map((experiment) => (
              <ExperimentCard key={experiment.id} experiment={experiment} />
            ))}
          </div>
        </main>
      </PageContainer>
    </>
  );
}
