import { useState } from 'react';
import { usePrivateCollection } from '../usePrivateCollection';
import { TASK_STATUSES, type Task } from '../types';

export default function Tasks() {
  const { items, loading, error, create, update, remove } =
    usePrivateCollection<Task>('task');
  const [title, setTitle] = useState('');

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await create({ title: title.trim(), status: 'Backlog' });
    setTitle('');
  };

  const move = (task: Task, dir: -1 | 1) => {
    const i = TASK_STATUSES.indexOf(task.status);
    const next = TASK_STATUSES[i + dir];
    if (next) void update(task._id, { status: next });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Tasks</h1>
      <p className="mt-1 text-muted">Kanban board.</p>

      <form onSubmit={add} className="mt-6 flex gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task…"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {loading && <p className="mt-6 text-muted">Loading…</p>}
      {error && <p className="mt-6 text-accent-3">Error: {error.message}</p>}

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {TASK_STATUSES.map((status) => {
          const column = items.filter((t) => t.status === status);
          return (
            <section
              key={status}
              className="rounded-xl border border-border bg-surface/50 p-4"
            >
              <h2 className="mb-3 flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-muted">
                {status}
                <span className="rounded-full bg-background px-2 text-xs">
                  {column.length}
                </span>
              </h2>
              <ul className="space-y-2">
                {column.map((task) => (
                  <li
                    key={task._id}
                    className="rounded-lg border border-border bg-surface p-3"
                  >
                    <p className="text-sm text-text">{task.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex gap-1">
                        <MoveBtn
                          disabled={status === TASK_STATUSES[0]}
                          label="‹"
                          onClick={() => move(task, -1)}
                        />
                        <MoveBtn
                          disabled={
                            status === TASK_STATUSES[TASK_STATUSES.length - 1]
                          }
                          label="›"
                          onClick={() => move(task, 1)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(task._id)}
                        className="text-xs text-muted hover:text-accent-3"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
                {column.length === 0 && (
                  <li className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted">
                    Empty
                  </li>
                )}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function MoveBtn({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-6 w-6 items-center justify-center rounded border border-border text-text hover:border-accent hover:text-accent disabled:opacity-30"
    >
      {label}
    </button>
  );
}
