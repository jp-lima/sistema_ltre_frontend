import { FileBrowser, FileBrowserProvider } from "@harryy/react-file-browser";
import { InMemoryFileBrowserAdapter } from "@harryy/react-file-browser/adapters/in-memory";
import { cn } from "cn";

const adapter = new InMemoryFileBrowserAdapter();

export function FileBrowserCard({ title, description, className }) {
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
      <div className="min-h-[320px] overflow-hidden rounded-lg border border-border">
        <FileBrowserProvider>
          <FileBrowser adapter={adapter} rootLabel="Arquivos LTRE" />
        </FileBrowserProvider>
      </div>
    </div>
  );
}
