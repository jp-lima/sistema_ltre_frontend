import { FileText, FlaskConical, FolderOpen, Home, LineChart, Settings } from "lucide-react";
import { cn } from "cn";
import { GotaLogo } from "@/components/icons/GotaLogo";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: LineChart, label: "Modelos", href: "/models" },
  { icon: FlaskConical, label: "Análises", href: "/analysis" },
  { icon: FolderOpen, label: "Arquivos", href: "/files" },
  { icon: FileText, label: "Relatórios", href: "/reports" },
  { icon: Settings, label: "Configurações", href: "/settings" },
];

export function Sidebar({ className }) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center gap-2 bg-sidebar py-4 text-sidebar-foreground",
        className
      )}
    >
      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <GotaLogo className="h-6 w-6 text-white" />
      </div>

      <nav className="flex flex-1 flex-col items-center gap-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <item.icon className="h-5 w-5" />
            <span className="absolute left-14 hidden rounded-md bg-sidebar px-2 py-1 text-xs font-medium text-sidebar-foreground group-hover:block">
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
