import { useState } from 'react';
import { usePrivateCollection } from '../usePrivateCollection';
import { CONTACT_STATUSES, type Contact, type ContactStatus } from '../types';

const empty = {
  name: '',
  company: '',
  email: '',
  status: 'Lead' as Contact['status'],
  notes: '',
};

export default function CRM() {
  const { items, loading, error, create, update, remove } =
    usePrivateCollection<Contact>('contact');
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    await create({ ...form });
    setForm(empty);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">CRM</h1>
      <p className="mt-1 text-muted">
        Recruiters, clients, and networking contacts.
      </p>

      {/* Add form */}
      <form
        onSubmit={submit}
        className="mt-6 grid gap-3 rounded-xl border border-border bg-surface p-5 sm:grid-cols-2"
      >
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name *"
          className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
        />
        <input
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder="Company"
          className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
        />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
        />
        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as ContactStatus })
          }
          className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
        >
          {CONTACT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Notes"
          rows={2}
          className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent sm:col-span-2"
        />
        <button
          type="submit"
          disabled={!form.name.trim()}
          className="justify-self-start rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          Add contact
        </button>
      </form>

      {loading && <p className="mt-6 text-muted">Loading…</p>}
      {error && <p className="mt-6 text-accent-3">Error: {error.message}</p>}

      {/* List */}
      <ul className="mt-6 space-y-3">
        {items.map((c) =>
          editing === c._id ? (
            <ContactEdit
              key={c._id}
              contact={c}
              onCancel={() => setEditing(null)}
              onSave={async (patch) => {
                await update(c._id, patch);
                setEditing(null);
              }}
            />
          ) : (
            <li
              key={c._id}
              className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface p-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-primary">{c.name}</span>
                  {c.status && (
                    <span className="rounded-full border border-border px-2 py-0.5 text-xs text-accent">
                      {c.status}
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-sm text-muted">
                  {[c.company, c.email].filter(Boolean).join(' · ')}
                </div>
                {c.notes && (
                  <p className="mt-1 whitespace-pre-line text-sm text-muted">
                    {c.notes}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(c._id)}
                  className="text-sm text-accent hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(c._id)}
                  className="text-sm text-muted hover:text-accent-3"
                >
                  Delete
                </button>
              </div>
            </li>
          ),
        )}
        {!loading && items.length === 0 && (
          <li className="rounded-xl border border-dashed border-border p-6 text-center text-muted">
            No contacts yet.
          </li>
        )}
      </ul>
    </div>
  );
}

function ContactEdit({
  contact,
  onSave,
  onCancel,
}: {
  contact: Contact;
  onSave: (patch: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: contact.name ?? '',
    company: contact.company ?? '',
    email: contact.email ?? '',
    status: contact.status ?? 'Lead',
    notes: contact.notes ?? '',
  });

  return (
    <li className="grid gap-3 rounded-xl border border-accent bg-surface p-4 sm:grid-cols-2">
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
      />
      <input
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        placeholder="Company"
        className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
      />
      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
        className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
      />
      <select
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value as ContactStatus })
        }
        className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
      >
        {CONTACT_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <textarea
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        rows={2}
        className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent sm:col-span-2"
      />
      <div className="flex gap-2 sm:col-span-2">
        <button
          type="button"
          onClick={() => onSave(form)}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-border px-4 py-2 text-sm text-text hover:text-accent"
        >
          Cancel
        </button>
      </div>
    </li>
  );
}
