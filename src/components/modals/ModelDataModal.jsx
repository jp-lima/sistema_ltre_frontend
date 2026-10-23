import { Download, Plus, Trash2 } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Latex } from "@/components/ui/latex";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModelDataModal({ model, data, onChange, open, onOpenChange }) {
  const columns = [
    { key: "t", label: "t (tempo)" },
    { key: "q", label: "q (quantidade adsorvida)" },
  ];

  function updateRow(index, key, value) {
    const next = [...data];
    next[index] = { ...next[index], [key]: value === "" ? "" : Number(value) };
    onChange(next);
  }

  function addRow() {
    onChange([...data, { t: "", q: "" }]);
  }

  function removeRow(index) {
    const next = data.filter((_, i) => i !== index);
    onChange(next.length ? next : [{ t: "", q: "" }]);
  }

  function handleFileImport(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result ?? "";
      const rows = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [t, q] = line.split(/[,;\t]/).map((v) => Number(v.trim()));
          return { t: Number.isFinite(t) ? t : 0, q: Number.isFinite(q) ? q : 0 };
        });
      onChange(rows.length ? rows : [{ t: "", q: "" }]);
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{model.name}</DialogTitle>
          <div className="text-sm text-muted-foreground">
            <Latex>{model.formulaLaTeX}</Latex>
          </div>
        </DialogHeader>

        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary border-b border-border">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="h-10 px-4 text-left text-xs font-semibold text-[#0A4B8D]"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="w-12" />
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={cn(
                    "border-b border-border last:border-b-0",
                    index % 2 === 1 ? "bg-muted/30" : "bg-card"
                  )}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2">
                      <Input
                        type="number"
                        step="any"
                        value={row[col.key]}
                        onChange={(e) => updateRow(index, col.key, e.target.value)}
                        placeholder="0.0"
                        className="h-8"
                      />
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                      aria-label="Remover linha"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="secondary" size="sm" onClick={addRow}>
            <Plus className="h-4 w-4" />
            Adicionar linha
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <Download className="h-4 w-4" />
                Importar dados
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".csv,.txt"
                    className="sr-only"
                    onChange={handleFileImport}
                  />
                  Importar do computador
                </label>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>Importar do drive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </DialogContent>
    </Dialog>
  );
}
