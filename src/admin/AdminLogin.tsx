import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from './auth/context';
import { PRIVATE_DATASET } from '../lib/sanity/adminClient';

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;
    setBusy(true);
    setError(null);
    const ok = await login(token.trim());
    if (!ok) {
      setError(
        'That token was rejected. Make sure it has Viewer/Editor access to the private dataset.',
      );
    }
    setBusy(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8">
        <h1 className="text-2xl font-bold text-primary">Admin access</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in with a Sanity API token to manage your private workspace.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="token"
              className="mb-1 block text-sm font-medium text-text"
            >
              Sanity API token
            </label>
            <input
              id="token"
              type="password"
              autoComplete="off"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="sk..."
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
            />
          </div>

          {error && <p className="text-sm text-accent-3">{error}</p>}

          <button
            type="submit"
            disabled={busy || !token.trim()}
            className="w-full rounded-md bg-accent px-4 py-2.5 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy ? 'Checking…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-border bg-background p-4 text-xs text-muted">
          <p className="font-semibold text-text">Where do I get a token?</p>
          <p className="mt-1">
            In{' '}
            <a
              href="https://www.sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              manage.sanity.io
            </a>{' '}
            → your project → API → Tokens → add a token with{' '}
            <strong>Editor</strong> access. It can read &amp; write the{' '}
            <code>{PRIVATE_DATASET}</code> dataset. The token stays only in this
            browser.
          </p>
        </div>

        <Link
          to="/"
          className="mt-6 inline-block text-sm text-muted hover:text-accent"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
