import { FunctionSquare, Info, Square, SquareCheckBig } from "lucide-react";
import { cn } from "cn";
import { Latex } from "@/components/ui/latex";

export function ModelCard({ model, selected = false, onSelect, onEdit, onInfo }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex h-[111px] w-[220px] flex-col gap-2 rounded-xl border p-4 text-left shadow-sm transition-all",
        selected
          ? "border-transparent bg-gradient-to-b from-[#21A4E8] to-[#0A4B8D] shadow-[0_2px_12px_rgba(33,164,232,0.5)]"
          : "border-border bg-card hover:bg-muted/50"
      )}
    >
      <div className="flex h-5 items-center justify-between">
        <div className="flex items-center">
          {selected ? (
            <SquareCheckBig className="h-5 w-5 text-white/80" />
          ) : (
            <Square className="h-5 w-5 text-[#0A4B8D]" />
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            className={cn(
              "rounded p-0.5 transition-colors",
              selected
                ? "text-white/70 hover:bg-white/20"
                : "text-[#0A4B8D] hover:bg-muted"
            )}
            aria-label="Editar dados do modelo"
          >
            <FunctionSquare className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInfo?.();
            }}
            className={cn(
              "rounded p-0.5 transition-colors",
              selected
                ? "text-white/70 hover:bg-white/20"
                : "text-[#0A4B8D] hover:bg-muted"
            )}
            aria-label="Informações do modelo"
          >
            <Info className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="min-w-0">
        <Latex
          className={cn(
            "text-sm font-semibold",
            selected ? "text-white" : "text-[#082E5A]"
          )}
        >
          {model.formulaLaTeX}
        </Latex>
      </div>

      <span
        className={cn(
          "text-xs",
          selected ? "text-[#E0F2FE]" : "text-muted-foreground"
        )}
      >
        {model.name}
      </span>
    </button>
  );
}
