# Página de Adsorção

> A ideia é criar a página de adsorção no React, importando o estilo do pen.dev.
>
> **Aviso geral:** os nomes que estão no pen.dev devem ser alterados quando virarem React — a maioria está bem feio.

---

## 1. Objetivo

Implementar a página de **Adsorção** (`/adsorption`) no frontend do LTRE, reproduzindo o estilo e a estrutura do pen.dev e permitindo selecionar modelos matemáticos, inserir dados experimentais, aplicar cálculos (mock) e visualizar gráficos e métricas de ajuste.

---

## 2. Rotas

Adicionar a rota `/adsorption` em `src/routes.jsx`, apontando para `src/pages/AdsorptionPage.jsx`.

---

## 3. Dependências

O `componente `Latex` (KaTeX)` não é compatível com o React 19 do projeto, então usamos o **KaTeX** diretamente via um componente helper (`src/components/ui/latex.jsx`):

```bash
npm install katex
```

Incluir o CSS do KaTeX no entry point da aplicação (`src/main.jsx`):

```jsx
import "katex/dist/katex.min.css";
```

---

## 4. Estrutura de pastas

```
src/
├── pages/
│   └── AdsorptionPage.jsx
├── components/
│   ├── ModelCard.jsx
│   └── modals/
│       ├── ModelDataModal.jsx
│       └── ModelInfoModal.jsx
├── data/
│   └── adsorption-models.js
├── lib/
│   └── adsorption-mock.js
└── api/
    └── index.js
```

### Convenções
- `ModelCard.jsx` é um componente genérico e reutilizável para qualquer página de modelos.
- Os modais ficam em `src/components/modals/`.
- A camada de API fica centralizada em `src/api/index.js`.
- O mock fica em `src/lib/adsorption-mock.js` e retorna dados reais, simulando uma resposta de backend.

---

## 5. Dados dos modelos

Criar `src/data/adsorption-models.js` com um array de objetos hardcoded. A lista de equações deve ser um conjunto de dicionários com campos como `formula`, `descricao`, `nome`, `quandoUsar`, `categorias` e `parametros`, para conseguir ser mostrada nos modelos e no modal.

```js
{
  id: "pseudo-first-order",
  name: "Pseudo-primeira ordem",
  formulaLaTeX: "q_t = q_e(1 - e^{-k_1 t})",
  description: "O modelo de pseudo-primeira ordem de Lagergren descreve a cinética de adsorção assumindo que a taxa de ocupação dos sítios adsorventes é proporcional ao número de sítios desocupados.",
  whenToUse: "Indicado para cinéticas em que o equilíbrio é alcançado de forma relativamente rápida e os dados apresentam ajuste linear satisfatório em ln(q_e - q_t) vs t.",
  categories: ["Cinética"],
  color: "#21A4E8",
  parameters: [
    { symbol: "q_t", meaning: "Quantidade adsorvida no tempo t", unit: "mg/g" },
    { symbol: "q_e", meaning: "Quantidade adsorvida no equilíbrio", unit: "mg/g" },
    { symbol: "t", meaning: "Tempo de contato", unit: "min" },
    { symbol: "k_1", meaning: "Constante de adsorção", unit: "1/min" },
  ],
}
```

Modelos iniciais:
- Pseudo-primeira ordem
- Pseudo-segunda ordem
- Elovich

---

## 6. Componente `ModelCard`

Local: `src/components/ModelCard.jsx`

O modal simples e o modal colorido (selecionado) devem ser um único componente reutilizável. Ele deve alternar entre a versão branca e a versão colorida conforme o estado de seleção.

### Props
```ts
{
  model: object;           // item do array de adsorption-models
  selected?: boolean;      // default false
  onSelect?: () => void;   // clique no card ou no ícone de seleção
  onEdit?: () => void;     // abre ModelDataModal
  onInfo?: () => void;     // abre ModelInfoModal
}
```

### Comportamento
- Se `selected === false`: fundo branco, borda neutra, ícone `square`.
- Se `selected === true`: fundo gradiente azul LTRE, ícone `square-check-big`, texto branco.
- O botão de lápis que está no pen.dev deve ser trocado por um ícone do lucide-react que faça referência a funções (`function-square`), e esse botão deve abrir o `ModelDataModal`.
- O botão de info (`info` do lucide-react) abre o `ModelInfoModal`.
- A fórmula chamada dentro do card deve ser formatada usando `componente `Latex` (KaTeX)`.

---

## 7. Modais

### 7.1 `ModelDataModal`
Local: `src/components/modals/ModelDataModal.jsx`

Esse modal deve ser um componente reutilizável guardado em `components/modals/`. Ele será usado em muitas páginas diferentes; a única coisa que muda são os campos que ele recebe nas tabelas e insere nos cálculos, então esses campos devem ser passados por prop.

A instância da página de adsorção será compartilhada entre todos os modelos — eles usam os mesmos dados.

#### Props
```ts
{
  model: object;
  data: Array<{ t: number, q: number }>;
  onChange: (data: Array<{ t: number, q: number }>) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
```

#### Funcionalidades
- Tabela com colunas `t (tempo)` e `q (quantidade adsorvida)`.
- Inputs editáveis em cada célula.
- Botão “Adicionar linha”.
- Ícone de lixeira para remover linha.
- Botão “Importar dados” com dropdown contendo:
  - Importar do computador (input file)
  - Importar do drive (integração futura)
