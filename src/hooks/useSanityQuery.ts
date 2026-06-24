import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanity/client';

type QueryState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

/** Fetch a GROQ query from Sanity, tracking loading/error state. */
export function useSanityQuery<T>(
  query: string,
  params?: Record<string, unknown>,
): QueryState<T> {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const paramsKey = JSON.stringify(params ?? {});

  useEffect(() => {
    let active = true;
    // Wrapped in an async IIFE so state updates happen in callbacks, not
    // synchronously in the effect body.
    void (async () => {
      try {
        const result = await sanityClient.fetch<T>(query, params ?? {});
        if (active) setState({ data: result, loading: false, error: null });
      } catch (err) {
        if (active)
          setState({ data: null, loading: false, error: err as Error });
      }
    })();
    return () => {
      active = false;
    };
    // paramsKey captures params by value; params object identity is ignored.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, paramsKey]);

  return state;
}
