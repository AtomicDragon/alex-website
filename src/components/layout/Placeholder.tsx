import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

type PlaceholderProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

/** Generic "coming soon" page used for routes not yet built out. */
export default function Placeholder({ title, subtitle, children }: PlaceholderProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-4xl font-bold text-primary">{title}</h1>
      {subtitle && <p className="mt-4 text-lg text-muted">{subtitle}</p>}
      {children}
      <p className="mt-10 inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted">
        Coming soon
      </p>
    </section>
  );
}

/** Detail-route placeholder that surfaces the dynamic slug. */
export function DetailPlaceholder({ kind }: { kind: string }) {
  const { slug } = useParams();
  return (
    <Placeholder
      title={`${kind} Detail`}
      subtitle={slug ? `Showing: “${slug}”` : undefined}
    />
  );
}
