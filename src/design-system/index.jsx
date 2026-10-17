import { useState } from "react";
import { Download, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAnimatedToast, usePromiseToast, UndoToast } from "@/components/ui/animated-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionCard } from "@/components/layout/SectionCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { MetricCard } from "@/components/ltre/MetricCard";
import { ChartCard } from "@/components/ltre/ChartCard";
import { FileBrowserCard } from "@/components/ltre/FileBrowserCard";

const sampleTableData = [
  { id: 1, name: "Modelo Freundlich - Adsorção", type: "Isoterma", status: "Concluído", date: "2024-03-15" },
  { id: 2, name: "Cinética de Pseudo-primeira ordem", type: "Cinética", status: "Em análise", date: "2024-03-18" },
  { id: 3, name: "Dose ótima de coagulante", type: "Otimização", status: "Concluído", date: "2024-03-20" },
  { id: 4, name: "Equilíbrio termodinâmico", type: "Termodinâmica", status: "Pendente", date: "2024-03-22" },
];

const sampleChartData = [
  {
    x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    y: [0, 12, 28, 42, 55, 63, 69, 74, 78, 81, 83],
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "#21A4E8" },
    line: { color: "#21A4E8", width: 3 },
    name: "Adsorção (%)",
  },
  {
    x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    y: [0, 8, 18, 30, 40, 48, 55, 60, 64, 67, 69],
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "#0A4B8D" },
    line: { color: "#0A4B8D", width: 3, dash: "dash" },
    name: "Remoção (%)",
  },
];

export default function DesignSystemPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <PageContainer>
        <Header
          title="Design System LTRE"
          breadcrumbs={[{ label: "LTRE", href: "/" }, { label: "Design System" }]}
          actions={
            <>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Button size="sm" className="bg-ltre-light-blue hover:bg-ltre-dark-blue">
                <Plus className="mr-2 h-4 w-4" />
                Nova análise
              </Button>
            </>
          }
        />

        <main className="space-y-6 p-6">
          {/* Métricas */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Modelos ativos" value="12" trend="+3" trendUp description="vs. mês anterior" />
            <MetricCard title="Análises este mês" value="48" trend="+12%" trendUp description="vs. mês anterior" />
            <MetricCard title="Arquivos no drive" value="156" trend="+8" trendUp description="vs. mês anterior" />
            <MetricCard title="Pendentes de revisão" value="5" trend="-2" trendUp={false} description="vs. mês anterior" />
          </section>

          {/* Cores e Tipografia */}
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard title="Cores do LTRE" description="Paleta principal do laboratório.">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <ColorSwatch name="Azul claro" color="bg-ltre-light-blue" text="text-white" />
                <ColorSwatch name="Azul escuro" color="bg-ltre-dark-blue" text="text-white" />
                <ColorSwatch name="Navy" color="bg-ltre-navy" text="text-white" />
                <ColorSwatch name="Background" color="bg-background" text="text-foreground" border />
                <ColorSwatch name="Card" color="bg-card" text="text-card-foreground" border />
                <ColorSwatch name="Muted" color="bg-muted" text="text-muted-foreground" border />
              </div>
            </SectionCard>

            <SectionCard title="Tipografia" description="Hierarquia de textos.">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-card-foreground">Título H1</h1>
                <h2 className="text-2xl font-semibold text-card-foreground">Título H2</h2>
                <h3 className="text-xl font-semibold text-card-foreground">Título H3</h3>
                <p className="text-base text-card-foreground">Texto base do LTRE.</p>
                <p className="text-sm text-muted-foreground">Texto secundário / muted.</p>
              </div>
            </SectionCard>
          </div>

          {/* Botões e Badges */}
          <SectionCard title="Botões e Badges" description="Estados e variações.">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </SectionCard>

          {/* Formulários */}
          <SectionCard title="Formulários" description="Campos de entrada padrão.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da análise</Label>
                <Input id="name" placeholder="Ex: Isoterma de Langmuir" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Responsável</Label>
                <Input id="email" placeholder="nome@ltre.br" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" placeholder="Descreva o experimento..." rows={4} />
              </div>
            </div>
          </SectionCard>

          {/* Toasts */}
          <SectionCard title="Toasts animados" description="Alertas e feedbacks do 21st.dev.">
            <ToastDemo />
          </SectionCard>

          {/* Tabela */}
          <SectionCard title="Tabela de modelos" description="Estilo denso inspirado no Benchling.">
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar modelos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleTableData
                    .filter((row) => row.name.toLowerCase().includes(search.toLowerCase()))
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>
                          <StatusBadge status={row.status} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">{row.date}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </SectionCard>

          {/* Accordion */}
          <SectionCard title="Accordion" description="Seções colapsáveis para conteúdo estruturado.">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Parte 1: Fundamentação teórica</AccordionTrigger>
                <AccordionContent>
                  Conteúdo da fundamentação teórica do experimento. Pode incluir equações,
                  referências e hipóteses.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Parte 2: Metodologia</AccordionTrigger>
                <AccordionContent>
                  Descrição dos materiais, reagentes e procedimentos experimentais utilizados.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Parte 3: Resultados</AccordionTrigger>
                <AccordionContent>
                  Tabelas, gráficos e análises dos dados obtidos durante o experimento.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SectionCard>

          {/* Gráfico e File Browser */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ChartCard
              title="Desempenho do tratamento"
              description="Comparativo de adsorção e remoção."
              data={sampleChartData}
              layout={{ yaxis: { title: "Eficiência (%)" }, xaxis: { title: "Tempo (min)" } }}
            />
            <FileBrowserCard
              title="Drive LTRE"
              description="Navegador de arquivos do laboratório."
            />
          </div>

          {/* Layout exemplo */}
          <SectionCard title="Layout de exemplo" description="Sidebar + Header + Cards.">
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <div className="flex gap-4">
                <div className="h-48 w-12 rounded-lg bg-ltre-dark-blue" />
                <div className="flex-1 space-y-4">
                  <div className="h-12 rounded-lg bg-card shadow-sm" />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="h-24 rounded-lg bg-card shadow-sm" />
                    <div className="h-24 rounded-lg bg-card shadow-sm" />
                    <div className="h-24 rounded-lg bg-card shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </main>
      </PageContainer>
    </div>
  );
}

