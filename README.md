# ArquiteturaFrontEnd

Application front-end built with **React 19 + Vite 8 + Tailwind CSS 4**, with routing handled by **React Router 8**.

## Technologies

| Technology | Purpose |
| --- | --- |
| [React](https://react.dev) | UI library |
| [Vite](https://vite.dev) | Bundler and development server (HMR) |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling with utility classes (`@tailwindcss/vite` plugin) |
| [React Router](https://reactrouter.com) | Routing / navigation (`createBrowserRouter` mode) |
| [lucide-react](https://lucide.dev) | Icons |
| ESLint | Code standardization and linting |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 20.19+ (the latest LTS version is recommended)
- npm (bundled with Node)

### Step by step

```bash
# 1. Clone the repository and enter the folder
cd ArquiteturaFrontEnd

# 2. Install the dependencies
npm install

# 3. Start the development server
npm run dev
```

Vite prints the address in the terminal (usually `http://localhost:5173`).

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Builds the production version into `dist/` |
| `npm run preview` | Serves the production build locally for testing |
| `npm run lint` | Runs ESLint across the whole project |

## Folder structure

```
ArquiteturaFrontEnd/
├── public/                 # Static files served as-is (favicon, SVG icons)
├── src/
│   ├── assets/             # Images, fonts and other files imported by the code
│   ├── components/
│   │   ├── layout/         # Structural components (Header, Footer, Sidebar...)
│   │   └── ui/             # Reusable presentational components (Button, Card, Input...)
│   ├── pages/              # One page per route (Home, ControleTelao...)
│   ├── service/            # Communication with APIs / backend (HTTP calls)
│   ├── App.jsx             # Root layout: background, decorations and <Header /> + <Outlet />
│   ├── routes.jsx          # Application route definitions
│   ├── main.jsx            # Entry point: mounts React and the RouterProvider
│   └── index.css           # Tailwind + theme (color palette)
├── index.html              # Base HTML loaded by Vite
├── vite.config.js          # Vite configuration (React and Tailwind plugins)
├── eslint.config.js        # ESLint rules
└── package.json            # Dependencies and scripts
```

### Responsibility of each folder

- **`public/`** – Files accessed directly by URL (e.g. `/favicon.svg`). They do not go through the bundler.
- **`src/assets/`** – Resources imported in components (`import logo from '../assets/logo.png'`). Vite optimizes and versions these files.
- **`src/components/layout/`** – Pieces that define the application "frame" and repeat across pages, such as the `Header` used in `App.jsx`.
- **`src/components/ui/`** – Small, reusable blocks with no business logic: they receive data through `props` and only render it.
- **`src/pages/`** – Each file is a screen tied to a route in `routes.jsx`. It builds the screen by composing components and calling `service`.
- **`src/service/`** – All external communication (fetch/axios, WebSocket, etc.) lives here, isolated from components. Swapping the API doesn't require touching the screens.

## How the architecture works

1. **`index.html`** loads `src/main.jsx` as a module.
2. **`main.jsx`** creates the React root and renders `<RouterProvider router={router} />`, also importing `index.css`.
3. **`routes.jsx`** creates the `router` with `createBrowserRouter`. A parent route `/` renders `App`, and child routes render inside it:

   | Route | Page |
   | --- | --- |
   | `/` | `pages/Home` |
   | `/controle-telao` | `pages/ControleTelao` |

4. **`App.jsx`** is the *root layout*: it draws the gradient background, the decorative SVG lines and the `<Header />`. The `<Outlet />` is where the current route's page appears, so everything in `App` is shared by all pages.
5. **Styling**: Tailwind 4 is configured directly in CSS. `src/index.css` defines the theme with `@theme`, generating classes such as `bg-primary-dark`, `text-secondary` and `text-accent`.

### Screen rendering flow

```
URL  →  routes.jsx  →  App (layout + Header)  →  <Outlet />  →  pages/X  →  components/ + service/
```

## How to add a new page

1. Create the component in `src/pages/MyPage.jsx`.
2. Register the route in `src/routes.jsx`, inside `children`:

   ```jsx
   import MyPage from './pages/MyPage'

   { path: 'my-page', element: <MyPage /> },
   ```

3. (Optional) Add a link to it in the `Header` using `<Link to="/my-page">`.

## Current project status

- `routes.jsx` and `App.jsx` already import `pages/Home`, `pages/ControleTelao` and `components/layout/Header`, but **those files haven't been created yet** (the folders exist but are empty). Until they exist, `npm run dev` will fail with an import error.
- `index.html` also loads Tailwind via CDN (`@tailwindcss/browser`), which is redundant with the `@tailwindcss/vite` plugin already configured. It can be removed.
- The `<title>` and `lang` in `index.html` are still the template defaults (`robotechfrontend` / `en`).
