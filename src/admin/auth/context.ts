import { createContext, useContext } from 'react';
import type { SanityClient } from '@sanity/client';

export type AdminAuthStatus =
  | 'loading'
  | 'authenticated'
  | 'unauthenticated';

export type AdminAuthValue = {
  status: AdminAuthStatus;
  /** Authenticated client scoped to the private dataset, or null if signed out. */
  client: SanityClient | null;
  /** Validate + persist a token. Returns whether it was accepted. */
  login: (token: string) => Promise<boolean>;
  logout: () => void;
};

export const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function useAdminAuth(): AdminAuthValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return ctx;
}