- O modal usa o componente `Dialog` do shadcn/ui.

### 7.2 `ModelInfoModal`
Local: `src/components/modals/ModelInfoModal.jsx`

Também deve ser um componente reutilizável guardado em `components/modals/`. Os campos devem ser recebidos por prop e mostrados.

#### Props
```ts
{
  model: object;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
```

#### Conteúdo
- Título do modelo e botão de fechar.
- Card com a fórmula renderizada em `componente `Latex` (KaTeX)`.
- Seção “Parâmetros” com tabela: Parâmetro, Significado, Unidade.
- Seção “Sobre o modelo”.
- Seção “Quando usar”.
- Seção “Categoria” com badges.

---

## 8. Página `AdsorptionPage`

Local: `src/pages/AdsorptionPage.jsx`

### Layout
- **Sidebar** existente (`src/components/layout/Sidebar`).
- **Header** existente (`src/components/layout/Header`) com breadcrumb “LTRE › Modelos matemáticos › Adsorção”.
- **Seção “Modelos”**: card branco com título, descrição e lista horizontal de `ModelCard`s.
  - Botão “Selecionar todos”.
  - Botão “Aplicar”.
- **Seção “Gráfico”**: card branco com:
  - Título e descrição.
  - Dropdown “Exportar” com opções:
    - Exportar gráfico
    - Exportar resultados (CSV)
  - Chips de legendas toggláveis (Dados experimentais, Pseudo-primeira ordem, Pseudo-segunda ordem, Elovich).
  - Gráfico Plotly via `ChartCard` existente (`src/components/ltre/ChartCard.jsx`).
  - Card lateral “Métricas do ajuste” com:
    - R²
    - qₑ calculado
    - k₁
    - RMSE

### Estados
```ts
{
  selectedModelIds: string[];
  modelData: Record<string, Array<{ t: number, q: number }>>;
  chartVisibility: Record<string, boolean>;
  metrics: object | null;
  chartData: object[];
  activeModal: "data" | "info" | null;
  activeModelId: string | null;
}
```

### Ações
- **Selecionar modelo**: adiciona/remove o `id` do modelo de `selectedModelIds`.
- **Selecionar todos**: seleciona/deseleciona todos os modelos.
- **Abrir modal de dados**: define `activeModal = "data"` e `activeModelId`.
- **Abrir modal de info**: define `activeModal = "info"` e `activeModelId`.
- **Aplicar**: chama `Api.calculations.adsorption(selectedModelIds, modelData)` e atualiza `metrics` e `chartData`.

---

## 9. Gráfico e cálculo

Os gráficos e cálculos devem estar com lógica de legenda: o botão “Aplicar” aplica os cálculos, mas tudo deve ser mock — não deve haver cálculos reais por enquanto.

A legenda é responsável por mostrar ou não os pontos e linhas dos gráficos. Essa lógica já deve ser aplicada desde já, controlando a visibilidade dos traces no Plotly.

O botão “Aplicar” é o responsável por conectar com a API para calcular tudo (via `Api.calculations.adsorption`).

---

## 10. Mock de cálculos

Local: `src/lib/adsorption-mock.js`

O mock deve retornar um objeto real, simulando uma resposta de API:

```js
export function calculateAdsorption(modelIds, experimentalData) {
  return {
    bestModelId: "pseudo-first-order",
    metrics: {
      r2: 0.9876,
      qe: { value: 45.23, unit: "mg/g" },
      k1: { value: 0.052, unit: "min⁻¹" },
      rmse: { value: 1.84, unit: "" },
    },
    chartData: [
      {
        x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        y: [0, 12.4, 22.1, 30.5, 37.2, 42.8, 46.5, 48.9, 50.1, 50.8, 51.2],
        name: "Dados experimentais",
        mode: "markers",
        marker: { color: "#21A4E8" },
        visible: true,
      },
      // ... traces dos modelos
    ],
  };
}
```

---

## 11. API central

Local: `src/api/index.js`

Centraliza todas as chamadas do frontend no formato de um objeto:

```js
import { calculateAdsorption } from "@/lib/adsorption-mock";

export const Api = {
  auth: {
    login: (credentials) => { /* TODO: POST /auth/login */ },
    register: (data) => { /* TODO: POST /auth/register */ },
  },
  drive: {
    list: (path) => { /* TODO: GET /drive/list */ },
    upload: (file) => { /* TODO: POST /drive/upload */ },
  },
  calculations: {
    adsorption: async (modelIds, data) => {
      // Simula delay de rede
      await new Promise((resolve) => setTimeout(resolve, 600));
      return calculateAdsorption(modelIds, data);
    },
  },
};
```

Exemplo de uso:

```js
Api.auth.login({ email: "email@email.com", senha: "1234" });
Api.calculations.adsorption(selectedModelIds, modelData);
```

---

## 12. Observações

- Todos os cálculos são mockados nesta versão.
- A fórmula exibida nos cards e no modal de info usa `componente `Latex` (KaTeX)`.
- As legendas controlam a visibilidade dos traces no gráfico Plotly.
- O design segue os tokens e componentes já existentes do projeto (shadcn/ui, Tailwind, cores LTRE).
- O nome do arquivo continua `docs/adsortion-page.md` por compatibilidade, mas a rota e todos os identificadores internos devem usar `adsorption`.
