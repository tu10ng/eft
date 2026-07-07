// ============================================
// App — root React component
// Renders sync panel, pill bridge, dashboard
// ============================================
import { Toaster } from 'react-hot-toast'
import { SyncPanel } from './components/SyncPanel'
import { QuestPillBridge } from './components/QuestPillBridge'
import { TeamDashboard } from './components/TeamDashboard'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useRealtime } from './hooks/useRealtime'

export function App() {
  const { realtimeStatus } = useRealtime()

  return (
    <ErrorBoundary>
      <SyncPanel />
      <QuestPillBridge />
      <TeamDashboard realtimeStatus={realtimeStatus} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid #555',
          },
        }}
      />
    </ErrorBoundary>
  )
}
