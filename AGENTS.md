# AGENTS.md — LTRE Frontend

> Contexto para agentes de código trabalhando no frontend do Laboratório de Tratamento de Resíduos e Efluentes (LTRE).

---

## 1. Visão geral

Este é o frontend do **LTRE** (Laboratório de Tratamento de Resíduos e Efluentes), focado em:

- Análise de modelos matemáticos aplicados a tratamento de resíduos e efluentes.
- Gerenciamento de arquivos em um "drive" interno do laboratório.

A interface segue uma estética inspirada no **Benchling**, com ênfase em:
- Sidebar azul escura com ícones.
- Cards brancos com sombra leve.
- Tabelas densas.
- Layout limpo e focado em produtividade científica.

---

## 2. Stack tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Bundler | Vite 8 |
| Framework | React 19 |
| Roteamento | React Router 8 |
| Estilos | Tailwind CSS v4 |
| UI base | shadcn/ui (estilo `base-nova`) |
| Ícones | lucide-react |
| Animações | motion (Framer Motion) |
| Gráficos | plotly.js + react-plotly.js |
| File browser | @harryy/react-file-browser |
| Fonte | Geist Variable (@fontsource-variable/geist) |

---

## 3. Estrutura de pastas

```
/home/jota/frontend_projeto_ltre
├── public/
│   └── gota.svg              # Logo do LTRE (gota)
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   └── GotaLogo.jsx       # Logo em SVG branco usado na sidebar
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx        # Sidebar azul escura com ícones
│   │   │   ├── Header.jsx         # Header com título, breadcrumb e ações
│   │   │   ├── PageContainer.jsx  # Container com offset da sidebar
│   │   │   └── SectionCard.jsx    # Card branco padrão de seção
│   │   ├── ltre/
│   │   │   ├── MetricCard.jsx     # Card de métrica/KPI
│   │   │   ├── ChartCard.jsx      # Card com gráfico Plotly
│   │   │   └── FileBrowserCard.jsx # Card com navegador de arquivos
│   │   ├── theme-provider.jsx     # Provider de dark/light mode
│   │   └── theme-toggle.jsx       # Botão de alternância de tema
│   │
│   ├── components/ui/            # Componentes shadcn/ui
│   │   ├── accordion.jsx
│   │   ├── badge.jsx
│   │   ├── breadcrumb.jsx
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── dialog.jsx
│   │   ├── dropdown-menu.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   ├── separator.jsx
│   │   ├── sheet.jsx
│   │   ├── skeleton.jsx
│   │   ├── table.jsx
│   │   ├── textarea.jsx
│   │   ├── tooltip.jsx
│   │   └── animated-toast.jsx    # Toasts animados do 21st.dev
│   │
│   ├── design-system/
│   │   └── index.jsx             # Página vitrine do design system
│   │
│   ├── lib/
│   │   └── utils.js              # Re-exporta `cn` do pacote `cn`
│   │
│   ├── App.jsx
│   ├── index.css                 # Tokens de cor, tema e Tailwind
│   ├── main.jsx                  # Entry point com providers
│   └── routes.jsx                # Rotas da aplicação
│
├── components.json               # Configuração do shadcn/ui
├── jsconfig.json                 # Alias `@/`
├── vite.config.js                # Configuração do Vite com alias `@/`
└── package.json
```

---

## 4. Design system

### 4.1 Cores principais

| Token | Light mode | Dark mode | Uso |
|-------|-----------|-----------|-----|
| `--primary` | `#21A4E8` | `#21A4E8` | Ações principais, botões primary |
| `--secondary` | `#E0F2FE` | `#1E3A8A` | Botões secondary, badges |
| `--sidebar` | `#0A4B8D` | `#082E5A` | Fundo da sidebar |
| `--background` | `#F8FAFC` | `#0F172A` | Fundo das páginas |
| `--card` | `#FFFFFF` | `#1E293B` | Fundo dos cards |
| `--foreground` | `#0F172A` | `#F8FAFC` | Texto principal |
| `--muted-foreground` | `#64748B` | `#94A3B8` | Texto secundário |
| `--border` | `#E2E8F0` | `#334155` | Bordas |

