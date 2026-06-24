import { Link } from 'react-router-dom';

const links = [
  { to: '/programming', label: 'Programming' },
  { to: '/chef', label: 'Chef' },
  { to: '/fun', label: 'Fun' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="border-t border-border bg-surface"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Alex — built with React &amp; Sanity
        </p>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-muted hover:text-accent">
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/AtomicDragon/alex-website"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent"
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </footer>
  );
}
