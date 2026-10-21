import { createBrowserRouter } from 'react-router'
import App from './App'
import AuthPage from './pages/AuthPage'
import DesignSystemPage from './design-system'
import ModelsPage from './pages/ModelsPage'

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
    element: <ModelsPage />,
  },
  {
    path: '/design-system',
    element: <DesignSystemPage />,
  },
])