Cores adicionais do LTRE definidas no `@theme`:
- `--color-ltre-light-blue`: `#21A4E8`
- `--color-ltre-dark-blue`: `#0A4B8D`
- `--color-ltre-navy`: `#082E5A`

### 4.2 Tipografia

- Fonte principal: **Geist Variable**, fallback `sans-serif`.
- Tamanhos padrão do Tailwind (`text-sm`, `text-base`, `text-lg`, `text-xl`, etc.).

### 4.3 Tema claro/escuro

- O tema é controlado por `ThemeProvider` em `src/components/theme-provider.jsx`.
- A classe `light` ou `dark` é aplicada no `<html>`.
- Alternância via `ThemeToggle`.
- Os tokens CSS em `:root` e `.dark` definem as cores de cada modo.

---

## 5. Componentes customizados do LTRE

### 5.1 Layout

- `Sidebar` — sidebar fixa à esquerda, azul escura, ícones brancos, logo da gota no topo.
- `Header` — header com breadcrumb, título e ações.
- `PageContainer` — envolve o conteúdo com offset da sidebar.
- `SectionCard` — card branco com título e descrição opcionais.

### 5.2 LTRE específicos

- `MetricCard` — cards de KPI com valor, descrição e tendência.
- `ChartCard` — card com gráfico Plotly (lazy loaded).
- `FileBrowserCard` — card com navegador de arquivos `@harryy/react-file-browser`.

### 5.3 Logo

- `GotaLogo` — SVG da gota do LTRE em branco, usado no topo da sidebar.

---

## 6. Página `/design-system`

A página em `src/design-system/index.jsx` serve como vitrine de todos os componentes e padrões do projeto.

Seções atuais:
- Métricas
- Cores e tipografia
- Botões e badges
- Formulários
- Tabela de modelos
- Accordion
- Toasts animados
- Gráfico Plotly
- File browser
- Layout de exemplo

**Sempre consulte essa página antes de criar novos padrões visuais.**

---

## 7. Como programar no projeto

> **Sempre verifique primeiro se já existe um componente que atende à demanda antes de criar um do zero.**
>
> - Para elementos pequenos (botões, inputs, badges, cards, tabelas, etc.), use os componentes shadcn/ui em `src/components/ui/`.
> - Para componentes de layout ou específicos do LTRE (Sidebar, Header, MetricCard, ChartCard, FileBrowserCard, etc.), use os componentes em `src/components/layout/` e `src/components/ltre/`.
> - Para padrões de página completa, consulte a página `/design-system` antes de reimplementar.
> - Se nenhum componente existente atender, crie um componente **específico** para resolver aquele problema. Torne-o reutilizável **somente quando solicitado**.

---

## 8. Alias e imports

O alias `@/` aponta para `./src`.

```jsx
// Exemplos
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/Sidebar";
import { useTheme } from "@/components/theme-provider";
```

Configuração:
- `vite.config.js`: `resolve.alias['@']`
- `jsconfig.json`: `compilerOptions.paths['@/*']`

---

## 9. Dependências extras importantes

| Pacote | Uso |
|--------|-----|
| `plotly.js` + `react-plotly.js` | Gráficos interativos |
| `@harryy/react-file-browser` | Navegador de arquivos do drive LTRE |
| `motion` | Animações dos toasts |
| `lucide-react` | Ícones |
| `tw-animate-css` | Animações do Tailwind/shadcn |

---

## 10. Comandos úteis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Gera build de produção
npm run lint     # Roda ESLint
npm run preview  # Preview do build
```

---

## 11. Observações

- O projeto usa **Tailwind CSS v4** com a sintaxe `@theme` e `@import "tailwindcss"`.
- O `@harryy/react-file-browser` precisa ter seu source incluído no Tailwind via `@source "../../node_modules/@harryy/react-file-browser";` em `src/index.css`.
- O Plotly gera um chunk grande no build (~4.6 MB). Isso é esperado. Se precisar otimizar no futuro, considere uma build minimalista do Plotly.
- `TooltipProvider` e `AnimatedToastProvider` envolvem a aplicação em `src/main.jsx`.
