import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createAdminClient, validateToken } from '../../lib/sanity/adminClient';
import {
  AdminAuthContext,
  type AdminAuthStatus,
  type AdminAuthValue,
} from './context';

const STORAGE_KEY = 'admin_sanity_token';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AdminAuthStatus>(() =>
    localStorage.getItem(STORAGE_KEY) ? 'loading' : 'unauthenticated',
  );

  // Restore + validate a previously stored token on mount.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    let active = true;
    void (async () => {
      const ok = await validateToken(stored);
      if (!active) return;
      if (ok) {
        setToken(stored);
        setStatus('authenticated');
      } else {
        localStorage.removeItem(STORAGE_KEY);
        setStatus('unauthenticated');
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (candidate: string) => {
    const ok = await validateToken(candidate);
    if (ok) {
      localStorage.setItem(STORAGE_KEY, candidate);
      setToken(candidate);
      setStatus('authenticated');
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setStatus('unauthenticated');
  }, []);

  const client = useMemo(
    () => (token ? createAdminClient(token) : null),
    [token],
  );

  const value = useMemo<AdminAuthValue>(
    () => ({ status, client, login, logout }),
    [status, client, login, logout],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}
