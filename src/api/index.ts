// =============================================================================
// BRASWELLJR API, DOMAIN-BASED ARCHITECTURE
// =============================================================================
// Organised by business domain. Each domain exposes:
//   services.ts   raw async API functions (name the concrete endpoints)
//   queries.ts    TanStack Query read hooks (accept an `options` arg for deps)
//   types.ts      domain types
//
// Infrastructure:
//   client.ts       fetch transport: JSON + timeout + envelope unwrapping
//   query-client.ts configured QueryClient + QueryOptions helper
//   query-keys.ts   hierarchical cache keys
//   refresh.ts      named staleness/polling tiers
//   errors/         typed API errors
//
// Every credential (the GitHub PAT, the Spotify refresh token) stays in the
// route handlers under src/app/api. The browser only ever calls those, so the
// transport carries no auth of its own.
//
// Use hooks in components; use services directly in non-React code.

// --- Infrastructure ---------------------------------------------------------
export {
  buildApiUrl,
  fetcher,
  handleApiError,
  handleResponse,
  toQuery,
  type Envelope,
  type ListEnvelope,
  type ListParams,
  type PageMeta
} from './client';
export { clearQueryCache, queryClient, type QueryOptions } from './query-client';
export { queryKeys } from './query-keys';
export { REFRESH, STALE } from './refresh';
export * from './errors';

// --- Domains ----------------------------------------------------------------
export * from './github/services';
export * from './github/queries';
export * from './github/types';

export * from './spotify/services';
export * from './spotify/queries';
export * from './spotify/types';
