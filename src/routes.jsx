import { createBrowserRouter } from 'react-router'
import App from './App'
import DesignSystemPage from './design-system'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/design-system',
    element: <DesignSystemPage />,
  },
])
