// ============================================
// React entry point
// ============================================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { App } from './App'

// Mount React into the existing sync panel container area.
// We create a dedicated mount point inside the sync panel.
// Since the original HTML has the sync panel as static HTML at the bottom of body,
// we need to replace it with React-rendered content.

// Strategy: Create a mount point that SyncPanel renders into.
// The existing .eft-sync-panel in HTML will be our mount target.
const MOUNT_ID = 'eft-react-root'

// Ensure mount point exists
let mountEl = document.getElementById(MOUNT_ID)
if (!mountEl) {
  mountEl = document.createElement('div')
  mountEl.id = MOUNT_ID
  document.body.appendChild(mountEl)
}

createRoot(mountEl).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
