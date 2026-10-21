import { createBrowserRouter } from 'react-router'
import App from './App'
import AuthPage from './pages/AuthPage'
import DesignSystemPage from './design-system'

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
    path: '/design-system',
    element: <DesignSystemPage />,
  },
])
