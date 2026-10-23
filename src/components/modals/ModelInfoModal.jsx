
import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Latex } from "@/components/ui/latex";

export function ModelInfoModal({ model, open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex-row items-center justify-between gap-4">
          <DialogTitle>{model.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center rounded-xl bg-secondary p-4">
          <Latex className="text-xl font-semibold text-[#082E5A]">
            {model.formulaLaTeX}
          </Latex>
        </div>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Parâmetros</h3>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary border-b border-border">
                  <th className="h-9 px-3 text-left text-xs font-semibold text-[#0A4B8D]">
                    Parâmetro
                  </th>
                  <th className="h-9 px-3 text-left text-xs font-semibold text-[#0A4B8D]">
                    Significado
                  </th>
                  <th className="h-9 px-3 text-left text-xs font-semibold text-[#0A4B8D]">
                    Unidade
                  </th>
                </tr>
              </thead>
              <tbody>
                {model.parameters.map((param, index) => (
                  <tr
                    key={index}
                    className={cn(
                      "border-b border-border last:border-b-0",
                      index % 2 === 1 ? "bg-muted/30" : "bg-card"
                    )}
                  >
                    <td className="px-3 py-2">
                      <Latex className="font-semibold text-[#082E5A]">
                        {param.symbol}
                      </Latex>
                    </td>
                    <td className="px-3 py-2 text-foreground">{param.meaning}</td>
                    <td className="px-3 py-2 text-foreground">{param.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Sobre o modelo</h3>
          <p className="text-sm text-muted-foreground">{model.description}</p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Quando usar</h3>
          <p className="text-sm text-muted-foreground">{model.whenToUse}</p>
        </section>

        <section className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-foreground">Categoria:</span>
          {model.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </section>
      </DialogContent>
    </Dialog>
  );
}
