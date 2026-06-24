import { useState } from 'react';
import { usePrivateCollection } from '../usePrivateCollection';
import { OPPORTUNITY_STAGES, type Opportunity } from '../types';

const empty = {
  title: '',
  company: '',
  stage: 'Application' as Opportunity['stage'],
  link: '',
  notes: '',
};

export default function Opportunities() {
  const { items, loading, error, create, update, remove } =
    usePrivateCollection<Opportunity>('opportunity');
  const [form, setForm] = useState(empty);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await create({ ...form });
    setForm(empty);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Opportunity tracker</h1>
      <p className="mt-1 text-muted">
        Applications, interviews, offers, and projects.
      </p>

      <form
        onSubmit={submit}
        className="mt-6 grid gap-3 rounded-xl border border-border bg-surface p-5 sm:grid-cols-2"
      >
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Role / title *"
          className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
        />
        <input
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder="Company"
          className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
        />
        <select
          value={form.stage}
          onChange={(e) =>
            setForm({ ...form, stage: e.target.value as Opportunity['stage'] })
          }
          className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
        >
          {OPPORTUNITY_STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          placeholder="Link"
          className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
        />
        <textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Notes"
          rows={2}
          className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent sm:col-span-2"
        />
        <button
          type="submit"
          disabled={!form.title.trim()}
          className="justify-self-start rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          Add opportunity
        </button>
      </form>

      {loading && <p className="mt-6 text-muted">Loading…</p>}
      {error && <p className="mt-6 text-accent-3">Error: {error.message}</p>}

      <ul className="mt-6 space-y-3">
        {items.map((o) => (
          <li
            key={o._id}
            className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-border bg-surface p-4"
          >
            <div className="min-w-0">
              <span className="font-medium text-primary">{o.title}</span>
              {o.company && (
                <span className="text-muted"> · {o.company}</span>
              )}
              {o.notes && (
                <p className="mt-1 whitespace-pre-line text-sm text-muted">
                  {o.notes}
                </p>
              )}
              {o.link && (
                <a
                  href={o.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-accent hover:underline"
                >
                  Open link ↗
                </a>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <select
                value={o.stage ?? 'Application'}
                onChange={(e) => update(o._id, { stage: e.target.value })}
                className="rounded-md border border-border bg-background px-2 py-1 text-sm text-text outline-none focus:border-accent"
              >
                {OPPORTUNITY_STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => remove(o._id)}
                className="text-sm text-muted hover:text-accent-3"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {!loading && items.length === 0 && (
          <li className="rounded-xl border border-dashed border-border p-6 text-center text-muted">
            No opportunities yet.
          </li>
        )}
      </ul>
    </div>
  );
}
