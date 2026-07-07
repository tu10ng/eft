// ============================================
// TanStack Query client — configured with:
//  - Exponential backoff retry
//  - IndexedDB offline persistence
//  - Stale-while-revalidate defaults
// ============================================
import { QueryClient } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { get, set, del } from 'idb-keyval'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // 30s: data considered fresh
      gcTime: 5 * 60_000, // 5min: keep in cache after unused
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
    },
  },
})

// Offline persistence via IndexedDB
const persister = createAsyncStoragePersister({
  storage: {
    getItem: (key: string) => get<string>(key),
    setItem: (key: string, value: string) => set(key, value),
    removeItem: (key: string) => del(key),
  },
  key: 'EFT_QUERY_CACHE',
})

persistQueryClient({
  queryClient,
  persister,
  maxAge: Infinity,
  buster: 'v3',
})
