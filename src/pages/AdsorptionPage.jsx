import { useEffect, useMemo, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { cn } from "cn";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChartCard } from "@/components/ltre/ChartCard";
import { ModelCard } from "@/components/ModelCard";
import { ModelDataModal } from "@/components/modals/ModelDataModal";
import { ModelInfoModal } from "@/components/modals/ModelInfoModal";
import { adsorptionModels } from "@/data/adsorption-models";
import { Api } from "@/api";
import { getDefaultExperimentalData } from "@/lib/adsorption-mock";

export default function AdsorptionPage() {
  const [selectedModelIds, setSelectedModelIds] = useState([
    adsorptionModels[0].id,
  ]);
  const [modelData, setModelData] = useState(() =>
    Object.fromEntries(
      adsorptionModels.map((m) => [m.id, getDefaultExperimentalData()])
    )
  );
  const [chartVisibility, setChartVisibility] = useState(() =>
    Object.fromEntries(
      ["experimental", ...adsorptionModels.map((m) => m.id)].map((id) => [
        id,
        true,
      ])
    )
  );
  const [metrics, setMetrics] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [applying, setApplying] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [activeModelId, setActiveModelId] = useState(null);

  const activeModel = useMemo(
    () => adsorptionModels.find((m) => m.id === activeModelId),
    [activeModelId]
  );

  useEffect(() => {
    handleApply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleModel(id) {
    setSelectedModelIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function selectAll() {
    if (selectedModelIds.length === adsorptionModels.length) {
      setSelectedModelIds([]);
    } else {
      setSelectedModelIds(adsorptionModels.map((m) => m.id));
    }
  }

  function toggleVisibility(id) {
    setChartVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  async function handleApply() {
    setApplying(true);
    try {
      const experimental = modelData[selectedModelIds[0]] ?? getDefaultExperimentalData();
      const result = await Api.calculations.adsorption(
        selectedModelIds.length ? selectedModelIds : [adsorptionModels[0].id],
        experimental
      );
      setMetrics(result.metrics);
      setChartData(result.chartData);
    } finally {
      setApplying(false);
    }
  }

  function openDataModal(modelId) {
    setActiveModelId(modelId);
    setActiveModal("data");
  }

  function openInfoModal(modelId) {
    setActiveModelId(modelId);
    setActiveModal("info");
  }

  function closeModal() {
    setActiveModal(null);
    setActiveModelId(null);
  }

  const visibleChartData = useMemo(() => {
    return chartData.map((trace) => {
      const id =
        trace.name === "Dados experimentais"
          ? "experimental"
          : adsorptionModels.find((m) => m.name === trace.name)?.id;
      return {
        ...trace,
        visible: id && chartVisibility[id] ? true : "legendonly",
      };
    });
  }, [chartData, chartVisibility]);

  const legendItems = [
    { id: "experimental", label: "Dados experimentais", color: "#21A4E8" },
    ...adsorptionModels.map((m) => ({ id: m.id, label: m.name, color: m.color })),
  ];

  const metricsEntries = metrics ? metrics : [];

  return (
    <PageContainer>
      <Sidebar />

      <div className="flex min-h-screen flex-col">
        <Header
          title="Modelos matemáticos"
          breadcrumbs={[
            { label: "LTRE", href: "/" },
            { label: "Modelos matemáticos", href: "/models" },
            { label: "Adsorção" },
          ]}
          actions={
            <>
              <Button variant="outline">Exportar</Button>
              <Button>Nova análise</Button>
            </>
          }
        />

        <main className="flex-1 space-y-6 p-6">
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-card-foreground">
                Modelos
              </h2>
              <p className="text-sm text-muted-foreground">
                Selecione o próximo modelo matemático a ser aplicado
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {adsorptionModels.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  selected={selectedModelIds.includes(model.id)}
                  onSelect={() => toggleModel(model.id)}
                  onEdit={() => openDataModal(model.id)}
                  onInfo={() => openInfoModal(model.id)}
                />
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={selectAll}>
                Selecionar todos
              </Button>
              <Button onClick={handleApply} disabled={applying}>
                {applying ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Aplicar"
                )}
              </Button>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">
                  Gráfico
                </h2>
                <p className="text-sm text-muted-foreground">
                  Acompanhar visualmente os modelos matemáticos
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm">
                    <Download className="h-4 w-4" />
                    Exportar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Exportar gráfico</DropdownMenuItem>
                  <DropdownMenuItem>Exportar resultados (CSV)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {legendItems.map((item) => {
                const active = chartVisibility[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleVisibility(item.id)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors",
                      active
                        ? "border-border bg-secondary text-secondary-foreground"
                        : "border-border bg-card text-muted-foreground"
                    )}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-6">
              <div className="flex-1 min-w-0">
                <ChartCard
                  data={visibleChartData}
                  layout={{
                    xaxis: { title: "Tempo (min)" },
                    yaxis: { title: "q (mg/g)" },
                  }}
                />
              </div>

              <div className="w-56 shrink-0 rounded-xl border border-border bg-card p-4 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold text-card-foreground">
                  Métricas do ajuste
                </h3>
                <div className="space-y-4">
                  {metricsEntries.map((entry) => (
                    <div key={entry.key}>
                      <span className="text-xs text-muted-foreground">
                        {entry.label}
                      </span>
                      <p className="text-base font-semibold text-card-foreground">
                        {entry.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {activeModel && activeModal === "data" && (
        <ModelDataModal
          model={activeModel}
          data={modelData[activeModel.id] ?? getDefaultExperimentalData()}
          onChange={(next) =>
            setModelData((prev) => ({ ...prev, [activeModel.id]: next }))
          }
          open
          onOpenChange={(open) => !open && closeModal()}
        />
      )}

      {activeModel && activeModal === "info" && (
        <ModelInfoModal
          model={activeModel}
          open
          onOpenChange={(open) => !open && closeModal()}
        />
      )}
    </PageContainer>
  );
}
