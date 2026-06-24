import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-lg text-muted">This page doesn&apos;t exist.</p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-md bg-accent px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
      >
        Back home
      </Link>
    </section>
  );
}
