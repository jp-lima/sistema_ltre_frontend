import { lazy, Suspense } from "react";
import { cn } from "cn";
import { Skeleton } from "@/components/ui/skeleton";

const Plot = lazy(() => import("react-plotly.js"));

export function ChartCard({ title, description, data, layout, config, className }) {
  const defaultLayout = {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: { family: "'Geist Variable', sans-serif" },
    margin: { t: 24, r: 24, b: 40, l: 48 },
    ...layout,
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <Plot
          data={data}
          layout={defaultLayout}
          config={{ responsive: true, displayModeBar: false, ...config }}
          style={{ width: "100%", height: "300px" }}
          className="w-full"
        />
      </Suspense>
    </div>
  );
}
