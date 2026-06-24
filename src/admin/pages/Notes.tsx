import { useState } from 'react';
import { usePrivateCollection } from '../usePrivateCollection';
import type { Note } from '../types';

export default function Notes() {
  const { items, loading, error, create, update, remove } =
    usePrivateCollection<Note>('note', '_updatedAt desc');
  const [form, setForm] = useState({ title: '', body: '' });
  const [editing, setEditing] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await create({ ...form });
    setForm({ title: '', body: '' });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Notes</h1>
      <p className="mt-1 text-muted">Private markdown notes.</p>

      <form
        onSubmit={submit}
        className="mt-6 grid gap-3 rounded-xl border border-border bg-surface p-5"
      >
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title *"
          className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
        />
        <textarea
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          placeholder="Write in markdown…"
          rows={4}
          className="rounded-md border border-border bg-background px-3 py-2 font-mono text-sm text-text outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={!form.title.trim()}
          className="justify-self-start rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          Add note
        </button>
      </form>

      {loading && <p className="mt-6 text-muted">Loading…</p>}
      {error && <p className="mt-6 text-accent-3">Error: {error.message}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((note) =>
          editing === note._id ? (
            <NoteEdit
              key={note._id}
              note={note}
              onCancel={() => setEditing(null)}
              onSave={async (patch) => {
                await update(note._id, patch);
                setEditing(null);
              }}
            />
          ) : (
            <article
              key={note._id}
              className="flex flex-col rounded-xl border border-border bg-surface p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-primary">{note.title}</h3>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditing(note._id)}
                    className="text-sm text-accent hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(note._id)}
                    className="text-sm text-muted hover:text-accent-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {note.body && (
                <pre className="mt-2 whitespace-pre-wrap font-mono text-sm text-muted">
                  {note.body}
                </pre>
              )}
            </article>
          ),
        )}
        {!loading && items.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-muted sm:col-span-2">
            No notes yet.
          </p>
        )}
      </div>
    </div>
  );
}

function NoteEdit({
  note,
  onSave,
  onCancel,
}: {
  note: Note;
  onSave: (patch: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    title: note.title ?? '',
    body: note.body ?? '',
  });
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-accent bg-surface p-4">
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
      />
      <textarea
        value={form.body}
        onChange={(e) => setForm({ ...form, body: e.target.value })}
        rows={5}
        className="rounded-md border border-border bg-background px-3 py-2 font-mono text-sm text-text outline-none focus:border-accent"
      />
      <div className="flex gap-2">
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
    </article>
  );
}
