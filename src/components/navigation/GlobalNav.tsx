import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const worlds = [
  { to: '/programming', label: 'Programming' },
  { to: '/chef', label: 'Chef' },
  { to: '/fun', label: 'Fun' },
];

const secondary = [
  { to: '/search', label: 'Search' },
  { to: '/tags', label: 'Tags' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

/**
 * Persistent top-left navigation. A hamburger button toggles a slide-out
 * drawer (mobile) / panel (desktop) listing the three worlds plus About/Contact.
 * Inherits the active world's palette via the design tokens.
 */
export default function GlobalNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'block rounded-md px-3 py-2 text-lg transition-colors',
      isActive ? 'text-accent' : 'text-text hover:text-accent',
    ].join(' ');

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface/90 text-text shadow-sm backdrop-blur transition-colors hover:text-accent"
      >
        <span className="text-2xl leading-none">{open ? '✕' : '☰'}</span>
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={[
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav
        aria-label="Primary"
        className={[
          'fixed left-0 top-0 z-40 h-full w-72 max-w-[80vw] border-r border-border bg-surface px-5 pb-6 pt-20 shadow-xl transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <Link
          to="/"
          onClick={close}
          className="mb-6 block text-sm uppercase tracking-[0.2em] text-muted hover:text-accent"
        >
          Alex · Home
        </Link>

        <ul className="space-y-1">
          {worlds.map((w) => (
            <li key={w.to}>
              <NavLink to={w.to} onClick={close} className={linkClass}>
                {w.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <hr className="my-5 border-border" />

        <ul className="space-y-1">
          {secondary.map((s) => (
            <li key={s.to}>
              <NavLink to={s.to} onClick={close} className={linkClass}>
                {s.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
