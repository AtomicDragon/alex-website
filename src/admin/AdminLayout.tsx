import { NavLink, Outlet, Link } from 'react-router-dom';
import { useAdminAuth } from './auth/context';

const nav = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/content', label: 'Content', end: false },
  { to: '/admin/crm', label: 'CRM', end: false },
  { to: '/admin/opportunities', label: 'Opportunities', end: false },
  { to: '/admin/notes', label: 'Notes', end: false },
  { to: '/admin/tasks', label: 'Tasks', end: false },
];

export default function AdminLayout() {
  const { logout } = useAdminAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'block rounded-md px-3 py-2 text-sm transition-colors',
      isActive ? 'bg-accent/15 text-accent' : 'text-muted hover:text-accent',
    ].join(' ');

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface p-4">
        <Link to="/admin" className="mb-6 px-3 text-lg font-bold text-primary">
          Admin
        </Link>
        <nav className="flex-1 space-y-1">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-1 border-t border-border pt-4">
          <Link
            to="/"
            className="block rounded-md px-3 py-2 text-sm text-muted hover:text-accent"
          >
            ← View site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="block w-full rounded-md px-3 py-2 text-left text-sm text-muted hover:text-accent-3"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
