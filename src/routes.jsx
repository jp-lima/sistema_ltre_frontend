import { createBrowserRouter, Outlet } from 'react-router'
import App from './App'
import AuthPage from './pages/AuthPage'
import DesignSystemPage from './design-system'
import AdsorptionPage from './pages/AdsorptionPage'
import ExperimentsPage from './pages/ExperimentsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <AuthPage mode="login" />,
  },
  {
    path: '/cadastro',
    element: <AuthPage mode="register" />,
  },
  {
    path: '/models',
    element: <ExperimentsPage/>,
  },
  {
    path:"/experimentos",
    element:<Outlet/>,
    children:[
      { path: 'adsorcao', element: <AdsorptionPage />, },
    ]
  },
  {
    path: '/design-system',
    element: <DesignSystemPage />,
  },
])
