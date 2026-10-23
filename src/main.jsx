import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import 'katex/dist/katex.min.css'
import { router } from './routes'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AnimatedToastProvider } from '@/components/ui/animated-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider delayDuration={100}>
        <AnimatedToastProvider position="top-right" maxToasts={5}>
          <RouterProvider router={router} />
        </AnimatedToastProvider>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)