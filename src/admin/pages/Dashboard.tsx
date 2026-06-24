import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sanityClient } from '../../lib/sanity/client';
import { useAdminAuth } from '../auth/context';

type ContentCounts = {
  projects: number;
  posts: number;
  recipes: number;
  foodBlog: number;
  gallery: number;
  games: number;
  funProjects: number;
};

type WorkspaceCounts = {
  contacts: number;
  opportunities: number;
  openTasks: number;
  notes: number;
};

const contentQuery = `{
  "projects": count(*[_type == "programmingProject"]),
  "posts": count(*[_type == "blogPost"]),
  "recipes": count(*[_type == "recipe"]),
  "foodBlog": count(*[_type == "foodBlog"]),
  "gallery": count(*[_type == "galleryItem"]),
  "games": count(*[_type == "game"]),
  "funProjects": count(*[_type == "funProject"])
}`;

const workspaceQuery = `{
  "contacts": count(*[_type == "contact"]),
  "opportunities": count(*[_type == "opportunity"]),
  "openTasks": count(*[_type == "task" && status != "Done"]),
  "notes": count(*[_type == "note"])
}`;

export default function Dashboard() {
  const { client } = useAdminAuth();
  const [content, setContent] = useState<ContentCounts | null>(null);
  const [workspace, setWorkspace] = useState<WorkspaceCounts | null>(null);

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const r = await sanityClient.fetch<ContentCounts>(contentQuery);
        if (active) setContent(r);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!client) return;
    let active = true;
    void (async () => {
      try {
        const r = await client.fetch<WorkspaceCounts>(workspaceQuery);
        if (active) setWorkspace(r);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      active = false;
    };
  }, [client]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
      <p className="mt-1 text-muted">Your personal operating system.</p>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
          Content
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Projects" value={content?.projects} />
          <Stat label="Blog posts" value={content?.posts} />
          <Stat label="Recipes" value={content?.recipes} />
          <Stat label="Food posts" value={content?.foodBlog} />
          <Stat label="Gallery" value={content?.gallery} />
          <Stat label="Games" value={content?.games} />
          <Stat label="Fun projects" value={content?.funProjects} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
          Workspace
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Contacts" value={workspace?.contacts} to="/admin/crm" />
          <Stat
            label="Opportunities"
            value={workspace?.opportunities}
            to="/admin/opportunities"
          />
          <Stat label="Open tasks" value={workspace?.openTasks} to="/admin/tasks" />
          <Stat label="Notes" value={workspace?.notes} to="/admin/notes" />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
          Quick links
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="/studio"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Open Studio ↗
          </a>
          <Link
            to="/admin/content"
            className="rounded-md border border-border px-4 py-2 text-sm text-text hover:text-accent"
          >
            Content manager
          </Link>
          <Link
            to="/admin/tasks"
            className="rounded-md border border-border px-4 py-2 text-sm text-text hover:text-accent"
          >
            Task board
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  to,
}: {
  label: string;
  value?: number;
  to?: string;
}) {
  const inner = (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="text-2xl font-bold text-primary">{value ?? '—'}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
  return to ? (
    <Link to={to} className="transition-transform hover:-translate-y-0.5">
      {inner}
    </Link>
  ) : (
    inner
  );
}
