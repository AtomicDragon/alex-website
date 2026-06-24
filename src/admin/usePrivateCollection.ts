import { useCallback, useEffect, useState } from 'react';
import { useAdminAuth } from './auth/context';
import type { SanityDoc } from './types';

type CollectionState<T> = {
  items: T[];
  loading: boolean;
  error: Error | null;
  reload: () => Promise<void>;
  create: (doc: Record<string, unknown>) => Promise<void>;
  update: (id: string, patch: Record<string, unknown>) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

/**
 * CRUD over a document type in the private dataset, using the authenticated
 * admin client. Re-fetches after every mutation.
 */
export function usePrivateCollection<T extends SanityDoc>(
  type: string,
  order = '_createdAt desc',
): CollectionState<T> {
  const { client } = useAdminAuth();
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const reload = useCallback(async () => {
    if (!client) return;
    try {
      const result = await client.fetch<T[]>(
        `*[_type == $type] | order(${order})`,
        { type },
      );
      setItems(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [client, type, order]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const create = useCallback(
    async (doc: Record<string, unknown>) => {
      if (!client) return;
      await client.create({ _type: type, ...doc });
      await reload();
    },
    [client, type, reload],
  );

  const update = useCallback(
    async (id: string, patch: Record<string, unknown>) => {
      if (!client) return;
      await client.patch(id).set(patch).commit();
      await reload();
    },
    [client, reload],
  );

  const remove = useCallback(
    async (id: string) => {
      if (!client) return;
      await client.delete(id);
      await reload();
    },
    [client, reload],
  );

  return { items, loading, error, reload, create, update, remove };
}