function ToastDemo() {
  const { addToast } = useAnimatedToast();
  const promiseToast = usePromiseToast();
  const [undoOpen, setUndoOpen] = useState(false);

  const handlePromise = () => {
    promiseToast({
      promise: new Promise((resolve) => setTimeout(() => resolve("OK"), 2000)),
      loading: "Salvando análise...",
      success: "Análise salva com sucesso!",
      error: "Erro ao salvar análise.",
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          addToast({
            type: "success",
            title: "Sucesso",
            message: "Modelo matemático salvo com sucesso.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          addToast({
            type: "error",
            title: "Erro",
            message: "Falha ao processar os dados do experimento.",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          addToast({
            type: "warning",
            title: "Atenção",
            message: "Alguns parâmetros estão fora do intervalo esperado.",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          addToast({
            type: "info",
            title: "Info",
            message: "Nova amostra foi adicionada à fila de análise.",
          })
        }
      >
        Info
      </Button>
      <Button variant="outline" size="sm" onClick={handlePromise}>
        Promise
      </Button>
      <Button variant="outline" size="sm" onClick={() => setUndoOpen(true)}>
        Undo
      </Button>
      <UndoToast
        open={undoOpen}
        onClose={() => setUndoOpen(false)}
        onUndo={() =>
          addToast({
            type: "success",
            title: "Desfeito",
            message: "Ação desfeita com sucesso.",
          })
        }
        message="Arquivo excluído."
      />
    </div>
  );
}

function ColorSwatch({ name, color, text, border }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-10 w-10 rounded-lg shadow-sm ${color} ${text} ${border ? "border border-border" : ""}`}
      />
      <span className="text-sm font-medium text-card-foreground">{name}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const variants = {
    Concluído: "default",
    "Em análise": "secondary",
    Pendente: "outline",
  };
  return <Badge variant={variants[status] || "default"}>{status}</Badge>;
}
