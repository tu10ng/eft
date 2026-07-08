// ============================================
// React entry point — mounts into #root
// ============================================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { App } from './App'
import '@xyflow/react/dist/style.css'
import './assets/quest-card.css'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('#root element not found in index.html')

createRoot(rootEl).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
